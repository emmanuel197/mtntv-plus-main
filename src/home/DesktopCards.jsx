// The cards in the desktop Home rows (sizes are design pixels of the 1728px design, from WONA):
//   ShortCircle 227 round · WideCard 330×179 (Keep Watching / Live On Tv Now) · PosterCard 320×441
//   (hover shows title, info, Play and +; optional big rank number) · GenreCard 330×155 · ChannelCard 331×191.
import { Link } from 'react-router'
import { Play, Plus, Check } from 'lucide-react'
import { detailsPath } from '@/helpers/details-path.js'
import { useIsInMyStuff, toggleMyStuff } from '@/my-account/my-stuff-store.js'

const d = (n) => `calc(${n} * var(--d))`

export function ShortCircle({ item }) {
  return (
    <Link to={`/shorts/${item.id}`} className="relative shrink-0" style={{ width: d(227), height: d(227) }}>
      <img src={item.image} alt="" className="size-full rounded-full border-2 border-brand/60 object-cover" />
      <span className="absolute bottom-[calc(9*var(--d))] left-1/2 -translate-x-1/2 rounded-full bg-brand px-[calc(10*var(--d))] py-[calc(3*var(--d))] text-[calc(12*var(--d))] font-bold text-black">
        {item.duration}
      </span>
    </Link>
  )
}

// Keep Watching (yellow progress, play circle) and Live On Tv Now (LIVE badge, red progress)
export function WideCard({ item, live = false }) {
  return (
    <div className="relative shrink-0 overflow-hidden rounded-[calc(10*var(--d))]" style={{ width: d(330), height: d(179) }}>
      <img src={item.image} alt="" loading="lazy" className="size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      {live ? (
        <span className="absolute top-[calc(10*var(--d))] left-[calc(10*var(--d))] flex items-center gap-[calc(5*var(--d))] rounded-full bg-live px-[calc(9*var(--d))] py-[calc(3*var(--d))] text-[calc(11*var(--d))] font-bold">
          <span className="size-[calc(5*var(--d))] rounded-full bg-white" />
          LIVE
        </span>
      ) : null}
      <span className="absolute top-1/2 left-1/2 flex size-[calc(34*var(--d))] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/20 opacity-80">
        <Play className="size-[calc(14*var(--d))]" fill="currentColor" />
      </span>
      <div className="absolute inset-x-[calc(10*var(--d))] bottom-[calc(18*var(--d))] flex flex-col gap-[calc(5*var(--d))]">
        <span className="truncate text-[calc(18*var(--d))] leading-none font-semibold">{item.title}</span>
        {item.subtitle && <span className="truncate text-[calc(14*var(--d))] leading-none text-white/65">{item.subtitle}</span>}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[calc(6*var(--d))] bg-white/20">
        <div className={`h-full ${live ? 'bg-progress' : 'bg-brand'}`} style={{ width: `${item.progress * 100}%` }} />
      </div>
    </div>
  )
}

// Poster with a hover panel (title, "2024 · 1h 53m", Play and +). `rank` adds the big yellow Top-10 number.
// Clicking it opens the title's details page; "+" adds it to / removes it from My Stuff.
export function PosterCard({ item, rank, width = 320, height = 441 }) {
  const saved = useIsInMyStuff(item.id)
  return (
    <Link
      to={detailsPath(item)}
      className="group relative shrink-0 overflow-hidden rounded-[calc(10*var(--d))]"
      style={{ width: d(width), height: d(height) }}
    >
      <img src={item.image} alt={item.title} loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />

      {rank && (
        <span
          className="absolute -bottom-[calc(14*var(--d))] left-0 text-[calc(150*var(--d))] leading-none font-extrabold text-brand"
          style={{ WebkitTextStroke: `${d(2)} rgb(0 0 0 / 0.5)` }}
        >
          {rank}
        </span>
      )}

      {/* Shows on hover (mouse over the poster) */}
      <div className="absolute inset-x-0 bottom-0 flex h-[calc(170*var(--d))] items-end justify-between bg-gradient-to-b from-transparent to-black/80 px-[calc(17*var(--d))] pb-[calc(24*var(--d))] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="flex max-w-[calc(131*var(--d))] flex-col gap-[calc(5*var(--d))]">
          <h3 className="truncate text-[calc(20*var(--d))] leading-[calc(27*var(--d))] font-semibold">{item.title}</h3>
          <p className="text-[calc(15*var(--d))] leading-none text-white/65">{item.metadata}</p>
        </div>
        <div className="flex items-end gap-[calc(10*var(--d))]">
          {/* "Play" is part of the link (opens the details page, where Watch Now is) */}
          <span className="flex items-center gap-[calc(5*var(--d))] rounded-full bg-[#80650e] px-[calc(17*var(--d))] py-[calc(10*var(--d))] text-[calc(15*var(--d))] font-medium">
            <Play className="size-[calc(14*var(--d))]" fill="currentColor" />
            Play
          </span>
          <button
            type="button"
            aria-label={saved ? 'Remove from My Stuff' : 'Add to My Stuff'}
            aria-pressed={saved}
            onClick={(e) => {
              e.preventDefault() // stay on this page: don't also follow the poster's link
              toggleMyStuff(item)
            }}
            className="flex size-[calc(39*var(--d))] items-center justify-center rounded-full bg-[#80650e]"
          >
            {saved ? <Check className="size-[calc(16*var(--d))]" /> : <Plus className="size-[calc(16*var(--d))]" />}
          </button>
        </div>
      </div>
    </Link>
  )
}

// Opens the Movies page filtered to this genre
export function GenreCard({ item }) {
  return (
    <Link
      to={`/movies?category=${item.id}`}
      className="relative shrink-0 overflow-hidden rounded-[calc(10*var(--d))]"
      style={{ width: d(330), height: d(155) }}
    >
      <img src={item.image} alt="" loading="lazy" className="size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      <span className="absolute bottom-[calc(14*var(--d))] left-[calc(14*var(--d))] text-[calc(18*var(--d))] font-semibold">{item.label}</span>
    </Link>
  )
}

export function ChannelCard({ item }) {
  return (
    <Link
      to="/live-tv"
      className="relative shrink-0 overflow-hidden rounded-[calc(10*var(--d))] border border-live/60"
      style={{ width: d(331), height: d(191) }}
    >
      <img src={item.image} alt={item.title} loading="lazy" className="size-full object-cover" />
      <span className="absolute top-[calc(10*var(--d))] left-[calc(11*var(--d))] size-[calc(12*var(--d))] rounded-full bg-gradient-to-b from-live to-[#731811]" />
    </Link>
  )
}
