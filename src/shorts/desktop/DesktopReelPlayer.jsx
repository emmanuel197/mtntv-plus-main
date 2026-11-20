// The desktop (web) reel player at /shorts/<id> — WONA's ShortsPlayerPage layout in MTN TV+ colours:
//   back button top-left · the 9:16 reel card in the middle with the yellow button column beside it
//   · ↑ ↓ arrows near the right edge · creator, caption and hashtags at the bottom-left.
// The comment button opens the comments as a panel on the right (Figma "Comment Section - Desktop"),
// reusing the phone comment pieces. Writing a comment needs an account: signed-out people get the
// "Join the conversation" sheet inside that panel.
// Like, double-click like, follow, save and share work without an account (useReelActions.js,
// shared with the phone player). Wheel and ↑ ↓ keys change reel; Esc closes what's open, then goes back.
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import SignInPrompt from '@/sign-in-and-sign-up/SignInPrompt.jsx'
import ReelActionRail from '../ReelActionRail.jsx'
import ReelToast from '../ReelToast.jsx'
import ShareReelSheet from '../ShareReelSheet.jsx'
import UnfollowDialog from '../UnfollowDialog.jsx'
import CommentsSheet from '../comments/CommentsSheet.jsx'
import { useReelSwipe } from '../useReelSwipe.js'
import { useReelActions } from '../useReelActions.js'
import { myAvatar } from '../shorts-sample-data.js'
import ReelPlayerCard from './ReelPlayerCard.jsx'
import ReelCaptionPanel from './ReelCaptionPanel.jsx'
import ReelNavArrows from './ReelNavArrows.jsx'

export default function DesktopReelPlayer({ reel, prevReel, nextReel, goPrev, goNext, goBack }) {
  const actions = useReelActions(reel)
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const cardRef = useRef(null)
  const pageRef = useRef(null)

  // While a panel or pop-up is open, the wheel and arrow keys leave the reel alone
  // (so scrolling the comment list doesn't jump to another reel)
  const somethingOpen = commentsOpen || shareOpen || actions.askUnfollow || actions.showSignIn

  const swipe = useReelSwipe({
    canNext: Boolean(nextReel),
    canPrev: Boolean(prevReel),
    onNext: goNext,
    onPrev: goPrev,
    onDoubleTap: actions.likeByDoubleTap,
    disabled: somethingOpen,
    // One reel slides exactly one card height (the phone slides a whole screen)
    getDistance: () => cardRef.current?.offsetHeight ?? window.innerHeight,
  })

  // The wheel changes reel, so stop it from also scrolling the page (the card would slide out of view).
  // React's onWheel can't do this (browsers treat wheel listeners as "passive"), so we add our own.
  // While the comments panel or a pop-up is open, the wheel scrolls normally.
  useEffect(() => {
    if (somethingOpen) return
    const page = pageRef.current
    const stopScroll = (e) => e.preventDefault()
    page.addEventListener('wheel', stopScroll, { passive: false })
    return () => page.removeEventListener('wheel', stopScroll)
  }, [somethingOpen])

  // Esc closes the top-most thing that is open; with nothing open it goes back (WONA)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (actions.showSignIn) actions.closeSignIn()
      else if (shareOpen) setShareOpen(false)
      else if (actions.askUnfollow) actions.cancelUnfollow()
      else if (commentsOpen) setCommentsOpen(false)
      else goBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    // onWheel here so scrolling anywhere on the player (not only over the card) changes reel
    <div ref={pageRef} className="relative overflow-hidden bg-[#1b1b1b]" onWheel={swipe.handlers.onWheel}>
      {/* Soft yellow glow behind the card */}
      <span aria-hidden className="pointer-events-none absolute top-[calc(200*var(--d))] left-1/2 size-[calc(600*var(--d))] -translate-x-1/2 rounded-full bg-brand/10 blur-[calc(180*var(--d))]" />

      <button
        type="button"
        onClick={goBack}
        aria-label="Back to Shorts"
        className="absolute top-[calc(49*var(--d))] left-[calc(53*var(--d))] z-10 flex size-[calc(40*var(--d))] items-center justify-center rounded-full border border-brand/80 bg-white/10 text-brand hover:bg-brand hover:text-black"
      >
        <ChevronLeft className="size-[calc(20*var(--d))]" />
      </button>

      {/* The card with the button column beside it, centred on the page */}
      <div className="relative flex items-center justify-center gap-[calc(40*var(--d))] pt-[calc(49*var(--d))] pb-[calc(64*var(--d))]">
        <ReelPlayerCard
          reel={reel}
          prevReel={prevReel}
          nextReel={nextReel}
          swipe={swipe}
          cardRef={cardRef}
          onDoubleLike={actions.likeByDoubleTap}
          burstShowing={actions.burstShowing}
          burstKey={actions.burstKey}
          onEnded={() => nextReel && swipe.next()}
        >
          {actions.toast && (
            <div className="absolute inset-x-[calc(16*var(--d))] bottom-[calc(64*var(--d))] z-20">
              <ReelToast initial={reel.creatorInitial} title={actions.toast.title} subtitle={actions.toast.subtitle} onClose={actions.closeToast} />
            </div>
          )}
        </ReelPlayerCard>

        <ReelActionRail
          desktop
          reel={{ ...reel, commentCount: actions.commentCount }}
          liked={actions.liked}
          likeCount={actions.likeCount}
          following={actions.following}
          saved={actions.saved}
          onFollow={actions.handleFollow}
          onLike={actions.toggleLike}
          onComments={() => setCommentsOpen((open) => !open)}
          onShare={() => setShareOpen(true)}
          onSave={actions.handleSave}
        />
      </div>

      {/* ↑ ↓ arrows; hidden while the comments panel is open (it takes that side of the page) */}
      {!commentsOpen && (
        <ReelNavArrows
          onUp={swipe.prev}
          onDown={swipe.next}
          showUp={Boolean(prevReel)}
          showDown={Boolean(nextReel)}
          className="absolute top-1/2 right-[calc(64*var(--d))] -translate-y-1/2"
        />
      )}

      <ReelCaptionPanel
        reel={reel}
        following={actions.following}
        onFollow={actions.handleFollow}
        className="absolute bottom-[calc(64*var(--d))] left-[calc(53*var(--d))] z-10"
      />

      {commentsOpen && (
        // Same height and top as the card (747 = 420 wide at 9:16).
        // The transform makes this box the frame for the sign-in sheet (which is `position: fixed`),
        // so the sheet opens inside the comments panel instead of across the whole screen.
        <div className="absolute top-[calc(49*var(--d))] right-[calc(53*var(--d))] z-20 h-[calc(747*var(--d))] w-[calc(460*var(--d))] min-w-[300px] overflow-hidden rounded-[calc(20*var(--d))] [transform:translateZ(0)]">
          <CommentsSheet
            panel
            reel={reel}
            myAvatar={myAvatar}
            requireSignIn={actions.requireSignIn}
            onClose={() => setCommentsOpen(false)}
            onCountChange={actions.addComments}
          />
          {actions.showSignIn && <SignInPrompt onClose={actions.closeSignIn} />}
        </div>
      )}

      {actions.askUnfollow && (
        <UnfollowDialog className="fixed" creator={reel.creator} onCancel={actions.cancelUnfollow} onConfirm={actions.confirmUnfollow} />
      )}

      {shareOpen && <ShareReelSheet desktop reel={reel} likeCount={actions.likeCount} onClose={() => setShareOpen(false)} />}
    </div>
  )
}
