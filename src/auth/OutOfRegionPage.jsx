// Shown when the region check says this visitor isn't somewhere MTN TV+ is offered.
import { Link } from 'react-router'
import AuthShell from './AuthShell.jsx'

export default function OutOfRegionPage() {
  return (
    <AuthShell title="Not available here" subtitle="MTN TV+ is only available on the MTN network in Ghana.">
      <p className="text-[13px] text-white/60 md:text-[calc(15*var(--d))]">
        Connect with MTN mobile data and try again.{' '}
        <Link to="/signin" className="font-semibold text-brand hover:underline">
          Try again
        </Link>
      </p>
    </AuthShell>
  )
}
