// Talking to the CRM (TVAnywhere). Some CRM calls must carry the app's own CRM login in two
// headers ("Username" / "Password", from .env.local) — those use `crmWithAppLogin`.
import axios from 'axios'
import { env } from '@/app-settings/env.js'

const TWENTY_SECONDS = 20000

// Plain CRM calls (sending and checking SMS codes, creating an account)
export const crmApi = axios.create({ timeout: TWENTY_SECONDS })

// CRM calls that need the app's CRM login (region/network checks, setting the password)
export const crmWithAppLogin = axios.create({
  timeout: TWENTY_SECONDS,
  headers: { Username: env.cmUsername, Password: env.cmPassword },
})
