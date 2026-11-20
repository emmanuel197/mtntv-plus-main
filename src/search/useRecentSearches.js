// The "Recent Searches" list, remembered in this browser (localStorage) so it's still there next visit.
// There's no search-history server, so it lives on the device — as in AfriPlay/WONA.
// `storageKey` is the name the list is saved under in the browser.
import { useState } from 'react'

const LIMIT = 12

export function useRecentSearches(storageKey, startingList) {
  const [recent, setRecent] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved !== null) return JSON.parse(saved)
    } catch {
      // storage blocked or unreadable — start from the sample list
    }
    return startingList
  })

  const save = (next) => {
    setRecent(next)
    try {
      localStorage.setItem(storageKey, JSON.stringify(next))
    } catch {
      // storage blocked — the list just won't be remembered
    }
  }

  return {
    recent,
    remember: (text) => save([text, ...recent.filter((r) => r.toLowerCase() !== text.toLowerCase())].slice(0, LIMIT)),
    remove: (text) => save(recent.filter((r) => r !== text)),
    clearAll: () => save([]),
  }
}
