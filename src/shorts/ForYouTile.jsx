// Tile in the "For You" grid. Figma: column width, 197px (tall) or 141px (short),
// duration pill top-right, title + views bottom-left.
import { Link } from 'react-router'

export default function ForYouTile({ item, tall }) {
  return (
    <Link
      to={`/shorts/${item.id}`}
      className={`relative block w-full overflow-hidden rounded-xl ${tall ? 'h-[197px]' : 'h-[141px]'}`}
    >
      <img src={item.image} alt="" loading="lazy" className="size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <span className="absolute top-2 right-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[9px] font-semibold">{item.duration}</span>
      <div className="absolute inset-x-2.5 bottom-2.5">
        <p className="line-clamp-2 text-[11px] leading-tight font-semibold">{item.title}</p>
        <p className="mt-0.5 text-[10px] text-white/80">{item.views}</p>
      </div>
    </Link>
  )
}
