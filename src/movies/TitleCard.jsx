// A poster you can click to open that title's details page (/movie/<id> or /series/<id>).
// Desktop: looks like Home's poster (320×441 design pixels, title + year on hover, optional big
// yellow Top-10 number). Phone: a plain poster with rounded corners.
// `fill` makes the desktop card stretch to its grid cell instead of a fixed size.
import { Link } from 'react-router'
import { Play } from 'lucide-react'
import { detailsPath } from '@/helpers/details-path.js'

const d = (n) => `calc(${n} * var(--d))`

export function DesktopTitleCard({ item, rank, fill = false, width = 320, height = 441 }) {
  return (
    <Link
      to={detailsPath(item)}
      className="group relative block shrink-0 overflow-hidden rounded-[calc(10*var(--d))] bg-surface"
      // in a grid the card takes the cell's width and keeps the poster shape
      style={fill ? { aspectRatio: `${width} / ${height}` } : { width: d(width), height: d(height) }}
    >
      <img src={item.image} alt={item.title} loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />

      {rank && (
        <span
          className="absolute -bottom-[calc(14*var(--d))] left-0 text-[calc(150*var(--d))] leading-none font-extrabold text-brand"
          style={{ WebkitTextStroke: `${d(2)} rgb(0 0 0 / 0.5)` }}
        >
          {rank}
        </span>
      )}

      {/* Shows on hover: title, "2024 · 1h 53m" and a play circle */}
      <div className="absolute inset-x-0 bottom-0 flex h-[calc(170*var(--d))] items-end justify-between gap-[calc(10*var(--d))] bg-gradient-to-b from-transparent to-black/85 px-[calc(17*var(--d))] pb-[calc(24*var(--d))] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="flex min-w-0 flex-col gap-[calc(5*var(--d))]">
          <h3 className="truncate text-[calc(20*var(--d))] leading-[calc(27*var(--d))] font-semibold">{item.title}</h3>
          <p className="text-[calc(15*var(--d))] leading-none text-white/65">{item.metadata}</p>
        </div>
        <span className="flex size-[calc(39*var(--d))] shrink-0 items-center justify-center rounded-full bg-brand text-black">
          <Play className="size-[calc(15*var(--d))]" fill="currentColor" />
        </span>
      </div>
    </Link>
  )
}

export function PhoneTitleCard({ item, width = 120, height = 176, fill = false }) {
  return (
    <Link
      to={detailsPath(item)}
      className="block shrink-0 overflow-hidden rounded-md bg-surface"
      style={fill ? { aspectRatio: `${width} / ${height}` } : { width, height }}
    >
      <img src={item.image} alt={item.title} loading="lazy" className="size-full object-cover" />
    </Link>
  )
}
