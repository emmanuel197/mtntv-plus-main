// Card in "Live on MTN TV+ Now". Figma: 157×95, red LIVE badge top-left,
// channel + programme name at the bottom, thin progress bar along the bottom edge.
import LiveBadge from '@/shared-ui/LiveBadge.jsx'

export default function LiveNowCard({ image, background, channel, title, progress }) {
  return (
    <div className="relative h-[95px] w-[157px] shrink-0 overflow-hidden rounded-md" style={{ background }}>
      {image && <img src={image} alt="" loading="lazy" className="size-full object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75" />

      <LiveBadge className="absolute top-2.5 left-2.5" />

      <div className="absolute inset-x-2 bottom-3">
        <p className="truncate text-[10px] leading-tight text-muted">{channel}</p>
        <p className="truncate text-sm leading-tight font-bold">{title}</p>
      </div>

      {/* how far into the programme we are */}
      <div className="absolute inset-x-2 bottom-1 h-[3px] overflow-hidden rounded-full bg-[#efe5f7]">
        <div className="h-full bg-progress" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  )
}
