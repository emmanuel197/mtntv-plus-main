// "On Air Today": the day's programmes in time order (WONA's OnAirScheduleSection).
//   All tab: Earlier Today rows (Replay), then channels live right now, then Coming Up rows (Remind)
//   Earlier Today / Coming Up tabs: only those rows.
// Only programmes of the chosen category (Sports, News, …) are shown.
import { useState } from 'react'
import ScheduleRow from './ScheduleRow.jsx'
import DesktopChannelCard from './DesktopChannelCard.jsx'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'earlier', label: 'Earlier Today' },
  { id: 'upcoming', label: 'Coming Up' },
]

export default function OnAirSchedule({ items, liveChannels, date, category, onSelect, onAction }) {
  const [tab, setTab] = useState('all')

  const inCategory = (row) => category === 'All' || row.category === category
  const earlier = items.filter((i) => i.when === 'earlier' && inCategory(i))
  const upcoming = items.filter((i) => i.when === 'upcoming' && inCategory(i))
  const live = liveChannels.filter(inCategory)

  // How many rows the chosen tab shows, so we can say so when it is empty
  const shownCount =
    (tab !== 'upcoming' ? earlier.length : 0) + (tab === 'all' ? live.length : 0) + (tab !== 'earlier' ? upcoming.length : 0)

  return (
    <section className="flex flex-col gap-[calc(20*var(--d))]">
      <div className="flex items-center justify-between">
        <h2 className="text-[calc(20*var(--d))] font-bold italic">On Air Today</h2>
        <span className="text-[calc(16*var(--d))] text-white/60">{date}</span>
      </div>

      <div className="flex items-center gap-[calc(28*var(--d))] border-b border-white/10">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            // -mb-px pulls the yellow underline down onto the grey line below the tabs
            className={`-mb-px border-b-2 pb-[calc(10*var(--d))] text-[calc(16*var(--d))] transition-colors ${
              tab === t.id ? 'border-brand text-brand' : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-[calc(6*var(--d))]">
        {tab !== 'upcoming' &&
          earlier.map((item, i) => (
            <ScheduleRow key={item.id} item={item} striped={i % 2 === 1} onSelect={onSelect} onAction={onAction} />
          ))}

        {tab === 'all' &&
          live.map((c, i) => <DesktopChannelCard key={c.id} channel={c} striped={i % 2 === 1} onSelect={() => onSelect(c)} />)}

        {tab !== 'earlier' &&
          upcoming.map((item, i) => (
            <ScheduleRow key={item.id} item={item} striped={i % 2 === 1} onSelect={onSelect} onAction={onAction} />
          ))}

        {shownCount === 0 && (
          <p className="py-[calc(24*var(--d))] text-center text-[calc(14*var(--d))] text-white/50">
            No {category === 'All' ? '' : `${category.toLowerCase()} `}programmes to show here.
          </p>
        )}
      </div>
    </section>
  )
}
