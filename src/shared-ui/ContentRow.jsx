// A titled row that scrolls sideways ("Because You Watched", "Trending Now", …).
// Shared: Home uses it now; Search, Live TV and detail pages will reuse it.
//
// Figma: title row 30px tall (18px bold italic text), 12px gap, then the cards.
// The row starts at the 23px page margin and runs off the right edge, so you can tell it scrolls.
import { ChevronRight } from 'lucide-react'

export default function ContentRow({ title, icon, arrow, gap = 10, children }) {
  return (
    <section>
      <div className="flex h-[30px] items-center justify-between px-page">
        <h2 className="flex items-center gap-1.5 text-lg leading-[22px] font-bold italic">
          {icon}
          {title}
        </h2>
        {/* arrow: 'bright' or 'dim' (Figma shows both), or leave it out for no arrow */}
        {arrow && <ChevronRight size={22} className={arrow === 'dim' ? 'text-white/25' : 'text-text'} />}
      </div>
      <div className="no-scrollbar mt-3 flex overflow-x-auto px-page" style={{ gap }}>
        {children}
      </div>
    </section>
  )
}
