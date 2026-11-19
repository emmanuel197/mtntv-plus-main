// Top bar for screens 768px and wider. Hidden on phones (`hidden md:flex`).
import { Link, NavLink } from 'react-router'
import MtnTvLogo from '@/shared-ui/MtnTvLogo.jsx'
import TopBarActions from './TopBarActions.jsx'
import { NAV_TABS } from './nav-tabs.js'

export default function DesktopNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 hidden h-18 items-center justify-between bg-gradient-to-b from-black to-black/0 px-10 md:flex">
      <div className="flex items-center gap-10">
        <Link to="/" aria-label="MTN TV+ home">
          <MtnTvLogo />
        </Link>
        <nav className="flex items-center gap-8">
          {NAV_TABS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-base font-medium transition-colors ${isActive ? 'text-brand' : 'text-text hover:text-brand'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
      <TopBarActions />
    </header>
  )
}
