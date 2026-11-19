// The "Get Bundle" pill and the notification bell, shown at the top right on desktop and phone.
import { Link } from 'react-router'
import { Bell } from 'lucide-react'

export default function TopBarActions() {
  return (
    <div className="flex items-center gap-3">
      <Link
        to="/bundles"
        className="rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-black hover:brightness-110"
      >
        Get Bundle
      </Link>
      <Link
        to="/notifications"
        aria-label="Notifications"
        className="flex size-9 items-center justify-center rounded-full text-text hover:bg-white/10"
      >
        <Bell size={20} />
      </Link>
    </div>
  )
}
