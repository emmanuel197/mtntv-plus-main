// One shared list of notifications for the whole app.
// The bell's red dot, the "Notifications" row on More and the Notifications page all read it,
// so marking a message read in one place updates the others straight away.
//
// How it works: the list lives here (outside any component). Screens call useNotifications() to
// read it; the change functions replace the list and tell every screen that's reading to redraw.
// (Redux, added later, does the same job for bigger shared data.)
// Messages are samples until the CRM inbox call is wired in Step 3.
import { useSyncExternalStore } from 'react'

let messages = [
  { id: 'n1', title: 'AFCON Semi-final is live', message: 'Nigeria vs Cameroon is on SuperSport now. Tap Live Tv to watch.', date: 'Today', time: '8:02 PM', read: false },
  { id: 'n2', title: 'Your Daily Max bundle ends soon', message: 'Your bundle expires tomorrow at 9:00 AM. Renew to keep watching without a break.', date: 'Today', time: '9:00 AM', read: false },
  { id: 'n3', title: 'New on MTN TV+: Michael', message: 'The story of the King of Pop is now streaming. Add it to My Stuff.', date: 'Yesterday', time: '6:30 PM', read: false },
  { id: 'n4', title: 'Payment received', message: 'GH₵ 5.00 for Daily Max was received. Enjoy unlimited Live TV, movies and shows.', date: '17 Nov', time: '10:12 AM', read: true },
  { id: 'n5', title: 'Welcome to MTN TV+', message: 'Live TV, movies, shows and Shorts — all in one place.', date: '15 Nov', time: '2:45 PM', read: true },
]

const listeners = new Set()
const update = (next) => {
  messages = next
  listeners.forEach((redraw) => redraw())
}

export const markRead = (id) => update(messages.map((m) => (m.id === id ? { ...m, read: true } : m)))
export const markAllRead = () => update(messages.map((m) => ({ ...m, read: true })))
export const removeNotification = (id) => update(messages.filter((m) => m.id !== id))

const subscribe = (redraw) => {
  listeners.add(redraw)
  return () => listeners.delete(redraw)
}

// Returns the current list; the screen redraws whenever it changes
export function useNotifications() {
  return useSyncExternalStore(subscribe, () => messages)
}
