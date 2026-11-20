// One live channel card on desktop (WONA's LiveChannelCard): logo, channel name + category tag,
// LIVE + programme title, "Next: …", a short progress bar and a reminder bell.
// Used in the "All Live Channels" side list and in the live part of "On Air Today".
// The chosen card gets a yellow border; `striped` gives every second card a faint background.
import { BellDot } from 'lucide-react'
import DesktopLiveBadge from './DesktopLiveBadge.jsx'

export default function DesktopChannelCard({ channel: c, selected = false, striped = false, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start gap-[calc(18*var(--d))] rounded-[calc(12*var(--d))] border p-[calc(22*var(--d))] text-left transition-colors ${
        selected ? 'border-brand bg-white/10' : `border-transparent hover:bg-white/10 ${striped ? 'bg-white/5' : ''}`
      }`}
    >
      <img src={c.logo} alt={c.channel} className="size-[calc(64*var(--d))] shrink-0 rounded-[calc(8*var(--d))] object-cover" />

      <div className="flex min-w-0 flex-1 flex-col gap-[calc(6*var(--d))]">
        <div className="flex items-center gap-[calc(10*var(--d))]">
          <span className="text-[calc(12*var(--d))] text-white/60">{c.channel}</span>
          <span className="rounded-[calc(6*var(--d))] bg-white/10 px-[calc(8*var(--d))] py-[calc(2*var(--d))] text-[calc(10*var(--d))] text-white/80">
            {c.category}
          </span>
        </div>
        <div className="flex items-center gap-[calc(8*var(--d))]">
          {c.isLive && <DesktopLiveBadge />}
          <span className="min-w-0 text-[calc(14*var(--d))] leading-snug font-semibold">{c.title}</span>
        </div>
        <span className="text-[calc(12*var(--d))] text-white/60">{c.nextIsPlain ? c.next : `Next: ${c.next}`}</span>
        <div className="mt-[calc(2*var(--d))] h-[calc(3*var(--d))] w-[calc(150*var(--d))] overflow-hidden rounded-full bg-white/15">
          {/* Yellow while the channel is live, grey when not (same as the phone list) */}
          <div className={`h-full rounded-full ${c.isLive ? 'bg-brand' : 'bg-white/55'}`} style={{ width: `${c.progress * 100}%` }} />
        </div>
      </div>

      <BellDot strokeWidth={1.6} className={`size-[calc(18*var(--d))] shrink-0 ${selected ? 'text-brand' : 'text-white/70'}`} />
    </button>
  )
}
