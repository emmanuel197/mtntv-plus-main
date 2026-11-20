// The frame around every page: bars on the outside, the current page in the middle.
// <Outlet /> is the slot where React Router puts the page that matches the address bar.
import { Outlet, useMatch } from 'react-router'
import DesktopNavbar from './DesktopNavbar.jsx'
import PhoneTopBar from './PhoneTopBar.jsx'
import PhoneBottomBar from './PhoneBottomBar.jsx'
import SiteFooter from './SiteFooter.jsx'

export default function AppLayout() {
  // On desktop Home the navbar floats over the big picture; other pages start below the navbar
  const onHome = useMatch('/')

  return (
    // `relative` so the phone top bar (absolute) is placed against this frame's top edge
    <div className="relative min-h-full">
      <DesktopNavbar />
      <PhoneTopBar />
      {/* Phones: no top padding — the top bar floats over the page, as in Figma.
          Bottom padding keeps the last row from hiding under the floating tab bar.
          Desktop: room for the 97px (design) navbar, except on Home. */}
      <main className={`pb-28 md:pb-0 ${onHome ? '' : 'md:pt-[calc(97*var(--d))]'}`}>
        <Outlet />
      </main>
      <SiteFooter />
      <PhoneBottomBar />
    </div>
  )
}
