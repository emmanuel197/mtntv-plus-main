// Stand-in content for the Live TV screen, shaped like what the server will send later.
// The AFCON grid and SuperSport logo come from the WONA project; the channel logos are cut from
// the Figma screenshots. Real channel logos and programmes come from the server (EPG) later.
import afconGrid from './sample-images/afcon-match-grid.jpg'
import supersportLogo from './sample-images/logo-supersport.webp'
import logoAfricaEpic from './sample-images/logo-africa-epic.jpg'
import logoAriseNews from './sample-images/logo-arise-news.jpg'
import logoKidsTv from './sample-images/logo-kids-tv.jpg'
import logoDisneyBluey from './sample-images/logo-disney-bluey.jpg'
import logoSupersportSilver from './sample-images/logo-supersport-silver.jpg'
import logoBet from './sample-images/logo-bet.jpg'
import logoGhOne from './sample-images/logo-gh-one.jpg'
// Desktop only: the full-size match picture (from WONA) and the two team flags
import afconMatchWeb from './sample-images/afcon-match-graphic-web.webp'
import flagNigeria from './sample-images/flag-nigeria.svg'
import flagCameroon from './sample-images/flag-cameroon.svg'

export const categories = ['All', 'Sports', 'News', 'Entertainment', 'Movies', 'Kids']

// The big "now playing" programme at the top. It's a Sports programme, so it shows on All and Sports only.
export const featuredProgram = {
  id: 'afcon-semi',
  category: 'Sports',
  image: afconGrid,
  isLive: true,
  watching: '124.5K watching',
  channelLogo: supersportLogo,
  channelName: 'SuperSport',
  channelNumber: 'Ch 5',
  titleLines: ['AFCON 2024 Semifinal', 'Nigeria vs Cameroon'],
  startTime: '8:00 PM',
  endTime: '10:00 PM',
  remaining: '45 min remaining',
  progress: 0.45,
}

// isLive: false → no LIVE badge and a grey progress bar (Figma: Kids Tv, Disney Ch.)
export const channels = [
  { id: 'c1', logo: logoAfricaEpic, channel: 'Super-sport', category: 'Sports', isLive: true, title: 'AFCON Semi: NGA vs CMR', next: 'Post-Match Show · 10:00 PM', progress: 0.35 },
  { id: 'c2', logo: logoAriseNews, channel: 'Arise News', category: 'News', isLive: true, title: 'Morning Show', next: 'Focus Nigeria · 10 PM', progress: 0.35 },
  { id: 'c3', logo: logoKidsTv, channel: 'Kids Tv', category: 'Kids', isLive: false, title: 'Teen Titans Go!', next: 'The Stream · 9:30 PM', progress: 0.35 },
  { id: 'c4', logo: logoSupersportSilver, channel: 'SuperSport', category: 'Sports', isLive: true, title: 'AFCON Semi: NGA vs CMR', next: 'Post-Match Show · 10:00 PM', progress: 0.35 },
  { id: 'c5', logo: logoDisneyBluey, channel: 'Disney Ch.', category: 'Kids', isLive: false, title: 'Bluey Season 4', next: 'Kiff · 9:00 PM', progress: 0.35 },
  { id: 'c6', logo: logoSupersportSilver, channel: 'SuperSport', category: 'Sports', isLive: true, title: 'AFCON Semi: NGA vs CMR', next: 'Post-Match Show · 10:00 PM', progress: 0.35 },
  { id: 'c7', logo: logoBet, channel: 'BET', category: 'Entertainment', isLive: true, title: 'AFCON Semi: NGA vs CMR', next: 'Post-Match Show · 10:00 PM', progress: 0.35 },
  { id: 'c8', logo: logoGhOne, channel: 'Gh One', category: 'News', isLive: true, title: 'Morning Show', next: 'Focus Ghana · 10 PM', progress: 0.35 },
  { id: 'c9', logo: logoSupersportSilver, channel: 'KTN Kenya', category: 'News', isLive: true, title: 'KTN News Prime', next: 'Serie A Highlights', progress: 0.35 },
  { id: 'c10', logo: logoSupersportSilver, channel: 'Bollywood', category: 'Movies', isLive: true, title: 'Indian series', next: 'indian', progress: 0.35, nextIsPlain: true },
]

