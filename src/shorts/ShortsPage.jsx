// The Shorts landing page: tabs, round previews, the LIVE reel, Trending Now, then the For You grid.
// Every picture opens the full-screen player at /shorts/<id>.
// Wide screens (768px+) get the desktop version instead: desktop/DesktopShortsFeed.jsx.
//
// Spacing (Figma, measured from the screenshots): tabs → 27px → circles 74px → 24px → live card 194px
//   → 21px → "Trending Now" → 16px → cards 110×130 → "For You" → 2 columns, 8px apart.
import { useState } from 'react'
import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'
import CategoryTabs from '@/shared-ui/CategoryTabs.jsx'
import LiveReelCard from './LiveReelCard.jsx'
import TrendingShortCard from './TrendingShortCard.jsx'
import ForYouTile from './ForYouTile.jsx'
import DesktopShortsFeed from './desktop/DesktopShortsFeed.jsx'
import { useIsDesktop } from '@/helpers/useIsDesktop.js'
import { circles, liveReel, trendingNow, forYou } from './shorts-sample-data.js'

export default function ShortsPage() {
  const [category, setCategory] = useState('All')
  const isDesktop = useIsDesktop()
  // Only one version is drawn: desktop or phone (hooks above must run before this return)
  if (isDesktop) return <DesktopShortsFeed />

  // Deal the For You tiles into two columns: even positions left, odd positions right
  const leftColumn = forYou.filter((_, i) => i % 2 === 0)
  const rightColumn = forYou.filter((_, i) => i % 2 === 1)

  return (
    <div className="pt-[58px]">
      <div className="px-page">
        <CategoryTabs selected={category} onSelect={setCategory} />
      </div>

      {/* Round previews with a yellow ring */}
      <div className="no-scrollbar mt-[27px] flex gap-2.5 overflow-x-auto px-page">
        {circles.map((c) => (
          <Link key={c.id} to={`/shorts/${c.id}`} className="size-[74px] shrink-0 overflow-hidden rounded-full border-[2.5px] border-brand">
            <img src={c.image} alt="" className="size-full object-cover" />
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <LiveReelCard reel={liveReel} />
      </div>

      <section className="mt-[21px]">
        <div className="flex h-[22px] items-center justify-between px-page">
          <h2 className="flex items-center gap-2 text-lg font-bold italic">
            <span className="h-4 w-1 rounded-full bg-brand" />
            Trending Now
          </h2>
          <ChevronRight size={20} className="text-[#ebd2ff]" />
        </div>
        <div className="no-scrollbar mt-4 flex gap-2.5 overflow-x-auto px-page">
          {trendingNow.map((item) => (
            <TrendingShortCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mt-6 px-page">
        <h2 className="text-lg font-bold italic">For You</h2>
        <div className="mt-3 flex gap-2">
          {/* Left column starts with a tall tile, right with a short one; each alternates */}
          <div className="flex flex-1 flex-col gap-2">
            {leftColumn.map((item, i) => <ForYouTile key={item.id} item={item} tall={i % 2 === 0} />)}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            {rightColumn.map((item, i) => <ForYouTile key={item.id} item={item} tall={i % 2 === 1} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
