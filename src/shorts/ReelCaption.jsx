// The text at the bottom of a reel: creator + Follow, caption, progress bar with times, hashtags, audio.
// Figma: handle 17px bold italic, caption 11px, 3px bar with a white dot, hashtags 13px bold italic yellow.
import { Disc3 } from 'lucide-react'

export default function ReelCaption({ reel, following, onFollow }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-[17px] font-bold italic">{reel.creator}</span>
        <span className="flex size-4 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-black">
          {reel.creatorInitial}
        </span>
        <button
          type="button"
          onClick={onFollow}
          className={`h-[22px] rounded-full border border-brand px-2.5 text-xs font-semibold italic ${
            following ? 'bg-brand text-black' : 'text-brand'
          }`}
        >
          {following ? 'Following' : 'Follow'}
        </button>
      </div>

      <p className="mt-1.5 text-[11px]">{reel.caption}</p>

      {/* How far the reel has played. Still pictures for now, so this is fixed sample progress. */}
      <div className="relative mt-3 h-[3px] rounded-full bg-white/40">
        <div className="h-full rounded-full bg-brand" style={{ width: `${reel.progress * 100}%` }} />
        <span className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" style={{ left: `${reel.progress * 100}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-white/80">
        <span>{reel.currentTime}</span>
        <span>{reel.totalTime}</span>
      </div>

      <p className="mt-1 flex gap-2.5 text-[13px] font-bold text-brand italic">
        {reel.hashtags.map((tag) => <span key={tag}>{tag}</span>)}
      </p>
      <p className="mt-1 flex items-center gap-1 text-[10px] text-white/80">
        <Disc3 size={11} className="text-brand" />
        {reel.audio}
      </p>
    </div>
  )
}
