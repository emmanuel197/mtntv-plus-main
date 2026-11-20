// Swipe up/down between reels (same behaviour as WONA/AfriPlay):
// - while your finger is down, the reel follows it
// - let go past 60px (or flick fast) → the next/previous reel slides in; otherwise it springs back
// - mouse wheel and the ↑ ↓ keys do the same on a computer
// - a quick tap that didn't move counts toward a double-tap (to like)
//
// This is a "custom hook": a function starting with `use` that bundles state + behaviour
// so the player page can stay short. It returns the current slide offset and the event handlers.
import { useEffect, useRef, useState } from 'react'

const SLIDE_MS = 450
const DOUBLE_TAP_MS = 300

export function useReelSwipe({ canNext, canPrev, onNext, onPrev, onDoubleTap, disabled }) {
  const [offset, setOffset] = useState(0) // how far the reels are pushed up/down, in px
  const [animating, setAnimating] = useState(false) // true = ease the movement, false = follow the finger exactly
  const touch = useRef(null)
  const moved = useRef(false)
  const lastTap = useRef(0)
  const busy = useRef(false)

  const slide = (direction) => {
    const allowed = direction > 0 ? canNext : canPrev
    setAnimating(true)
    if (!allowed || busy.current) {
      setOffset(0) // spring back
      return
    }
    busy.current = true
    setOffset(direction > 0 ? -window.innerHeight : window.innerHeight)
    setTimeout(() => {
      busy.current = false
      setAnimating(false)
      setOffset(0)
      if (direction > 0) onNext()
      else onPrev()
    }, SLIDE_MS)
  }

  // ↑ ↓ keys on a computer
  useEffect(() => {
    if (disabled) return
    const onKey = (e) => {
      if (e.key === 'ArrowDown') slide(1)
      if (e.key === 'ArrowUp') slide(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const handlers = disabled
    ? {}
    : {
        onTouchStart: (e) => {
          touch.current = { y: e.touches[0].clientY, t: e.timeStamp }
          moved.current = false
          setAnimating(false)
        },
        onTouchMove: (e) => {
          if (!touch.current) return
          let dy = e.touches[0].clientY - touch.current.y
          if ((dy < 0 && !canNext) || (dy > 0 && !canPrev)) dy *= 0.2 // stiff at the ends
          if (Math.abs(dy) > 6) moved.current = true
          setOffset(dy)
        },
        onTouchEnd: (e) => {
          if (!touch.current) return
          const dy = e.changedTouches[0].clientY - touch.current.y
          const speed = (dy / Math.max(16, e.timeStamp - touch.current.t)) * 1000 // px per second
          touch.current = null
          if (dy < -60 || speed < -400) slide(1)
          else if (dy > 60 || speed > 400) slide(-1)
          else {
            setAnimating(true)
            setOffset(0)
            if (!moved.current) {
              // a tap: two within 300ms = double-tap
              if (e.timeStamp - lastTap.current < DOUBLE_TAP_MS) {
                lastTap.current = 0
                onDoubleTap()
              } else lastTap.current = e.timeStamp
            }
          }
        },
        onWheel: (e) => {
          if (Math.abs(e.deltaY) > 20 && !busy.current) slide(e.deltaY > 0 ? 1 : -1)
        },
        onDoubleClick: onDoubleTap, // mouse double-click
      }

  const style = {
    transform: `translateY(${offset}px)`,
    transition: animating ? `transform ${SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
  }

  return { style, handlers }
}
