// One tile in the desktop "For You" grid (WONA's ShortGridTile): 245 wide, 285 (tall) or 207 (short)
// design pixels, 20 rounded corners, duration pill top-right, title (20, 2 lines) + views (16) over
// the bottom of the picture. The picture zooms a little on hover.
import { Link } from 'react-router'

export default function ShortGridTile({ item, tall }) {
  return (
    <Link
      to={`/shorts/${item.id}`}
      className={`group relative block w-[calc(245*var(--d))] overflow-hidden rounded-[calc(20*var(--d))] ${
        tall ? 'h-[calc(285*var(--d))]' : 'h-[calc(207*var(--d))]'
      }`}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* Two dark shades so the white text stays readable on bright pictures */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-[calc(120*var(--d))] bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

      <span className="absolute top-[calc(9*var(--d))] right-[calc(12*var(--d))] rounded-full bg-black/60 px-[calc(10*var(--d))] py-[calc(6*var(--d))] text-[calc(12*var(--d))] leading-none font-semibold">
        {item.duration}
      </span>

      <div className="absolute inset-x-[calc(16*var(--d))] bottom-[calc(20*var(--d))] flex flex-col gap-[calc(10*var(--d))]">
        <span className="line-clamp-2 text-[calc(20*var(--d))] leading-[1.2] font-semibold text-white/95">{item.title}</span>
        <span className="line-clamp-1 text-[calc(16*var(--d))] leading-none text-white/55">{item.views}</span>
      </div>
    </Link>
  )
}
