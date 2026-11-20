// true on screens 768px and wider (Tailwind's "md"), false on phones. Updates when the window is resized.
// Pages use it to draw ONLY the desktop or ONLY the phone version, not both hidden on top of each other
// (an AfriPlay lesson: a hidden second player still played its sound).
import { useEffect, useState } from 'react'

const QUERY = '(min-width: 768px)'

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(QUERY).matches)
  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const update = () => setIsDesktop(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return isDesktop
}
