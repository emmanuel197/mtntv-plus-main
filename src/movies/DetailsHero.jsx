// The top of a movie/series details page, ported from WONA's DetailsHero:
// a wide picture behind everything, the poster, then the title, "★ 8.1 | PG-13 | 2024 | 1h 53m",
// genre chips, the description (long ones fold to 3 lines behind "Show More") and the buttons
// (Watch Now · Trailer · + My Stuff).
// Desktop: poster on the left, text beside it; the hero slides up under the navbar.
// Phone: everything stacked and centred, as WONA's phone layout.
import { useState } from 'react'
import { Check, Clapperboard, Play, Plus, Star } from 'lucide-react'

// Descriptions shorter than this show in full, with no "Show More"
const CLAMP_CHARS = 220

// "1h 53m" for movies, "3 Seasons" for series
function lengthLabel(details) {
  if (details.duration) return details.duration
  const count = details.seasons.length
  return count ? `${count} Season${count > 1 ? 's' : ''}` : null
}

// The background picture. A real wide backdrop shows sharp; a poster stand-in is blurred and
// slightly enlarged (so the blurry edges stay off-screen) — a stretched poster looks pixelated.
function Backdrop({ details }) {
  return (
    <img
      src={details.backdrop}
      alt=""
      className={`absolute inset-0 size-full object-cover ${details.hasRealBackdrop ? 'object-top' : 'scale-110 blur-2xl'}`}
    />
  )
}

