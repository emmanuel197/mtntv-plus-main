// My Library on desktop. WONA only had a phone design for this screen, so this is the same content
// laid out like the other web pages: "My Library" title · All / Rentals / Purchased chips and Sort by
// · Active Rentals (330×179 cards with expiry badge, play circle, progress) · Owned Titles (posters)
// · Expired Rentals (faded, red "expired" pill) · New Releases on MTN TV+ (a sideways row).
// Nothing rented or bought (or "?empty") → "Your library is empty".
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Clock, Library, Play } from 'lucide-react'
import { sortTitles } from './my-stuff-store.js'
import { detailsPath } from '@/helpers/details-path.js'
import { activeRentals, ownedTitles, expiredRentals, newReleases, expiresLabel, previewEmpty } from './account-sample-data.js'
import { DesktopPage, DesktopPageTitle, DesktopSectionTitle, FilterTabs, SortMenu, EmptyState } from './AccountUi.jsx'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'rentals', label: 'Rentals' },
  { id: 'purchased', label: 'Purchased' },
]

const Progress = ({ value, track = 'bg-white/25' }) => (
  <span className={`absolute inset-x-0 bottom-0 h-[calc(6*var(--d))] ${track}`}>
    <span className="block h-full bg-brand" style={{ width: `${value}%` }} />
  </span>
)

function ActiveRentalCard({ rental, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Continue ${rental.title}`}
      className="group relative h-[calc(179*var(--d))] w-[calc(330*var(--d))] shrink-0 overflow-hidden rounded-[calc(10*var(--d))] text-left"
    >
      <img src={rental.image} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <span className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/90" />
      <span className="absolute top-[calc(10*var(--d))] left-[calc(10*var(--d))] flex items-center gap-[calc(6*var(--d))] rounded-[calc(8*var(--d))] border border-white/30 bg-black/50 px-[calc(10*var(--d))] py-[calc(5*var(--d))] text-[calc(12*var(--d))] font-semibold text-brand">
        <Clock className="size-[calc(14*var(--d))]" />
        {expiresLabel(rental.expiresAt)}
      </span>
      <span className="absolute top-1/2 left-1/2 flex size-[calc(40*var(--d))] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/30">
        <Play className="size-[calc(16*var(--d))]" fill="currentColor" />
      </span>
      <span className="absolute inset-x-[calc(12*var(--d))] bottom-[calc(18*var(--d))] flex flex-col gap-[calc(4*var(--d))]">
        <span className="truncate text-[calc(18*var(--d))] font-semibold">{rental.title}</span>
        <span className="truncate text-[calc(13*var(--d))] text-white/65">{`${rental.progress}% watched · ${rental.left}`}</span>
      </span>
      <Progress value={rental.progress} />
    </button>
  )
}

function ExpiredCard({ title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Rent ${title.title} again`}
      className="relative h-[calc(179*var(--d))] w-[calc(330*var(--d))] shrink-0 overflow-hidden rounded-[calc(10*var(--d))] text-left"
    >
      <img src={title.image} alt="" className="absolute inset-0 size-full object-cover object-top opacity-60 grayscale-[40%]" />
      <span className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/85" />
      <span className="absolute top-[calc(10*var(--d))] left-[calc(10*var(--d))] flex items-center gap-[calc(5*var(--d))] rounded-full bg-[#d92d20] px-[calc(10*var(--d))] py-[calc(3*var(--d))] text-[calc(12*var(--d))] font-semibold">
        <span className="size-[calc(5*var(--d))] rounded-full bg-white" />
        expired
      </span>
      <span className="absolute inset-x-[calc(12*var(--d))] bottom-[calc(18*var(--d))] flex flex-col gap-[calc(4*var(--d))]">
        <span className="truncate text-[calc(18*var(--d))] font-bold">{title.title}</span>
        <span className="text-[calc(13*var(--d))] text-white/65">Click to rent again</span>
      </span>
      <Progress value={title.progress} track="bg-white/60" />
    </button>
  )
}

