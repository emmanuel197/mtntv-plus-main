// Wide card in "Keep Watching". Figma: 199×127, play button in the middle, title + progress text at the bottom.
import { Play } from 'lucide-react'

export default function KeepWatchingCard({ image, title, progressText }) {
  return (
    <div className="relative h-[127px] w-[199px] shrink-0 overflow-hidden rounded-lg bg-surface">
      <img src={image} alt="" loading="lazy" className="size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/85" />
      <span className="absolute top-[45px] left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm">
        <Play size={14} fill="currentColor" />
      </span>
      <div className="absolute inset-x-2 bottom-2">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="text-[10px] leading-none text-muted">{progressText}</p>
      </div>
    </div>
  )
}
