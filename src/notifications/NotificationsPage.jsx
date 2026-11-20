// Notifications (/notifications) — WONA's inbox screen in MTN TV+ colours (no Figma frame exists).
// All | Unread chips with counts, "Mark all as read", one card per message:
// yellow dot when unread, title, message, date · time, × to delete. Tapping a card marks it read.
// Desktop (md: classes, like WONA's responsive page): the same list in a 900-design-px column on the
// dark grey page, no back button, bigger text. Phone layout unchanged.
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
    // md: = desktop. The outer div paints the page grey; the inner one is the centred column.
    <div className="min-h-screen md:bg-[#1b1b1b]">
      <div className="px-page pt-[68px] md:mx-auto md:max-w-[calc(900*var(--d))] md:px-0 md:pt-[calc(48*var(--d))] md:pb-[calc(96*var(--d))]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="flex size-9 items-center justify-center rounded-full border border-brand/80 md:hidden"
          >
            <ChevronLeft size={18} className="text-brand" />
          </button>
          <h1 className="text-[22px] font-bold italic md:text-[calc(36*var(--d))]">Notifications</h1>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 md:mt-[calc(24*var(--d))]">
          <div className="flex gap-2 md:gap-[calc(10*var(--d))]">
            {['All', 'Unread'].map((tab) => {
              const count = tab === 'Unread' ? unread.length : messages.length
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`h-[26px] rounded-full px-3.5 text-xs md:h-[calc(40*var(--d))] md:px-[calc(20*var(--d))] md:text-[calc(16*var(--d))] ${filter === tab ? 'bg-brand font-semibold text-black' : 'bg-[#1f1b19] text-white/70 md:bg-white/10 md:hover:bg-white/20'}`}
                >
                  {tab}
                  {count > 0 && ` (${count})`}
                </button>
              )
            })}
          </div>
          {unread.length > 0 && (
            <button type="button" onClick={markAllRead} className="text-xs font-medium text-brand hover:underline md:text-[calc(14*var(--d))]">
              Mark all as read
            </button>
          )}
        </div>

        {messages.length === 0 && <p className="py-12 text-center text-sm text-white/50 md:text-[calc(16*var(--d))]">You're all caught up — no notifications.</p>}
        {messages.length > 0 && shown.length === 0 && <p className="py-12 text-center text-sm text-white/50 md:text-[calc(16*var(--d))]">No unread notifications.</p>}

        <div className="mt-5 flex flex-col gap-3 md:mt-[calc(24*var(--d))] md:gap-[calc(14*var(--d))]">
          {shown.map((m) => (
            <div
              key={m.id}
              role="button"
              tabIndex={0}
              onClick={() => markRead(m.id)}
              onKeyDown={(e) => e.key === 'Enter' && markRead(m.id)}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 px-4 py-3.5 md:gap-[calc(14*var(--d))] md:rounded-[calc(16*var(--d))] md:px-[calc(24*var(--d))] md:py-[calc(18*var(--d))] ${m.read ? 'bg-white/[0.04] opacity-80' : 'bg-white/10'}`}
            >
              <span className={`mt-1.5 size-2 shrink-0 rounded-full md:mt-[calc(8*var(--d))] md:size-[calc(9*var(--d))] ${m.read ? '' : 'bg-brand'}`} />
              <div className="min-w-0 flex-1">
                <h3 className={`text-sm md:text-[calc(18*var(--d))] ${m.read ? 'font-medium text-white/85' : 'font-semibold'}`}>{m.title}</h3>
                <p className="mt-1 text-xs text-white/65 md:text-[calc(15*var(--d))]">{m.message}</p>
                <p className="mt-2 text-[11px] text-white/40 md:text-[calc(13*var(--d))]">
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
                <X size={16} className="md:size-[calc(20*var(--d))]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
