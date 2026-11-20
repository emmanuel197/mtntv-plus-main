// One card in the desktop "Trending Now" sidebar list (WONA's TrendingListItem): full sidebar width,
// 150 design pixels tall, yellow rank circle top-left, title (18) + views (14) over the bottom.
import { Link } from 'react-router'

export default function TrendingListItem({ item }) {
  return (
    <Link to={`/shorts/${item.id}`} className="group relative block h-[calc(150*var(--d))] w-full shrink-0 overflow-hidden rounded-[calc(14*var(--d))]">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <span className="absolute top-[calc(9*var(--d))] left-[calc(10*var(--d))] flex size-[calc(30*var(--d))] items-center justify-center rounded-full bg-brand text-[calc(16*var(--d))] font-bold text-black">
        {item.rank}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[calc(2*var(--d))] bg-gradient-to-t from-black/85 via-black/35 to-transparent px-[calc(12*var(--d))] pt-[calc(36*var(--d))] pb-[calc(10*var(--d))]">
        <span className="line-clamp-2 text-[calc(18*var(--d))] leading-tight font-semibold">{item.title}</span>
        <span className="text-[calc(14*var(--d))] leading-none text-muted">{item.views} views</span>
      </div>
    </Link>
  )
}
