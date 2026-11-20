// Card in the Shorts "Trending Now" row. Figma: 110×130, yellow rank circle top-left, title + views at the bottom.
import { Link } from 'react-router'

export default function TrendingShortCard({ item }) {
  return (
    <Link to={`/shorts/${item.id}`} className="relative block h-[130px] w-[110px] shrink-0 overflow-hidden rounded-xl">
      <img src={item.image} alt="" loading="lazy" className="size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <span className="absolute top-2 left-2 flex size-[22px] items-center justify-center rounded-full bg-[#d4c901] text-xs font-semibold text-black">
        {item.rank}
      </span>
      <div className="absolute inset-x-2 bottom-2">
        <p className="line-clamp-2 text-[11px] leading-tight font-semibold">{item.title}</p>
        <p className="mt-0.5 text-[10px] text-white/80">{item.views}</p>
      </div>
    </Link>
  )
}