export function DesktopDetailsHero({ details, inMyStuff, onWatch, onTrailer, onToggleMyStuff }) {
  const [showFull, setShowFull] = useState(false)
  const clampable = details.description.length > CLAMP_CHARS
  const meta = [details.maturity, details.year, lengthLabel(details)].filter(Boolean)

  return (
    // -mt pulls the hero up by the navbar's height, so the picture runs under the see-through navbar
    <section className="relative -mt-[calc(97*var(--d))] w-full overflow-hidden">
      <Backdrop details={details} />
      {/* Shading: dark on the left (behind the text) and fading into the page at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-[#1b1b1b]" />

      <div className="relative flex items-end gap-[calc(48*var(--d))] px-[calc(53*var(--d))] pt-[calc(217*var(--d))] pb-[calc(56*var(--d))]">
        <img
          src={details.image}
          alt={details.title}
          className="aspect-[2/3] w-[calc(320*var(--d))] shrink-0 rounded-[calc(16*var(--d))] border border-white/10 object-cover shadow-2xl"
        />

        <div className="flex flex-col items-start gap-[calc(24*var(--d))]">
          <span className="rounded-full border border-white/30 bg-black/40 px-[calc(16*var(--d))] py-[calc(6*var(--d))] text-[calc(16*var(--d))]">
            {details.type === 'show' ? 'Series' : 'Movie'}
          </span>

          <h1 className="max-w-[calc(1000*var(--d))] text-[calc(56*var(--d))] leading-tight font-bold italic">{details.title}</h1>

          <div className="flex items-center gap-[calc(20*var(--d))] text-[calc(20*var(--d))]">
            {details.rating && (
              <span className="flex items-center gap-[calc(8*var(--d))] text-brand">
                <Star className="size-[calc(24*var(--d))]" fill="currentColor" />
                {details.rating}
              </span>
            )}
            {meta.map((m) => (
              <span key={m} className="flex items-center gap-[calc(20*var(--d))] text-white/85">
                <span className="h-[calc(24*var(--d))] w-px bg-white/40" />
                {m}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-[calc(14*var(--d))]">
            {details.genres.map((g) => (
              <span key={g} className="rounded-full bg-[#262422] px-[calc(18*var(--d))] py-[calc(8*var(--d))] text-[calc(18*var(--d))] capitalize">
                {g}
              </span>
            ))}
          </div>

          {details.description && (
            <div className="flex w-[calc(700*var(--d))] flex-col items-start gap-[calc(8*var(--d))]">
              <p className={`text-[calc(20*var(--d))] leading-[1.45] text-white/80 ${clampable && !showFull ? 'line-clamp-3' : ''}`}>
                {details.description}
              </p>
              {clampable && (
                <button type="button" onClick={() => setShowFull((s) => !s)} className="text-[calc(18*var(--d))] font-medium text-brand hover:underline">
                  {showFull ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
          )}

          <div className="flex items-stretch gap-[calc(16*var(--d))]">
            <button
              type="button"
              onClick={onWatch}
              className="flex h-[calc(55*var(--d))] items-center gap-[calc(10*var(--d))] rounded-full bg-brand px-[calc(26*var(--d))] text-[calc(18*var(--d))] font-medium text-black"
            >
              <span className="flex size-[calc(22*var(--d))] items-center justify-center rounded-full bg-black">
                <Play className="size-[calc(11*var(--d))] text-brand" fill="currentColor" />
              </span>
              Watch Now
            </button>
            <button
              type="button"
              onClick={onTrailer}
              className="flex items-center gap-[calc(8*var(--d))] rounded-full bg-[#535352]/90 px-[calc(22*var(--d))] text-[calc(18*var(--d))] font-medium hover:bg-[#636362]"
            >
              <Clapperboard className="size-[calc(20*var(--d))]" />
              Trailer
            </button>
            <button
              type="button"
              onClick={onToggleMyStuff}
              aria-pressed={inMyStuff}
              className="flex items-center gap-[calc(6*var(--d))] rounded-full bg-[#535352]/90 px-[calc(18*var(--d))] text-[calc(18*var(--d))] font-medium hover:bg-[#636362]"
            >
              {inMyStuff ? <Check className="size-[calc(20*var(--d))]" /> : <Plus className="size-[calc(20*var(--d))]" />}
              {inMyStuff ? 'In My Stuff' : 'My Stuff'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PhoneDetailsHero({ details, inMyStuff, onWatch, onTrailer, onToggleMyStuff }) {
  const [showFull, setShowFull] = useState(false)
  const clampable = details.description.length > CLAMP_CHARS
  const meta = [details.maturity, details.year, lengthLabel(details)].filter(Boolean)

  return (
    <section className="relative w-full overflow-hidden">
      <Backdrop details={details} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-page" />

      {/* pt-24 leaves room for the floating logo bar */}
      <div className="relative flex flex-col items-center gap-4 px-5 pt-24 pb-7 text-center">
        <img src={details.image} alt={details.title} className="aspect-[2/3] w-[150px] rounded-[14px] border border-white/10 object-cover shadow-2xl" />

        <h1 className="text-2xl leading-tight font-bold italic">{details.title}</h1>

        <div className="flex flex-wrap items-center justify-center gap-2.5 text-[13px]">
          {details.rating && (
            <span className="flex items-center gap-1 text-brand">
              <Star size={14} fill="currentColor" />
              {details.rating}
            </span>
          )}
          {meta.map((m) => (
            <span key={m} className="flex items-center gap-2.5 text-white/80">
              <span className="h-3.5 w-px bg-white/40" />
              {m}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {details.genres.map((g) => (
            <span key={g} className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[11px] text-white/85 capitalize">
              {g}
            </span>
          ))}
        </div>

        {details.description && (
          <div className="flex flex-col items-center gap-1.5">
            <p className={`text-[13px] leading-relaxed text-white/80 ${clampable && !showFull ? 'line-clamp-3' : ''}`}>{details.description}</p>
            {clampable && (
              <button type="button" onClick={() => setShowFull((s) => !s)} className="text-[13px] font-medium text-brand">
                {showFull ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        )}

        <div className="flex w-full flex-wrap justify-center gap-2.5">
          <button type="button" onClick={onWatch} className="flex items-center gap-2 rounded-full bg-brand px-[18px] py-2.5 text-[13px] font-medium text-black">
            <Play size={14} fill="currentColor" />
            Watch Now
          </button>
          <button type="button" onClick={onTrailer} className="flex items-center gap-1.5 rounded-full bg-[#535352]/90 px-[18px] py-2.5 text-[13px] font-medium">
            <Clapperboard size={14} />
            Trailer
          </button>
          <button
            type="button"
            onClick={onToggleMyStuff}
            aria-pressed={inMyStuff}
            className="flex items-center gap-1.5 rounded-full bg-[#535352]/90 px-[18px] py-2.5 text-[13px] font-medium"
          >
            {inMyStuff ? <Check size={14} /> : <Plus size={14} />}
            {inMyStuff ? 'In My Stuff' : 'My Stuff'}
          </button>
        </div>
      </div>
    </section>
  )
}
