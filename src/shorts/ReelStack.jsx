// The reel pictures stacked on top of each other: previous above, current in the middle, next below.
// Swiping (or the wheel / arrow keys) moves all three together, using the style + handlers from
// useReelSwipe. A thin yellow line shows where two reels meet while one slides over the other.
// Used full-screen by the phone player and inside the 9:16 card by the desktop player.
export default function ReelStack({ reel, prevReel, nextReel, swipe, extraHandlers }) {
  return (
    <div className="absolute inset-0 touch-none" style={swipe.style} {...swipe.handlers} {...extraHandlers}>
      {prevReel && <img src={prevReel.image} alt="" className="absolute inset-0 size-full -translate-y-full object-cover" />}
      <img src={reel.image} alt={reel.caption} className="absolute inset-0 size-full object-cover" draggable={false} />
      {nextReel && <img src={nextReel.image} alt="" className="absolute inset-0 size-full translate-y-full object-cover" />}
      {nextReel && <span className="absolute inset-x-0 top-full h-[3px] -translate-y-1/2 bg-brand" />}
      {prevReel && <span className="absolute inset-x-0 top-0 h-[3px] -translate-y-1/2 bg-brand" />}
    </div>
  )
}
