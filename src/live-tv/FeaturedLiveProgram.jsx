// The "now playing" block at the top of Live TV: LIVE + viewers, channel, yellow title,
// match picture on the right, time bar, then Watch Now and Full Guide.
//
// Figma (393 wide, measured from the screenshots):
//   text column left (title 18px bold italic, 2 lines), 130×130 picture right · time row 11px · 4px bar
//   Watch Now 109×36 (yellow) and Full Guide 116×36 (dark, thin border), 8px apart
import { Play, List } from 'lucide-react'
import { useNavigate } from 'react-router'
import { watchPath } from '@/helpers/watch-path.js'
import LiveBadge from '@/shared-ui/LiveBadge.jsx'

export default function FeaturedLiveProgram({ program }) {
  const p = program
  const navigate = useNavigate()
  return (
    <section className="px-page">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-2.5">
          <div className="flex items-center gap-2">
            {p.isLive && <LiveBadge />}
            <span className="text-[11px] text-white/55">{p.watching}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <img src={p.channelLogo} alt="" className="h-5 w-[21px] rounded-sm object-cover" />
            <span className="text-[13px] font-semibold">{p.channelName}</span>
            <span className="text-[11px] text-white/15">· {p.channelNumber}</span>
          </div>

          <h2 className="text-lg leading-[26px] font-bold whitespace-nowrap text-brand italic">
            {p.titleLines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h2>
        </div>

        {/* 130px as in Figma; shrinks on phones narrower than 393px so the title keeps its 2 lines */}
        <img src={p.image} alt="" className="size-[min(130px,calc(100vw-263px))] shrink-0 rounded-md object-cover" />
      </div>

      {/* Time row and how far through the programme we are */}
      <div className="mt-[17px] flex justify-between text-[11px] text-white/55">
        <span>{p.startTime}</span>
        <span>{p.remaining}</span>
        <span>{p.endTime}</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#211f1e]">
        <div className="h-full rounded-full bg-brand" style={{ width: `${p.progress * 100}%` }} />
      </div>

      <div className="mt-[18px] flex gap-2">
        <button
          type="button"
          onClick={() => navigate(watchPath('live', p.id, p.title))}
          className="flex h-9 w-[109px] items-center justify-center gap-1.5 rounded-full bg-brand text-[13px] font-semibold text-black"
        >
          <Play size={14} />
          Watch Now
        </button>
        <button
          type="button"
          className="flex h-9 w-[116px] items-center justify-center gap-2 rounded-full border border-white/15 bg-[#1c1a19] text-[13px] font-medium"
        >
          <List size={16} />
          Full Guide
        </button>
      </div>
    </section>
  )
}
