// The full-screen reel player at /shorts/<id>.
//   - swipe up/down (or wheel / arrow keys) for the next/previous reel
//   - double-tap or the heart to like (WONA's burst, in yellow), follow (+ toast, unfollow asks first),
//     save (+ toast), share — these work for everyone, like WONA's player
//   - the controls fade after 3.5 s without a touch and come back on the next touch (WONA)
//   - the comment button opens the comment sheet; the reel shrinks to a card at the top.
//     Writing a comment needs an account: signed-out people get "Join the conversation" (Figma)
//
// Figma (status bar removed): top bar 19px from the top · chips at 77px · button column 23px from
// the right, 220px from the bottom · caption block just above the tab bar.
import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { ChevronLeft, ChevronUp, Ellipsis } from 'lucide-react'
import { isSignedIn } from '@/sign-in-and-sign-up/session.js'
import SignInPrompt from '@/sign-in-and-sign-up/SignInPrompt.jsx'
import ReelActionRail from './ReelActionRail.jsx'
import ReelCaption from './ReelCaption.jsx'
import ReelToast from './ReelToast.jsx'
import ShareReelSheet from './ShareReelSheet.jsx'
import LikeBurst from './LikeBurst.jsx'
import CommentsSheet from './comments/CommentsSheet.jsx'
import { useReelSwipe } from './useReelSwipe.js'
import { reelFor, reelQueue, myAvatar } from './shorts-sample-data.js'

const CHIPS = ['For You', 'Trending', 'Sports', 'Movies']

export default function ShortsPlayerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const reel = reelFor(id)
  if (!reel) return <Navigate to="/shorts" replace />

  const index = reelQueue.indexOf(id)
  const prevId = index > 0 ? reelQueue[index - 1] : null
  const nextId = index >= 0 && index < reelQueue.length - 1 ? reelQueue[index + 1] : null

  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/shorts'))

  // key={id}: a new reel gets a fresh ReelScreen, so likes/follow/comments reset per reel
  return (
    <ReelScreen
      key={id}
      reel={reel}
      prevReel={prevId && reelFor(prevId)}
      nextReel={nextId && reelFor(nextId)}
      goPrev={() => navigate(`/shorts/${prevId}`, { replace: true })}
      goNext={() => navigate(`/shorts/${nextId}`, { replace: true })}
      goBack={goBack}
    />
  )
}

