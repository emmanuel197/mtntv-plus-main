// The row of round reel previews on the desktop Shorts page (WONA's ShortsAvatarRail):
// 125 design-pixel circles with a yellow ring, 16 apart, scrolling sideways. Each opens the player.
import { Link } from 'react-router'

export default function ShortsAvatarRail({ items }) {
  return (
    // Scrolling sideways also clips up/down, which would cut off the hover zoom; the padding gives it
    // room and the matching negative margin keeps the page spacing the same.
    <div className="no-scrollbar -my-[calc(10*var(--d))] overflow-x-auto">
      <div className="flex items-center gap-[calc(16*var(--d))] py-[calc(10*var(--d))]">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/shorts/${item.id}`}
            className="size-[calc(125*var(--d))] shrink-0 overflow-hidden rounded-full border-2 border-brand/80 transition-transform duration-200 hover:scale-105"
          >
            <img src={item.image} alt="" className="size-full object-cover" />
          </Link>
        ))}
      </div>
    </div>
  )
}
