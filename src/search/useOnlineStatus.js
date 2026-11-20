// true while the device has a connection, false when it drops. The browser tells us through the
// "online"/"offline" events; this hook listens and re-draws the screen when it changes.
import { useEffect, useState } from 'react'

export function useOnlineStatus() {
  const [online, setOnline] = useState(() => navigator.onLine)
  useEffect(() => {
    const up = () => setOnline(true)
    const down = () => setOnline(false)
    window.addEventListener('online', up)
    window.addEventListener('offline', down)
    return () => {
      window.removeEventListener('online', up)
      window.removeEventListener('offline', down)
    }
  }, [])
  return online
}