function ReelScreen({ reel, prevReel, nextReel, goPrev, goNext, goBack }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(reel.likes)
  const [following, setFollowing] = useState(false)
  const [askUnfollow, setAskUnfollow] = useState(false)
  const [saved, setSaved] = useState(false)
  const [chip, setChip] = useState('For You')
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [commentCount, setCommentCount] = useState(reel.commentCount)
  const [showSignIn, setShowSignIn] = useState(false)
  const [shareOpen, setShareOpen] = useState(false) // sharing doesn't need an account
  const [toast, setToast] = useState(null)
  const [burstKey, setBurstKey] = useState(0) // a new number each time the burst should play
  const [burstShowing, setBurstShowing] = useState(false)
  const [controlsShowing, setControlsShowing] = useState(true)
  const timers = useRef({})

  // Clear any running timers when leaving this reel
  useEffect(() => () => Object.values(timers.current).forEach(clearTimeout), [])

  // Controls (top bar, chips, caption, swipe hint) fade after 3.5 s without a touch; any touch brings
  // them back. The button column stays, as in WONA.
  const showControls = () => {
    setControlsShowing(true)
    clearTimeout(timers.current.controls)
    timers.current.controls = setTimeout(() => setControlsShowing(false), 3500)
  }
  useEffect(() => {
    showControls()
    // Esc goes back (WONA)
    const onKey = (e) => e.key === 'Escape' && goBack()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once when the reel opens
  }, [])

  // Returns true if signed in; otherwise opens the sign-in prompt and returns false.
  // Only writing comments asks for an account (the Figma "Join the conversation" screen).
  const requireSignIn = () => {
    if (isSignedIn()) return true
    setShowSignIn(true)
    return false
  }

  const showToast = (title, subtitle) => {
    setToast({ title, subtitle })
    clearTimeout(timers.current.toast)
    timers.current.toast = setTimeout(() => setToast(null), 3000)
  }

  const playBurst = () => {
    setBurstKey((k) => k + 1)
    setBurstShowing(true)
    clearTimeout(timers.current.burst)
    timers.current.burst = setTimeout(() => setBurstShowing(false), 900)
  }

  const setLike = (next) => {
    setLiked(next)
    setLikeCount(reel.likes + (next ? 1 : 0))
  }
  // The heart button likes and unlikes; the burst plays only when it becomes liked
  const toggleLike = () => {
    if (!liked) playBurst()
    setLike(!liked)
  }
  // Double-tap always plays the burst and only ever likes (never unlikes) — WONA
  const likeByDoubleTap = () => {
    playBurst()
    setLike(true)
  }

  const handleFollow = () => {
    if (following) return setAskUnfollow(true)
    setFollowing(true)
    showToast(`Following ${reel.creator.replace('@', '')}`, "You'll see their reels in feed")
  }

  const handleSave = () => {
    setSaved(!saved)
    if (!saved) showToast('Added to My Stuff', `Saved ${reel.creator}'s reel to your list`)
  }

  const swipe = useReelSwipe({
    canNext: Boolean(nextReel),
    canPrev: Boolean(prevReel),
    onNext: goNext,
    onPrev: goPrev,
    onDoubleTap: likeByDoubleTap,
    disabled: commentsOpen || shareOpen,
  })

  // The player sits under the tab bar (z-30 < z-40) so the tab bar shows, except while a sheet
  // or dialog is open: then it lifts above (z-50) and covers the tab bar, as in Figma.
  const sheetOpen = commentsOpen || showSignIn || askUnfollow || shareOpen
  const fade = controlsShowing ? '' : 'pointer-events-none opacity-0'

  return (
    <div
      className={`fixed inset-0 overflow-hidden bg-black select-none ${sheetOpen ? 'z-50' : 'z-30'}`}
      onPointerDown={showControls}
      onWheel={showControls}
    >
      {commentsOpen ? (
        // Comments open: the reel becomes a card at the top with a soft yellow glow behind it
        <>
          <span className="absolute top-10 -left-16 size-[260px] rounded-full bg-brand/25 blur-[80px]" />
          <div className="absolute top-[77px] left-1/2 h-[379px] w-[213px] -translate-x-1/2 overflow-hidden rounded-2xl border border-brand">
            <img src={reel.image} alt="" className="size-full object-cover" />
          </div>
        </>
      ) : (
        // The reels, stacked: previous above, current, next below. Swiping moves all three.
        <div className="absolute inset-0 touch-none" style={swipe.style} {...swipe.handlers}>
          {prevReel && <img src={prevReel.image} alt="" className="absolute inset-0 size-full -translate-y-full object-cover" />}
          <img src={reel.image} alt={reel.caption} className="absolute inset-0 size-full object-cover" draggable={false} />
          {nextReel && <img src={nextReel.image} alt="" className="absolute inset-0 size-full translate-y-full object-cover" />}
          {/* Thin yellow line where two reels meet, seen while one slides over the other (WONA, pink there) */}
          {nextReel && <span className="absolute inset-x-0 top-full h-[3px] -translate-y-1/2 bg-brand" />}
          {prevReel && <span className="absolute inset-x-0 top-0 h-[3px] -translate-y-1/2 bg-brand" />}
        </div>
      )}

      {/* Shading so the white text stays readable */}
      {!commentsOpen && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[340px] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        </>
      )}

      {/* Top bar: back, title, more (fades with the other controls, but never while comments are open) */}
      <div
        className={`absolute inset-x-0 top-[19px] flex items-center justify-between px-page transition-opacity duration-300 ${
          controlsShowing || commentsOpen ? '' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={commentsOpen ? () => setCommentsOpen(false) : goBack}
          aria-label="Back"
          className="flex size-9 items-center justify-center rounded-full border border-brand/80 bg-black/30"
        >
          <ChevronLeft size={18} className="text-brand" />
        </button>
        <h1 className="text-base font-bold italic">MTN TV+ Shorts</h1>
        <button type="button" aria-label="More options" className="flex size-9 items-center justify-center rounded-full border border-brand/80 bg-black/30">
          <Ellipsis size={18} className="text-brand" />
        </button>
      </div>

      {!commentsOpen && (
        <>
          <div className={`absolute top-[77px] left-page flex gap-1.5 transition-opacity duration-300 ${fade}`}>
            {CHIPS.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setChip(name)}
                className={`h-[25px] rounded-full px-3 text-xs ${chip === name ? 'bg-brand font-semibold text-black' : 'bg-[#485158]/80 text-white/80'}`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* The like burst; key makes it replay from the start on every like */}
          {burstShowing && <LikeBurst key={burstKey} size={250} />}

          {/* "Swipe up for next" hint (WONA), only when there is a next reel */}
          {nextReel && (
            <div className={`pointer-events-none absolute inset-x-0 bottom-[236px] flex flex-col items-center gap-0.5 transition-opacity duration-300 ${fade}`}>
              <span className="flex size-[30px] animate-bounce items-center justify-center rounded-full border border-brand bg-black/30 text-brand">
                <ChevronUp size={16} strokeWidth={2.4} />
              </span>
              <span className="text-[11px] text-white/70">Swipe up for next</span>
            </div>
          )}

          <div className="absolute right-page bottom-[220px]">
            <ReelActionRail
              reel={{ ...reel, commentCount }}
              liked={liked}
              likeCount={likeCount}
              following={following}
              saved={saved}
              onFollow={handleFollow}
              onLike={toggleLike}
              onComments={() => setCommentsOpen(true)}
              onShare={() => setShareOpen(true)}
              onSave={handleSave}
            />
          </div>

          <div className={`absolute inset-x-0 bottom-[91px] px-page transition-opacity duration-300 ${fade}`}>
            <ReelCaption reel={reel} following={following} onFollow={handleFollow} />
          </div>

          {toast && (
            <div className="absolute inset-x-[30px] bottom-[94px] z-20">
              <ReelToast initial={reel.creatorInitial} title={toast.title} subtitle={toast.subtitle} onClose={() => setToast(null)} />
            </div>
          )}
        </>
      )}

      {commentsOpen && (
        <CommentsSheet
          reel={reel}
          myAvatar={myAvatar}
          requireSignIn={requireSignIn}
          onClose={() => setCommentsOpen(false)}
          onCountChange={(added) => setCommentCount((n) => n + added)}
        />
      )}

      {askUnfollow && (
        <div className="absolute inset-0 z-[65] flex items-center justify-center bg-black/60 px-8" onClick={() => setAskUnfollow(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full rounded-2xl bg-[#272727] p-6 text-center">
            <p className="text-[15px] font-semibold">Unfollow {reel.creator}?</p>
            <div className="mt-4 flex gap-3">
              <button type="button" onClick={() => setAskUnfollow(false)} className="h-10 flex-1 rounded-full border border-white/30 text-sm">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setFollowing(false)
                  setAskUnfollow(false)
                }}
                className="h-10 flex-1 rounded-full bg-brand text-sm font-semibold text-black"
              >
                Unfollow
              </button>
            </div>
          </div>
        </div>
      )}

      {shareOpen && <ShareReelSheet reel={reel} likeCount={likeCount} onClose={() => setShareOpen(false)} />}

      {showSignIn && <SignInPrompt onClose={() => setShowSignIn(false)} />}
    </div>
  )
}