// ── Desktop (web) extras ─────────────────────────────────────────────────────
// The web page shows a bigger featured block with a scoreboard, an "On Air Today" schedule
// and a TV Guide. Copied from WONA's liveTvFixtures.js; real data comes from the server (EPG) later.

// The date shown above the "On Air Today" schedule
export const scheduleDate = 'Thursday, 30 April 2026'

// Extra bits the desktop featured block shows for the AFCON match: a larger match picture,
// flags and the score. Kept apart from `featuredProgram` so the phone page stays exactly as it is.
export const featuredMatch = {
  image: afconMatchWeb,
  teamA: { name: 'Nigeria', flag: flagNigeria, score: 2 },
  teamB: { name: 'Cameroon', flag: flagCameroon, score: 1 },
  minute: "67'",
}

// The day's schedule. "earlier" rows get a Replay button, "upcoming" rows a Remind button.
// The live-now part in the middle uses the `channels` list above.
export const onAirToday = [
  { id: 'sch1', time: '6:00 AM', category: 'News', title: 'Arise Morning Show', channel: 'Arise News', logo: logoAriseNews, when: 'earlier' },
  { id: 'sch2', time: '7:30 AM', category: 'News', title: 'Ghana Today', channel: 'Gh One', logo: logoGhOne, when: 'earlier' },
  { id: 'sch3', time: '9:00 AM', category: 'Sports', title: 'AFCON Group Stage Highlights', channel: 'SuperSport', logo: logoSupersportSilver, when: 'earlier' },
  { id: 'sch4', time: '11:00 AM', category: 'Entertainment', title: 'Entertainment Today Africa', channel: 'BET', logo: logoBet, when: 'earlier' },
  { id: 'sch5', time: '1:00 PM', category: 'Kids', title: 'Cartoon Afternoon', channel: 'Kids Tv', logo: logoKidsTv, when: 'earlier' },
  { id: 'sch6', time: '3:00 PM', category: 'Movies', title: 'Nollywood Afternoon Movie', channel: 'Bollywood', logo: logoSupersportSilver, when: 'earlier' },
  { id: 'sch7', time: '8:00 PM', category: 'Entertainment', title: 'BET Prime Time', channel: 'BET', logo: logoBet, when: 'upcoming' },
  { id: 'sch8', time: '9:00 PM', category: 'Kids', title: 'Bluey Season 4 Marathon', channel: 'Disney Ch.', logo: logoDisneyBluey, when: 'upcoming' },
  { id: 'sch9', time: '10:00 PM', category: 'Sports', title: 'Post-Match Analysis Show', channel: 'SuperSport', logo: logoSupersportSilver, when: 'upcoming' },
  { id: 'sch10', time: '11:00 PM', category: 'News', title: 'KTN News Prime', channel: 'KTN Kenya', logo: logoSupersportSilver, when: 'upcoming' },
  { id: 'sch11', time: '1:00 AM', category: 'Entertainment', title: 'Late Night Nollywood Feature', channel: 'BET', logo: logoBet, when: 'upcoming' },
  { id: 'sch12', time: '2:30 AM', category: 'Movies', title: 'Ghallywood Late Film', channel: 'Bollywood', logo: logoSupersportSilver, when: 'upcoming' },
]

// ── TV Guide (/tv-guide) ──
// Without a server, the guide makes up a 2-hourly schedule (6 AM → midnight) for any channel and day,
// reusing programme titles from above so it looks believable.
const guideTitles = [...new Set([...onAirToday.map((s) => s.title), ...channels.map((c) => c.title)])]

export function buildGuideShows(channelId, dayStart) {
  // Each channel starts at a different title, so the channels don't all look the same
  const offset = Math.max(0, channels.findIndex((c) => c.id === channelId))
  return Array.from({ length: 9 }, (_, i) => {
    const start = new Date(dayStart)
    start.setHours(6 + i * 2, 0, 0, 0)
    const end = new Date(start)
    end.setHours(start.getHours() + 2)
    return { id: `${channelId}-${i}`, title: guideTitles[(offset + i) % guideTitles.length], start, end }
  })
}
