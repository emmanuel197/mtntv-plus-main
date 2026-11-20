// The pop-up after tapping Subscribe — WONA/AfriPlay's purchase steps:
//   1. (daily plans only) choose Auto-Renewal or On-Demand
//   2. "Are you sure you want to continue?" + "You will be billed …" + email for the receipt
//   3. Continue → buy. Buying (the CRM purchase call and MTN's billing page) arrives with the
//      server work in Step 3, so for now step 3 says so instead of pretending to charge.
import { useState } from 'react'
import { X } from 'lucide-react'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SubscribeDialog({ plan, isMtn, onClose }) {
  const ids = plan.productId[isMtn ? 'mtn' : 'other']
  const hasKinds = typeof ids === 'object' && ids['auto-renewal'] && ids['on-demand'] && ids['auto-renewal'] !== ids['on-demand']
  const [kind, setKind] = useState(null) // 'auto-renewal' | 'on-demand'
  const [email, setEmail] = useState('')
  const [tried, setTried] = useState(false)
  const [done, setDone] = useState(false)

  const emailOk = EMAIL.test(email)
  const productId = typeof ids === 'object' ? ids[kind ?? 'auto-renewal'] : ids
  const choosing = hasKinds && !kind

  const confirm = () => {
    setTried(true)
    if (emailOk) setDone(true)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-5" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#111] p-5">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-3 right-3 text-white/50 hover:text-white">
          <X size={18} />
        </button>

        {done ? (
          <>
            <h2 className="pr-6 text-base font-semibold">Almost there</h2>
            <p className="mt-2 text-xs text-white/60">
              You chose {plan.name} ({plan.currency} {plan.price.toFixed(2)}
              {kind ? `, ${kind.replace('-', ' ')}` : ''}). Paying isn't switched on yet — it's connected with the server
              work. Product id: {productId}.
            </p>
            <button type="button" onClick={onClose} className="mt-5 h-10 w-full rounded-full bg-brand text-sm font-semibold text-black">
              OK
            </button>
          </>
        ) : choosing ? (
          <>
            <h2 className="pr-6 text-base font-semibold">
              You have selected the {plan.name} Pack for {plan.currency} {plan.price.toFixed(2)}
            </h2>
            <div className="mt-5 flex gap-2.5">
              <button type="button" onClick={() => setKind('auto-renewal')} className="h-10 flex-1 rounded-full bg-brand text-[13px] font-semibold text-black">
                Auto-Renewal
              </button>
              <button type="button" onClick={() => setKind('on-demand')} className="h-10 flex-1 rounded-full border border-white/30 text-[13px]">
                On-Demand
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="pr-6 text-base font-semibold">{kind ? `Continue with the ${kind} option?` : 'Are you sure you want to continue?'}</h2>
            <p className="mt-1.5 text-xs text-white/55">
              You will be billed {plan.currency} {plan.price.toFixed(2)} for the {plan.name} subscription
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-4 h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm outline-none focus:border-brand"
            />
            {tried && !emailOk && <p className="mt-1.5 text-xs text-[#f97066]">Enter a valid email</p>}
            <div className="mt-5 flex gap-2.5">
              <button
                type="button"
                onClick={kind ? () => setKind(null) : onClose}
                className="h-10 flex-1 rounded-full border border-white/30 text-[13px]"
              >
                {kind ? 'Back' : 'Cancel'}
              </button>
              <button type="button" onClick={confirm} className="h-10 flex-1 rounded-full bg-brand text-[13px] font-semibold text-black">
                Continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
