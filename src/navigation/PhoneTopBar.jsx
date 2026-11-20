// Top bar for phones (under 768px): logo left, Get Bundle + bell right. Hidden on desktop (`md:hidden`).
// It sits ON TOP of the page (absolute, transparent) and scrolls away with it, like the Figma home screen.
// Figma puts it 57px from the top, but 47px of that is the phone's own clock/battery bar,
// which a website doesn't draw — so here it's 10px from the top.
import { Link, useMatch } from 'react-router'
import MtnTvLogo from '@/shared-ui/MtnTvLogo.jsx'
import TopBarActions from './TopBarActions.jsx'

export default function PhoneTopBar() {
  // Screens that don't show this bar in Figma:
  //   the reel player (it has its own back · MTN TV+ Shorts · more bar)
  //   the Search tab (the search box takes the top of the screen)
  const onReelPlayer = useMatch('/shorts/:id')
  const onSearch = useMatch('/search')
  if (onReelPlayer || onSearch) return null

  return (
    <header className="absolute inset-x-0 top-2.5 z-30 flex items-center justify-between px-page md:hidden">
      <Link to="/" aria-label="MTN TV+ home">
        <MtnTvLogo />
      </Link>
      <TopBarActions />
    </header>
  )
}
