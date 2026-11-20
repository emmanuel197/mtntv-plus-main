// A short message that shows for a moment and then hides itself ("Player coming soon",
// "Added to My Stuff"). Returns [message, flash]: call flash('text') to show one.
import { useCallback, useEffect, useRef, useState } from 'react'

export function useFlashMessage(seconds = 2.5) {
  const [message, setMessage] = useState(null)
  const timer = useRef(null)

  const flash = useCallback(
    (text) => {
      clearTimeout(timer.current) // a new message restarts the countdown
      setMessage(text)
      timer.current = setTimeout(() => setMessage(null), seconds * 1000)
    },
    [seconds],
  )

  // Leaving the page before it hides: stop the timer so it doesn't update a page that's gone
  useEffect(() => () => clearTimeout(timer.current), [])

  return [message, flash]
}
