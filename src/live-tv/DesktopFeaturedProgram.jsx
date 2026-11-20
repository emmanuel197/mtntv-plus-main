// The big "now playing" block at the top of the desktop Live TV page (WONA's FeaturedLiveProgram).
// Left: LIVE + viewers, channel, yellow title, the score (for a match), time bar, Watch Now and Full Guide.
// Right: the programme picture. A staged channel without a picture shows its logo on a dark panel instead.
//
// WONA sizes (design px): block 549 tall, 24 corners, 40 padding, 74 between text and picture;
// title 30 · channel logo 48 · flags 45 · score 44 · time row 16 · bar 4 · buttons 18 text.
import { Play, List } from 'lucide-react'
import DesktopLiveBadge from './DesktopLiveBadge.jsx'

export default function DesktopFeaturedProgram({ program: p, onWatchNow, onFullGuide }) {
  return (
    <div className="flex h-[calc(549*var(--d))] w-full items-center gap-[calc(74*var(--d))] overflow-hidden rounded-[calc(24*var(--d))] bg-[#1f1b19] p-[calc(40*var(--d))]">
      <div className="flex min-w-0 flex-1 flex-col gap-[calc(24*var(--d))]">
        <div className="flex items-center gap-[calc(16*var(--d))]">
          {p.isLive && <DesktopLiveBadge />}
          {p.watching && <span className="text-[calc(18*var(--d))] text-white/60">{p.watching}</span>}
        </div>

        <div className="flex items-center gap-[calc(10*var(--d))]">
          <img src={p.channelLogo} alt="" className="size-[calc(48*var(--d))] rounded-[calc(6*var(--d))] object-contain" />
          <span className="text-[calc(18*var(--d))] font-medium text-white/60">{p.channelLabel}</span>
        </div>

        <h2 className="text-[calc(30*var(--d))] leading-[1.23] font-bold text-brand italic">
          {p.titleLines.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </h2>

        {/* Scoreboard, only for a match: flag + name on each side, score and match minute in the middle */}
        {p.teamA && p.teamB && (
          <div className="flex items-center gap-[calc(59*var(--d))]">
            <div className="flex flex-col items-center gap-[calc(10*var(--d))]">
              <img src={p.teamA.flag} alt="" className="size-[calc(45*var(--d))]" />
              <span className="text-[calc(16*var(--d))]">{p.teamA.name}</span>
            </div>
            <div className="flex flex-col items-center gap-[calc(8*var(--d))]">
              <span className="flex items-center gap-[calc(30*var(--d))] text-[calc(44*var(--d))] leading-none font-semibold">
                {p.teamA.score}
                <span className="text-[calc(56*var(--d))] font-medium text-white/60">-</span>
                <span className="text-white/60">{p.teamB.score}</span>
              </span>
              <span className="rounded-full border border-live bg-live/15 px-[calc(12*var(--d))] py-[calc(4*var(--d))] text-[calc(16*var(--d))] font-semibold text-[#f97066]">
                {p.minute}
              </span>
            </div>
            <div className="flex flex-col items-center gap-[calc(10*var(--d))]">
              <img src={p.teamB.flag} alt="" className="size-[calc(45*var(--d))]" />
              <span className="text-[calc(16*var(--d))] text-white/60">{p.teamB.name}</span>
            </div>
          </div>
        )}

        <div className="flex w-full flex-col gap-[calc(13*var(--d))]">
          <div className="flex items-center justify-between text-[calc(16*var(--d))] text-white/60">
            <span>{p.startTime}</span>
            <span>{p.remaining}</span>
            <span>{p.endTime}</span>
          </div>
          <div className="h-[calc(4*var(--d))] w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-brand" style={{ width: `${p.progress * 100}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-[calc(16*var(--d))] pt-[calc(8*var(--d))]">
          <button
            type="button"
            onClick={onWatchNow}
            className="flex items-center gap-[calc(8*var(--d))] rounded-full bg-brand px-[calc(28*var(--d))] py-[calc(16*var(--d))] text-[calc(18*var(--d))] font-semibold text-black hover:bg-brand/90"
          >
            <Play className="size-[calc(20*var(--d))]" fill="currentColor" />
            Watch Now
          </button>
          <button
            type="button"
            onClick={onFullGuide}
            className="flex items-center gap-[calc(8*var(--d))] rounded-full border border-white/15 bg-[#262422] px-[calc(28*var(--d))] py-[calc(16*var(--d))] text-[calc(18*var(--d))] font-medium hover:bg-[#33302d]"
          >
            <List className="size-[calc(20*var(--d))]" />
            Full Guide
          </button>
        </div>
      </div>

      {p.image ? (
        <img src={p.image} alt="" className="h-full w-[calc(450*var(--d))] shrink-0 rounded-[calc(16*var(--d))] object-cover" />
      ) : (
        // No programme picture yet (the server will send one later): show the channel logo instead
        <div className="flex h-full w-[calc(450*var(--d))] shrink-0 items-center justify-center rounded-[calc(16*var(--d))] bg-[#262422]">
          <img src={p.channelLogo} alt="" className="size-[calc(160*var(--d))] rounded-[calc(16*var(--d))] object-cover" />
        </div>
      )}
    </div>
  )
}
