// The floating tab bar at the bottom on phones (Home · Live TV · Shorts · Search · More).
import { NavLink } from 'react-router'
import { NAV_TABS } from './nav-tabs.js'

export default function PhoneBottomBar() {
  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 flex justify-around rounded-2xl bg-surface/90 py-2 backdrop-blur md:hidden">
      {NAV_TABS.map((tab) => {
        const Icon = tab.Icon
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) =>
              `flex w-14 flex-col items-center gap-1 text-[10px] ${isActive ? 'text-brand' : 'text-muted'}`
            }
          >
            <Icon size={22} />
            {tab.label}
          </NavLink>
        )
      })}
    </nav>
  )
}
