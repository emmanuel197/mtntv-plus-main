// One comment: avatar, @handle (yellow) + time, the text, then "ago · ♥ likes · Reply".
// Figma: avatar 30px, handle 11px semibold yellow, text 12px, small line 10px grey, red heart.
import { Heart } from 'lucide-react'

export default function CommentItem({ comment: c, liked, onLike, onReply }) {
  return (
    <div className="flex gap-2.5">
      <img src={c.avatar} alt="" className="size-[30px] shrink-0 rounded-full object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[11px] font-semibold text-brand">{c.handle}</span>
          <span className="shrink-0 text-[10px] text-white/55">{c.time}</span>
        </div>
        <p className="mt-0.5 text-xs leading-snug break-words">{c.text}</p>
        <div className="mt-1 flex items-center gap-3 text-[10px] text-white/55">
          <span>{c.ago}</span>
          {/* Figma shows a filled red heart on every comment; once you like it, the count turns red and goes up by 1 */}
          <button type="button" onClick={onLike} aria-pressed={liked} className={`flex items-center gap-1 ${liked ? 'font-semibold text-[#ef4444]' : ''}`}>
            <Heart size={10} fill="currentColor" className="text-[#ef4444]" />
            {c.likes + (liked ? 1 : 0)}
          </button>
          <button type="button" onClick={onReply}>Reply</button>
        </div>
      </div>
    </div>
  )
}
