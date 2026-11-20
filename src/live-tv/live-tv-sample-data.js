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
