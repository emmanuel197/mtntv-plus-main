// More (/more) on desktop — an account hub in the middle of the page (WONA's More has no web design;
// the navbar avatar opens it). Same content as the phone screen, laid out wider:
//   profile card (photo, name, number, green "plan · Active" pill, Edit profile)
//   · three tiles: My Stuff, My Library, Get Bundle · ACCOUNT list in a card · red Sign Out.
// Signed out: the profile card becomes "Log in or sign up" and Sign Out is hidden.
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Archive, Bell, Bookmark, ChevronRight, CircleQuestionMark, Download, History, Settings, Ticket, User } from 'lucide-react'
import { isSignedIn } from '@/auth/session.js'
import { signOut } from '@/auth/auth-requests.js'
import { goTo } from '@/auth/destination.js'
import { useNotifications } from '@/notifications/notifications-store.js'
import { sampleProfile, currentPlan } from './account-sample-data.js'

function Tile({ icon, title, subtitle, onClick }) {
  const Icon = icon // a capital letter lets JSX draw it as <Icon />
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[calc(150*var(--d))] flex-1 flex-col items-start rounded-[calc(16*var(--d))] border border-white/15 bg-white/5 p-[calc(24*var(--d))] text-left transition-colors hover:border-brand/60 hover:bg-white/10"
    >
      <Icon className="size-[calc(30*var(--d))] text-brand" />
      <span className="mt-auto text-[calc(20*var(--d))] font-bold italic">{title}</span>
      <span className="mt-[calc(4*var(--d))] flex w-full items-center justify-between text-[calc(14*var(--d))] text-white/60">
        {subtitle}
        <ChevronRight className="size-[calc(18*var(--d))]" />
      </span>
    </button>
  )
}

