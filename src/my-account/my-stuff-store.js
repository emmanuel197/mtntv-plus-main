// One shared list of the titles saved to My Stuff (the "+" / "Save" buttons).
// Works like notifications-store.js: the list lives outside any screen, screens read it with
// useMyStuff(), and removeFromMyStuff() / toggleMyStuff() tell every screen that's reading to redraw.
// The "+ My Stuff" buttons on web posters and on the details pages use toggleMyStuff().
// Removing a title on desktop or phone is remembered until the page is reloaded.
// Sample titles until the bookmarks call is wired in Step 3.
import { useSyncExternalStore } from 'react'
import { titles } from '@/sample-content/catalog.js'

const DAY = 864e5 // one day in milliseconds

// Newest first: the first title was saved today, the next one a day earlier, and so on.
// progress = how much has been watched (0–100), shown as a thin yellow bar.
let saved = [
  { ...titles.prisonBreak, progress: 40 },
  { ...titles.enola, progress: 0 },
  { ...titles.sweetHome, progress: 75 },
  { ...titles.danfo, progress: 0 },
  { ...titles.familyFire, progress: 10 },
  { ...titles.babyDriver, progress: 0 },
  { ...titles.theChi, progress: 0 },
  { ...titles.soyayya, progress: 30 },
  { ...titles.wura, progress: 0 },
  { ...titles.citation, progress: 0 },
].map((t, i) => ({ ...t, addedAt: Date.now() - i * DAY }))

const listeners = new Set()
const update = (next) => {
  saved = next
  listeners.forEach((redraw) => redraw())
}

export const removeFromMyStuff = (id) => update(saved.filter((t) => t.id !== id))

// Add the title if it isn't saved yet, remove it if it is. Returns true if it is saved afterwards.
export const toggleMyStuff = (title) => {
  if (saved.some((t) => t.id === title.id)) {
    removeFromMyStuff(title.id)
    return false
  }
  update([{ ...title, progress: 0, addedAt: Date.now() }, ...saved])
  return true
}

const subscribe = (redraw) => {
  listeners.add(redraw)
  return () => listeners.delete(redraw)
}

// Returns the saved titles; the screen redraws whenever the list changes
export function useMyStuff() {
  return useSyncExternalStore(subscribe, () => saved)
}

// The two "Sort by" choices, shared by the desktop and phone screens
export const SORTS = [
  { id: 'added', label: 'Date Added' },
  { id: 'title', label: 'Title (A–Z)' },
]
export const sortTitles = (list, sort, dateKey = 'addedAt') =>
  [...list].sort(sort === 'title' ? (a, b) => a.title.localeCompare(b.title) : (a, b) => b[dateKey] - a[dateKey])

// true if this title is in My Stuff; the screen redraws when that changes
export function useIsInMyStuff(id) {
  return useSyncExternalStore(subscribe, () => saved.some((t) => t.id === id))
}
