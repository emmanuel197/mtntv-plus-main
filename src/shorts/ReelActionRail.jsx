// The column of yellow buttons beside a reel: creator (follow), like, comments, share, save.
// Figma (phone): 44px yellow circles with white icons, labels 10px bold under them, 23px from the right edge.
// `desktop` draws the same buttons in design pixels (56px circles, 14px labels) for the web player,
// where the column stands next to the reel card instead of on top of it (WONA layout).
import { Heart, MessageSquare, Share2, ArrowDown, Check, Plus } from 'lucide-react'
import { formatCount } from './format-count.js'

// Sizes for each version. Phone values are the original Figma pixels.
const SIZES = {
  phone: {
    column: 'gap-[21px]',
    creator: 'mb-[-6px] size-11',
    badge: 'size-3.5',
    circle: 'size-11',
    label: 'text-[10px] leading-3',
    labelGap: 'gap-1',
  },
  desktop: {
    column: 'gap-[calc(24*var(--d))]',
    creator: 'mb-[calc(-6*var(--d))] size-[calc(56*var(--d))]',
    badge: 'size-[calc(18*var(--d))]',
    circle: 'size-[calc(56*var(--d))]',
    label: 'text-[calc(14*var(--d))] leading-none',
    labelGap: 'gap-[calc(6*var(--d))]',
  },
}

// "On" buttons (liked, saved) swap colours: dark circle, yellow ring and yellow icon.
function RailButton({ label, onClick, ariaLabel, pressed, sizes, children }) {
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} aria-pressed={pressed} className={`flex flex-col items-center ${sizes.labelGap}`}>
      <span
        className={`flex items-center justify-center rounded-full transition-colors ${sizes.circle} ${
          pressed ? 'border-2 border-brand bg-black/60 text-brand' : 'bg-brand text-white'
        }`}
      >
        {children}
      </span>
      <span className={`font-bold ${sizes.label}`}>{label}</span>
    </button>
  )
}

export default function ReelActionRail({ reel, liked, likeCount, following, saved, onFollow, onLike, onComments, onShare, onSave, desktop = false }) {
  const sizes = desktop ? SIZES.desktop : SIZES.phone
  // Phone icons use fixed pixel sizes; desktop icons use a design-pixel class (it overrides `size`)
  const icon = (px) => (desktop ? { className: 'size-[calc(24*var(--d))]' } : { size: px })
  const badgeIcon = desktop ? { className: 'size-[calc(12*var(--d))]' } : { size: 9 }

  return (
    <div className={`flex flex-col items-center ${sizes.column}`}>
      {/* Creator: plain yellow circle in Figma (their photo goes here once the server sends one);
          the badge shows + (not following) or ✓ (following) */}
      <button type="button" onClick={onFollow} aria-label={following ? 'Unfollow' : 'Follow'} className={`relative ${sizes.creator}`}>
        {reel.creatorAvatar ? (
          <img src={reel.creatorAvatar} alt="" className="size-full rounded-full object-cover" />
        ) : (
          <span className="block size-full rounded-full bg-brand" />
        )}
        <span className={`absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-black ${sizes.badge}`}>
          {following ? <Check {...badgeIcon} strokeWidth={3} /> : <Plus {...badgeIcon} strokeWidth={3} />}
        </span>
      </button>

      <RailButton sizes={sizes} label={formatCount(likeCount)} onClick={onLike} ariaLabel="Like" pressed={liked}>
        <Heart {...icon(20)} fill="currentColor" />
      </RailButton>
      <RailButton sizes={sizes} label={formatCount(reel.commentCount)} onClick={onComments} ariaLabel="Comments">
        <MessageSquare {...icon(19)} />
      </RailButton>
      <RailButton sizes={sizes} label="Share" onClick={onShare} ariaLabel="Share">
        <Share2 {...icon(19)} />
      </RailButton>
      <RailButton sizes={sizes} label={saved ? 'Saved' : 'Save'} onClick={onSave} ariaLabel="Save to My Stuff" pressed={saved}>
        {saved ? <Check {...icon(20)} strokeWidth={2.5} /> : <ArrowDown {...icon(20)} />}
      </RailButton>
    </div>
  )
}
