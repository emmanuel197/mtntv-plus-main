// Everything on a details page once we know which title it is. Used by both MovieDetailsPage
// and SeriesDetailsPage (they only differ in the Episodes part, which shows when the title has seasons).
// Order (as WONA): hero → Episodes (series only) → Cast → More Like This.
// There is no video player yet, so Watch Now, Trailer and episodes show "Player coming soon".
// "+ My Stuff" adds to / removes from the shared My Stuff list (my-account/my-stuff-store.js).
import { useEffect, useState } from 'react'
import { useIsInMyStuff, toggleMyStuff } from '@/my-account/my-stuff-store.js'
import { titles } from '@/sample-content/catalog.js'
import { useIsDesktop } from '@/helpers/useIsDesktop.js'
import DesktopRow from '@/home/DesktopRow.jsx'
import ContentRow from '@/shared-ui/ContentRow.jsx'
import { DesktopDetailsHero, PhoneDetailsHero } from './DetailsHero.jsx'
import { DesktopEpisodeList, PhoneEpisodeList } from './EpisodeList.jsx'
import { DesktopCastList, PhoneCastList } from './CastList.jsx'
import { DesktopTitleCard, PhoneTitleCard } from './TitleCard.jsx'
import FlashMessage from './FlashMessage.jsx'
import { useFlashMessage } from './useFlashMessage.js'
import { getMoreLikeThis } from './movies-sample-data.js'

export default function TitleDetails({ details }) {
  const isDesktop = useIsDesktop()
  const inMyStuff = useIsInMyStuff(details.id)
  const [seasonIndex, setSeasonIndex] = useState(0)
  const [message, flash] = useFlashMessage()
  const moreLikeThis = getMoreLikeThis(details.id)

  // The browser doesn't scroll up by itself when the address changes, so opening a title from
  // "More Like This" would land half-way down the new page — jump to the top ourselves
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [details.id])

  const heroProps = {
    details,
    inMyStuff,
    onWatch: () => flash('Player coming soon'),
    onTrailer: () => flash('Trailer player coming soon'),
    onToggleMyStuff: () => {
      // Save the catalogue record (poster, title, year…), which is what the My Stuff page shows
      const record = Object.values(titles).find((t) => t.id === details.id) ?? details
      flash(toggleMyStuff(record) ? 'Added to My Stuff' : 'Removed from My Stuff')
    },
  }
  const episodeProps = {
    seasons: details.seasons,
    seasonIndex,
    onSeasonChange: setSeasonIndex,
    onPlay: (ep) => flash(`Player coming soon (E${ep.number} · ${ep.title})`),
  }

  if (isDesktop) {
    return (
      <div className="relative overflow-hidden bg-[#1b1b1b]">
        <DesktopDetailsHero {...heroProps} />
        <div className="relative flex flex-col gap-[calc(48*var(--d))] pt-[calc(16*var(--d))] pb-[calc(64*var(--d))] pl-[calc(53*var(--d))]">
          <DesktopEpisodeList {...episodeProps} />
          <DesktopCastList cast={details.cast} />
          {moreLikeThis.length > 0 && (
            <DesktopRow title="More Like This">
              {moreLikeThis.map((t) => <DesktopTitleCard key={t.id} item={t} />)}
            </DesktopRow>
          )}
        </div>
        <FlashMessage message={message} />
      </div>
    )
  }

  return (
    <div>
      <PhoneDetailsHero {...heroProps} />
      <div className="flex flex-col gap-7 pt-2 pb-6">
        <PhoneEpisodeList {...episodeProps} />
        <PhoneCastList cast={details.cast} />
        {moreLikeThis.length > 0 && (
          <ContentRow title="More Like This">
            {moreLikeThis.map((t) => <PhoneTitleCard key={t.id} item={t} />)}
          </ContentRow>
        )}
      </div>
      <FlashMessage message={message} />
    </div>
  )
}
