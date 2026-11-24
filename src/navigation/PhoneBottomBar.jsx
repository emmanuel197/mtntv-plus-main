// The floating tab bar at the bottom on phones (Home · Live Tv · Shorts · Search · More).
// Figma: 348×66 pill, centred, dark see-through background, icons 24px, labels 12px upright.
//
// Icons are drawn by MaskIcon (white normally, yellow when the tab is active).
import { NavLink, useLocation } from 'react-router'
import { NAV_TABS } from './nav-tabs.js'
import MaskIcon from './MaskIcon.jsx'
import { isAuthPage } from './auth-pages.js'

export default function PhoneBottomBar() {
  const { pathname } = useLocation()
  // No tab bar on the sign-in screens
  if (isAuthPage(pathname)) return null

  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex h-[66px] w-[calc(100%-46px)] max-w-[348px] -translate-x-1/2 items-center justify-center gap-3 rounded-full border border-white/15 bg-tabbar/85 backdrop-blur-md md:hidden">
      {NAV_TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) => {
            const active = isActive || tab.alsoActiveOn?.some((p) => pathname.startsWith(p))
            return `flex h-[49px] w-[54px] flex-col items-center justify-center gap-1 text-xs font-medium ${active ? 'text-brand' : 'text-text'}`
          }}
        >
          <MaskIcon src={tab.icon} />
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
