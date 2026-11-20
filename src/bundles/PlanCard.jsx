// One bundle: name + validity pill, price in yellow, what's included (✓ list), Subscribe button.
// From WONA's SubscriptionCard (no MTN TV+ design exists), in MTN TV+ colours.
// Phone: full width. Desktop (md: classes): 360 design px wide with bigger text, as in WONA.
import { Check } from 'lucide-react'

export default function PlanCard({ plan, showDataBonus, onSubscribe }) {
  const details = showDataBonus ? plan.details : plan.details.filter((d) => !/data bonus/i.test(d))

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-[18px] md:w-[calc(360*var(--d))] md:gap-[calc(16*var(--d))] md:rounded-[calc(24*var(--d))] md:p-[calc(32*var(--d))]">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold italic md:text-[calc(22*var(--d))]">{plan.name}</h3>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-white/60 md:px-[calc(12*var(--d))] md:py-[calc(4*var(--d))] md:text-[calc(13*var(--d))]">{plan.validity}</span>
      </div>
      <p className="text-lg font-bold text-brand md:text-[calc(28*var(--d))]">
        {plan.currency} {plan.price.toFixed(2)}
      </p>
      {/* flex-1 on desktop pushes Subscribe to the bottom, so buttons line up across a row */}
      <ul className="flex flex-col gap-1.5 md:flex-1 md:gap-[calc(10*var(--d))]">
        {details.map((d) => (
          <li key={d} className="flex items-start gap-1.5 text-xs text-white/90 md:gap-[calc(8*var(--d))] md:text-[calc(16*var(--d))]">
            <Check size={14} className="mt-px shrink-0 text-brand md:mt-[calc(2*var(--d))] md:size-[calc(18*var(--d))]" />
            {d}
          </li>
        ))}
      </ul>
      <button type="button" onClick={onSubscribe} className="mt-1 h-10 rounded-full bg-brand text-sm font-semibold text-black hover:opacity-90 md:mt-[calc(8*var(--d))] md:h-[calc(52*var(--d))] md:text-[calc(16*var(--d))]">
        Subscribe
      </button>
    </div>
  )
}
