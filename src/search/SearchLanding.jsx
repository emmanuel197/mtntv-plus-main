// What Search shows while the box is tapped but fewer than 2 characters are typed (AfriPlay's view):
// Recent Searches (5 shown, × to remove, See More), Top 5 Trending Searches, Browse By Categories.
// The "Type 2+ characters to see suggestions" hint (MTN TV+ edge case) appears once 1 character is typed.
//
// Section titles 17px bold italic; recent rows 50px apart with a clock; trending rows 53px apart.
import { useState } from 'react'
import { Clock, X, ChevronRight, ChevronUp, Info } from 'lucide-react'
import TrendingSearches from './TrendingSearches.jsx'

const RECENT_SHOWN = 5

export default function SearchLanding({ showHint, recent, onRemoveRecent, onClearRecent, trending, categories, onPick }) {
  const [showAllRecent, setShowAllRecent] = useState(false)
  const visibleRecent = showAllRecent ? recent : recent.slice(0, RECENT_SHOWN)

  return (
    // Pressing anywhere here would normally take the cursor out of the search box first, which would
    // fold Recent Searches away before the tap lands. preventDefault on mousedown keeps the cursor in the box.
    <div onMouseDown={(e) => e.target.closest('button') && e.preventDefault()}>
      {showHint && (
        <p className="mb-4 flex items-center gap-1.5 px-1 text-[11px] text-brand/85">
          <Info size={13} />
          Type 2+ characters to see suggestions
        </p>
      )}

      {/* Desktop: Recent and Trending sit side by side */}
      <div className="md:grid md:grid-cols-2 md:gap-[calc(64*var(--d))]">
      {recent.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold italic md:text-[calc(28*var(--d))]">Recent Searches</h2>
            <button type="button" onClick={onClearRecent} className="text-xs font-semibold text-brand">
              Clear All
            </button>
          </div>
          <div className="mt-1">
            {visibleRecent.map((text) => (
              <div key={text} className="flex h-[50px] items-center gap-3 md:h-[calc(56*var(--d))]">
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
              {showAllRecent ? <ChevronUp size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
          <div className="mt-2 border-t border-white/10" />
        </section>
      )}

      <TrendingSearches trending={trending} onPick={onPick} />
      </div>

      <section className="mt-6 md:mt-[calc(48*var(--d))]">
        <h2 className="text-[17px] font-bold italic md:text-[calc(28*var(--d))]">Browse By Categories</h2>
        <div className="mt-3 grid grid-cols-3 gap-[9px] md:mt-[calc(20*var(--d))] md:grid-cols-5 md:gap-[calc(24*var(--d))]">
          {categories.map((c) => (
            <button key={c.id} type="button" onClick={() => onPick(c.label)} className="relative aspect-[111/116] overflow-hidden rounded-md">
              <img src={c.image} alt="" loading="lazy" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 text-sm font-bold md:bottom-[calc(16*var(--d))] md:left-[calc(16*var(--d))] md:text-[calc(22*var(--d))]">{c.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
