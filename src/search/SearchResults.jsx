// The results after you press Enter or pick something — WONA's mobile results screen
// (the MTN TV+ designs don't include one):
//   tabs All · Movies · Tv Shows · Tv Channels → "Found NN results for "…""
//   → All: the Best Results card, then a group per type ("Movies (02)") · other tabs: just that group.
//   Posters 3 per row, channels 2 per row, 12px apart.
import { useState } from 'react'
import ResultTile from './ResultTile.jsx'
import BestResultCard from './BestResultCard.jsx'

const GROUPS = [
  { type: 'movie', label: 'Movies' },
  { type: 'show', label: 'Tv Shows' },
  { type: 'channel', label: 'Tv Channels' },
]
const TABS = [{ type: 'all', label: 'All' }, ...GROUPS]
const twoDigits = (n) => String(n).padStart(2, '0')

function Group({ label, items, type, onOpen }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-base font-semibold">
        {label} <span className="text-xs font-normal text-white/50">({twoDigits(items.length)})</span>
      </h2>
      <div className={`grid gap-3 ${type === 'channel' ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {items.map((item) => (
          <ResultTile key={item.id} item={item} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}

export default function SearchResults({ matches, text, bestResult, onOpen }) {
  const [tab, setTab] = useState('all')
  const shown = tab === 'all' ? matches : matches.filter((m) => m.type === tab)
  const tabLabel = TABS.find((t) => t.type === tab).label

  return (
    <div className="flex flex-col gap-5">
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.type}
            type="button"
            onClick={() => setTab(t.type)}
            className={`shrink-0 rounded-full px-[15px] py-[7px] text-[13px] leading-none font-medium ${
              tab === t.type ? 'bg-brand text-black' : 'bg-white/10 text-white/70'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="text-[13px] text-white/55">
        Found {twoDigits(shown.length)} results for <span className="text-white">"{text}"</span>
        {tab !== 'all' && ` in ${tabLabel}`}
      </p>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-[13px] text-white/50">
          No {tab === 'all' ? '' : `${tabLabel} `}results for "{text}".
        </p>
      ) : (
        <>
          {tab === 'all' && bestResult && <BestResultCard result={bestResult} />}
          {GROUPS.filter((g) => tab === 'all' || g.type === tab).map((g) => {
            const items = shown.filter((m) => m.type === g.type)
            return items.length ? <Group key={g.type} {...g} items={items} onOpen={onOpen} /> : null
          })}
        </>
      )}
    </div>
  )
}
