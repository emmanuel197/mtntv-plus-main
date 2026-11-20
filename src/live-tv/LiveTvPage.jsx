// The Live TV screen: category chips, the featured live programme (All and Sports only),
// then the list of live channels for the chosen category.
// This is the PHONE page; on desktop (768px and wider) it shows DesktopLiveTv.jsx instead.
//
// Vertical spacing (Figma minus the phone's 47px clock bar):
//   chips 57px from the top · thin line · featured block · list title · thin line · channel rows
import { useState } from 'react'
import LiveCategoryChips from './LiveCategoryChips.jsx'
import FeaturedLiveProgram from './FeaturedLiveProgram.jsx'
import LiveChannelRow from './LiveChannelRow.jsx'
import DesktopLiveTv from './DesktopLiveTv.jsx'
import { categories, featuredProgram, channels } from './live-tv-sample-data.js'
import { useIsDesktop } from '@/helpers/useIsDesktop.js'

export default function LiveTvPage() {
  const isDesktop = useIsDesktop()
  const [category, setCategory] = useState('All')
  // null = nothing tapped yet → the first row in the list counts as selected (as in Figma)
  const [selectedId, setSelectedId] = useState(null)

  // Desktop gets its own page; only one of the two is ever drawn.
  // (This comes after the hooks above: React needs the same hooks called on every render.)
  if (isDesktop) return <DesktopLiveTv />

  const visibleChannels = category === 'All' ? channels : channels.filter((c) => c.category === category)
  const showFeatured = category === 'All' || category === featuredProgram.category
  const listTitle = showFeatured ? 'All Live Channels' : category
  const activeId = visibleChannels.some((c) => c.id === selectedId) ? selectedId : visibleChannels[0]?.id

  const chooseCategory = (name) => {
    setCategory(name)
    setSelectedId(null) // start each category with its first row selected
  }

  return (
    <div className="relative min-h-screen pt-[57px]">
      {/* Warm brown glow toward the bottom-left, as in Figma */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 90% 60% at 0% 100%, #2a1100 0%, transparent 70%)' }}
      />

      <LiveCategoryChips categories={categories} selected={category} onSelect={chooseCategory} />
      <div className="mt-3 border-t border-white/5" />

      {showFeatured && (
        <div className="mt-[30px]">
          <FeaturedLiveProgram program={featuredProgram} />
        </div>
      )}

      <div className={`flex h-[22px] items-center justify-between px-page ${showFeatured ? 'mt-[39px]' : 'mt-[29px]'}`}>
        <h2 className="text-lg font-bold italic">{listTitle}</h2>
        <span className="text-[11px] text-white/55">{visibleChannels.length} channels</span>
      </div>
      <div className="mt-3 border-t border-white/5" />

      <div className="mt-[17px] flex flex-col gap-4">
        {visibleChannels.map((c) => (
          <LiveChannelRow key={c.id} channel={c} selected={c.id === activeId} onSelect={() => setSelectedId(c.id)} />
        ))}
      </div>
    </div>
  )
}
