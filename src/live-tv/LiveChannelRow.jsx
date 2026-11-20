// One channel in the list: logo, channel name + category tag, LIVE + programme,
// "Next: …", progress bar, and a reminder bell on the right.
// The selected row gets a lighter background, a 3px yellow left edge and a yellow bell.
//
// Figma: logo 44×44 · text 11/14/11px · bar 220×3 · rows edge-to-edge with thin dim-gold lines.
import { BellDot } from 'lucide-react'
import LiveBadge from '@/shared-ui/LiveBadge.jsx'

// Tag colours per category, sampled from the screenshots
const TAG_COLOURS = {
  Sports: 'bg-[#36300a] text-[#e3cf7f]',
  News: 'bg-[#2e0200] text-[#f0a19a]',
  Entertainment: 'bg-[#2b1236] text-[#d7a8f0]',
  Movies: 'bg-[#3b0d14] text-[#f2a7b0]',
  Kids: 'bg-[#101d24] text-[#9fc3d6]',
}

export default function LiveChannelRow({ channel: c, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-2 border-y border-[#342906] py-3 pr-[25px] text-left ${
        selected ? 'border-l-[3px] border-l-brand bg-white/[0.05] pl-[19px]' : 'pl-[22px]'
      }`}
    >
      <img src={c.logo} alt={c.channel} className="size-11 shrink-0 rounded-lg object-cover" />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] leading-[14px] text-white/60">{c.channel}</span>
          <span className={`rounded-full px-1.5 text-[8px] leading-[14px] ${TAG_COLOURS[c.category] ?? TAG_COLOURS.Sports}`}>
            {c.category}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {c.isLive && <LiveBadge />}
          <span className="truncate text-sm leading-[18px] font-bold">{c.title}</span>
        </div>

        <span className="truncate text-[11px] leading-[14px] text-white/80">
          {c.nextIsPlain ? c.next : `Next: ${c.next}`}
        </span>

        <div className="h-[3px] w-[220px] max-w-full overflow-hidden rounded-full bg-white/15">
          <div
            className={`h-full ${c.isLive ? 'bg-brand' : 'bg-white/55'}`}
            style={{ width: `${c.progress * 100}%` }}
          />
        </div>
      </div>

      <BellDot size={20} strokeWidth={1.6} className={`shrink-0 ${selected ? 'text-brand' : 'text-white'}`} />
    </button>
  )
}
