// "Top 5 Trending Searches": yellow outlined numbers, the search, an arrow; folds up with the chevron.
// Shown on the Search landing and, as in WONA, under "No results".
import { useState } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'

export default function TrendingSearches({ trending, onPick }) {
  const [open, setOpen] = useState(true)
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-bold italic">Top 5 Trending Searches</h2>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Hide trending searches' : 'Show trending searches'}
          aria-expanded={open}
          className="text-brand"
        >
          <ChevronDown size={20} className={open ? '' : '-rotate-90'} />
        </button>
      </div>
      {open && (
        <div className="mt-1">
          {trending.slice(0, 5).map((text, i) => (
            <button
              key={text}
              type="button"
              onClick={() => onPick(text)}
              className="flex h-[53px] w-full items-center gap-3 border-b border-white/[0.07] text-left"
            >
              {/* Outlined yellow number: see-through fill + yellow outline */}
              <span className="w-5 text-lg font-bold text-transparent" style={{ WebkitTextStroke: '1.2px var(--color-brand)' }}>
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-white/85">{text}</span>
              <ArrowRight size={16} className="text-white/70" />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
