// Top bar for screens 768px and wider (hidden on phones). From the MTN TV+ web design:
//   logo left · Home, Live Tv, Shorts, Movies, My stuff in the middle (icon + label,
//   yellow when active) · search, bell (red dot = unread) and profile photo on the right.
// Sizes are design pixels of the 1728px design (see --d in styles/global.css), from WONA's navbar:
// floating pill 16 from the top, 53 side margins, 78 tall (logo 50 + 14 above/below), icons 24,
// labels 15, 36 between links, 43 between the logo and the links. Its bottom edge is at about 96,
// so pages still start 97 below the top (AppLayout) as before.
import { Link, NavLink } from 'react-router'
import { User } from 'lucide-react'
import MtnTvLogo from '@/shared-ui/MtnTvLogo.jsx'
import { useNotifications } from '@/notifications/notifications-store.js'
import MaskIcon from './MaskIcon.jsx'
import homeIcon from './desktop-icons/home.svg'
import liveTvIcon from './desktop-icons/live-tv.svg'
import shortsIcon from './desktop-icons/shorts.svg'
import searchIcon from './desktop-icons/search.svg'
import bellIcon from './desktop-icons/bell.svg'
import avatar from './desktop-icons/avatar.webp'

// Movies reuses the Shorts icon, as in WONA's navbar (Tv Channels was removed — user, 2026-11-20)
const LINKS = [
  { to: '/', label: 'Home', icon: homeIcon },
  { to: '/live-tv', label: 'Live Tv', icon: liveTvIcon },
  { to: '/shorts', label: 'Shorts', icon: shortsIcon },
  { to: '/movies', label: 'Movies', icon: shortsIcon },
  { to: '/my-stuff', label: 'My stuff', lucide: User },
]

const icon24 = 'size-[calc(24*var(--d))]'

export default function DesktopNavbar() {
  const hasUnread = useNotifications().some((m) => !m.read)

  return (
    // The header itself is invisible and only holds the floating bar 16 design px from the top.
    // The bar (WONA's style): rounded pill, see-through black with the page blurred behind it,
    // a faint border, the same 53px side margins as the page. Logo and links sit together on the left.
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden pt-[calc(16*var(--d))] md:block">
      <div className="pointer-events-auto mx-[calc(53*var(--d))] flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-[calc(40*var(--d))] py-[calc(14*var(--d))] shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-[20px]">
        <div className="flex items-center gap-[calc(43*var(--d))]">
          <Link to="/" aria-label="MTN TV+ home">
            <MtnTvLogo className="size-[calc(50*var(--d))]" />
          </Link>

          <nav className="flex items-center gap-[calc(36*var(--d))]">
            {LINKS.map((link) => {
              const LucideIcon = link.lucide
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-[calc(5*var(--d))] text-[calc(15*var(--d))] ${isActive ? 'text-brand' : 'text-white'} hover:text-brand`
                  }
                >
                  {LucideIcon ? <LucideIcon className={icon24} strokeWidth={1.8} /> : <MaskIcon src={link.icon} className={icon24} />}
                  {link.label}
                </NavLink>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-[calc(24*var(--d))]">
          <NavLink to="/search" aria-label="Search" className={({ isActive }) => (isActive ? 'text-brand' : 'text-white hover:text-brand')}>
            <MaskIcon src={searchIcon} className={icon24} />
          </NavLink>
          <Link to="/notifications" aria-label="Notifications" className="relative text-white hover:text-brand">
            <MaskIcon src={bellIcon} className={icon24} />
            {hasUnread && <span className="absolute -top-[calc(2*var(--d))] -right-[calc(2*var(--d))] size-[calc(9*var(--d))] rounded-full bg-live" />}
          </Link>
          <Link to="/more" aria-label="My account">
            <img src={avatar} alt="" className="size-[calc(36*var(--d))] rounded-full object-cover" />
          </Link>
        </div>
      </div>
    </header>
  )
}
