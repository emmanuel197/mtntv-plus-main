// Stand-in data for the account screens (Profile, My Library) until the server is connected in
// Step 3. Pictures come from the shared sample catalogue, so nothing new is downloaded.
import { titles, keepWatchingPictures as kw } from '@/sample-content/catalog.js'
import profileAvatar from './sample-images/profile-avatar.webp'

// ── Profile ──
export const sampleProfile = {
  firstName: 'Kwame',
  lastName: 'Mensah',
  phone: '+233 24 123 4567',
  avatar: profileAvatar,
}

// The bundle the person is on now (names match src/bundles/bundle-plans.js)
export const currentPlan = {
  name: 'Daily Max',
  price: 5.0,
  currency: 'GH₵',
  kind: 'Auto-Renewal',
  startedOn: '20 Nov 2026, 9:00 AM',
  renewsOn: '21 Nov 2026, 9:00 AM',
}

// Phones, laptops and TVs signed in to this account (WONA's Devices tab)
export const sampleDevices = [
  { id: 'd1', name: 'Samsung Galaxy A54', kind: 'Android · Phone', thisDevice: false },
  { id: 'd2', name: 'Chrome on Windows', kind: 'Web · Desktop', thisDevice: true },
  { id: 'd3', name: 'LG Smart TV', kind: 'webOS · TV', thisDevice: false },
]

// MTN TV+'s real support contacts are not known yet — the PM must send them.
export const supportRows = [
  { label: 'Call Us (Toll Free)', value: 'To be confirmed' },
  { label: 'WhatsApp', value: 'To be confirmed' },
  { label: 'Email Us', value: 'To be confirmed' },
  { label: 'Facebook', value: 'To be confirmed' },
  { label: 'X (Twitter)', value: 'To be confirmed' },
]

// Sample questions; the real list comes from the server's FAQ call
export const sampleFaqs = [
  { q: 'What is MTN TV+?', a: 'MTN TV+ lets you watch live TV channels, movies, shows and Shorts on your phone, laptop or TV.' },
  { q: 'How do I buy a bundle?', a: 'Open Get Bundle, choose a plan and tap Subscribe. MTN numbers can pay from airtime or MoMo.' },
  { q: 'Do bundles include data?', a: 'MTN subscribers get a data bonus with each bundle. Other networks get the viewing time only.' },
  { q: 'On how many devices can I watch?', a: 'You can see and remove the devices signed in to your account under Devices.' },
  { q: 'How do I cancel auto-renewal?', a: 'Go to Subscription History, open Active Subscriptions and tap Cancel on the bundle.' },
]

// ── Subscription history (WONA lists these from the CRM) ──
export const sampleHistory = [
  { id: 'h1', name: 'Daily Max', date: '20 Nov 2026', price: 5.0, currency: 'GH₵', status: 'Active' },
  { id: 'h2', name: 'Weekly Wonder', date: '12 Nov 2026', price: 25.0, currency: 'GH₵', status: 'Expired' },
  { id: 'h3', name: 'Daily Cinema', date: '05 Nov 2026', price: 2.5, currency: 'GH₵', status: 'Expired' },
  { id: 'h4', name: 'Monthly Magic', date: '02 Oct 2026', price: 75.0, currency: 'GH₵', status: 'Expired' },
]

// ── My Library: titles rented (watch within a time window) or bought (keep forever) ──
const HOUR = 36e5 // one hour in milliseconds
const DAY = 24 * HOUR
const now = Date.now()

export const activeRentals = [
  { id: 'r1', title: 'Invasion of The Mermaids', image: kw.kwMermaids, expiresAt: now + 32 * HOUR, progress: 85, left: '14 min left', rentedAt: now - 16 * HOUR },
  { id: 'r2', title: 'Wonder Woman 3', image: kw.kwWonderWoman, expiresAt: now + 60 * HOUR, progress: 62, left: '36 min left', rentedAt: now - 20 * HOUR },
  { id: 'r3', title: 'Chief of War', image: kw.kwChiefOfWar, expiresAt: now + 5 * HOUR, progress: 20, left: '1h 20m left', rentedAt: now - 40 * HOUR },
]

export const ownedTitles = [titles.theChi, titles.wura, titles.babyDriver, titles.citation].map((t, i) => ({
  ...t,
  boughtAt: now - (i + 1) * 5 * DAY,
}))

export const expiredRentals = [titles.oneLastBite, titles.loveSpice, titles.sweetGirl].map((t, i) => ({
  ...t,
  progress: [25, 55, 90][i],
  expiredAt: now - (i + 2) * DAY,
}))

export const newReleases = [titles.nineteen92, titles.thePassage, titles.loveInEveryWord, titles.familyFire, titles.esinBaba, titles.theGame]

// "EXPIRES IN 32H", or in days once it's two days or more away
export const expiresLabel = (at) => {
  const hours = Math.max(0, Math.round((at - Date.now()) / HOUR))
  return hours >= 48 ? `EXPIRES IN ${Math.round(hours / 24)}D` : `EXPIRES IN ${hours}H`
}

// "?empty" at the end of the address shows the empty-state screens (as in WONA), for testing
export const previewEmpty = () => new URLSearchParams(window.location.search).has('empty')
