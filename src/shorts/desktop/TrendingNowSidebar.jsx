// "Trending Now" in the desktop Shorts sidebar (WONA's TrendingNowSidebar): small yellow bar,
// 22px bold italic title, an arrow, then the trending cards 16 design pixels apart.
import { ChevronRight } from 'lucide-react'
import TrendingListItem from './TrendingListItem.jsx'

export default function TrendingNowSidebar({ items }) {
  return (
    <section className="flex flex-col gap-[calc(12*var(--d))]">
      <div className="flex items-center gap-[calc(8*var(--d))]">
        <span aria-hidden className="h-[calc(16*var(--d))] w-[calc(3*var(--d))] rounded-full bg-brand" />
        <h3 className="flex-1 text-[calc(22*var(--d))] font-bold italic">Trending Now</h3>
        {/* No "all trending" page yet, so the arrow is only a picture for now */}
        <ChevronRight aria-hidden className="size-[calc(22*var(--d))] text-white/80" />
      </div>

      <div className="flex flex-col gap-[calc(16*var(--d))]">
        {items.map((item) => (
          <TrendingListItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
