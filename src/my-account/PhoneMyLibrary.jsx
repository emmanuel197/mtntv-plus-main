// My Library on phones — WONA's mobile My Library (comps More6, More7, More14, More15) in MTN TV+
// colours: back + "My Library" header · All / Rentals / Purchased chips and "Sort by ⌄" ·
// Active Rentals (expiry badge, play circle, progress) · Owned Titles · Expired Rentals (red pill)
// · New Releases on MTN TV+. Nothing rented or bought (or "?empty") → "Your library is empty".
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Clock, Library, Play } from 'lucide-react'
import { sortTitles } from './my-stuff-store.js'
import { detailsPath } from '@/helpers/details-path.js'
import { activeRentals, ownedTitles, expiredRentals, newReleases, expiresLabel, previewEmpty } from './account-sample-data.js'
import { PhoneHeader, FilterTabs, SortMenu, PhoneSection, PhonePoster, EmptyState } from './AccountUi.jsx'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'rentals', label: 'Rentals' },
  { id: 'purchased', label: 'Purchased' },
]

// Thin bar along the bottom of a card showing how much has been watched
const Progress = ({ value, track = 'bg-white/25' }) => (
  <span className={`absolute inset-x-0 bottom-0 h-1 ${track}`}>
    <span className="block h-full rounded-full bg-brand" style={{ width: `${value}%` }} />
  </span>
)

// 198×129 picture: "EXPIRES IN 32H" badge, play circle, title, "85% watched · 14 min left"
function ActiveRentalCard({ rental, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Continue ${rental.title}`}
      className="relative h-[129px] w-[198px] shrink-0 overflow-hidden rounded-[4.5px] border border-white/70 text-left"
    >
      <img src={rental.image} alt="" className="absolute inset-0 size-full object-cover" />
      <span className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/90" />
      <span className="absolute top-[9px] left-[11px] flex h-[25px] items-center gap-[5px] rounded-lg border border-white/30 bg-black/40 px-2 text-[10px] font-semibold text-brand">
        <Clock size={12} />
        {expiresLabel(rental.expiresAt)}
      </span>
      <span className="absolute top-[47px] left-1/2 flex size-[34px] -translate-x-1/2 items-center justify-center rounded-full border-[1.5px] border-white bg-brand/10">
        <Play size={12} fill="currentColor" />
      </span>
      <span className="absolute inset-x-2 bottom-2.5 flex flex-col gap-0.5">
        <span className="truncate text-[13px] font-semibold">{rental.title}</span>
        <span className="truncate text-[10px] text-white/65">{`${rental.progress}% watched · ${rental.left}`}</span>
      </span>
      <Progress value={rental.progress} />
    </button>
  )
}

// 155×95 faded picture with a red "expired" pill and how far you got
function ExpiredCard({ title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Rent ${title.title} again`}
      className="relative h-[95px] w-[155px] shrink-0 overflow-hidden rounded-[4.5px] border border-white/70 text-left"
    >
      <img src={title.image} alt="" className="absolute inset-0 size-full object-cover object-top opacity-60 grayscale-[40%]" />
      <span className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/85" />
      <span className="absolute top-2 left-[11px] flex h-[15px] items-center gap-1 rounded-full bg-[#d92d20] px-1.5 text-[8px] font-semibold">
        <span className="size-[3px] rounded-full bg-white" />
        expired
      </span>
      <span className="absolute inset-x-1.5 bottom-2.5 truncate text-[13px] font-bold">{title.title}</span>
      <Progress value={title.progress} track="bg-white/80" />
    </button>
  )
}

export default function PhoneMyLibrary() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('all')
  const [sort, setSort] = useState('added')
  // Rentals open their title page; the real rent/buy screens (TVOD) come later
  const open = (t) => navigate(detailsPath(t))

  const sample = !previewEmpty()
  const active = sample ? sortTitles(activeRentals, sort, 'rentedAt') : []
  const owned = sample ? sortTitles(ownedTitles, sort, 'boughtAt') : []
  const expired = sample ? sortTitles(expiredRentals, sort, 'expiredAt') : []
  const empty = !active.length && !owned.length && !expired.length
  const show = (id) => tab === 'all' || tab === id

  return (
    <div className="pt-[52px] pb-6">
      <PhoneHeader title="My Library" />
      {empty ? (
        <EmptyState
          icon={<Library size={32} />}
          title="Your library is empty"
          body="Rent or buy any movie or show to start watching, and it'll show up here with easy access anytime."
          howToTitle="How to add to My Library"
          steps={[
            'Find a movie or show you want to rent or buy',
            'Tap Rent or Buy and complete your payment',
            'It appears here, ready to watch within your rental or purchase window',
          ]}
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-[21px]">
            <FilterTabs tabs={TABS} value={tab} onChange={setTab} />
            <SortMenu value={sort} onChange={setSort} variant="text" />
          </div>

          <div className="mt-6 flex flex-col gap-7">
            {show('rentals') && active.length > 0 && (
              <PhoneSection title="Active Rentals" onMore={tab === 'all' ? () => setTab('rentals') : undefined}>
                {active.map((r) => (
                  <ActiveRentalCard key={r.id} rental={r} onClick={() => open(r)} />
                ))}
              </PhoneSection>
            )}
            {show('purchased') && owned.length > 0 && (
              <PhoneSection title="Owned Titles" grid={tab === 'purchased'} onMore={tab === 'all' ? () => setTab('purchased') : undefined}>
                {owned.map((t) => (
                  <PhonePoster key={t.id} title={t.title} image={t.image} fluid={tab === 'purchased'} onClick={() => open(t)} />
                ))}
              </PhoneSection>
            )}
            {show('rentals') && expired.length > 0 && (
              <PhoneSection title="Expired Rentals">
                {expired.map((t) => (
                  <ExpiredCard key={t.id} title={t} onClick={() => open(t)} />
                ))}
              </PhoneSection>
            )}
            {tab === 'all' && (
              <PhoneSection title="New Releases on MTN TV+" onMore={() => navigate('/movies')}>
                {newReleases.map((t) => (
                  <PhonePoster key={t.id} title={t.title} image={t.image} onClick={() => open(t)} />
                ))}
              </PhoneSection>
            )}
          </div>
        </>
      )}
    </div>
  )
}
