// More (/more) — WONA's More screen in MTN TV+ colours (no MTN TV+ design exists):
//   profile row (photo, name, green "plan · Active" pill) · My Stuff and My Library tiles
//   · ACCOUNT list (Profile & Account, Notifications, Downloads, Settings, Help & Support) · red Sign Out.
// Signed out: the profile row becomes "Log in or sign up", and Sign Out is hidden.
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Bookmark, Archive, ChevronRight, User, Bell, Download, Settings, CircleQuestionMark } from 'lucide-react'
import { isSignedIn } from '@/sign-in-and-sign-up/session.js'
import { useNotifications } from '@/notifications/notifications-store.js'
import profileAvatar from './sample-images/profile-avatar.webp'

// Sample profile until the account call (Step 3)
const profile = { name: 'Kwame Mensah', avatar: profileAvatar, plan: 'Daily Max' }

function Tile({ icon, title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[106px] flex-1 flex-col items-start rounded-xl border border-white/20 bg-surface p-[15px] text-left"
    >
      <span className="text-brand">{icon}</span>
      <span className="mt-auto text-[15px] font-medium">{title}</span>
      <span className="mt-1 flex w-full items-center justify-between text-[13px] text-white/60">
        {subtitle}
        <ChevronRight size={14} />
      </span>
    </button>
  )
}

function Row({ icon, title, subtitle, dot, onClick, last }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 text-left ${subtitle ? 'h-[85px]' : 'h-[71px]'} ${last ? '' : 'border-b border-white/15'}`}
    >
      {icon}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-[15px] font-medium">{title}</span>
        {subtitle && <span className="text-xs text-white/60">{subtitle}</span>}
      </span>
      {dot && <span className="size-2 rounded-full bg-brand" aria-label="Unread" />}
      <ChevronRight size={20} className="text-white/80" />
    </button>
  )
}

export default function MorePage() {
  const navigate = useNavigate()
  const signedIn = isSignedIn()
  const unread = useNotifications().filter((m) => !m.read).length
  const [notice, setNotice] = useState(null)
  const noticeTimer = useRef(null)

  // For rows that have no screen yet (none in the WONA or MTN TV+ designs either)
  const comingSoon = (what) => {
    setNotice(`${what} is coming soon`)
    clearTimeout(noticeTimer.current)
    noticeTimer.current = setTimeout(() => setNotice(null), 2500)
  }

  const rows = [
    { id: 'profile', icon: <User size={22} strokeWidth={1.8} />, title: 'Profile & Account', subtitle: 'Edit details, manage plan', onClick: () => navigate('/profile') },
    { id: 'notifications', icon: <Bell size={22} strokeWidth={1.8} />, title: 'Notifications', dot: unread > 0, onClick: () => navigate('/notifications') },
    { id: 'downloads', icon: <Download size={22} strokeWidth={1.8} />, title: 'Downloads', onClick: () => comingSoon('Downloads') },
    { id: 'settings', icon: <Settings size={22} strokeWidth={1.8} />, title: 'Settings', onClick: () => comingSoon('Settings') },
    { id: 'help', icon: <CircleQuestionMark size={22} strokeWidth={1.8} />, title: 'Help & Support', onClick: () => comingSoon('Help & Support') },
  ]

  return (
    <div className="pt-[66px]">
      {signedIn ? (
        <button type="button" onClick={() => navigate('/profile')} className="flex w-full items-center gap-3 px-[21px] py-4 text-left">
          <img src={profile.avatar} alt="" className="size-[72px] shrink-0 rounded-full object-cover" />
          <span className="flex min-w-0 flex-1 flex-col items-start gap-2">
            <span className="truncate text-sm font-semibold">{profile.name}</span>
            <span
              role="link"
              onClick={(e) => {
                e.stopPropagation() // open bundles, not the profile
                navigate('/bundles')
              }}
              className="h-[23px] rounded-full border border-[#22c55e] bg-[#22c55e]/10 px-[11px] text-xs leading-[21px] text-[#53cf7b]"
            >
              {profile.plan} · Active
            </span>
          </span>
          <ChevronRight size={20} className="text-white/80" />
        </button>
      ) : (
        <button type="button" onClick={() => navigate('/signin')} className="flex w-full items-center gap-3 px-[21px] py-4 text-left">
          <span className="flex size-[72px] shrink-0 items-center justify-center rounded-full bg-surface text-white/60">
            <User size={32} />
          </span>
          <span className="flex flex-1 flex-col gap-1">
            <span className="text-sm font-semibold">Log in or sign up</span>
            <span className="text-xs text-white/60">to like, comment and buy bundles</span>
          </span>
          <ChevronRight size={20} className="text-white/80" />
        </button>
      )}

      <div className="flex gap-3 px-[21px] pt-2">
        <Tile icon={<Bookmark size={22} fill="currentColor" />} title="My Stuff" subtitle="Saved titles" onClick={() => navigate('/my-stuff')} />
        <Tile icon={<Archive size={22} />} title="My Library" subtitle="Rentals & purchases" onClick={() => navigate('/my-library')} />
      </div>

      <section className="px-[21px] pt-7">
        <h2 className="text-sm text-white/75">ACCOUNT</h2>
        <div className="mt-2">
          {rows.map((r, i) => (
            <Row key={r.id} {...r} last={i === rows.length - 1} />
          ))}
        </div>
      </section>

      {signedIn && (
        <div className="flex justify-center px-[21px] pt-7 pb-6">
          {/* Real sign-out (clearing the saved login) comes with sign-in in Step 4 */}
          <button
            type="button"
            onClick={() => navigate('/signin')}
            className="h-[42px] w-28 rounded-full border border-white/80 bg-[#d92d20] text-sm font-semibold hover:opacity-90"
          >
            Sign Out
          </button>
        </div>
      )}

      {notice && (
        <div className="fixed inset-x-8 bottom-24 z-50 rounded-xl bg-[#272727] px-4 py-3 text-center text-sm shadow-lg">{notice}</div>
      )}
    </div>
  )
}
