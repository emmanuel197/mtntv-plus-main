// The reel's words at the bottom-left of the desktop player, outside the card (WONA's ReelCaptionPanel):
// creator letter + @handle + Follow pill, the caption, yellow hashtags, and the audio line.
// Follow works the same as on the phone (toast; unfollow asks first) — the page passes it in.
import { Disc3 } from 'lucide-react'

export default function ReelCaptionPanel({ reel, following, onFollow, className = '' }) {
  return (
    <div className={`flex max-w-[calc(400*var(--d))] flex-col gap-[calc(12*var(--d))] ${className}`}>
      <div className="flex items-center gap-[calc(10*var(--d))]">
        <span className="flex size-[calc(28*var(--d))] items-center justify-center rounded-full bg-brand text-[calc(16*var(--d))] font-bold text-black">
          {reel.creatorInitial}
        </span>
        <span className="text-[calc(20*var(--d))] font-bold italic">{reel.creator}</span>
        <button
          type="button"
          onClick={onFollow}
          className={`h-[calc(32*var(--d))] rounded-full border border-brand px-[calc(14*var(--d))] text-[calc(14*var(--d))] font-semibold italic ${
            following ? 'bg-brand text-black' : 'text-brand hover:bg-brand/10'
          }`}
        >
          {following ? 'Following' : 'Follow'}
        </button>
      </div>

      <p className="text-[calc(16*var(--d))] leading-snug text-white/90">{reel.caption}</p>

      <p className="flex flex-wrap gap-x-[calc(10*var(--d))] text-[calc(14*var(--d))] font-bold text-brand italic">
        {reel.hashtags.map((tag) => <span key={tag}>{tag}</span>)}
      </p>
      <p className="flex items-center gap-[calc(6*var(--d))] text-[calc(14*var(--d))] text-white/80">
        <Disc3 className="size-[calc(16*var(--d))] text-brand" />
        {reel.audio}
      </p>
    </div>
  )
}
