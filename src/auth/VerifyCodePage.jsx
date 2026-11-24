// Step 2 (/verify-code): type the 6-digit code from the SMS. It checks automatically once all six
// digits are in (or press Done). Sign-up then creates the account; both then log in and go back to
// where the person was. "Resend code" is available after 30 seconds; "Change number" goes back.
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import AuthShell from './AuthShell.jsx'
import { CodeInput, YellowButton, ErrorLine } from './AuthParts.jsx'
import { finishWithCode, resendCode } from './auth-requests.js'
import { pendingNumber, forgetNumber } from './phone-number.js'
import { destinationFrom, goTo } from './destination.js'

const RESEND_AFTER_SECONDS = 30

export default function VerifyCodePage() {
  const navigate = useNavigate()
  const { search, state } = useLocation()
  const isSignUp = state?.isSignUp === true
  const number = pendingNumber()
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [wait, setWait] = useState(RESEND_AFTER_SECONDS) // seconds until "Resend code" works

  // No number (e.g. the page was opened directly): start again on the number page
  useEffect(() => {
    if (!number) navigate(`/signin${search}`, { replace: true })
  }, [number, navigate, search])

  // Count down once a second until resending is allowed
  useEffect(() => {
    if (wait <= 0) return
    const tick = setTimeout(() => setWait((w) => w - 1), 1000)
    return () => clearTimeout(tick)
  }, [wait])

  const verify = async (typed = code) => {
    if (busy) return
    setBusy(true)
    setError('')
    const result = await finishWithCode(number, typed, { isSignUp })
    if (result.error) {
      setBusy(false)
      return setError(result.error)
    }
    forgetNumber()
    goTo(destinationFrom(search)) // keep "Verifying…" showing while the page reloads
  }

  const resend = async () => {
    setError('')
    setNotice('')
    const result = await resendCode(number)
    if (result.error) return setError(result.error)
    setNotice('New code sent')
    setWait(RESEND_AFTER_SECONDS)
  }

  return (
    <AuthShell title="Enter the code" subtitle={`We sent a 6-digit code to ${number || 'your number'}`}>
      <div className="flex flex-col gap-4 md:gap-[calc(18*var(--d))]">
        <CodeInput onChange={setCode} onComplete={verify} />
        <ErrorLine>{error}</ErrorLine>
        {notice && <p className="text-[13px] text-[#53cf7b] md:text-[calc(15*var(--d))]">{notice}</p>}
        <YellowButton busy={busy} onClick={() => verify()}>
          {busy ? 'Verifying…' : 'Done'}
        </YellowButton>
        <div className="flex items-center justify-between text-[13px] md:text-[calc(15*var(--d))]">
          <Link to={`/${isSignUp ? 'signup' : 'signin'}${search}`} className="text-white/60 hover:text-white">
            Change number
          </Link>
          {wait > 0 ? (
            <span className="text-white/45">Resend code in {wait}s</span>
          ) : (
            <button type="button" onClick={resend} className="font-semibold text-brand hover:underline">
              Resend code
            </button>
          )}
        </div>
      </div>
    </AuthShell>
  )
}
