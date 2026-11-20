// Stand-in content for Shorts (feed + player + comments), shaped like what the server will send later.
// Pictures come from the WONA/AfriPlay project (same designs) — see shorts/sample-images/.
// The Figma reel shows a baobab tree; that picture isn't in any earlier project yet, so the
// main reel uses the football frame until it's exported from Figma.
import circle04 from './sample-images/circle-04.webp'
import circle08 from './sample-images/circle-08.webp'
import circle09 from './sample-images/circle-09.webp'
import circleH1 from './sample-images/circle-h1.webp'
import circleH2 from './sample-images/circle-h2.webp'
import circleH3 from './sample-images/circle-h3.webp'
import circleH4 from './sample-images/circle-h4.webp'
import liveReelImage from './sample-images/live-reel-top-10-goals.webp'
import trend1 from './sample-images/trend-1-afcon-2024-highlights.webp'
import trend2 from './sample-images/trend-2-afrobeats-top-20.webp'
import trend3 from './sample-images/trend-3-best-of-nollywood.webp'
import trend4 from './sample-images/trend-4-finest-cuisine.webp'
import trend5 from './sample-images/trend-5-gourmet-delights.webp'
import trend6 from './sample-images/trend-6-exquisite-flavors.webp'
// grid-NN names follow WONA's numbering; what each picture actually shows is noted per import
import jollofPlatter from './sample-images/grid-01.webp'
import streetDance from './sample-images/grid-02.webp'
import nairobiSkyline from './sample-images/grid-03.webp'
import capeTownTable from './sample-images/grid-04.webp'
import marketBowls from './sample-images/grid-05.webp'
import vinylRecords from './sample-images/grid-06.webp'
import friedRice from './sample-images/grid-07.webp'
import tomatoMarket from './sample-images/grid-08.webp'
import sparklers from './sample-images/grid-09.webp'
import couchTalk from './sample-images/grid-12.webp'
import reelFootball from './sample-images/reel-football.webp'
import reelRainyAlley from './sample-images/reel-rainy-alley.webp'
import avatarKofi from './sample-images/avatar-kofi-asante.webp'
import avatarAmira from './sample-images/avatar-amira-hassan.webp'
import avatarLara from './sample-images/avatar-lara-nguyen.webp'
import avatarJames from './sample-images/avatar-james-smith.webp'
import myAvatarImage from './sample-images/my-avatar-mountains.webp'

// The signed-in person's picture (shown next to the comment box)
export const myAvatar = myAvatarImage

// ── Feed (the Shorts landing page) ──────────────────────────────────────────
export const circles = [
  { id: 'c0', image: jollofPlatter },
  { id: 'c1', image: tomatoMarket },
  { id: 'c2', image: circle08 },
  { id: 'c3', image: marketBowls },
  { id: 'c8', image: circle04 },
  { id: 'c9', image: circle09 },
  { id: 'c4', image: circleH1 },
  { id: 'c5', image: circleH2 },
  { id: 'c6', image: circleH3 },
  { id: 'c7', image: circleH4 },
]

export const liveReel = {
  id: 'live-1',
  image: liveReelImage,
  handle: '@GloTVSportsHQ',
  title: 'Top 10 African Football Goals 2024',
  views: '2.4M views',
}

export const trendingNow = [
  { id: 'tn1', rank: 1, image: trend1, title: 'AFCON 2024 Highlights', views: '1.2M' },
  { id: 'tn2', rank: 2, image: trend2, title: 'Afrobeats Top 20', views: '890K' },
  { id: 'tn3', rank: 3, image: trend3, title: 'Best Of Nollywood', views: '640K' },
  { id: 'tn4', rank: 4, image: trend4, title: 'Finest Cuisine', views: '410K' },
  { id: 'tn5', rank: 5, image: trend5, title: 'Gourmet Delights', views: '380K' },
  { id: 'tn6', rank: 6, image: trend6, title: 'Exquisite Flavors', views: '300K' },
]

