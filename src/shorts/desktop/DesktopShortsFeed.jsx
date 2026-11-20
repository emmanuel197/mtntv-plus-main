// The desktop (web) Shorts page at /shorts — the WONA/AfriPlay layout in MTN TV+ colours:
//   left (1028 design px wide): "Shorts for You" + subtitle → filter pills → round previews
//     → "For You" brick grid (4 columns) → "See more"
//   right sidebar (380 wide): the LIVE reel card → "Trending Now" list
// Every picture opens the reel player at /shorts/<id>. The navbar and footer come from the page frame.
import { useState } from 'react'
import { ArrowDown } from 'lucide-react'
import ShortsFilterChips from './ShortsFilterChips.jsx'
import ShortsAvatarRail from './ShortsAvatarRail.jsx'
import ShortGridTile from './ShortGridTile.jsx'
import LiveReelBanner from './LiveReelBanner.jsx'
import TrendingNowSidebar from './TrendingNowSidebar.jsx'
import { circles, liveReel, trendingNow, forYou } from '../shorts-sample-data.js'

const COLUMNS = 4

export default function DesktopShortsFeed() {
  const [filter, setFilter] = useState('For You')

  // The tiles come in reading order (left to right); deal them into 4 columns so each column
  // stacks on its own. A tile is tall when its row and column are both even or both odd,
  // which gives the brick (checkerboard) look of the design.
  const columns = Array.from({ length: COLUMNS }, (_, col) => forYou.filter((_, i) => i % COLUMNS === col))

  return (
    <div className="relative overflow-hidden bg-[#1b1b1b]">
      {/* Soft yellow glows, like the desktop Home page */}
      <span aria-hidden className="pointer-events-none absolute top-[calc(300*var(--d))] -left-[calc(250*var(--d))] size-[calc(700*var(--d))] rounded-full bg-brand/10 blur-[calc(200*var(--d))]" />
      <span aria-hidden className="pointer-events-none absolute top-[calc(1200*var(--d))] -right-[calc(250*var(--d))] size-[calc(700*var(--d))] rounded-full bg-brand/10 blur-[calc(200*var(--d))]" />

      {/* justify-between: any spare width collects in the gap before the sidebar (as in the design) */}
      <div className="relative flex justify-between gap-x-[calc(24*var(--d))] px-[calc(53*var(--d))] pt-[calc(74*var(--d))] pb-[calc(64*var(--d))]">
        {/* 1028 = 4 tiles of 245 + 3 gaps of 16 */}
        <div className="flex w-[calc(1028*var(--d))] shrink-0 flex-col gap-[calc(32*var(--d))]">
          <div className="flex flex-col gap-[calc(8*var(--d))]">
            <h1 className="text-[calc(30*var(--d))] font-bold italic">Shorts for You</h1>
            <p className="text-[calc(18*var(--d))] text-white/80">Tap any short to start watching</p>
          </div>

          <ShortsFilterChips active={filter} onChange={setFilter} />

          <ShortsAvatarRail items={circles} />

          <section className="flex flex-col gap-[calc(24*var(--d))]">
            <h2 className="text-[calc(28*var(--d))] font-bold italic">For You</h2>
            <div className="flex gap-x-[calc(16*var(--d))]">
              {columns.map((items, col) => (
                <div key={col} className="flex flex-col gap-[calc(16*var(--d))]">
                  {items.map((item, row) => (
                    <ShortGridTile key={item.id} item={item} tall={row % 2 === col % 2} />
                  ))}
                </div>
              ))}
            </div>

            {/* WONA's "See more" pill. There are no more sample shorts to load yet, so it does nothing for now. */}
            <button
              type="button"
              className="mx-auto mt-[calc(8*var(--d))] flex h-[calc(54*var(--d))] items-center gap-[calc(8*var(--d))] rounded-full bg-white/30 px-[calc(24*var(--d))] text-[calc(18*var(--d))] font-medium transition-opacity hover:opacity-80"
            >
              <ArrowDown className="size-[calc(18*var(--d))]" />
              See more
            </button>
          </section>
        </div>

        <aside className="flex w-[calc(380*var(--d))] shrink-0 flex-col gap-[calc(32*var(--d))]">
          <LiveReelBanner reel={liveReel} />
          <TrendingNowSidebar items={trendingNow} />
        </aside>
      </div>
    </div>
  )
}
