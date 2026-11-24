// The sign-in and sign-up steps (ported from WONA/AfriPlay, which run on the same servers).
// Users only ever type their phone number and a 6-digit SMS code. The server still needs a
// password, so every account uses one shared hidden password (VITE_DEFAULT_PASSWORD).
//
//   Sign in:  network check → send code → (code page) check code → log in
//   Sign up:  network check → send code → (code page) check code → create account → log in
//   Test numbers flagged "superuser" by the backend skip the code: network check → log in.
//
// Each function returns a plain result ({ next }, { error }, …); the screens decide what to show.
import axios from 'axios'
import { env } from '@/app-settings/env.js'
import { crm, clientPaths, CLIENT_API } from '@/server-connection/server-addresses.js'
import { crmApi, crmWithAppLogin } from '@/server-connection/crm-api.js'
import { clientApi } from '@/server-connection/client-api.js'
import { deviceId, deviceInfo } from '@/server-connection/device.js'
import { saveSession, clearSession, getSession } from './session.js'
import { isValidNumber, usernameFor, loginNameFor, rememberNumber } from './phone-number.js'

const SOMETHING_WENT_WRONG = 'Oops! Something went wrong. Please try again.'
const WRONG_CODE = "That code isn't right. Check the SMS and try again."
const NOT_ON_NETWORK ="Sorry, your number isn't on the MTN network. Connect with MTN mobile data and try again."

// ── Region check (shown before the number form) ──
// true = allowed. Only a clear "not valid" from the server blocks; if the check itself fails
// (no internet, server down) we let the person continue — the network check will catch it.
export async function checkRegion() {
  try {
    const { data } = await crmWithAppLogin.get(crm.region())
    return data.valid === true || data.superuser === true
  } catch {
    return true
  }
}

// ── Network check: is this number on MTN? (the CRM looks at the caller's internet address) ──
// `superuser` is set by the backend on test accounts; the app never sends it.
async function checkNetwork(number) {
  const { data } = await crmWithAppLogin.get(crm.network(usernameFor(number)))
  if (data.status !== 'ok') return { error: SOMETHING_WENT_WRONG }
  const superuser = data.superuser === true
  if (!data.valid && !superuser) return { error: NOT_ON_NETWORK }
  return { superuser }
}

async function sendCode(number) {
  await crmApi.post(crm.sendCode(), { mobile_number: number })
}

// ── Step 1 (number page): returns { next: 'code' } or { next: 'done' } or { error } ──
export async function startSignInOrUp(number, { isSignUp }) {
  if (!isValidNumber(number)) return { error: 'Enter your 10-digit number, e.g. 0244123456' }
  rememberNumber(number)
  try {
    const network = await checkNetwork(number)
    if (network.error) return network
    if (network.superuser) {
      // Test number: no SMS code
      const result = isSignUp ? await createAccountAndLogIn(number) : await logIn(number)
      return result.error ? result : { next: 'done' }
    }
    await sendCode(number)
    return { next: 'code' }
  } catch {
    return { error: SOMETHING_WENT_WRONG }
  }
}

// Send the code again (the "Resend code" link)
export async function resendCode(number) {
  try {
    await sendCode(number)
    return {}
  } catch {
    return { error: SOMETHING_WENT_WRONG }
  }
}

// ── Step 2 (code page): returns {} on success or { error } ──
export async function finishWithCode(number, code, { isSignUp }) {
  if (!/^\d{6}$/.test(code)) return { error: 'Enter the 6-digit code from the SMS' }
  try {
    const { data } = await crmApi.post(crm.checkCode(), { mobile_number: number, otp: code })
    // A 200 answer can still say "error" (the server says "invalid OTP") — treat that as a wrong code
    if (data.status !== 'ok') return { error: WRONG_CODE }
  } catch (e) {
    // No answer at all = connection problem; any answer = the server turned the code down
    return { error: e.response ? WRONG_CODE : SOMETHING_WENT_WRONG }
  }
  return isSignUp ? createAccountAndLogIn(number) : logIn(number)
}

// ── Create the account (sign-up), then log in. "Already exists" just logs in. ──
async function createAccountAndLogIn(number) {
  let data
  try {
    ;({ data } = await crmApi.post(crm.createAccount(), {
      first_name: 'MTN TV+', // sign-up doesn't ask for a name; editable later in Profile
      last_name: 'User',
      email: '',
      phone_number: number,
      password: env.defaultPassword,
      username: usernameFor(number),
    }))
  } catch (e) {
    return { error: e.response?.data?.message || SOMETHING_WENT_WRONG }
  }
  if (data.message === 'subscriber already exist' || data.status === 'ok') return logIn(number)
  return { error: `Oops! ${data.message || 'Sign-up failed'}. Try again` }
}

// Old accounts may still have a password the user once chose; the code has just proved they own
// the number, so put the shared password back on the account first. Never blocks the login.
async function resetToSharedPassword(number) {
  try {
    await crmWithAppLogin.put(crm.setPassword(usernameFor(number)), { password: env.defaultPassword })
  } catch {
    // ignore — the login below will say if it really didn't work
  }
}

// Turn a server refusal into words people understand (from WONA)
function loginErrorMessage(body) {
  if (body?.code === 4290 || body?.data?.timeout) {
    // Locked after too many tries; `timeout` is the unlock time in seconds since 1970
    const minutes = Math.max(1, Math.ceil((Number(body.data.timeout) - Date.now() / 1000) / 60))
    return `Too many attempts. Try again in ${minutes} minute${minutes === 1 ? '' : 's'}`
  }
  if (body?.code === 3010) return "We couldn't sign in to this number. Please try again or contact support."
  const message = body?.data?.message || body?.message
  return typeof message === 'string' && message.trim() ? message : 'Invalid login details'
}

// ── Log in: v2 first; v1 only if v2 is down (a v2 "no" is the real answer) ──
async function logIn(number) {
  await resetToSharedPassword(number)
  const credentials = {
    username: loginNameFor(number),
    password: env.defaultPassword,
    device: deviceId(),
    ...deviceInfo(),
  }
  let res
  let version = 'v2'
  try {
    try {
      res = await axios.post(`${CLIENT_API}/${clientPaths.loginV2}`, { login_type: 'Credentials', ...credentials }, { timeout: 20000 })
    } catch (v2Error) {
      const status = v2Error.response?.status
      if (status && status < 500 && status !== 404) throw v2Error
      version = 'v1'
      res = await axios.post(`${CLIENT_API}/${clientPaths.loginV1}`, credentials, { timeout: 20000 })
    }
  } catch (e) {
    return { error: loginErrorMessage(e.response?.data) }
  }
  if (res.data?.status !== 'ok') return { error: loginErrorMessage(res.data) }

  const tokens = res.data.data
  saveSession({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    userId: tokens.user_id,
    number,
    username: usernameFor(number),
    version,
    signedInAt: Date.now(),
  })
  return {}
}

// ── Sign out: tell the server (if we can), then forget the session ──
export async function signOut() {
  try {
    if (getSession()?.accessToken) await clientApi.post(clientPaths.logout, {})
  } catch {
    // signing out locally still matters even if the server can't be reached
  } finally {
    clearSession()
  }
}
