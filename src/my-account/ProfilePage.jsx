// Profile & Account (/profile) — WONA's "My Account" page in MTN TV+ colours (no MTN TV+ design).
// Desktop: "My Account" menu on the left, the chosen tab beside it. Phone: back button + title,
// the menu becomes a row of chips that scrolls sideways, the tab fills the width under it.
// Tabs: Profile (photo, name fields, Save) · My Plan (current bundle, change it, history; added for
// MTN TV+) · Devices (signed-in devices, Remove) · Support (contacts) · FAQs (tap to open).
// "?tab=support" in the address opens that tab straight away (More → Help & Support).
// Signed out: Profile / My Plan / Devices ask you to log in; Support and FAQs still work.
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { Minus, Plus } from 'lucide-react'
import { isSignedIn } from '@/sign-in-and-sign-up/session.js'
import { sampleProfile, currentPlan, sampleDevices, supportRows, sampleFaqs } from './account-sample-data.js'
import { BackButton } from './AccountUi.jsx'

const TABS = [
  { id: 'profile', label: 'Profile', needsSignIn: true },
  { id: 'plan', label: 'My Plan', needsSignIn: true },
  { id: 'devices', label: 'Devices', needsSignIn: true },
  { id: 'support', label: 'Support' },
  { id: 'faqs', label: 'FAQs' },
]

// Text sizes used again and again: phone size first, then the desktop size (design pixels)
const text14 = 'text-sm md:text-[calc(16*var(--d))]'
const text12 = 'text-xs md:text-[calc(14*var(--d))]'
const card = 'rounded-xl border border-white/10 bg-white/5 md:rounded-[calc(16*var(--d))]'
const yellowButton =
  'rounded-full bg-brand font-semibold text-black hover:opacity-90 disabled:opacity-60 h-10 px-6 text-sm md:h-[calc(48*var(--d))] md:px-[calc(32*var(--d))] md:text-[calc(16*var(--d))]'
const greyButton =
  'rounded-full border border-white/30 hover:bg-white/10 h-10 px-5 text-sm md:h-[calc(48*var(--d))] md:px-[calc(28*var(--d))] md:text-[calc(16*var(--d))]'
const input =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-brand/70 md:rounded-[calc(12*var(--d))] md:px-[calc(16*var(--d))] md:py-[calc(14*var(--d))] md:text-[calc(16*var(--d))]'

function ProfileTab() {
  const [firstName, setFirstName] = useState(sampleProfile.firstName)
  const [lastName, setLastName] = useState(sampleProfile.lastName)
  const [saved, setSaved] = useState(false)

  // Saving to the server comes in Step 3; for now just show the "updated" message for 2.5 s
  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex flex-col gap-4 md:max-w-[calc(560*var(--d))] md:gap-[calc(24*var(--d))]">
      <div className="flex items-center gap-3 md:gap-[calc(18*var(--d))]">
        <img src={sampleProfile.avatar} alt="" className="size-16 rounded-full object-cover md:size-[calc(96*var(--d))]" />
        <div className="flex flex-col gap-0.5">
          <span className="text-lg font-bold italic md:text-[calc(30*var(--d))]">
            {firstName || lastName ? `${firstName} ${lastName}`.trim() : 'My Profile'}
          </span>
          <span className={`text-white/60 ${text12}`}>{sampleProfile.phone}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:gap-[calc(16*var(--d))]">
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" aria-label="First name" className={input} />
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" aria-label="Last name" className={input} />
      </div>
      <div className="flex items-center gap-3 md:gap-[calc(16*var(--d))]">
        <button type="button" onClick={save} className={yellowButton}>
          Save
        </button>
        {saved && <span className={`text-brand ${text12}`}>Profile updated ✓</span>}
      </div>
    </div>
  )
}

