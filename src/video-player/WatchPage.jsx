// The watch page (/watch/:kind/:id) — where every Watch Now, episode and live channel goes.
// Same order as WONA's WatchPage:
//   1. Signed out?  The SignedInOnly guard (in AppRouter) has already sent the person to Sign In,
//      and brings them back here afterwards.
//   2. Ask the CRM if they have a bundle running (trailers skip this: they're free).
//   3. No bundle → "You have no active bundle" with a Get Bundle button (→ /bundles).
//      Bundle → the player. The real player comes with the real catalogue (Step 5), so for now
//      this shows a placeholder where the video will be.
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router'
import { ArrowLeft, LoaderCircle, Play, TriangleAlert } from 'lucide-react'
import { checkActiveBundle } from '@/bundles/active-bundle.js'

export default function WatchPage() {
  const { kind, id } = useParams()
  const [params] = useSearchParams()
  const title = params.get('title') || 'This title'
  const navigate = useNavigate()
  const isTrailer = kind === 'trailer'
  // 'checking' | 'active' | 'none' | 'error'
  const [bundle, setBundle] = useState(isTrailer ? 'active' : 'checking')
  const [attempt, setAttempt] = useState(0) // "Try again" bumps this to ask once more

  useEffect(() => {
    if (isTrailer) return
    let stillHere = true // ignore a late answer if the person has already left the page
    checkActiveBundle().then((answer) => stillHere && setBundle(answer))
    return () => {
      stillHere = false
    }
  }, [isTrailer, id, attempt])

  const tryAgain = () => {
    setBundle('checking')
    setAttempt((n) => n + 1)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Back"
        className="absolute top-4 left-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 md:top-[calc(32*var(--d))] md:left-[calc(53*var(--d))] md:size-[calc(52*var(--d))]"
      >
        <ArrowLeft className="size-5 md:size-[calc(26*var(--d))]" />
      </button>

      <div className="flex flex-1 items-center justify-center px-8 text-center">
        {bundle === 'checking' && (
          <LoaderCircle className="size-10 animate-spin text-brand md:size-[calc(56*var(--d))]" aria-label="Checking your bundle" />
        )}

        {bundle === 'none' && (
          <Message
            title="You have no active bundle"
            text="Choose a bundle from the list to enjoy MTN TV+ movies, shows and live channels."
          >
            <Link to="/bundles" className={yellowButton}>
              Get Bundle
            </Link>
          </Message>
        )}

        {bundle === 'error' && (
          <Message icon title="We couldn't check your bundle" text="Check your connection and try again.">
            <button type="button" onClick={tryAgain} className={yellowButton}>
              Try again
            </button>
          </Message>
        )}

        {bundle === 'active' && (
          // Placeholder until the real player (Step 5)
          <Message title={isTrailer ? `${title} · Trailer` : title} text="The video player arrives with the real catalogue.">
            <span className="flex size-16 items-center justify-center rounded-full border-2 border-brand md:size-[calc(88*var(--d))]">
              <Play className="ml-1 size-7 text-brand md:size-[calc(36*var(--d))]" fill="currentColor" />
            </span>
          </Message>
        )}
      </div>
    </div>
  )
}

const yellowButton =
  'flex h-12 min-w-40 items-center justify-center rounded-full bg-brand px-8 text-base font-semibold text-black hover:opacity-90 md:h-[calc(60*var(--d))] md:min-w-[calc(220*var(--d))] md:text-[calc(18*var(--d))]'

function Message({ icon, title, text, children }) {
  return (
    <div className="flex max-w-sm flex-col items-center gap-3 md:max-w-[calc(560*var(--d))] md:gap-[calc(16*var(--d))]">
      {icon && <TriangleAlert className="size-9 text-brand md:size-[calc(48*var(--d))]" />}
      <h1 className="text-xl font-bold md:text-[calc(32*var(--d))]">{title}</h1>
      <p className="text-sm text-white/65 md:text-[calc(18*var(--d))]">{text}</p>
      <div className="mt-3 md:mt-[calc(16*var(--d))]">{children}</div>
    </div>
  )
}
