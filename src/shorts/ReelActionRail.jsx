// The column of yellow buttons on the right of a reel: creator (follow), like, comments, share, save.
// Figma: 44px yellow circles with white icons, labels 10px bold under them, 23px from the right edge.
import { Heart, MessageSquare, Share2, ArrowDown, Check, Plus } from 'lucide-react'
import { formatCount } from './format-count.js'

// "On" buttons (liked, saved) swap colours: dark circle, yellow ring and yellow icon.
function RailButton({ label, onClick, ariaLabel, pressed, children }) {
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} aria-pressed={pressed} className="flex flex-col items-center gap-1">
      <span
        className={`flex size-11 items-center justify-center rounded-full transition-colors ${
          pressed ? 'border-2 border-brand bg-black/60 text-brand' : 'bg-brand text-white'
        }`}
      >
        {children}
      </span>
      <span className="text-[10px] leading-3 font-bold">{label}</span>
    </button>
  )
}

export default function ReelActionRail({ reel, liked, likeCount, following, saved, onFollow, onLike, onComments, onShare, onSave }) {
  return (
    <div className="flex flex-col items-center gap-[21px]">
      {/* Creator: plain yellow circle in Figma (their photo goes here once the server sends one);
          the badge shows + (not following) or ✓ (following) */}
      <button type="button" onClick={onFollow} aria-label={following ? 'Unfollow' : 'Follow'} className="relative mb-[-6px] size-11">
        {reel.creatorAvatar ? (
          <img src={reel.creatorAvatar} alt="" className="size-full rounded-full object-cover" />
        ) : (
          <span className="block size-full rounded-full bg-brand" />
        )}
        <span className="absolute -bottom-1 left-1/2 flex size-3.5 -translate-x-1/2 items-center justify-center rounded-full bg-white text-black">
          {following ? <Check size={9} strokeWidth={3} /> : <Plus size={9} strokeWidth={3} />}
        </span>
      </button>

      <RailButton label={formatCount(likeCount)} onClick={onLike} ariaLabel="Like" pressed={liked}>
        <Heart size={20} fill="currentColor" />
      </RailButton>
      <RailButton label={formatCount(reel.commentCount)} onClick={onComments} ariaLabel="Comments">
        <MessageSquare size={19} />
      </RailButton>
      <RailButton label="Share" onClick={onShare} ariaLabel="Share">
        <Share2 size={19} />
      </RailButton>
      <RailButton label={saved ? 'Saved' : 'Save'} onClick={onSave} ariaLabel="Save to My Stuff" pressed={saved}>
        {saved ? <Check size={20} strokeWidth={2.5} /> : <ArrowDown size={20} />}
      </RailButton>
    </div>
  )
}
