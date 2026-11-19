// Top bar for phones (under 768px): logo left, Get Bundle + bell right. Hidden on desktop (`md:hidden`).
import { Link } from 'react-router'
import MtnTvLogo from '@/shared-ui/MtnTvLogo.jsx'
import TopBarActions from './TopBarActions.jsx'

export default function PhoneTopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-gradient-to-b from-black to-black/0 px-4 md:hidden">
      <Link to="/" aria-label="MTN TV+ home">
        <MtnTvLogo />
      </Link>
      <TopBarActions />
    </header>
  )
}
