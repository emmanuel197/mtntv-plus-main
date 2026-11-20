// The big LIVE reel card at the top of the desktop Shorts sidebar (WONA's LiveReelBanner):
// 380×286 design pixels, 20 rounded corners, 2px yellow border (the phone LIVE card has one too),
// red LIVE pill top-left, yellow creator handle + title bottom-left, views bottom-right.
import { Link } from 'react-router'

export default function LiveReelBanner({ reel }) {
  return (
    <Link
      to={`/shorts/${reel.id}`}
      className="group relative block h-[calc(286*var(--d))] w-full overflow-hidden rounded-[calc(20*var(--d))] border-2 border-brand"
    >
      <img
        src={reel.image}
        alt={reel.title}
        className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black" />

      <span className="absolute top-[calc(16*var(--d))] left-[calc(20*var(--d))] flex items-center gap-[calc(6*var(--d))] rounded-full bg-live px-[calc(10*var(--d))] py-[calc(4*var(--d))] text-[calc(12*var(--d))] leading-none font-bold">
        <span className="size-[calc(6*var(--d))] rounded-full bg-white" />
        LIVE
      </span>

      <div className="absolute inset-x-[calc(20*var(--d))] bottom-[calc(24*var(--d))] flex items-end justify-between gap-[calc(16*var(--d))]">
        <div className="flex min-w-0 flex-col gap-[calc(4*var(--d))]">
          <span className="text-[calc(14*var(--d))] font-semibold text-brand">{reel.handle}</span>
          <span className="line-clamp-2 text-[calc(16*var(--d))] leading-snug font-semibold">{reel.title}</span>
        </div>
        <span className="shrink-0 text-[calc(14*var(--d))] text-muted">{reel.views}</span>
      </div>
    </Link>
  )
}
