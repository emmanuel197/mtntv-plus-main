// The main tabs, in order. Both the desktop navbar and the phone bottom bar read this list,
// so adding or renaming a tab happens here once.
import { House, Tv, Clapperboard, Search, Menu } from 'lucide-react'

export const NAV_TABS = [
  { to: '/', label: 'Home', Icon: House },
  { to: '/live-tv', label: 'Live TV', Icon: Tv },
  { to: '/shorts', label: 'Shorts', Icon: Clapperboard },
  { to: '/search', label: 'Search', Icon: Search },
  { to: '/more', label: 'More', Icon: Menu },
]
