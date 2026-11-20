// The desktop (web) Live TV page, laid out like WONA's LiveTvPage:
//   search box · category pills
//   left column: featured "now playing" block (All and Sports only, as on phones) + "On Air Today" schedule
//   right column: "All Live Channels" list
// Clicking a channel (in the list or the schedule) shows it in the featured block; Watch Now opens it later
// (no player yet, so it shows a small message). Sizes are design pixels of the 1728px design.
import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Search, X } from 'lucide-react'
import DesktopCategoryTabs from './DesktopCategoryTabs.jsx'
import DesktopFeaturedProgram from './DesktopFeaturedProgram.jsx'
import OnAirSchedule from './OnAirSchedule.jsx'
import LiveChannelsSidebar from './LiveChannelsSidebar.jsx'
import LiveToast from './LiveToast.jsx'
import { categories, featuredProgram, featuredMatch, channels, onAirToday, scheduleDate } from './live-tv-sample-data.js'

// The curated programme shown before any channel is picked: phone data + the desktop-only scoreboard
const defaultFeatured = {
  ...featuredProgram,
  ...featuredMatch,
  channelLabel: `${featuredProgram.channelName} · ${featuredProgram.channelNumber}`,
}

// Turn a channel from the list into the shape the featured block expects.
// Sample channels have no times or picture of their own, so those come from the default programme.
function featuredFromChannel(c) {
  return {
    isLive: c.isLive,
    watching: '',
    channelLogo: c.logo,
    channelLabel: c.channel,
    titleLines: [c.title],
    // Only the AFCON match has a real picture; the others show their logo
    image: c.title.includes('AFCON') ? featuredMatch.image : null,
    startTime: featuredProgram.startTime,
    endTime: featuredProgram.endTime,
    remaining: featuredProgram.remaining,
    progress: c.progress,
  }
}

export default function DesktopLiveTv() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  // null = nothing clicked yet → the curated AFCON programme shows, and the first channel reads as chosen
  const [selectedId, setSelectedId] = useState(null)
  const [toast, setToast] = useState('')
  const featuredRef = useRef(null)

  // useCallback keeps the same function between renders, so the toast's timer isn't restarted every render
  const closeToast = useCallback(() => setToast(''), [])

  const q = query.trim().toLowerCase()
  const visibleChannels = channels.filter(
    (c) =>
      (category === 'All' || c.category === category) &&
      (!q || c.channel.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)),
  )
  const showFeatured = category === 'All' || category === featuredProgram.category
  const selected = channels.find((c) => c.id === selectedId)
  const featured = selected ? featuredFromChannel(selected) : defaultFeatured
  const activeId = visibleChannels.some((c) => c.id === selectedId) ? selectedId : visibleChannels[0]?.id

  const chooseCategory = (name) => {
    setCategory(name)
    setSelectedId(null) // each category starts with the curated programme again
  }

  // Show a channel in the featured block and scroll back up to it (you may be far down the list)
  const stageChannel = (c) => {
    setSelectedId(c.id)
    requestAnimationFrame(() => featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  // A schedule row only knows its channel's name, so look the live channel up by name
  const openScheduleRow = (row) => {
    const channel = channels.find((c) => c.id === row.id || c.channel === row.channel)
    if (channel) stageChannel(channel)
    else setToast(`${row.channel} isn't on air right now`)
  }

  const scheduleAction = (row) =>
    setToast(row.when === 'earlier' ? `Replay of "${row.title}" comes soon` : `Reminder set for "${row.title}" at ${row.time}`)

  return (
    // overflow-clip (not -hidden) trims the glows without making this box scrollable,
    // so "scroll into view" can't nudge the page sideways
    <div className="relative min-h-screen overflow-clip bg-[#1b1b1b]">
      {/* Soft yellow glows, as on the desktop Home page */}
      <span aria-hidden className="pointer-events-none absolute top-[calc(200*var(--d))] -left-[calc(300*var(--d))] size-[calc(700*var(--d))] rounded-full bg-brand/10 blur-[calc(200*var(--d))]" />
      <span aria-hidden className="pointer-events-none absolute top-[calc(1400*var(--d))] -right-[calc(200*var(--d))] size-[calc(700*var(--d))] rounded-full bg-brand/5 blur-[calc(200*var(--d))]" />

      {/* WONA's top padding is 146 including its navbar; ours already leaves 97 for the navbar, so 49 here */}
      <div className="relative flex flex-col gap-[calc(28*var(--d))] px-[calc(53*var(--d))] pt-[calc(49*var(--d))] pb-[calc(96*var(--d))]">
        <label className="flex items-center gap-[calc(14*var(--d))] rounded-full border border-white/15 bg-black/40 px-[calc(40*var(--d))] py-[calc(24*var(--d))] focus-within:border-brand/60">
          <Search className="size-[calc(24*var(--d))] shrink-0 text-white/55" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search live channel..."
            className="min-w-0 flex-1 bg-transparent text-[calc(18*var(--d))] outline-none placeholder:text-white/55"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="text-white/70 hover:text-white">
              <X className="size-[calc(18*var(--d))]" />
            </button>
          )}
        </label>

        <DesktopCategoryTabs categories={categories} selected={category} onSelect={chooseCategory} />

        <div className="flex gap-[calc(40*var(--d))]">
          <div className="flex min-w-0 flex-1 flex-col gap-[calc(36*var(--d))]">
            {showFeatured && (
              // scroll-mt: when scrolled into view, stop below the fixed navbar instead of under it
              <div ref={featuredRef} className="scroll-mt-[calc(120*var(--d))]">
                <DesktopFeaturedProgram
                  program={featured}
                  onWatchNow={() => setToast('The player is coming soon')}
                  onFullGuide={() => navigate('/tv-guide')}
                />
              </div>
            )}
            <OnAirSchedule
              items={onAirToday}
              liveChannels={visibleChannels}
              date={scheduleDate}
              category={category}
              onSelect={openScheduleRow}
              onAction={scheduleAction}
            />
          </div>

          <LiveChannelsSidebar
            title={category === 'All' ? 'All Live Channels' : category}
            channels={visibleChannels}
            activeId={activeId}
            onSelect={stageChannel}
          />
        </div>
      </div>

      <LiveToast message={toast} onClose={closeToast} />
    </div>
  )
}
