// "Does this person have a bundle running right now?" — asked before any video plays (WONA's check).
// The CRM lists the person's orders; a bundle counts when it isn't free, says "Active",
// and today falls between its start and end date.
import { crmWithAppLogin } from '@/server-connection/crm-api.js'
import { crm } from '@/server-connection/server-addresses.js'
import { getSession } from '@/auth/session.js'

const isRunningNow = (order, now = new Date()) =>
  order.price !== 0 &&
  order.status === 'Active' &&
  now >= new Date(`${order.purchase_date} ${order.purchase_time}`) &&
  now <= new Date(`${order.end_date} ${order.end_time}`)

// Answers 'active', 'none' or 'error' (couldn't ask the server)
export async function checkActiveBundle() {
  const username = getSession()?.username
  if (!username) return 'none' // e.g. VITE_BYPASS_AUTH: "signed in" without a real account
  try {
    const { data } = await crmWithAppLogin.get(crm.activeBundles(username))
    if (data.status !== 'ok') return 'error'
    return (data.data ?? []).some((order) => isRunningNow(order)) ? 'active' : 'none'
  } catch {
    return 'error'
  }
}
