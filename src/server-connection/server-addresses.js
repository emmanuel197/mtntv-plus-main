// Every server address the app calls, in one place. Both servers belong to the vendor:
//   CRM (TVAnywhere)      — accounts, "are you on MTN?", SMS codes, bundles/billing, homepage layout
//   Client API (Uniqcast) — login tokens, the catalogue, video links, bookmarks, search
// The base addresses come from .env.local (app-settings/env.js); the operator from app-settings/operators.js.
import { env } from '@/app-settings/env.js'
import { operator as currentOperator } from '@/app-settings/operators.js'

const CRM = env.cmUrl
export const CLIENT_API = `${env.clientApiUrl}/api/client`
const operator = () => currentOperator.operator_uid

export const crm = {
  // "Is this visitor in the allowed region?" (no number needed)
  region: () => `${CRM}/api/auth/`,
  // "Is this number on the MTN network?" — the CRM checks the caller's internet address
  network: (username) => `${CRM}/api/auth/?operator_uid=${operator()}&usr=${encodeURIComponent(username)}`,
  sendCode: () => `${CRM}/api/otp/?operator_uid=${operator()}&mode=generate`,
  checkCode: () => `${CRM}/api/otp/?operator_uid=${operator()}&mode=validate`,
  createAccount: () => `${CRM}/api/subscriber/?operator_uid=${operator()}`,
  setPassword: (username) => `${CRM}/api/subscriber/?operator_uid=${operator()}&subscriber_uid=${encodeURIComponent(username)}`,
  // The person's bundles that are running now (WONA uses this to decide if a video may play)
  activeBundles: (username) =>
    `${CRM}/api/orders/?operator_uid=${operator()}&subscriber_uid=${encodeURIComponent(username)}&limit=30&status=Active`,
}

// Client API paths (added to CLIENT_API by server-connection/client-api.js)
export const clientPaths = {
  loginV2: 'v2/global/login',
  loginV1: 'v1/global/login',
  refreshV2: 'v2/global/refresh',
  refreshV1: 'v1/global/refresh',
  logout: 'v1/global/logout',
}
