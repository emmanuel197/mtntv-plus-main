// My Stuff on phones — WONA's mobile My Stuff (comps More8–More13) in MTN TV+ colours:
//   back + "My Stuff" header (Edit on the right) · All / Movies / Tv Shows chips · "Sort by  Date Added ⌄"
//   · Movies and TV Shows rows with counts. Choosing one filter shows that group as a 3-across grid.
// Edit shows a × on each poster to remove it (WONA's phone screen had no remove; added for parity
// with desktop). Nothing saved (or "?empty") → "Your list is empty".
// WONA's Premieres group is left out: MTN TV+ has no premieres.
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Plus, X } from 'lucide-react'
import { useMyStuff, removeFromMyStuff, sortTitles } from './my-stuff-store.js'
import { detailsPath } from '@/helpers/details-path.js'
import { previewEmpty } from './account-sample-data.js'
import { PhoneHeader, FilterTabs, SortMenu, PhoneSection, PhonePoster, EmptyState } from './AccountUi.jsx'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'movie', label: 'Movies' },
  { id: 'show', label: 'Tv Shows' },
]

export default function PhoneMyStuff() {
  const navigate = useNavigate()
  const saved = useMyStuff()
  const [tab, setTab] = useState('all')
  const [sort, setSort] = useState('added')
  const [editing, setEditing] = useState(false)

  const empty = previewEmpty() || saved.length === 0
  const single = tab !== 'all' // one filter chosen → grid
  const sections = [
    { id: 'movie', title: 'Movies', list: sortTitles(saved.filter((t) => t.type === 'movie'), sort) },
    { id: 'show', title: 'TV Shows', list: sortTitles(saved.filter((t) => t.type === 'show'), sort) },
  ].filter((s) => (single ? s.id === tab : s.list.length > 0))

  return (
    <div className="pt-[52px] pb-6">
      <PhoneHeader
        title="My Stuff"
        right={
          !empty && (
            <button type="button" onClick={() => setEditing((v) => !v)} className="text-[13px] font-medium text-brand">
              {editing ? 'Done' : 'Edit'}
            </button>
          )
        }
      />

      {empty ? (
        <EmptyState
          icon={<Plus size={30} strokeWidth={2.4} />}
          title="Your list is empty"
          body="Tap the + button on any movie or show to save it here for later."
          howToTitle="How to add to My Stuff"
          steps={[
            'Open any movie or Tv show',
            <>
              Tap the <b className="text-brand">+ My Stuff</b> button next to the play button
            </>,
            "It appears here and you can watch whenever you're ready",
          ]}
        />
      ) : (
        <>
          <div className="px-[21px]">
            <FilterTabs tabs={TABS} value={tab} onChange={setTab} />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-white/80">Sort by</span>
              <SortMenu value={sort} onChange={setSort} />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-9">
            {sections.map((s) => (
              <PhoneSection key={s.id} title={s.title} count={s.list.length} grid={single} onMore={single ? undefined : () => setTab(s.id)}>
                {s.list.length === 0 ? (
                  <p className="col-span-3 text-[13px] text-white/50">Nothing saved here yet.</p>
                ) : (
                  s.list.map((t) => (
                    <PhonePoster key={t.id} title={t.title} image={t.image} fluid={single} onClick={() => navigate(detailsPath(t))}>
                      {editing && (
                        <button
                          type="button"
                          aria-label={`Remove ${t.title}`}
                          onClick={() => removeFromMyStuff(t.id)}
                          className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-black/75 text-white"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </PhonePoster>
                  ))
                )}
              </PhoneSection>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
