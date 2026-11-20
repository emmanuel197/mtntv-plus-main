// My Stuff (/my-stuff) — the titles you saved. Desktop and phone look different, so this file
// only picks which one to draw (see helpers/useIsDesktop.js for why we don't draw both).
import { useIsDesktop } from '@/helpers/useIsDesktop.js'
import DesktopMyStuff from './DesktopMyStuff.jsx'
import PhoneMyStuff from './PhoneMyStuff.jsx'

export default function MyStuffPage() {
  const isDesktop = useIsDesktop()
  return isDesktop ? <DesktopMyStuff /> : <PhoneMyStuff />
}
