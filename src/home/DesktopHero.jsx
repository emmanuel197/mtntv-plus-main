// The big banner at the top of the desktop Home page (MTN TV+ web design; sizes from WONA's hero).
// Full-width picture, darkened on the left and at the bottom; at the bottom-left: tag, title art,
// "★ 8.6 | TV-MA | 2016", genre chips, description, Watch Now and + My Stuff. Dots bottom-right.
// Changes slide every 8 seconds. Height: the design's 1117/1728 shape, but never taller than the window.
// All sizes are design pixels (var(--d)) of the 1728px design.
import { useEffect, useState } from 'react'
import { Play, Plus, Star, Check } from 'lucide-react'

const SLIDE_SECONDS = 8

export default function DesktopHero({ slides }) {
  const [index, setIndex] = useState(0)
  const [inMyStuff, setInMyStuff] = useState({}) // which slides were added to My Stuff
  const slide = slides[index]

  useEffect(() => {
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_SECONDS * 1000)
    return () => clearTimeout(timer)
  }, [index, slides.length])

  const added = inMyStuff[slide.id]

  return (
    <section className="relative h-[min(calc(1117*var(--d)),100vh)] w-full overflow-hidden">
      <img key={slide.id} src={slide.backdrop} alt="" className="absolute inset-0 size-full object-cover object-top" />
      {/* Shading: dark on the left (behind the text) and fading into the page at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#1b1b1b]" />

      <div className="absolute bottom-[calc(69*var(--d))] left-1/2 flex w-[calc(1622*var(--d))] -translate-x-1/2 items-end justify-between">
        <div className="flex flex-col items-start gap-[calc(24*var(--d))]">
          <span className="rounded-full border border-white/30 bg-[#221d2f]/80 px-[calc(16*var(--d))] py-[calc(6*var(--d))] text-[calc(16*var(--d))]">
            {slide.tag}
          </span>

          {slide.titleArt ? (
            <img src={slide.titleArt} alt={slide.title} className="h-[calc(136*var(--d))] w-[calc(375*var(--d))] object-contain object-left" />
          ) : (
            <h1 className="text-[calc(56*var(--d))] leading-tight font-bold italic">{slide.title}</h1>
          )}

          <div className="flex items-center gap-[calc(20*var(--d))] text-[calc(20*var(--d))]">
            <span className="flex items-center gap-[calc(8*var(--d))] text-brand">
              <Star className="size-[calc(24*var(--d))]" fill="currentColor" />
              {slide.rating}
            </span>
            <span className="h-[calc(24*var(--d))] w-px bg-white/40" />
            <span className="text-white/85">{slide.maturity}</span>
            <span className="h-[calc(24*var(--d))] w-px bg-white/40" />
            <span className="text-white/85">{slide.year}</span>
          </div>

          <div className="flex items-center gap-[calc(14*var(--d))]">
            {slide.genres.map((g) => (
              <span key={g} className="rounded-full bg-[#262422] px-[calc(18*var(--d))] py-[calc(8*var(--d))] text-[calc(18*var(--d))]">
                {g}
              </span>
            ))}
          </div>

          <p className="w-[calc(624*var(--d))] text-[calc(20*var(--d))] leading-[1.45] text-white/80">{slide.description}</p>

          <div className="flex items-stretch gap-[calc(16*var(--d))]">
            <button
              type="button"
              className="flex h-[calc(55*var(--d))] items-center gap-[calc(10*var(--d))] rounded-full bg-brand px-[calc(26*var(--d))] text-[calc(18*var(--d))] font-medium text-black"
            >
              <span className="flex size-[calc(22*var(--d))] items-center justify-center rounded-full bg-black">
                <Play className="size-[calc(11*var(--d))] text-brand" fill="currentColor" />
              </span>
              Watch Now
            </button>
            <button
              type="button"
              onClick={() => setInMyStuff((s) => ({ ...s, [slide.id]: !s[slide.id] }))}
              className="flex items-center gap-[calc(6*var(--d))] rounded-full bg-[#535352]/90 px-[calc(18*var(--d))] text-[calc(18*var(--d))] font-medium"
            >
              {added ? <Check className="size-[calc(20*var(--d))]" /> : <Plus className="size-[calc(20*var(--d))]" />}
              {added ? 'In My Stuff' : 'My Stuff'}
            </button>
          </div>
        </div>

        {/* Slide dots: the current one is a yellow pill */}
        <div className="flex items-center gap-[calc(8*var(--d))]">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Show ${s.title}`}
              onClick={() => setIndex(i)}
              className={`h-[calc(10*var(--d))] rounded-full transition-all ${i === index ? 'w-[calc(40*var(--d))] bg-brand' : 'w-[calc(10*var(--d))] bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
