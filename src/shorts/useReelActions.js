// What you can DO to a reel, shared by the phone player and the desktop player:
// like (heart or double-tap, with the yellow burst), follow (toast; unfollow asks first),
// save (toast "Added to My Stuff"), the comment count, the gold toast, and the sign-in check.
// None of these need an account; only writing/replying to a comment does (requireSignIn).
//
// A "custom hook" (a function starting with `use`) keeps this state in one place, so both
// players behave exactly the same and only their layouts differ.
import { useEffect, useRef, useState } from 'react'
import { isSignedIn } from '@/sign-in-and-sign-up/session.js'

export function useReelActions(reel) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(reel.likes)
  const [following, setFollowing] = useState(false)
  const [askUnfollow, setAskUnfollow] = useState(false)
  const [saved, setSaved] = useState(false)
  const [commentCount, setCommentCount] = useState(reel.commentCount)
  const [showSignIn, setShowSignIn] = useState(false)
  const [toast, setToast] = useState(null)
  const [burstKey, setBurstKey] = useState(0) // a new number each time the burst should play
  const [burstShowing, setBurstShowing] = useState(false)
  const timers = useRef({})

  // Clear any running timers when leaving this reel
  useEffect(() => () => Object.values(timers.current).forEach(clearTimeout), [])

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
  const confirmUnfollow = () => {
    setFollowing(false)
    setAskUnfollow(false)
  }

  const handleSave = () => {
    setSaved(!saved)
    if (!saved) showToast('Added to My Stuff', `Saved ${reel.creator}'s reel to your list`)
  }

  return {
    liked,
    likeCount,
    following,
    askUnfollow,
    saved,
    commentCount,
    showSignIn,
    toast,
    burstKey,
    burstShowing,
    requireSignIn,
    toggleLike,
    likeByDoubleTap,
    handleFollow,
    confirmUnfollow,
    cancelUnfollow: () => setAskUnfollow(false),
    handleSave,
    closeToast: () => setToast(null),
    closeSignIn: () => setShowSignIn(false),
    addComments: (added) => setCommentCount((n) => n + added),
  }
}
