// Subscription History (/subscription-history) — WONA's SubscriptionHistoryPage in MTN TV+ colours.
// Title + "Available Packs" link · History / Active Subscriptions chips · one row per bundle bought
// (name, date · price · status). On Active, each row has Cancel, which asks first.
// No bundles → a card with "Browse Packs". Signed out → asks you to log in.
// Phone: back button, small sizes. Desktop (md: classes): grey page, centred 900-design-px column.
// Sample rows until the CRM purchase-history call is wired in Step 3.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ChevronLeft, X } from 'lucide-react'
import { isSignedIn } from '@/sign-in-and-sign-up/session.js'
import { sampleHistory } from '@/my-account/account-sample-data.js'

// "?empty" in the address shows the no-bundles card, for testing (as in WONA)
const previewEmpty = () => new URLSearchParams(window.location.search).has('empty')

const yellowButton =
  'flex h-10 items-center rounded-full bg-brand px-5 text-[13px] font-semibold text-black hover:opacity-90 md:h-[calc(48*var(--d))] md:px-[calc(28*var(--d))] md:text-[calc(16*var(--d))]'

// "Cancel Daily Max?" pop-up. Cancelling on the server comes in Step 3, so "Yes" just says so.
function CancelDialog({ sub, onClose }) {
  const [done, setDone] = useState(false)
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-5" onClick={onClose}>
      {/* stopPropagation: clicks inside the box shouldn't close it */}
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#111] p-5 md:max-w-[calc(480*var(--d))] md:p-[calc(28*var(--d))]">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-3 right-3 text-white/50 hover:text-white">
          <X size={18} />
        </button>
        <h2 className="pr-6 text-base font-semibold md:text-[calc(20*var(--d))]">{done ? 'Not switched on yet' : `Cancel ${sub.name}?`}</h2>
        <p className="mt-2 text-xs text-white/60 md:text-[calc(15*var(--d))]">
          {done
            ? "Cancelling is connected with the server work, so nothing has changed yet."
            : `It won't renew again. You can keep watching until the end of the current period.`}
        </p>
        <div className="mt-5 flex gap-2.5 md:mt-[calc(24*var(--d))] md:gap-[calc(12*var(--d))]">
          {done ? (
            <button type="button" onClick={onClose} className={`flex-1 justify-center ${yellowButton}`}>
              OK
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                className="h-10 flex-1 rounded-full border border-white/30 text-[13px] md:h-[calc(48*var(--d))] md:text-[calc(16*var(--d))]"
              >
                Keep it
              </button>
              <button
                type="button"
                onClick={() => setDone(true)}
                className="h-10 flex-1 rounded-full bg-[#d92d20] text-[13px] font-semibold md:h-[calc(48*var(--d))] md:text-[calc(16*var(--d))]"
              >
                Yes, cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SubscriptionHistoryPage() {
  const navigate = useNavigate()
  const signedIn = isSignedIn()
  const [activeOnly, setActiveOnly] = useState(false)
  const [cancelling, setCancelling] = useState(null) // the row being cancelled, or null

  const all = previewEmpty() ? [] : sampleHistory
  const rows = activeOnly ? all.filter((s) => s.status === 'Active') : all

  return (
    // md: = desktop. The outer div paints the page grey; the inner one is the centred column.
    <div className="min-h-screen md:bg-[#1b1b1b]">
      <div className="px-page pt-[68px] pb-6 md:mx-auto md:max-w-[calc(900*var(--d))] md:px-0 md:pt-[calc(48*var(--d))] md:pb-[calc(96*var(--d))]">
        <div className="flex items-center gap-3 md:items-baseline">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/80 md:hidden"
          >
            <ChevronLeft size={18} className="text-brand" />
          </button>
          <h1 className="flex-1 text-lg font-bold italic md:text-[calc(36*var(--d))]">Subscriptions</h1>
          <Link to="/bundles" className="shrink-0 text-xs text-brand hover:underline md:text-[calc(16*var(--d))]">
            Available Packs
          </Link>
        </div>

        {!signedIn ? (
          <div className="mt-5 flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 md:mt-[calc(32*var(--d))] md:gap-[calc(16*var(--d))] md:rounded-[calc(24*var(--d))] md:p-[calc(40*var(--d))]">
            <p className="text-[13px] text-white/90 md:text-[calc(16*var(--d))]">Log in to see the bundles you've bought.</p>
            <Link to="/signin" className={yellowButton}>
              Log in or sign up
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-5 flex gap-2 md:mt-[calc(32*var(--d))] md:gap-[calc(12*var(--d))]">
              {[
                { label: 'History', value: false },
                { label: 'Active Subscriptions', value: true },
              ].map((t) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setActiveOnly(t.value)}
                  className={`rounded-full px-3.5 py-2 text-xs md:px-[calc(20*var(--d))] md:py-[calc(10*var(--d))] md:text-[calc(16*var(--d))] ${
                    activeOnly === t.value ? 'bg-brand font-semibold text-black' : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {rows.length > 0 ? (
              <div className="mt-3.5 flex flex-col gap-2 md:mt-[calc(24*var(--d))] md:gap-[calc(12*var(--d))]">
                {rows.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-[11px] md:rounded-[calc(16*var(--d))] md:px-[calc(24*var(--d))] md:py-[calc(18*var(--d))]"
                  >
                    <div className="flex min-w-0 flex-col gap-1.5 md:gap-[calc(8*var(--d))]">
                      <span className="text-sm leading-none font-semibold md:text-[calc(18*var(--d))]">{sub.name}</span>
                      <span className="text-[11px] leading-none text-white/55 md:text-[calc(14*var(--d))]">
                        {sub.date} · {sub.currency} {sub.price.toFixed(2)} ·{' '}
                        <span className={sub.status === 'Active' ? 'text-[#53cf7b]' : ''}>{sub.status}</span>
                      </span>
                    </div>
                    {activeOnly && (
                      <button
                        type="button"
                        onClick={() => setCancelling(sub)}
                        className="shrink-0 rounded-full border border-white/30 px-3.5 py-2 text-xs hover:bg-white/10 md:px-[calc(20*var(--d))] md:py-[calc(10*var(--d))] md:text-[calc(15*var(--d))]"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3.5 flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 md:mt-[calc(24*var(--d))] md:gap-[calc(16*var(--d))] md:rounded-[calc(24*var(--d))] md:p-[calc(40*var(--d))]">
                <p className="text-[13px] leading-relaxed text-white/90 md:text-[calc(16*var(--d))]">
                  You have no {activeOnly ? 'active ' : ''}subscriptions. Choose a bundle from the available packs to enjoy MTN TV+.
                </p>
                <Link to="/bundles" className={yellowButton}>
                  Browse Packs
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {cancelling && <CancelDialog sub={cancelling} onClose={() => setCancelling(null)} />}
    </div>
  )
}
