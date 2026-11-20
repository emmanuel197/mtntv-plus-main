// The big LIVE reel card on the Shorts page. Figma: full width inside the margins, 194px tall,
// 2px yellow border, LIVE badge top-left, creator + title bottom-left, views bottom-right.
import { Link } from 'react-router'
import LiveBadge from '@/shared-ui/LiveBadge.jsx'

export default function LiveReelCard({ reel }) {
  return (
    <Link to={`/shorts/${reel.id}`} className="relative mx-page block h-[194px] overflow-hidden rounded-2xl border-2 border-brand">
      <img src={reel.image} alt="" className="size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <LiveBadge className="absolute top-3 left-4" />
      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-brand">
            <span className="size-5 rounded-full bg-[#3fb04a]" />
            {reel.handle}
          </p>
          <p className="mt-1 truncate text-[13px] font-medium">{reel.title}</p>
        </div>
        <span className="shrink-0 text-[11px] text-white/80">{reel.views}</span>
      </div>
    </Link>
  )
}
