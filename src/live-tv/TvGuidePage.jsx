// The full TV Guide (/tv-guide), opened by "Full Guide" on Live TV. Ported from WONA's TvGuidePage:
//   7 day tabs (Today, Tomorrow, then weekday names) · channel list · that channel's programmes for that day.
// The programme on air right now gets a yellow border, a LIVE badge and a Watch button.
// Desktop: channel list down the left (sizes in design pixels). Phones: channels become a sideways row of chips.
// No server yet: the programmes are made up by buildGuideShows() in live-tv-sample-data.js.
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import DesktopLiveBadge from './DesktopLiveBadge.jsx'
import { channels, buildGuideShows } from './live-tv-sample-data.js'

// Today and the next 6 days, each starting at midnight
function makeDayTabs() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    const label = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short' })
    const sub = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })
    return { label, sub, date }
  })
}

const timeLabel = (date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

export default function TvGuidePage() {
  const navigate = useNavigate()
  // useMemo: work the days out once, not on every render
  const days = useMemo(makeDayTabs, [])
  const [channelId, setChannelId] = useState(channels[0].id)
  const [dayIndex, setDayIndex] = useState(0)
  // Read the clock once when the page opens; good enough to mark what's on now
  const [now] = useState(() => Date.now())

  const channel = channels.find((c) => c.id === channelId)
  const shows = useMemo(() => buildGuideShows(channelId, days[dayIndex].date), [channelId, dayIndex, days])

  return (
    <div className="min-h-screen md:bg-[#1b1b1b]">
      <div className="flex flex-col gap-4 px-page pt-[57px] pb-6 md:gap-[calc(24*var(--d))] md:px-[calc(53*var(--d))] md:pt-[calc(49*var(--d))] md:pb-[calc(96*var(--d))]">
        <h1 className="text-xl font-bold italic md:text-[calc(30*var(--d))]">TV Guide</h1>

        {/* Day tabs: the chosen day has a yellow underline */}
        <div className="no-scrollbar flex gap-[18px] overflow-x-auto border-b border-white/10 md:gap-[calc(28*var(--d))]">
          {days.map((t, i) => (
            <button
              key={t.sub}
              type="button"
              onClick={() => setDayIndex(i)}
              // -mb-px pulls the yellow underline down onto the grey line below the tabs
              className={`-mb-px flex shrink-0 flex-col items-center border-b-2 pb-2 transition-colors md:pb-[calc(10*var(--d))] ${
                i === dayIndex ? 'border-brand text-white' : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <span className="text-sm font-semibold md:text-[calc(18*var(--d))]">{t.label}</span>
              <span className="text-[11px] text-white/50 md:text-[calc(12*var(--d))]">{t.sub}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3.5 md:flex-row md:gap-[calc(40*var(--d))]">
          {/* Channel list: chips in a sideways row on phones, a column on desktop */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto md:w-[calc(300*var(--d))] md:shrink-0 md:flex-col md:gap-[calc(4*var(--d))] md:overflow-visible">
            {channels.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setChannelId(c.id)}
                className={`flex shrink-0 items-center gap-[calc(12*var(--d))] rounded-full px-3.5 py-[7px] text-left text-xs transition-colors md:rounded-[calc(12*var(--d))] md:px-[calc(16*var(--d))] md:py-[calc(10*var(--d))] md:text-[calc(16*var(--d))] ${
                  c.id === channelId ? 'bg-brand font-semibold text-black' : 'bg-white/5 text-white/80 hover:bg-white/10'
                }`}
              >
                {/* Logos only on desktop; on phones the chips stay small */}
                <img src={c.logo} alt="" className="hidden size-[calc(32*var(--d))] rounded-[calc(6*var(--d))] object-cover md:block" />
                {c.channel}
              </button>
            ))}
          </div>

          {/* The chosen channel's programmes for the chosen day */}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 md:gap-[calc(8*var(--d))]">
            {shows.map((s, i) => {
              const onNow = dayIndex === 0 && s.start.getTime() <= now && s.end.getTime() > now
              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 md:gap-[calc(20*var(--d))] md:rounded-[calc(12*var(--d))] md:px-[calc(20*var(--d))] md:py-[calc(14*var(--d))] ${
                    onNow ? 'border-brand/60 bg-white/[0.07]' : `border-transparent ${i % 2 === 1 ? 'bg-white/5' : ''}`
                  }`}
                >
                  <span className="w-[112px] shrink-0 text-[11px] text-white/60 md:w-[calc(150*var(--d))] md:text-[calc(14*var(--d))]">
                    {timeLabel(s.start)} – {timeLabel(s.end)}
                  </span>
                  <div className="flex min-w-0 flex-1 items-center gap-1.5 md:gap-[calc(10*var(--d))]">
                    {onNow && <DesktopLiveBadge />}
                    <span className="truncate text-[13px] font-medium md:text-[calc(16*var(--d))]">{s.title}</span>
                  </div>
                  {onNow && (
                    <button
                      type="button"
                      // No player yet: Watch takes you to the channel on the Live TV page
                      onClick={() => navigate('/live-tv')}
                      className="shrink-0 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-black md:px-[calc(18*var(--d))] md:py-[calc(8*var(--d))] md:text-[calc(14*var(--d))]"
                    >
                      Watch
                    </button>
                  )}
                </div>
              )
            })}
            {shows.length === 0 && (
              <p className="py-8 text-center text-sm text-white/50 md:text-[calc(16*var(--d))]">
                No programme guide for {channel?.channel ?? 'this channel'} on this day.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
