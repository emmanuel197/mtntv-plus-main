// Notifications (/notifications) — WONA's inbox screen in MTN TV+ colours (no Figma frame exists).
// All | Unread chips with counts, "Mark all as read", one card per message:
// yellow dot when unread, title, message, date · time, × to delete. Tapping a card marks it read.
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ChevronLeft, X } from 'lucide-react'
import { useNotifications, markRead, markAllRead, removeNotification } from './notifications-store.js'

export default function NotificationsPage() {
  const navigate = useNavigate()
  const messages = useNotifications()
  const [filter, setFilter] = useState('All')
  const unread = messages.filter((m) => !m.read)
  const shown = filter === 'Unread' ? unread : messages

  return (
    <div className="px-page pt-[68px]">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="flex size-9 items-center justify-center rounded-full border border-brand/80"
        >
          <ChevronLeft size={18} className="text-brand" />
        </button>
        <h1 className="text-[22px] font-bold italic">Notifications</h1>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          {['All', 'Unread'].map((tab) => {
            const count = tab === 'Unread' ? unread.length : messages.length
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`h-[26px] rounded-full px-3.5 text-xs ${filter === tab ? 'bg-brand font-semibold text-black' : 'bg-[#1f1b19] text-white/70'}`}
              >
                {tab}
                {count > 0 && ` (${count})`}
              </button>
            )
          })}
        </div>
        {unread.length > 0 && (
          <button type="button" onClick={markAllRead} className="text-xs font-medium text-brand">
            Mark all as read
          </button>
        )}
      </div>

      {messages.length === 0 && <p className="py-12 text-center text-sm text-white/50">You're all caught up — no notifications.</p>}
      {messages.length > 0 && shown.length === 0 && <p className="py-12 text-center text-sm text-white/50">No unread notifications.</p>}

      <div className="mt-5 flex flex-col gap-3">
        {shown.map((m) => (
          <div
            key={m.id}
            role="button"
            tabIndex={0}
            onClick={() => markRead(m.id)}
            onKeyDown={(e) => e.key === 'Enter' && markRead(m.id)}
            className={`flex items-start gap-3 rounded-2xl border border-white/10 px-4 py-3.5 ${m.read ? 'bg-white/[0.04] opacity-80' : 'bg-white/10'}`}
          >
            <span className={`mt-1.5 size-2 shrink-0 rounded-full ${m.read ? '' : 'bg-brand'}`} />
            <div className="min-w-0 flex-1">
              <h3 className={`text-sm ${m.read ? 'font-medium text-white/85' : 'font-semibold'}`}>{m.title}</h3>
              <p className="mt-1 text-xs text-white/65">{m.message}</p>
              <p className="mt-2 text-[11px] text-white/40">
                {m.date} · {m.time}
              </p>
            </div>
            <button
              type="button"
              aria-label="Delete notification"
              onClick={(e) => {
                e.stopPropagation() // don't also mark it read
                removeNotification(m.id)
              }}
              className="mt-0.5 shrink-0 text-white/40 hover:text-live"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
