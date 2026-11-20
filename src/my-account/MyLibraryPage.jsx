// My Library (/my-library) — titles you rented or bought. Desktop and phone look different, so this
// file only picks which one to draw.
import { useIsDesktop } from '@/helpers/useIsDesktop.js'
import DesktopMyLibrary from './DesktopMyLibrary.jsx'
import PhoneMyLibrary from './PhoneMyLibrary.jsx'

export default function MyLibraryPage() {
  const isDesktop = useIsDesktop()
  return isDesktop ? <DesktopMyLibrary /> : <PhoneMyLibrary />
}