function Row({ icon, title, subtitle, badge, onClick, last }) {
  const Icon = icon
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-[calc(16*var(--d))] px-[calc(24*var(--d))] py-[calc(20*var(--d))] text-left hover:bg-white/5 ${last ? '' : 'border-b border-white/10'}`}
    >
      <Icon className="size-[calc(24*var(--d))] text-white/85" strokeWidth={1.8} />
      <span className="flex min-w-0 flex-1 flex-col gap-[calc(4*var(--d))]">
        <span className="text-[calc(16*var(--d))] font-medium">{title}</span>
        {subtitle && <span className="text-[calc(13*var(--d))] text-white/55">{subtitle}</span>}
      </span>
      {badge > 0 && (
        <span className="rounded-full bg-brand px-[calc(9*var(--d))] py-[calc(2*var(--d))] text-[calc(12*var(--d))] font-bold text-black">{badge}</span>
      )}
      <ChevronRight className="size-[calc(20*var(--d))] text-white/60" />
    </button>
  )
}

export default function DesktopMorePage() {
  const navigate = useNavigate()
  const signedIn = isSignedIn()
  const unread = useNotifications().filter((m) => !m.read).length
  const [notice, setNotice] = useState(null)
  const noticeTimer = useRef(null)

  // For rows with no screen yet (none in the WONA or MTN TV+ designs either)
  const comingSoon = (what) => {
    setNotice(`${what} is coming soon`)
    clearTimeout(noticeTimer.current)
    noticeTimer.current = setTimeout(() => setNotice(null), 2500)
  }

  const rows = [
    { id: 'profile', icon: User, title: 'Profile & Account', subtitle: 'Edit details, manage plan', onClick: () => navigate('/profile') },
    { id: 'notifications', icon: Bell, title: 'Notifications', badge: unread, onClick: () => navigate('/notifications') },
    { id: 'history', icon: History, title: 'Subscription History', subtitle: 'Bundles you have bought', onClick: () => navigate('/subscription-history') },
    { id: 'downloads', icon: Download, title: 'Downloads', onClick: () => comingSoon('Downloads') },
    { id: 'settings', icon: Settings, title: 'Settings', onClick: () => comingSoon('Settings') },
    { id: 'help', icon: CircleQuestionMark, title: 'Help & Support', onClick: () => navigate('/profile?tab=support') },
  ]

  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      <div className="mx-auto flex max-w-[calc(1106*var(--d))] flex-col gap-[calc(32*var(--d))] px-[calc(53*var(--d))] pt-[calc(48*var(--d))] pb-[calc(96*var(--d))]">
        <h1 className="text-[calc(36*var(--d))] font-bold italic">My Account</h1>

        {/* Profile card */}
        <div className="flex items-center gap-[calc(24*var(--d))] rounded-[calc(16*var(--d))] border border-white/10 bg-white/5 p-[calc(28*var(--d))]">
          {signedIn ? (
            <>
              <img src={sampleProfile.avatar} alt="" className="size-[calc(110*var(--d))] shrink-0 rounded-full object-cover" />
              <div className="flex min-w-0 flex-1 flex-col items-start gap-[calc(8*var(--d))]">
                <span className="truncate text-[calc(30*var(--d))] font-bold italic">{`${sampleProfile.firstName} ${sampleProfile.lastName}`}</span>
                <span className="text-[calc(15*var(--d))] text-white/60">{sampleProfile.phone}</span>
                <button
                  type="button"
                  onClick={() => navigate('/bundles')}
                  className="rounded-full border border-[#22c55e] bg-[#22c55e]/10 px-[calc(14*var(--d))] py-[calc(4*var(--d))] text-[calc(14*var(--d))] text-[#53cf7b] hover:bg-[#22c55e]/20"
                >
                  {currentPlan.name} · Active
                </button>
              </div>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="h-[calc(48*var(--d))] shrink-0 rounded-full border border-white/30 px-[calc(28*var(--d))] text-[calc(16*var(--d))] hover:bg-white/10"
              >
                Edit profile
              </button>
            </>
          ) : (
            <>
              <span className="flex size-[calc(110*var(--d))] shrink-0 items-center justify-center rounded-full bg-white/10 text-white/60">
                <User className="size-[calc(48*var(--d))]" />
              </span>
              <div className="flex flex-1 flex-col gap-[calc(6*var(--d))]">
                <span className="text-[calc(30*var(--d))] font-bold italic">Log in or sign up</span>
                <span className="text-[calc(15*var(--d))] text-white/60">to like, comment and buy bundles</span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/signin?redirectTo=%2Fmore')}
                className="h-[calc(48*var(--d))] shrink-0 rounded-full bg-brand px-[calc(32*var(--d))] text-[calc(16*var(--d))] font-semibold text-black hover:opacity-90"
              >
                Log in
              </button>
            </>
          )}
        </div>

        <div className="flex gap-[calc(20*var(--d))]">
          <Tile icon={Bookmark} title="My Stuff" subtitle="Saved titles" onClick={() => navigate('/my-stuff')} />
          <Tile icon={Archive} title="My Library" subtitle="Rentals & purchases" onClick={() => navigate('/my-library')} />
          <Tile icon={Ticket} title="Get Bundle" subtitle="Choose your plan" onClick={() => navigate('/bundles')} />
        </div>

        <section className="flex flex-col gap-[calc(14*var(--d))]">
          <h2 className="text-[calc(14*var(--d))] tracking-wide text-white/60">ACCOUNT</h2>
          <div className="overflow-hidden rounded-[calc(16*var(--d))] border border-white/10 bg-white/5">
            {rows.map((r, i) => (
              <Row key={r.id} {...r} last={i === rows.length - 1} />
            ))}
          </div>
        </section>

        {signedIn && (
          <div className="flex justify-center">
            {/* Tells the server, forgets the saved session, then reloads Home signed out */}
            <button
              type="button"
              onClick={() => signOut().then(() => goTo('/'))}
              className="h-[calc(48*var(--d))] w-[calc(160*var(--d))] rounded-full border border-white/80 bg-[#d92d20] text-[calc(16*var(--d))] font-semibold hover:opacity-90"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {notice && (
        <div className="fixed bottom-[calc(40*var(--d))] left-1/2 z-50 -translate-x-1/2 rounded-[calc(12*var(--d))] bg-[#272727] px-[calc(24*var(--d))] py-[calc(14*var(--d))] text-[calc(16*var(--d))] shadow-lg">
          {notice}
        </div>
      )}
    </div>
  )
}
