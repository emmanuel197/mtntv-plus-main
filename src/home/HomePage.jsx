// The Home screen. Phones: hero banner on top, then the rows in the order the mobile Figma shows them
// (sample data from home-sample-data.js). Screens 768px and wider: the web design (DesktopHome.jsx).
// Real server data replaces the sample files in Step 5.
import { useIsDesktop } from '@/helpers/useIsDesktop.js'
import DesktopHome from './DesktopHome.jsx'
import ContentRow from '@/shared-ui/ContentRow.jsx'
import PosterCard from '@/shared-ui/PosterCard.jsx'
import HomeHero from './HomeHero.jsx'
import ShortsPreviewCard from './ShortsPreviewCard.jsx'
import KeepWatchingCard from './KeepWatchingCard.jsx'
import LiveNowCard from './LiveNowCard.jsx'
import TopTenCard from './TopTenCard.jsx'
import ChannelTile from './ChannelTile.jsx'
import PromoBanner from './PromoBanner.jsx'
import * as data from './home-sample-data.js'

// Small yellow "NEW" badge next to the Shorts title
const NewBadge = () => (
  <span className="ml-1 flex h-4 items-center rounded-full bg-brand px-1.5 text-[10px] font-bold text-black not-italic">
    NEW
  </span>
)
// Red dot in front of "Live on MTN TV+ Now"
const LiveDot = () => <span className="size-3.5 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#c4161c]" />

export default function HomePage() {
  // Draw only one version, never both
  const isDesktop = useIsDesktop()
  if (isDesktop) return <DesktopHome />

  return (
    <div className="relative">
      <HomeHero slides={data.heroSlides} />

      {/* Soft yellow glows behind the rows (Figma "Ellipse 2/4/5"; positions measured from the hero's bottom).
          `relative` on the rows box below keeps the rows above the glows. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
        <span className="absolute top-[1194px] left-[-43px] size-[291px] rounded-full bg-brand/20 blur-[90px]" />
        <span className="absolute top-[1705px] left-[148px] size-[341px] rounded-full bg-brand/15 blur-[100px]" />
        <span className="absolute top-[3084px] left-[229px] size-[294px] rounded-full bg-brand/15 blur-[90px]" />
      </div>

      {/* Figma: 16px between rows */}
      <div className="relative mt-1 flex flex-col gap-4">
        <ContentRow title={<span className="flex items-center">MTN TV+ Shorts<NewBadge /></span>} gap={12}>
          {data.shorts.map((s) => <ShortsPreviewCard key={s.id} {...s} />)}
        </ContentRow>

        <ContentRow title="Keep Watching" gap={8}>
          {data.keepWatching.map((k) => <KeepWatchingCard key={k.id} {...k} />)}
        </ContentRow>

        <ContentRow title="Because You Watched">
          {data.becauseYouWatched.map((p) => <PosterCard key={p.id} {...p} />)}
        </ContentRow>

        <ContentRow title="Live on MTN TV+ Now" icon={<LiveDot />} gap={8}>
          {data.liveNow.map((l) => <LiveNowCard key={l.id} {...l} />)}
        </ContentRow>

        <ContentRow title="Top 10 Movies & Shows">
          {data.topTen.map((t, i) => <TopTenCard key={t.id} rank={i + 1} {...t} />)}
        </ContentRow>

        <ContentRow title="New Release on MTN TV+">
          {data.newReleases.map((p) => <PosterCard key={p.id} {...p} />)}
        </ContentRow>

        <ContentRow title="Browse Live Channels" arrow="dim" gap={8}>
          {data.liveChannels.map((c) => <ChannelTile key={c.id} {...c} />)}
        </ContentRow>

        <ContentRow title="Trending Now" arrow="dim">
          {data.trendingNow.map((p) => <PosterCard key={p.id} {...p} />)}
        </ContentRow>

        <PromoBanner {...data.promo} />

        <ContentRow title="Only on MTN TV+" arrow="bright">
          {data.onlyOnMtn.map((p) => <PosterCard key={p.id} {...p} />)}
        </ContentRow>

        <ContentRow title="Upcoming TV Shows" arrow="bright">
          {data.upcomingShows.map((p) => <PosterCard key={p.id} {...p} width={243} height={303} className="rounded-lg" />)}
        </ContentRow>
      </div>
    </div>
  )
}
