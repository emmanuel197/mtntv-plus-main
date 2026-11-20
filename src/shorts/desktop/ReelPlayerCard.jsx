// The 9:16 reel card in the middle of the desktop player (WONA's ReelPlayerCard, MTN colours):
// 420 design pixels wide, rounded corners. On it: a pill with sound / full screen / more (top-right),
// a big play/pause button in the middle, the yellow like burst, a "Double tap anywhere to like" hint
// while paused, and the time bar at the bottom.
// Reels are still pictures for now, so "playing" just moves the time bar along; at the end it goes
// to the next reel (WONA does the same with real video).
//   - one click on the picture: play / pause
//   - double click: like (with the burst)
//   - wheel, ↑ ↓ keys and touch swipes slide to the next/previous reel (the `swipe` from useReelSwipe)
import { useEffect, useRef, useState } from 'react'
import { Ellipsis, Maximize, Play, Volume2, VolumeX } from 'lucide-react'
import LikeBurst from '../LikeBurst.jsx'
import ReelStack from '../ReelStack.jsx'

const CLICK_WAIT_MS = 250 // how long a click waits to see if a second click (double click) follows

// "1:02" → 62
const toSeconds = (label) => {
  const [m, s] = label.split(':').map(Number)
  return m * 60 + s
}
// 62 → "1:02"
const toLabel = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`

export default function ReelPlayerCard({ reel, prevReel, nextReel, swipe, cardRef, onDoubleLike, burstShowing, burstKey, onEnded, children }) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(reel.progress) // 0 to 1
  const clickTimer = useRef(null)
  const totalSeconds = toSeconds(reel.totalTime)

  // While "playing", move the time bar on every quarter second
  useEffect(() => {
    if (!playing) return
    const tick = setInterval(() => setProgress((p) => Math.min(1, p + 0.25 / totalSeconds)), 250)
    return () => clearInterval(tick)
  }, [playing, totalSeconds])

  // Reached the end: stop, and move on to the next reel if there is one
  useEffect(() => {
    if (progress < 1) return
    setPlaying(false)
    onEnded()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to the bar reaching the end
  }, [progress])

  // Forget a waiting click when leaving this reel
  useEffect(() => () => clearTimeout(clickTimer.current), [])

  // One click waits a moment: if a second click comes, it was a double click (like), not play/pause
  const handleClick = () => {
    if (clickTimer.current) return
    clickTimer.current = setTimeout(() => {
      clickTimer.current = null
      setPlaying((p) => !p)
    }, CLICK_WAIT_MS)
  }
  const handleDoubleClick = () => {
    clearTimeout(clickTimer.current)
    clickTimer.current = null
    onDoubleLike()
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else cardRef.current?.requestFullscreen?.()
  }

  return (
    <div ref={cardRef} className="relative aspect-[9/16] w-[calc(420*var(--d))] shrink-0 overflow-hidden rounded-[calc(16*var(--d))] bg-surface select-none">
      <ReelStack
        reel={reel}
        prevReel={prevReel}
        nextReel={nextReel}
        swipe={swipe}
        // onWheel is handled once by the whole player page, so it's switched off here
        // (two wheel handlers would try to slide twice)
        extraHandlers={{ onClick: handleClick, onDoubleClick: handleDoubleClick, onWheel: undefined }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[calc(120*var(--d))] bg-gradient-to-b from-black/50 to-transparent" />

      {/* Sound, full screen and more share one dark pill (WONA design) */}
      <div className="absolute top-[calc(16*var(--d))] right-[calc(16*var(--d))] flex items-center gap-[calc(14*var(--d))] rounded-full bg-black/40 px-[calc(14*var(--d))] py-[calc(8*var(--d))]">
        <button type="button" onClick={() => setMuted((m) => !m)} aria-pressed={muted} aria-label={muted ? 'Unmute' : 'Mute'} className="hover:text-brand">
          {muted ? <VolumeX className="size-[calc(18*var(--d))]" /> : <Volume2 className="size-[calc(18*var(--d))]" />}
        </button>
        <button type="button" onClick={toggleFullscreen} aria-label="Full screen" className="hover:text-brand">
          <Maximize className="size-[calc(18*var(--d))]" />
        </button>
        {/* No options menu in the designs yet */}
        <button type="button" aria-label="More options" className="hover:text-brand">
          <Ellipsis className="size-[calc(18*var(--d))]" />
        </button>
      </div>

      {/* Play / pause. While playing it hides, and shows again when the mouse is over it. */}
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? 'Pause' : 'Play'}
        className={`absolute top-1/2 left-1/2 flex size-[calc(72*var(--d))] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm transition-opacity duration-500 ${
          playing ? 'opacity-0 hover:opacity-100' : ''
        }`}
      >
        {playing ? (
          <span aria-hidden className="flex gap-[calc(6*var(--d))]">
            <span className="h-[calc(24*var(--d))] w-[calc(7*var(--d))] rounded-sm bg-white" />
            <span className="h-[calc(24*var(--d))] w-[calc(7*var(--d))] rounded-sm bg-white" />
          </span>
        ) : (
          <Play className="ml-[calc(4*var(--d))] size-[calc(28*var(--d))] text-brand" fill="currentColor" />
        )}
      </button>

      {/* key makes the burst replay from the start on every like */}
      {burstShowing && <LikeBurst key={burstKey} size="calc(260 * var(--d))" />}

      {!playing && (
        <span className="pointer-events-none absolute top-[64%] left-1/2 -translate-x-1/2 text-[calc(13*var(--d))] whitespace-nowrap text-white/70">
          ♥ Double tap anywhere to like
        </span>
      )}

      {/* Time bar. Dragging it moves the (pretend) playback position. */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-[calc(8*var(--d))] bg-gradient-to-t from-black/70 to-transparent px-[calc(16*var(--d))] pt-[calc(40*var(--d))] pb-[calc(14*var(--d))]">
        <span className="text-[calc(14*var(--d))] text-white/70">{toLabel(progress * totalSeconds)}</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          aria-label="Seek"
          className="h-[calc(4*var(--d))] flex-1 cursor-pointer accent-brand"
        />
        <span className="text-[calc(14*var(--d))] text-white/90">{reel.totalTime}</span>
      </div>

      {/* Extra layers from the player page (the toast) */}
      {children}
    </div>
  )
}
