// The "Episodes" part of the series details page, ported from WONA's SeriesDetailsPage:
// a season picker (‹ Season 1/3 ›) and the list of that season's episodes.
// Tapping an episode calls onPlay (for now that shows "Player coming soon").
// Desktop: one wide row per episode (number, picture, title, length, description).
// Phone: one card per episode (picture with "E1 · Title" on it, description under it),
// like WONA's phone episode cards.
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

// ‹ Season 2/3 › — the arrows go dim at the first and last season
function SeasonStepper({ seasons, seasonIndex, onChange, desktop }) {
  if (seasons.length < 2) return null
  const arrow = desktop
    ? 'flex size-[calc(40*var(--d))] items-center justify-center rounded-full bg-white/10 hover:bg-white/15 disabled:opacity-30'
    : 'flex size-8 items-center justify-center rounded-full bg-white/10 disabled:opacity-30'
  const icon = desktop ? 'size-[calc(22*var(--d))]' : 'size-4'
  return (
    <div className={`flex items-center ${desktop ? 'gap-[calc(12*var(--d))]' : 'gap-2'}`}>
      <button type="button" disabled={seasonIndex === 0} onClick={() => onChange(seasonIndex - 1)} aria-label="Previous season" className={arrow}>
        <ChevronLeft className={icon} />
      </button>
      <span className={`whitespace-nowrap text-white/80 ${desktop ? 'text-[calc(18*var(--d))]' : 'text-xs'}`}>
        Season {seasons[seasonIndex].number}/{seasons.length}
      </span>
      <button
        type="button"
        disabled={seasonIndex === seasons.length - 1}
        onClick={() => onChange(seasonIndex + 1)}
        aria-label="Next season"
        className={arrow}
      >
        <ChevronRight className={icon} />
      </button>
    </div>
  )
}

export function DesktopEpisodeList({ seasons, seasonIndex, onSeasonChange, onPlay }) {
  if (seasons.length === 0) return null
  const episodes = seasons[seasonIndex].episodes
  return (
    <section className="flex flex-col gap-[calc(24*var(--d))] pr-[calc(53*var(--d))]">
      <div className="flex items-center gap-[calc(24*var(--d))]">
        <h2 className="text-[calc(28*var(--d))] font-bold italic">Episodes</h2>
        <SeasonStepper seasons={seasons} seasonIndex={seasonIndex} onChange={onSeasonChange} desktop />
        <span className="ml-auto text-[calc(18*var(--d))] text-muted">{episodes.length} Episodes</span>
      </div>

      <div className="flex flex-col gap-[calc(12*var(--d))]">
        {episodes.map((ep) => (
          <button
            key={ep.id}
            type="button"
            onClick={() => onPlay(ep)}
            className="group flex w-full items-center gap-[calc(24*var(--d))] rounded-[calc(12*var(--d))] bg-white/5 px-[calc(20*var(--d))] py-[calc(14*var(--d))] text-left transition-colors hover:bg-white/10"
          >
            <span className="w-[calc(36*var(--d))] shrink-0 text-[calc(24*var(--d))] font-bold text-brand italic">{ep.number}</span>
            <span className="relative h-[calc(100*var(--d))] w-[calc(260*var(--d))] shrink-0 overflow-hidden rounded-[calc(8*var(--d))]">
              <img src={ep.image} alt="" loading="lazy" className="size-full object-cover" />
              {/* play circle appears on hover */}
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex size-[calc(40*var(--d))] items-center justify-center rounded-full bg-brand text-black">
                  <Play className="size-[calc(16*var(--d))]" fill="currentColor" />
                </span>
              </span>
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-[calc(6*var(--d))]">
              <span className="flex items-baseline justify-between gap-[calc(16*var(--d))]">
                <span className="truncate text-[calc(20*var(--d))] font-medium">{ep.title}</span>
                <span className="shrink-0 text-[calc(16*var(--d))] text-muted">{ep.duration}</span>
              </span>
              <span className="line-clamp-2 text-[calc(16*var(--d))] text-white/60">{ep.description}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export function PhoneEpisodeList({ seasons, seasonIndex, onSeasonChange, onPlay }) {
  if (seasons.length === 0) return null
  const episodes = seasons[seasonIndex].episodes
  return (
    <section className="flex flex-col gap-4 px-page">
      <div className="flex items-center justify-between gap-2.5">
        <h2 className="text-lg leading-[22px] font-bold italic">Episodes</h2>
        <SeasonStepper seasons={seasons} seasonIndex={seasonIndex} onChange={onSeasonChange} />
      </div>
      <span className="-mt-2 text-xs text-muted">{episodes.length} Episodes</span>

      {episodes.map((ep) => (
        <button
          key={ep.id}
          type="button"
          onClick={() => onPlay(ep)}
          className="flex w-full flex-col gap-3 rounded-[10px] border border-white/10 p-3 text-left"
        >
          <span className="relative block h-[110px] w-full overflow-hidden rounded-[5px]">
            <img src={ep.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
            <span className="absolute inset-x-0 bottom-0 flex h-[61px] items-end justify-between bg-gradient-to-b from-transparent to-black/70 px-2.5 pb-2">
              <span className="truncate text-xs font-medium">{`E${ep.number} · ${ep.title}`}</span>
              <span className="shrink-0 text-[10px] text-white/70">{ep.duration}</span>
            </span>
          </span>
          <span className="text-xs leading-[1.45] text-white/60">{ep.description}</span>
        </button>
      ))}
    </section>
  )
}
