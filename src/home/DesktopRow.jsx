// One titled row on the desktop Home page: title (28px bold italic, design pixels) with an optional
// badge or icon, an arrow on the right, then the cards scrolling sideways. 30px between title and cards.
// The row runs off the right edge of the screen (only the left side has the 53px margin), so you can
// see there is more to scroll. The arrow scrolls the row one screen-width to the right.
import { useRef } from 'react'
import { ChevronRight } from 'lucide-react'

export default function DesktopRow({ title, before, after, gap = 23, showArrow = true, children }) {
  const strip = useRef(null)
  const scrollRight = () => strip.current?.scrollBy({ left: strip.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <section className="flex flex-col gap-[calc(30*var(--d))]">
      <div className="flex items-center justify-between pr-[calc(53*var(--d))]">
        <h2 className="flex items-center gap-[calc(12*var(--d))] text-[calc(28*var(--d))] font-bold italic">
          {before}
          {title}
          {after}
        </h2>
        {showArrow && (
          <button type="button" onClick={scrollRight} aria-label={`More ${title}`} className="text-white hover:text-brand">
            <ChevronRight className="size-[calc(28*var(--d))]" />
          </button>
        )}
      </div>
      <div ref={strip} className="no-scrollbar flex overflow-x-auto pr-[calc(53*var(--d))]" style={{ gap: `calc(${gap} * var(--d))` }}>
        {children}
      </div>
    </section>
  )
}
