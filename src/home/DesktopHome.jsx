// The desktop (web) Home page, in the order of the MTN TV+ web design:
//   hero → MTN TV+ Shorts → Keep Watching → Because You Watched → Live On Tv Now → promo band
//   → Top 10 Movies → Genres → New Releases on MTN TV+ → Browse Live Channels → Only on MTN TV+
// Rows are 48 design pixels apart with a 53px left margin, on the dark grey page (#1B1B1B) with soft
// yellow glows. (The footer comes from the page frame, navigation/SiteFooter.jsx.)
import DesktopHero from './DesktopHero.jsx'
import DesktopRow from './DesktopRow.jsx'
import { ShortCircle, WideCard, PosterCard, GenreCard, ChannelCard } from './DesktopCards.jsx'
import * as data from './desktop-home-data.js'

const NewBadge = () => (
  <span className="rounded-full bg-brand px-[calc(10*var(--d))] py-[calc(2*var(--d))] text-[calc(12*var(--d))] font-bold text-black not-italic">
    NEW
  </span>
)
const LiveDot = () => <span className="size-[calc(22*var(--d))] rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#c4161c]" />

export default function DesktopHome() {
  return (
    <div className="relative overflow-hidden bg-[#1b1b1b]">
      <DesktopHero slides={data.heroSlides} />

      {/* Soft yellow glows behind the rows */}
      <span aria-hidden className="pointer-events-none absolute top-[calc(1300*var(--d))] -left-[calc(200*var(--d))] size-[calc(700*var(--d))] rounded-full bg-brand/10 blur-[calc(200*var(--d))]" />
      <span aria-hidden className="pointer-events-none absolute top-[calc(3400*var(--d))] right-0 size-[calc(700*var(--d))] rounded-full bg-brand/10 blur-[calc(200*var(--d))]" />

      <div className="relative flex flex-col gap-[calc(48*var(--d))] py-[calc(64*var(--d))] pl-[calc(53*var(--d))]">
        <DesktopRow title="MTN TV+ Shorts" after={<NewBadge />} gap={40}>
          {data.shorts.map((s) => <ShortCircle key={s.id} item={s} />)}
        </DesktopRow>

        <DesktopRow title="Keep Watching">
          {data.keepWatching.map((k) => <WideCard key={k.id} item={k} />)}
        </DesktopRow>

        <DesktopRow title="Because You Watched">
          {data.becauseYouWatched.map((t) => <PosterCard key={t.id} item={t} />)}
        </DesktopRow>

        <DesktopRow title="Live On Tv Now" before={<LiveDot />}>
          {data.liveNow.map((l) => <WideCard key={l.id} item={l} live />)}
        </DesktopRow>

        {/* Promo band: full width (it cancels the 53px left margin) */}
        <img src={data.promo.image} alt={data.promo.title} className="-ml-[calc(53*var(--d))] w-[calc(100%+53*var(--d))] object-cover" />

        <DesktopRow title="Top 10 Movies">
          {data.topTen.map((t, i) => <PosterCard key={t.id} item={t} rank={i + 1} />)}
        </DesktopRow>

        <DesktopRow title="Genres" showArrow={false}>
          {data.genres.map((g) => <GenreCard key={g.id} item={g} />)}
        </DesktopRow>

        <DesktopRow title="New Releases on MTN TV+">
          {data.newReleases.map((t) => <PosterCard key={t.id} item={t} />)}
        </DesktopRow>

        <DesktopRow title="Browse Live Channels">
          {data.liveChannels.map((c) => <ChannelCard key={c.id} item={c} />)}
        </DesktopRow>

        <DesktopRow title="Only on MTN TV+" showArrow={false} gap={24}>
          {data.onlyOnMtn.map((t) => <PosterCard key={t.id} item={t} width={375} height={518} />)}
        </DesktopRow>
      </div>
    </div>
  )
}
