// What Search shows before you've typed 2 characters.
//   Landing (box not active, empty): Top 5 Trending Searches + Browse By Categories — the Figma landing.
//   Typing (box active, or 1 character): the "Type 2+ characters" hint and Recent Searches appear on top
//   — the Figma edge case (and WONA's "recent shows while the bar is active").
//
// Figma: section titles 17px bold italic; recent rows 50px apart with a clock; "See More" after 3;
// trending rows 53px apart with yellow outlined numbers and an arrow; categories in 3 columns.
import { useState } from 'react'
import { Clock, X, ChevronDown, Info } from 'lucide-react'
import TrendingSearches from './TrendingSearches.jsx'

const RECENT_SHOWN = 3

export default function SearchLanding({ typing, recent, onRemoveRecent, onClearRecent, trending, categories, onPick }) {
  const [showAllRecent, setShowAllRecent] = useState(false)
  const visibleRecent = showAllRecent ? recent : recent.slice(0, RECENT_SHOWN)

  return (
    // Pressing anywhere here would normally take the cursor out of the search box first, which would
    // fold Recent Searches away before the tap lands. preventDefault on mousedown keeps the cursor in the box.
    <div onMouseDown={(e) => typing && e.target.closest('button') && e.preventDefault()}>
      {typing && (
        <p className="mb-4 flex items-center gap-1.5 px-1 text-[11px] text-brand/85">
          <Info size={13} />
          Type 2+ characters to see suggestions
        </p>
      )}

      {typing && recent.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold italic">Recent Searches</h2>
            <button type="button" onClick={onClearRecent} className="text-xs font-semibold text-brand">
              Clear All
            </button>
          </div>
          <div className="mt-1">
            {visibleRecent.map((text) => (
              <div key={text} className="flex h-[50px] items-center gap-3">
                <Clock size={16} className="shrink-0 text-white/60" />
                <button type="button" onClick={() => onPick(text)} className="min-w-0 flex-1 truncate text-left text-sm text-white/80">
                  {text}
                </button>
                {/* Remove one (from AfriPlay's "Remove recent searches" screen) */}
                <button type="button" onClick={() => onRemoveRecent(text)} aria-label={`Remove ${text}`} className="text-white/40 hover:text-white">
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
          {recent.length > RECENT_SHOWN && (
            <button
              type="button"
              onClick={() => setShowAllRecent((v) => !v)}
              className="mx-auto flex items-center gap-1 py-2 text-xs font-semibold text-brand"
            >
              {showAllRecent ? 'See Less' : 'See More'}
              <ChevronDown size={14} className={showAllRecent ? 'rotate-180' : ''} />
            </button>
          )}
          <div className="mt-2 border-t border-white/10" />
        </section>
      )}

      <TrendingSearches trending={trending} onPick={onPick} />

      <section className="mt-6">
        <h2 className="text-[17px] font-bold italic">Browse By Categories</h2>
        <div className="mt-3 grid grid-cols-3 gap-[9px]">
          {categories.map((c) => (
            <button key={c.id} type="button" onClick={() => onPick(c.label)} className="relative aspect-[111/116] overflow-hidden rounded-md">
              <img src={c.image} alt="" loading="lazy" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 text-sm font-bold">{c.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
