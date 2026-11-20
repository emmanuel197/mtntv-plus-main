// What the comment sheet shows when a reel has no comments yet.
// Figma: golden circle with a yellow "•••" bubble and little sparkles, title, two lines, "Comment First".
import { Sparkle, ArrowDown } from 'lucide-react'

export default function NoComments({ onCommentFirst }) {
  return (
    <div className="flex flex-col items-center px-8 pt-8 text-center">
      <div className="relative flex size-[142px] items-center justify-center rounded-full bg-[#544b2d]/80">
        <span className="flex h-8 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#ffe27a] to-brand text-lg leading-none font-bold tracking-wider text-white">
          •••
        </span>
        {/* decorations */}
        <Sparkle size={12} fill="currentColor" className="absolute top-3 right-8 text-brand" />
        <Sparkle size={8} fill="currentColor" className="absolute top-12 left-2 text-brand" />
        <span className="absolute top-7 right-5 size-1.5 rounded-full bg-brand/70" />
        <span className="absolute bottom-9 left-6 size-0 border-x-[6px] border-b-[10px] border-x-transparent border-b-brand/70" />
        <span className="absolute right-7 bottom-8 size-0 border-x-[5px] border-t-[8px] border-x-transparent border-t-brand/60" />
      </div>

      <h3 className="mt-5 text-base font-bold">No comments yet</h3>
      <p className="mt-1 text-xs text-white/60">
        Be the first to share your thoughts
        <br />
        and start the conversation
      </p>
      <span className="mt-2 h-px w-10 bg-brand/40" />
      <button type="button" onClick={onCommentFirst} className="mt-3 h-[34px] rounded-full bg-brand px-4 text-xs font-semibold text-black">
        Comment First
      </button>
      <p className="mt-3 flex items-center gap-1 text-[9px] text-brand">
        <ArrowDown size={9} /> or type below
      </p>
    </div>
  )
}
