// The ↑ ↓ round buttons near the right edge of the desktop player (WONA's ReelNavArrows):
// 48 design-pixel circles, 16 apart. Each shows only when there is a reel in that direction.
import { ChevronDown, ChevronUp } from 'lucide-react'

const circle =
  'flex size-[calc(48*var(--d))] items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-brand hover:text-black'

export default function ReelNavArrows({ onUp, onDown, showUp, showDown, className = '' }) {
  return (
    <div className={`flex flex-col gap-[calc(16*var(--d))] ${className}`}>
      {showUp && (
        <button type="button" onClick={onUp} aria-label="Previous reel" className={circle}>
          <ChevronUp className="size-[calc(22*var(--d))]" />
        </button>
      )}
      {showDown && (
        <button type="button" onClick={onDown} aria-label="Next reel" className={circle}>
          <ChevronDown className="size-[calc(22*var(--d))]" />
        </button>
      )}
    </div>
  )
}
