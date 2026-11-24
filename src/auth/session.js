// The signed-in "session": who is signed in and their pass (tokens) for the servers.
//   accessToken  — the pass shown on every Client API request (works for a limited time)
//   refreshToken — used to get a new pass when the old one runs out, without asking the user again
//   version      — which login version issued them ('v2' or 'v1'); renewing must use the same one
// It's saved in this browser (localStorage) so you stay signed in after closing the tab.
// Like the notifications list, screens can read it with useSession() and redraw when it changes.
//
// Dev switch: VITE_BYPASS_AUTH=true in .env.local makes the app act signed in without a real
// session (handy while building screens). Never turn it on for the real website.
import { useSyncExternalStore } from 'react'
import { env } from '@/app-settings/env.js'

const KEY = 'mtntv:session'
const listeners = new Set()

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null
  } catch {
    return null
  }
}

let session = read()

const update = (next) => {
  session = next
  try {
    if (next) localStorage.setItem(KEY, JSON.stringify(next))
    else localStorage.removeItem(KEY)
  } catch {
    // storage blocked — the session just won't survive a reload
  }
  listeners.forEach((redraw) => redraw())
}

export const getSession = () => session
export const saveSession = (next) => update(next)
export const clearSession = () => update(null)

// Swap in renewed tokens, keeping everything else
export const updateTokens = ({ accessToken, refreshToken }) =>
  update({ ...session, accessToken, refreshToken: refreshToken || session?.refreshToken })

export function isSignedIn() {
  return env.bypassAuth || Boolean(session?.accessToken)
}

const subscribe = (redraw) => {
  listeners.add(redraw)
  return () => listeners.delete(redraw)
}

// Returns true/false and redraws the screen when someone signs in or out
export function useSignedIn() {
  return useSyncExternalStore(subscribe, isSignedIn)
}
