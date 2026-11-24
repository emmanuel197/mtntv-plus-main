// Step 1 of sign-in / sign-up: "type your number". Sign In and Sign Up use this same screen with
// different words (isSignUp). What happens on Continue:
//   number not valid / not on MTN / server problem → red message under the box
//   code sent → the code page (/verify-code)
//   test number ("superuser") → signed in straight away, back to where they came from
// On opening, the region check runs; outside the allowed region → /out-of-region.
// Already signed in → straight on to where they wanted to go.
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import AuthShell from './AuthShell.jsx'
import { PhoneNumberInput, YellowButton, ErrorLine } from './AuthParts.jsx'
import { startSignInOrUp, checkRegion } from './auth-requests.js'
import { isSignedIn } from './session.js'
import { pendingNumber } from './phone-number.js'
import { destinationFrom, goTo } from './destination.js'

export default function NumberStep({ isSignUp }) {
  const navigate = useNavigate()
  const { search } = useLocation()
  const destination = destinationFrom(search)
  const [number, setNumber] = useState(pendingNumber()) // keep what they typed if they come back
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Redirects use { replace: true } so the Back button doesn't bounce back here (AfriPlay lesson)
    if (isSignedIn()) {
      navigate(destination, { replace: true })
      return
    }
    let stillHere = true
    checkRegion().then((allowed) => stillHere && !allowed && navigate('/out-of-region', { replace: true }))
    return () => {
      stillHere = false // left the page before the answer came back: don't redirect
    }
  }, [navigate, destination])

  const proceed = async () => {
    if (busy) return
    setBusy(true)
    setError('')
    const result = await startSignInOrUp(number, { isSignUp })
    setBusy(false)
    if (result.error) return setError(result.error)
    if (result.next === 'done') return goTo(destination)
    navigate(`/verify-code${search}`, { state: { isSignUp } })
  }

  const other = isSignUp
    ? { text: 'Already have an account?', link: 'Sign in', to: '/signin' }
    : { text: "Don't have an account?", link: 'Sign up', to: '/signup' }

  return (
    <AuthShell
      title={isSignUp ? 'Create your account' : 'Sign In'}
      subtitle={isSignUp ? 'Enter your MTN number. We’ll text you a code.' : 'Welcome back to MTN TV+. Enter your MTN number.'}
    >
      <div className="flex flex-col gap-4 md:gap-[calc(18*var(--d))]">
        <PhoneNumberInput value={number} onChange={setNumber} onEnter={proceed} autoFocus />
        <ErrorLine>{error}</ErrorLine>
        <YellowButton busy={busy} onClick={proceed}>
          {busy ? 'Please wait…' : 'Continue'}
        </YellowButton>
        <p className="text-[13px] text-white/60 md:text-[calc(15*var(--d))]">
          {other.text}{' '}
          <Link to={`${other.to}${search}`} className="font-semibold text-brand hover:underline">
            {other.link}
          </Link>
        </p>
        {isSignUp && (
          <p className="text-[11px] text-white/45 md:text-[calc(13*var(--d))]">
            By continuing you agree to the MTN TV+ Terms of Use. Standard SMS rates may apply.
          </p>
        )}
      </div>
    </AuthShell>
  )
}