// Poster 250 wide (2:3) with the title and "2024 · 1h 53m" under it
function Poster({ title, onClick }) {
  return (
    <button type="button" onClick={onClick} className="group flex w-[calc(250*var(--d))] shrink-0 flex-col gap-[calc(10*var(--d))] text-left">
      <span className="aspect-[2/3] w-full overflow-hidden rounded-[calc(10*var(--d))]">
        <img src={title.image} alt={title.title} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </span>
      <span className="flex min-w-0 flex-col gap-[calc(2*var(--d))]">
        <span className="truncate text-[calc(16*var(--d))] font-semibold">{title.title}</span>
        <span className="truncate text-[calc(13*var(--d))] text-white/60">{title.metadata}</span>
      </span>
    </button>
  )
}

// "See all" link beside a section title (only on the All filter)
const SeeAll = ({ onClick }) => (
  <button type="button" onClick={onClick} className="text-[calc(16*var(--d))] text-brand hover:underline">
    See all
  </button>
)

const wrapRow = 'flex flex-wrap gap-x-[calc(23*var(--d))] gap-y-[calc(28*var(--d))]'

export default function DesktopMyLibrary() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('all')
  const [sort, setSort] = useState('added')
  const open = (t) => navigate(detailsPath(t))

  const sample = !previewEmpty()
  const active = sample ? sortTitles(activeRentals, sort, 'rentedAt') : []
  const owned = sample ? sortTitles(ownedTitles, sort, 'boughtAt') : []
  const expired = sample ? sortTitles(expiredRentals, sort, 'expiredAt') : []
  const empty = !active.length && !owned.length && !expired.length
  const show = (id) => tab === 'all' || tab === id

  return (
    <DesktopPage>
      <DesktopPageTitle
        title={
          <>
            My <span className="text-brand">Library</span>
          </>
        }
        subtitle="Movies and shows you've rented or bought"
      />

      {empty ? (
        <EmptyState
          desktop
          icon={<Library className="size-[calc(40*var(--d))]" />}
          title="Your library is empty"
          body="Rent or buy any movie or show to start watching, and it'll show up here with easy access anytime."
          howToTitle="How to add to My Library"
          steps={[
            'Find a movie or show you want to rent or buy',
            'Click Rent or Buy and complete your payment',
            'It appears here, ready to watch within your rental or purchase window',
          ]}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <FilterTabs desktop tabs={TABS} value={tab} onChange={setTab} />
            <SortMenu desktop value={sort} onChange={setSort} />
          </div>

          <div className="flex flex-col gap-[calc(48*var(--d))]">
            {show('rentals') && active.length > 0 && (
              <section className="flex flex-col gap-[calc(24*var(--d))]">
                <DesktopSectionTitle title="Active Rentals" count={active.length} right={tab === 'all' && <SeeAll onClick={() => setTab('rentals')} />} />
                <div className={wrapRow}>
                  {active.map((r) => (
                    <ActiveRentalCard key={r.id} rental={r} onClick={() => open(r)} />
                  ))}
                </div>
              </section>
            )}
            {show('purchased') && owned.length > 0 && (
              <section className="flex flex-col gap-[calc(24*var(--d))]">
                <DesktopSectionTitle title="Owned Titles" count={owned.length} right={tab === 'all' && <SeeAll onClick={() => setTab('purchased')} />} />
                <div className={wrapRow}>
                  {owned.map((t) => (
                    <Poster key={t.id} title={t} onClick={() => open(t)} />
                  ))}
                </div>
              </section>
            )}
            {show('rentals') && expired.length > 0 && (
              <section className="flex flex-col gap-[calc(24*var(--d))]">
                <DesktopSectionTitle title="Expired Rentals" count={expired.length} />
                <div className={wrapRow}>
                  {expired.map((t) => (
                    <ExpiredCard key={t.id} title={t} onClick={() => open(t)} />
                  ))}
                </div>
              </section>
            )}
            {tab === 'all' && (
              <section className="flex flex-col gap-[calc(24*var(--d))]">
                <DesktopSectionTitle title="New Releases on MTN TV+" right={<SeeAll onClick={() => navigate('/movies')} />} />
                <div className="no-scrollbar flex gap-[calc(23*var(--d))] overflow-x-auto">
                  {newReleases.map((t) => (
                    <Poster key={t.id} title={t} onClick={() => open(t)} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </>
      )}
    </DesktopPage>
  )
}
