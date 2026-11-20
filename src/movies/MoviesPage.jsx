// The Movies page (/movies), ported from WONA's MoviesPage.
// Top: the page title and genre chips (All, Action, Comedy, …). With "All" it shows rows of posters
// (New Releases, Top 10, Only on MTN TV+, Because You Watched); picking a genre shows every title in
// that genre as a grid. The picked genre lives in the address (/movies?category=drama), so the Home
// page's Genres cards can link straight to it and the browser Back button works.
// Desktop and phone get their own layout (see useIsDesktop). Every poster opens its details page.
import { useSearchParams } from 'react-router'
import { useIsDesktop } from '@/helpers/useIsDesktop.js'
import DesktopRow from '@/home/DesktopRow.jsx'
import ContentRow from '@/shared-ui/ContentRow.jsx'
import { DesktopTitleCard, PhoneTitleCard } from './TitleCard.jsx'
import { genres, movieRows, titlesInGenre } from './movies-sample-data.js'

export default function MoviesPage() {
  const isDesktop = useIsDesktop()
  const [searchParams, setSearchParams] = useSearchParams()

  // An unknown ?category= value is treated as "All"
  const genre = genres.find((g) => g.id === searchParams.get('category')) || null
  const gridTitles = genre ? titlesInGenre(genre.label) : []

  // replace: true → switching chips doesn't fill the Back button history with every tap
  const pickGenre = (id) => setSearchParams(id ? { category: id } : {}, { replace: true })

  const chips = [{ id: null, label: 'All' }, ...genres]

  if (isDesktop) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#1b1b1b]">
        {/* Soft yellow glow, like Home */}
        <span aria-hidden className="pointer-events-none absolute top-[calc(600*var(--d))] -left-[calc(200*var(--d))] size-[calc(700*var(--d))] rounded-full bg-brand/10 blur-[calc(200*var(--d))]" />

        <div className="relative flex flex-col gap-[calc(48*var(--d))] py-[calc(48*var(--d))] pl-[calc(53*var(--d))]">
          <div className="flex flex-col gap-[calc(24*var(--d))] pr-[calc(53*var(--d))]">
            <h1 className="text-[calc(40*var(--d))] leading-tight font-bold capitalize italic">{genre ? genre.label : 'Movies'}</h1>
            <div className="flex flex-wrap gap-[calc(14*var(--d))]">
              {chips.map((c) => {
                const active = (genre?.id ?? null) === c.id
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => pickGenre(c.id)}
                    className={`rounded-full px-[calc(22*var(--d))] capitalize py-[calc(10*var(--d))] text-[calc(18*var(--d))] transition-colors ${
                      active ? 'bg-brand font-medium text-black' : 'bg-[#262422] text-white hover:bg-[#3a3734]'
                    }`}
                  >
                    {c.label}
                  </button>
                )
              })}
            </div>
          </div>

          {genre ? (
            gridTitles.length > 0 ? (
              <div className="grid grid-cols-5 gap-[calc(23*var(--d))] pr-[calc(53*var(--d))]">
                {gridTitles.map((t) => <DesktopTitleCard key={t.id} item={t} fill />)}
              </div>
            ) : (
              <p className="text-[calc(20*var(--d))] text-muted">Nothing in {genre.label} yet.</p>
            )
          ) : (
            movieRows.map((row) => (
              <DesktopRow key={row.id} title={row.name}>
                {row.items.map((t, i) => <DesktopTitleCard key={t.id} item={t} rank={row.isTop10 ? i + 1 : undefined} />)}
              </DesktopRow>
            ))
          )}
        </div>
      </div>
    )
  }

  // ── Phone ──
  // 57px top padding leaves room for the floating logo bar (same as Live TV)
  return (
    <div className="pt-[57px]">
      <h1 className="px-page text-xl font-bold capitalize italic">{genre ? genre.label : 'Movies'}</h1>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-page">
        {chips.map((c) => {
          const active = (genre?.id ?? null) === c.id
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => pickGenre(c.id)}
              className={`h-8 shrink-0 rounded-full capitalize px-3.5 text-xs whitespace-nowrap ${active ? 'bg-brand font-medium text-black' : 'bg-white/10 text-white'}`}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      {genre ? (
        gridTitles.length > 0 ? (
          <div className="mt-6 grid grid-cols-3 gap-2.5 px-page">
            {gridTitles.map((t) => <PhoneTitleCard key={t.id} item={t} fill />)}
          </div>
        ) : (
          <p className="mt-6 px-page text-sm text-muted">Nothing in {genre.label} yet.</p>
        )
      ) : (
        <div className="mt-6 flex flex-col gap-7">
          {movieRows.map((row) => (
            <ContentRow key={row.id} title={row.name} arrow="bright">
              {row.items.map((t) => <PhoneTitleCard key={t.id} item={t} />)}
            </ContentRow>
          ))}
        </div>
      )}
    </div>
  )
}
