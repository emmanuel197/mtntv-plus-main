// Talking to the Client API (Uniqcast): catalogue, video links, bookmarks, login.
// Every request made with `clientApi` passes through two "checkpoints" (axios interceptors):
//
//   1. On the way out: if someone is signed in, attach their pass —
//        Authorization: Bearer <access token>
//   2. On the way back: if the server says 401 ("your pass has run out"), quietly get a new pass
//      with the refresh token, then send the same request again. If renewing fails too, the session
//      is over: sign out and go to the sign-in page.
//
// Only ONE renewal runs at a time: if five requests fail together, they all wait for the same
// renewal (otherwise five renewals would race and cancel each other out — an AfriPlay lesson).
import axios from 'axios'
import { CLIENT_API, clientPaths } from './server-addresses.js'
import { getSession, updateTokens, clearSession } from '@/auth/session.js'

export const clientApi = axios.create({ baseURL: CLIENT_API, timeout: 20000 })

// ── 1. On the way out ──
clientApi.interceptors.request.use((config) => {
  const token = getSession()?.accessToken
  if (token && !config.headers.Authorization) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── 2. On the way back ──
let renewing = null // the renewal in progress, shared by everyone waiting

async function renewPass() {
  const session = getSession()
  if (!session?.refreshToken) throw new Error('no refresh token')
  // Renew with the same version that issued the tokens
  const path = session.version === 'v1' ? clientPaths.refreshV1 : clientPaths.refreshV2
  const res = await axios.post(`${CLIENT_API}/${path}`, { refresh_token: session.refreshToken }, { timeout: 20000 })
  const data = res.data?.data
  if (res.data?.status !== 'ok' || !data?.access_token) throw new Error('refresh rejected')
  updateTokens({ accessToken: data.access_token, refreshToken: data.refresh_token })
}

clientApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config
    const expired = error.response?.status === 401
    // Never try to renew because of the login/refresh calls themselves (that would loop forever),
    // nor for logout (signing out with an expired login should still just sign out),
    // and only retry a request once
    const isAuthCall = /global\/(login|refresh|logout)/.test(request?.url || '')
    if (!expired || isAuthCall || request._retried || !getSession()?.refreshToken) throw error

    try {
      renewing = renewing || renewPass().finally(() => (renewing = null))
      await renewing
    } catch {
      // The refresh token is dead too: end the session and send the user to sign in,
      // coming back to this page afterwards
      clearSession()
      const here = window.location.pathname + window.location.search
      window.location.assign(`/signin?redirectTo=${encodeURIComponent(here)}`)
      throw error
    }

    request._retried = true
    request.headers.Authorization = `Bearer ${getSession().accessToken}`
    return clientApi(request) // send the original request again with the new pass
  },
)
