// The big banner at the top of Home: blurred background, round poster, tag, title, genres,
// carousel dots, Watch Now and "+" (add to list). It changes slide every 6 seconds.
//
// Figma (393×624 frame, minus the phone's 47px clock bar = 577px tall):
//   category tabs 58px from top · round poster 253px, 90px from top
//   then a column with 12px between items: tag pill 26 · title art 60 · genres 16 · dots 8 · buttons 36
import { useEffect, useState } from 'react'
import { Play, Plus } from 'lucide-react'
import CategoryTabs from '@/shared-ui/CategoryTabs.jsx'

const SLIDE_SECONDS = 6
// Dots after the active one fade out, as in Figma
const DOT_OPACITY = [0.7, 0.55, 0.4, 0.25, 0.12]

export default function HomeHero({ slides }) {
  const [index, setIndex] = useState(0)
  const [category, setCategory] = useState('All')
  const slide = slides[index]

  // Move to the next slide every few seconds. Restarts the timer when the slide changes,
  // so tapping a dot gives that slide its full time.
  useEffect(() => {
    if (slides.length < 2) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_SECONDS * 1000)
    return () => clearTimeout(timer)
  }, [index, slides.length])

  return (
    <section className="relative h-[577px] overflow-hidden">
      {/* Background: the same poster, blown up and blurred, darkened, fading to black at the bottom */}
      <img src={slide.image} alt="" className="absolute inset-0 size-full scale-125 object-cover blur-2xl" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black" />

      {/* Category tabs (the logo bar above them comes from the page frame) */}
      <div className="absolute top-[58px] left-page">
        <CategoryTabs selected={category} onSelect={setCategory} />
      </div>

      {/* Centre column */}
      <div className="absolute inset-x-0 top-[90px] flex flex-col items-center gap-3">
        <img src={slide.image} alt={slide.title} className="size-[253px] rounded-full object-cover object-top" />

        {slide.tag && (
          <span className="flex h-[26px] items-center rounded-full border border-[#a78622] bg-black/25 px-2.5 text-xs">
            {slide.tag}
          </span>
        )}

        <div className="flex h-[60px] items-center">
          {slide.titleArt ? (
            // title art is a see-through picture of the title lettering
            <img src={slide.titleArt} alt={slide.title} className="h-[60px]" />
          ) : (
            <h2 className="text-3xl font-bold italic">{slide.title}</h2>
          )}
        </div>

        <p className="flex h-4 items-center gap-2 text-xs font-bold italic">
          {slide.genres.map((genre, i) => (
            <span key={genre} className="flex items-center gap-2">
              {i > 0 && <span className="size-1 rounded-full bg-brand" />}
              {genre}
            </span>
          ))}
        </p>

        <div className="flex h-2 items-center gap-1">
          {slides.map((s, i) => {
            const isActive = i === index
            const distance = (i - index + slides.length) % slides.length
            return (
              <button
                key={s.id}
                type="button"
                aria-label={`Show ${s.title}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${isActive ? 'w-7 bg-brand' : 'w-2 bg-white'}`}
                style={isActive ? undefined : { opacity: DOT_OPACITY[distance - 1] ?? 0.12 }}
              />
            )
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="flex h-9 w-[106px] items-center justify-center gap-1.5 rounded-full bg-brand text-sm font-bold text-black italic"
          >
            <Play size={12} fill="currentColor" />
            Watch Now
          </button>
          <button
            type="button"
            aria-label="Add to my list"
            className="flex size-9 items-center justify-center rounded-full bg-white/30 backdrop-blur-md"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
