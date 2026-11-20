// Answers "is someone signed in?" for the rest of the app.
// Real sign-in arrives in Step 4 (it will check the saved login). Until then, the dev switch
// VITE_BYPASS_AUTH in .env.local decides: true = act signed in, false = act signed out.
import { env } from '@/app-settings/env.js'

export function isSignedIn() {
  return env.bypassAuth
}
