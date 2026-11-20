// The "Get Bundle" pill and the notification bell, shown at the top right on desktop and phone.
// Sizes from Figma: pill 78×30, bell circle 30×30, 11px apart.
import { Link } from 'react-router'
import { Bell } from 'lucide-react'
import { useNotifications } from '@/notifications/notifications-store.js'

export default function TopBarActions() {
  const hasUnread = useNotifications().some((m) => !m.read)

  return (
    <div className="flex items-center gap-[11px]">
      <Link
        to="/bundles"
        className="flex h-[30px] items-center rounded-full border border-black/70 bg-brand px-2.5 text-[13px] font-bold text-black italic hover:brightness-110"
      >
        Get Bundle
      </Link>
      <Link
        to="/notifications"
        aria-label={hasUnread ? 'Notifications (unread)' : 'Notifications'}
        className="relative flex size-[30px] items-center justify-center rounded-full bg-white/30 backdrop-blur-md hover:bg-white/40"
      >
        <Bell size={15} strokeWidth={2} />
        {/* red dot = there are unread notifications */}
        {hasUnread && <span className="absolute top-[7px] right-[8px] size-[6px] rounded-full bg-live" />}
      </Link>
    </div>
  )
}