// The bundle you're on now, with links to change it or see past bundles
function PlanTab() {
  const rows = [
    ['Price', `${currentPlan.currency} ${currentPlan.price.toFixed(2)}`],
    ['Type', currentPlan.kind],
    ['Started', currentPlan.startedOn],
    ['Renews', currentPlan.renewsOn],
  ]
  return (
    <div className={`flex flex-col gap-4 p-[18px] md:max-w-[calc(560*var(--d))] md:gap-[calc(20*var(--d))] md:p-[calc(32*var(--d))] ${card}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold italic md:text-[calc(24*var(--d))]">{currentPlan.name}</h3>
        <span className="rounded-full border border-[#22c55e] bg-[#22c55e]/10 px-2.5 py-0.5 text-xs text-[#53cf7b] md:px-[calc(12*var(--d))] md:py-[calc(4*var(--d))] md:text-[calc(14*var(--d))]">
          Active
        </span>
      </div>
      <dl className="flex flex-col gap-2 md:gap-[calc(12*var(--d))]">
        {rows.map(([label, value]) => (
          <div key={label} className={`flex justify-between gap-4 ${text14}`}>
            <dt className="text-white/60">{label}</dt>
            <dd className="text-right font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-2.5 md:gap-[calc(12*var(--d))]">
        <Link to="/bundles" className={`flex items-center ${yellowButton}`}>
          Change bundle
        </Link>
        <Link to="/subscription-history" className={`flex items-center ${greyButton}`}>
          Subscription History
        </Link>
      </div>
    </div>
  )
}

function DevicesTab() {
  const [devices, setDevices] = useState(sampleDevices)
  // Removing on the server comes in Step 3; here it just leaves the list
  const remove = (id) => setDevices((list) => list.filter((d) => d.id !== id))

  if (!devices.length) return <p className={`text-white/60 ${text14}`}>No devices registered.</p>

  return (
    <div className="flex flex-col gap-2 md:max-w-[calc(720*var(--d))] md:gap-[calc(8*var(--d))]">
      {devices.map((d, i) => (
        <div
          key={d.id}
          // every second row has a faint background, like WONA
          className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 md:rounded-[calc(12*var(--d))] md:px-[calc(16*var(--d))] md:py-[calc(14*var(--d))] ${i % 2 === 1 ? 'bg-white/5' : ''}`}
        >
          <div className="flex min-w-0 flex-col gap-1 md:gap-[calc(6*var(--d))]">
            <span className={`truncate font-semibold ${text14}`}>{d.name}</span>
            <span className={`text-white/60 ${text12}`}>{d.kind}</span>
          </div>
          {d.thisDevice ? (
            <span className={`shrink-0 text-brand ${text12}`}>This device</span>
          ) : (
            <button
              type="button"
              onClick={() => remove(d.id)}
              className="shrink-0 rounded-full border border-white/30 px-3.5 py-1.5 text-xs hover:bg-white/10 md:px-[calc(18*var(--d))] md:py-[calc(8*var(--d))] md:text-[calc(14*var(--d))]"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

function SupportTab() {
  return (
    <div className="flex flex-col gap-1 md:max-w-[calc(560*var(--d))] md:gap-[calc(4*var(--d))]">
      {supportRows.map((row, i) => (
        <div
          key={row.label}
          className={`flex items-center justify-between gap-3 rounded-xl px-3 py-[11px] md:rounded-[calc(12*var(--d))] md:px-[calc(16*var(--d))] md:py-[calc(14*var(--d))] ${i % 2 === 1 ? 'bg-white/5' : ''}`}
        >
          <span className={`text-white/70 ${text12}`}>{row.label}</span>
          <span className={`font-semibold ${text12}`}>{row.value}</span>
        </div>
      ))}
      <p className="mt-3 text-[11px] text-white/45 md:mt-[calc(16*var(--d))] md:text-[calc(13*var(--d))]">
        MTN TV+ support contacts will be added once they're confirmed.
      </p>
    </div>
  )
}

function FaqsTab() {
  const [open, setOpen] = useState(null) // which question is open (its number), or null
  return (
    <div className="flex flex-col gap-2 md:max-w-[calc(720*var(--d))] md:gap-[calc(10*var(--d))]">
      {sampleFaqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className="rounded-xl border border-white/10 md:rounded-[calc(12*var(--d))]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left md:px-[calc(20*var(--d))] md:py-[calc(16*var(--d))]"
            >
              <span className={`font-semibold ${text14}`}>{f.q}</span>
              {isOpen ? <Minus className="size-4 shrink-0 text-brand md:size-[calc(18*var(--d))]" /> : <Plus className="size-4 shrink-0 text-white/60 md:size-[calc(18*var(--d))]" />}
            </button>
            {isOpen && <p className={`px-3.5 pb-3 leading-relaxed text-white/70 md:px-[calc(20*var(--d))] md:pb-[calc(16*var(--d))] ${text12}`}>{f.a}</p>}
          </div>
        )
      })}
    </div>
  )
}

function SignInNote() {
  return (
    <div className={`flex flex-col items-start gap-3 p-5 md:max-w-[calc(560*var(--d))] md:gap-[calc(16*var(--d))] md:p-[calc(32*var(--d))] ${card}`}>
      <p className={`text-white/80 ${text14}`}>Log in to see and change your account details.</p>
      <Link to="/signin" className={`flex items-center ${yellowButton}`}>
        Log in or sign up
      </Link>
    </div>
  )
}

export default function ProfilePage() {
  const signedIn = isSignedIn()
  // The open tab lives in the address (?tab=support), so links and the back button work with it
  const [params, setParams] = useSearchParams()
  const asked = params.get('tab')
  const tab = TABS.some((t) => t.id === asked) ? asked : 'profile'
  const current = TABS.find((t) => t.id === tab)
  // replace: switching tabs shouldn't add a step to the back button
  const choose = (id) => setParams({ tab: id }, { replace: true })

  return (
    <div className="min-h-screen md:bg-[#1b1b1b]">
      <div className="mx-auto flex flex-col gap-5 px-5 pt-[68px] pb-6 md:max-w-[calc(1306*var(--d))] md:flex-row md:gap-[calc(64*var(--d))] md:px-[calc(53*var(--d))] md:pt-[calc(48*var(--d))] md:pb-[calc(96*var(--d))]">
        {/* "My Account" menu: a column on desktop, a sideways-scrolling chip row on phones */}
        <nav className="flex shrink-0 flex-col gap-3 md:w-[calc(280*var(--d))] md:gap-[calc(8*var(--d))]">
          <div className="flex items-center gap-3">
            <span className="md:hidden">
              <BackButton />
            </span>
            <h1 className="text-[22px] font-bold italic md:pb-[calc(16*var(--d))] md:text-[calc(36*var(--d))]">My Account</h1>
          </div>
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-col md:gap-[calc(8*var(--d))] md:px-0">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => choose(t.id)}
                className={[
                  'shrink-0 rounded-full px-4 py-2 text-left text-[13px] font-medium transition-colors',
                  'md:rounded-[calc(12*var(--d))] md:px-[calc(16*var(--d))] md:py-[calc(12*var(--d))] md:text-[calc(16*var(--d))]',
                  tab === t.id ? 'bg-brand text-black' : 'bg-white/10 text-white/80 hover:bg-white/15 md:bg-transparent md:hover:bg-white/10',
                ].join(' ')}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="min-w-0 flex-1 md:pt-[calc(76*var(--d))]">
          {current.needsSignIn && !signedIn ? (
            <SignInNote />
          ) : (
            <>
              {tab === 'profile' && <ProfileTab />}
              {tab === 'plan' && <PlanTab />}
              {tab === 'devices' && <DevicesTab />}
              {tab === 'support' && <SupportTab />}
              {tab === 'faqs' && <FaqsTab />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
