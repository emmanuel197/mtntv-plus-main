// The guard for every page that needs an account (WONA's ProtectedRoute, plus a return address).
// Signed in → show the page. Signed out → go to Sign In, remembering this page so the person
// comes straight back here afterwards (?redirectTo=…). `replace` keeps the Back button sane.
// In AppRouter it wraps a whole group of routes; <Outlet /> is "whichever page in the group was opened".
import { Navigate, Outlet, useLocation } from 'react-router'
import { useSignedIn } from '@/auth/session.js'

export default function SignedInOnly() {
  const signedIn = useSignedIn()
  const { pathname, search } = useLocation()
  if (signedIn) return <Outlet />
  return <Navigate to={`/signin?redirectTo=${encodeURIComponent(pathname + search)}`} replace />
}
