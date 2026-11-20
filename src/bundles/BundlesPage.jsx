// Get Bundle (/bundles) — WONA's "Choose your plan" screen in MTN TV+ colours (no MTN TV+ design exists).
// Title + Subscription History link, one card per plan, the small print at the bottom.
// Subscribing needs an account: signed-out people get the "Join the conversation" sign-in sheet.
// Desktop (md: classes, like WONA's responsive page): grey page, centred column, no back button,
// bigger title, and the cards sit side by side in a row that wraps. Phone layout unchanged.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ChevronLeft } from 'lucide-react'
import { env } from '@/app-settings/env.js'
import { isSignedIn } from '@/sign-in-and-sign-up/session.js'
import SignInPrompt from '@/sign-in-and-sign-up/SignInPrompt.jsx'
import PlanCard from './PlanCard.jsx'
import SubscribeDialog from './SubscribeDialog.jsx'
import { bundlePlans, isMtnOperator } from './bundle-plans.js'

export default function BundlesPage() {
  const navigate = useNavigate()
  const [chosenPlan, setChosenPlan] = useState(null)
  const [askSignIn, setAskSignIn] = useState(false)
  const isMtn = isMtnOperator(env.usernamePrefix)

  const subscribe = (plan) => (isSignedIn() ? setChosenPlan(plan) : setAskSignIn(true))

  return (
    // md: = desktop. The outer div paints the page grey; the inner one is the centred column.
    <div className="min-h-screen md:bg-[#1b1b1b]">
      <div className="px-page pt-[68px] md:mx-auto md:max-w-[calc(1306*var(--d))] md:px-[calc(53*var(--d))] md:pt-[calc(48*var(--d))] md:pb-[calc(96*var(--d))]">
        <div className="flex items-center gap-3 md:items-baseline">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/80 md:hidden"
          >
            <ChevronLeft size={18} className="text-brand" />
          </button>
          <h1 className="flex-1 text-lg font-bold whitespace-nowrap italic md:text-[calc(36*var(--d))]">Choose your plan</h1>
          <Link to="/subscription-history" className="shrink-0 text-[11px] text-brand hover:underline md:text-[calc(16*var(--d))]">
            Subscription History
          </Link>
        </div>

        {/* phone: one column · desktop: 360-wide cards in a row that wraps */}
        <div className="mt-5 flex flex-col gap-3.5 md:mt-[calc(32*var(--d))] md:flex-row md:flex-wrap md:gap-[calc(24*var(--d))]">
          {bundlePlans.map((plan) => (
            <PlanCard key={plan.uid} plan={plan} showDataBonus={isMtn} onSubscribe={() => subscribe(plan)} />
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-1 text-[11px] text-white/45 md:mt-[calc(32*var(--d))] md:gap-[calc(4*var(--d))] md:text-[calc(14*var(--d))]">
          <p>MTN TV+ Terms of Use apply for all bundles</p>
          <p>*Data bundles are available only for MTN subscribers</p>
        </div>

        {chosenPlan && <SubscribeDialog plan={chosenPlan} isMtn={isMtn} onClose={() => setChosenPlan(null)} />}
        {askSignIn && <SignInPrompt onClose={() => setAskSignIn(false)} />}
      </div>
    </div>
  )
}
