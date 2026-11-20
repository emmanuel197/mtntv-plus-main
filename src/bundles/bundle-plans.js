// The bundles people can buy. Copied from AfriPlay Ghana (same MTN Ghana operator we're borrowing
// for now); there is no "list of packages" call on the server, so the list lives in the app — as in
// AfriPlay and WONA. Replace with MTN TV+'s own plans once the PM sends them.
//
// productId is the CRM product id sent when buying. Most plans have one id for MTN numbers and
// one for other networks; the daily plans also come in two kinds: Auto-Renewal or On-Demand.
export const bundlePlans = [
  {
    uid: 'basic',
    name: 'Daily Live',
    validity: '1 day',
    price: 2.0,
    currency: 'GH₵',
    details: ['Live TV Channels only', '200Mb data bonus'],
    productId: { mtn: { 'auto-renewal': 1079, 'on-demand': 1081 }, other: { 'auto-renewal': 1136, 'on-demand': 1136 } },
  },
  {
    uid: 'basicplus',
    name: 'Daily Cinema',
    validity: '1 day',
    price: 2.5,
    currency: 'GH₵',
    details: ['Movies & Shows Only', '320Mb data bonus'],
    productId: { mtn: { 'auto-renewal': 1080, 'on-demand': 1082 }, other: { 'auto-renewal': 1137, 'on-demand': 1137 } },
  },
  {
    uid: 'compact',
    name: 'Daily Max',
    validity: '1 day',
    price: 5.0,
    currency: 'GH₵',
    details: ['Unlimited access to Live TV, Movies & Shows', '600Mb data bonus'],
    productId: { mtn: { 'auto-renewal': 1083, 'on-demand': 1084 }, other: { 'auto-renewal': 1138, 'on-demand': 1138 } },
  },
  { uid: 'standard', name: '3-day Treat', validity: '3 days', price: 12.5, currency: 'GH₵', details: ['3-Day unlimited access', '1.2GB data bonus'], productId: { mtn: 1085, other: 1139 } },
  { uid: 'pro', name: 'Weekly Wonder', validity: '7 days', price: 25.0, currency: 'GH₵', details: ['7-Day unlimited access', '3GB data bonus'], productId: { mtn: 1086, other: 1140 } },
  { uid: 'max', name: 'Monthly Magic', validity: '30 days', price: 75.0, currency: 'GH₵', details: ['30-Day unlimited access', '10GB data bonus'], productId: { mtn: 1087, other: 1141 } },
]

// Is this person on MTN? Decided by the username prefix of the operator in .env.local ("amngh" = MTN Ghana).
// Data bonuses are MTN-only, so other networks don't see those lines.
export const isMtnOperator = (usernamePrefix) => usernamePrefix?.includes('amngh') ?? false
