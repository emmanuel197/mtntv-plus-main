// Get Bundle (/bundles) — WONA's "Choose your plan" screen in MTN TV+ colours (no MTN TV+ design exists).
// Title + Subscription History link, one card per plan, the small print at the bottom.
// Subscribing needs an account: signed-out people get the "Join the conversation" sign-in sheet.
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
    <div className="px-page pt-[68px]">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/80"
        >
          <ChevronLeft size={18} className="text-brand" />
        </button>
        <h1 className="flex-1 text-lg font-bold whitespace-nowrap italic">Choose your plan</h1>
        <Link to="/subscription-history" className="shrink-0 text-[11px] text-brand">
          Subscription History
        </Link>
      </div>

      <div className="mt-5 flex flex-col gap-3.5">
        {bundlePlans.map((plan) => (
          <PlanCard key={plan.uid} plan={plan} showDataBonus={isMtn} onSubscribe={() => subscribe(plan)} />
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-1 text-[11px] text-white/45">
        <p>MTN TV+ Terms of Use apply for all bundles</p>
        <p>*Data bundles are available only for MTN subscribers</p>
      </div>

      {chosenPlan && <SubscribeDialog plan={chosenPlan} isMtn={isMtn} onClose={() => setChosenPlan(null)} />}
      {askSignIn && <SignInPrompt onClose={() => setAskSignIn(false)} />}
    </div>
  )
}
