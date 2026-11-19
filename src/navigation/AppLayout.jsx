// The frame around every page: bars on the outside, the current page in the middle.
// <Outlet /> is the slot where React Router puts the page that matches the address bar.
import { Outlet } from 'react-router'
import DesktopNavbar from './DesktopNavbar.jsx'
import PhoneTopBar from './PhoneTopBar.jsx'
import PhoneBottomBar from './PhoneBottomBar.jsx'

export default function AppLayout() {
  return (
    <div className="min-h-full">
      <DesktopNavbar />
      <PhoneTopBar />
      {/* padding keeps page content from hiding under the fixed bars */}
      <main className="pt-16 pb-28 md:pt-18 md:pb-0">
        <Outlet />
      </main>
      <PhoneBottomBar />
    </div>
  )
}