// For You grid, in Figma order. The page deals them into two columns: 1st, 3rd, 5th… left; 2nd, 4th… right.
export const forYou = [
  { id: 'fy1', image: streetDance, title: 'Street Dance Battle Lagos', duration: '0:47', views: '445K views' },
  { id: 'fy2', image: jollofPlatter, title: 'Jollof Wars Ep. 2', duration: '0:47', views: '510K views' },
  { id: 'fy3', image: nairobiSkyline, title: 'Nairobi Night Market Tour', duration: '0:47', views: '320K views' },
  { id: 'fy4', image: vinylRecords, title: 'Highlife Mixtape Vol.2', duration: '0:47', views: '780K views' },
  { id: 'fy5', image: capeTownTable, title: 'Cape Town Culinary Adventure', duration: '0:47', views: '290K views' },
  { id: 'fy6', image: friedRice, title: 'Friedrice Wars Ep. 3', duration: '0:47', views: '1.1M views' },
  { id: 'fy7', image: marketBowls, title: 'Nairobi Night Market Tour', duration: '0:47', views: '320K views' },
  { id: 'fy8', image: tomatoMarket, title: 'Cape Town Culinary Adventure', duration: '0:47', views: '290K views' },
  { id: 'fy9', image: couchTalk, title: 'Couch Talk Sessions', duration: '0:47', views: '210K views' },
  { id: 'fy10', image: sparklers, title: "New Year's Eve Vibes", duration: '0:47', views: '1.5M views' },
]

// ── Comments ────────────────────────────────────────────────────────────────
// `time` shows top-right, `ago` shows under the text (both are in the Figma comment).
const sampleComments = [
  { id: 'cm1', handle: '@KofiAsante', avatar: avatarKofi, text: 'That Osimhen goal still gives me chills 🔥🔥', time: '4h ago', ago: '2h ago', likes: 234 },
  { id: 'cm2', handle: '@AmiraHassan', avatar: avatarAmira, text: "What a match! Can't believe we came back from behind! 💪⚽", time: '2h ago', ago: '1h ago', likes: 120 },
  { id: 'cm3', handle: '@LaraNguyen', avatar: avatarLara, text: 'Never doubted our boys! So proud of the fight! 🙌❤️', time: '45m ago', ago: '15m ago', likes: 150 },
  { id: 'cm4', handle: '@JamesSmith', avatar: avatarJames, text: 'The teamwork in that second half was incredible! 🌟👏', time: '1h ago', ago: '30m ago', likes: 98 },
  { id: 'cm5', handle: '@LaraNguyen', avatar: avatarLara, text: 'Never doubted our boys! So proud of the fight! 🙌❤️', time: '45m ago', ago: '15m ago', likes: 150 },
]

// ── Reels (what the full-screen player shows) ───────────────────────────────
// Every feed tile opens the player at its own id. Reels without their own record get a
// simple one built from the tile (see reelFor below).
const baseReel = {
  title: 'Top 10 African Football Moments 2024',
  creator: '@MTNTVsport',
  creatorInitial: 'M',
  caption: 'Top 10 African football moments of 2024 🔥⚽',
  hashtags: ['#GloTV', '#Football', '#AFCON2024'],
  audio: 'Original audio · GloTVsportsHQ',
  likes: 42000,
  commentCount: 1247,
  comments: sampleComments,
  currentTime: '0:21',
  totalTime: '1:02',
  progress: 0.34,
}

const reels = [
  { ...baseReel, id: 'live-1', image: reelFootball },
  { ...baseReel, id: 'tn1', image: trend1, title: 'AFCON 2024 Highlights', caption: 'AFCON 2024 Highlights ⚽' },
  // A reel with no comments yet, to show the "No comments yet" state
  { ...baseReel, id: 'tn2', image: trend2, title: 'Afrobeats Top 20', caption: 'Afrobeats Top 20 this week 🎶', hashtags: ['#GloTV', '#Afrobeats'], commentCount: 0, comments: [] },
  { ...baseReel, id: 'alley', image: reelRainyAlley, title: 'Rainy Evening Walk', caption: 'Rainy evening walk 🌧️', hashtags: ['#GloTV', '#Vibes'] },
]

// Every tile that can be opened, in the order you swipe through them in the player
const allTiles = [liveReel, ...trendingNow, ...forYou, ...circles]

export const reelQueue = [...new Set(['live-1', 'tn1', 'tn2', 'alley', ...allTiles.map((t) => t.id)])]

export function reelFor(id) {
  const own = reels.find((r) => r.id === id)
  if (own) return own
  const tile = allTiles.find((t) => t.id === id)
  if (!tile) return null
  return { ...baseReel, id, image: tile.image, title: tile.title ?? baseReel.title, caption: tile.title ?? baseReel.caption }
}
