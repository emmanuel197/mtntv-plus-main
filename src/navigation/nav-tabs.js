// The main tabs, in order. Both the desktop navbar and the phone bottom bar read this list,
// so adding or renaming a tab happens here once.
// Icons: the AfriPlay/WONA tab bar icons (same as the MTN TV+ designs), in navigation/tab-icons/.
import homeIcon from './tab-icons/home.svg'
import liveTvIcon from './tab-icons/live-tv.svg'
import shortsIcon from './tab-icons/shorts.svg'
import searchIcon from './tab-icons/search.svg'
import moreIcon from './tab-icons/more.svg'

export const NAV_TABS = [
  { to: '/', label: 'Home', icon: homeIcon },
  { to: '/live-tv', label: 'Live Tv', icon: liveTvIcon },
  { to: '/shorts', label: 'Shorts', icon: shortsIcon },
  { to: '/search', label: 'Search', icon: searchIcon },
  // More stays lit on the screens it opens
  { to: '/more', label: 'More', icon: moreIcon, alsoActiveOn: ['/notifications', '/my-stuff', '/my-library', '/profile'] },
]
