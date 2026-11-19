// Shown when the address doesn't match any page.
import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <Link to="/" className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-black">
        Go home
      </Link>
    </section>
  )
}
