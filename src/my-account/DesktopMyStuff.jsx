// My Stuff on desktop — WONA's web My Stuff page in MTN TV+ colours:
//   "My Stuff" title + line · All / Movies / Tv Shows chips and Sort by · a wrapping grid of
//   250-wide posters (thin yellow bar = how much you've watched) with the title and a Remove button.
// Nothing saved (or "?empty" in the address) → the "Your list is empty" card.
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Plus } from 'lucide-react'
import { useMyStuff, removeFromMyStuff, sortTitles } from './my-stuff-store.js'
import { detailsPath } from '@/helpers/details-path.js'
import { previewEmpty } from './account-sample-data.js'
import { DesktopPage, DesktopPageTitle, FilterTabs, SortMenu, EmptyState } from './AccountUi.jsx'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'movie', label: 'Movies' },
  { id: 'show', label: 'Tv Shows' },
]

export default function DesktopMyStuff() {
  const navigate = useNavigate()
  const saved = useMyStuff()
  const [tab, setTab] = useState('all')
  const [sort, setSort] = useState('added')

  const empty = previewEmpty() || saved.length === 0
  const shown = sortTitles(
    saved.filter((t) => tab === 'all' || t.type === tab),
    sort,
  )

  return (
    <DesktopPage>
      <DesktopPageTitle
        title={
          <>
            My <span className="text-brand">Stuff</span>
          </>
        }
        subtitle="Everything you've saved to watch later"
      />

      {empty ? (
        <EmptyState
          desktop
          icon={<Plus className="size-[calc(36*var(--d))]" strokeWidth={2.4} />}
          title="Your list is empty"
          body="Click the + button on any movie or show to save it here for later."
          howToTitle="How to add to My Stuff"
          steps={[
            'Open any movie or Tv show',
            <>
              Click the <b className="text-brand">+ My Stuff</b> button next to the play button
            </>,
            "It appears here and you can watch whenever you're ready",
          ]}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <FilterTabs desktop tabs={TABS} value={tab} onChange={setTab} />
            <SortMenu desktop value={sort} onChange={setSort} />
          </div>

          {shown.length === 0 ? (
            <p className="py-[calc(48*var(--d))] text-[calc(16*var(--d))] text-white/60">Nothing saved here yet.</p>
          ) : (
            <div className="flex flex-wrap gap-x-[calc(23*var(--d))] gap-y-[calc(32*var(--d))]">
              {shown.map((t) => (
                <div key={t.id} className="group flex w-[calc(250*var(--d))] flex-col gap-[calc(10*var(--d))]">
                  <button
                    type="button"
                    onClick={() => navigate(detailsPath(t))}
                    aria-label={`Open ${t.title}`}
                    className="relative aspect-[2/3] w-full overflow-hidden rounded-[calc(10*var(--d))]"
                  >
                    {/* the picture grows a little when the mouse is over the card */}
                    <img src={t.image} alt={t.title} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    {t.progress > 0 && (
                      <span className="absolute inset-x-0 bottom-0 h-[calc(5*var(--d))] bg-white/20">
                        <span className="block h-full bg-brand" style={{ width: `${t.progress}%` }} />
                      </span>
                    )}
                  </button>
                  <div className="flex items-start justify-between gap-[calc(8*var(--d))]">
                    <div className="flex min-w-0 flex-col gap-[calc(2*var(--d))]">
                      <span className="truncate text-[calc(16*var(--d))] font-semibold">{t.title}</span>
                      <span className="truncate text-[calc(13*var(--d))] text-white/60">{t.metadata}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromMyStuff(t.id)}
                      className="shrink-0 rounded-full bg-white/10 px-[calc(12*var(--d))] py-[calc(5*var(--d))] text-[calc(12*var(--d))] text-white/80 hover:bg-live/25 hover:text-[#f97066]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </DesktopPage>
  )
}
