// A stand-in for screens we haven't built yet, so every tab has something to show.
export default function PagePlaceholder({ title, note }) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-2 px-4 text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      {note && <p className="text-sm text-muted">{note}</p>}
    </section>
  )
}
