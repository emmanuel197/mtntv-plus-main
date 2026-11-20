// Shown on /movie/<id> or /series/<id> when no title has that id.
import { Link } from 'react-router'

export default function TitleNotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center md:gap-[calc(20*var(--d))]">
      <h1 className="text-2xl font-bold italic md:text-[calc(40*var(--d))]">Title not found</h1>
      <p className="text-sm text-muted md:text-[calc(20*var(--d))]">We couldn&apos;t find this movie or series.</p>
      <Link
        to="/"
        className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-black md:px-[calc(28*var(--d))] md:py-[calc(12*var(--d))] md:text-[calc(18*var(--d))]"
      >
        Go home
      </Link>
    </section>
  )
}
