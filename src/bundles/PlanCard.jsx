// One bundle: name + validity pill, price in yellow, what's included (✓ list), Subscribe button.
// From WONA's SubscriptionCard (no MTN TV+ design exists), in MTN TV+ colours.
import { Check } from 'lucide-react'

export default function PlanCard({ plan, showDataBonus, onSubscribe }) {
  const details = showDataBonus ? plan.details : plan.details.filter((d) => !/data bonus/i.test(d))

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-[18px]">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold italic">{plan.name}</h3>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-white/60">{plan.validity}</span>
      </div>
      <p className="text-lg font-bold text-brand">
        {plan.currency} {plan.price.toFixed(2)}
      </p>
      <ul className="flex flex-col gap-1.5">
        {details.map((d) => (
          <li key={d} className="flex items-start gap-1.5 text-xs text-white/90">
            <Check size={14} className="mt-px shrink-0 text-brand" />
            {d}
          </li>
        ))}
      </ul>
      <button type="button" onClick={onSubscribe} className="mt-1 h-10 rounded-full bg-brand text-sm font-semibold text-black">
        Subscribe
      </button>
    </div>
  )
}
