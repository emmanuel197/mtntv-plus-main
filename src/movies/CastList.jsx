// The "Cast" row on the details pages: round photos with the actor's name and role under them.
// It scrolls sideways when there are more people than fit. (WONA's details page had no cast row;
// the look comes from WONA's "Lead Casts" on its TVOD title screen.)
export function DesktopCastList({ cast }) {
  if (cast.length === 0) return null
  return (
    <section className="flex flex-col gap-[calc(30*var(--d))]">
      <h2 className="text-[calc(28*var(--d))] font-bold italic">Cast</h2>
      <div className="no-scrollbar flex gap-[calc(40*var(--d))] overflow-x-auto pr-[calc(53*var(--d))]">
        {cast.map((person) => (
          <div key={person.name} className="flex w-[calc(160*var(--d))] shrink-0 flex-col items-center gap-[calc(6*var(--d))] text-center">
            <img src={person.photo} alt="" loading="lazy" className="mb-[calc(8*var(--d))] size-[calc(140*var(--d))] rounded-full object-cover" />
            <span className="text-[calc(18*var(--d))] font-semibold">{person.name}</span>
            <span className="text-[calc(16*var(--d))] text-muted">{person.role}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function PhoneCastList({ cast }) {
  if (cast.length === 0) return null
  return (
    <section>
      <h2 className="px-page text-lg leading-[22px] font-bold italic">Cast</h2>
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-page">
        {cast.map((person) => (
          <div key={person.name} className="flex w-[84px] shrink-0 flex-col items-center gap-1 text-center">
            <img src={person.photo} alt="" loading="lazy" className="mb-1.5 size-[72px] rounded-full object-cover" />
            <span className="text-[11px] leading-tight">{person.name}</span>
            <span className="text-[11px] leading-tight text-muted">{person.role}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
