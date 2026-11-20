// Stand-in content for the home screen, shaped like what the server will send later.
// Pictures are cut from the Figma design (see home/sample-images/). In Step 5 this file is
// replaced by real data from the Uniqcast / CRM servers, and sample-images/ can be deleted.
import michaelPoster from './sample-images/michael-poster.jpg'
import michaelTitleArt from './sample-images/michael-title-art.png'
import short1 from './sample-images/short-1.jpg'
import short2 from './sample-images/short-2.jpg'
import short3 from './sample-images/short-3.jpg'
import starBoy from './sample-images/star-boy.jpg'
import theHerd from './sample-images/the-herd.jpg'
import danfoChristmas from './sample-images/danfo-christmas.jpg'
import esinBaba from './sample-images/esin-baba.jpg'
import citation from './sample-images/citation.jpg'
import channelDisney from './sample-images/channel-disney.jpg'
import channelCnn from './sample-images/channel-cnn.jpg'
import sweetHome from './sample-images/sweet-home.jpg'
import enolaHolmes from './sample-images/enola-holmes.jpg'
import theGame from './sample-images/the-game.jpg'
import theChi from './sample-images/the-chi.jpg'
import upcoming1 from './sample-images/upcoming-1.jpg'
import upcoming2 from './sample-images/upcoming-2.jpg'
import promoBanner from './sample-images/promo-valentine-banner.png'

// Big banners at the top (the hero carousel). Only "Michael" has title art; the rest show their title as text.
export const heroSlides = [
  { id: 'michael', title: 'Michael', image: michaelPoster, titleArt: michaelTitleArt, tag: 'New Release', genres: ['Musical', 'Drama', 'Musical Drama'] },
  { id: 'esin-baba', title: 'Esin Baba', image: esinBaba, tag: 'New Release', genres: ['Drama', 'History'] },
  { id: 'citation', title: 'Citation', image: citation, tag: 'Trending', genres: ['Drama', 'Thriller'] },
  { id: 'the-game', title: 'The Game', image: theGame, tag: 'Only on MTN TV+', genres: ['Comedy', 'Sport'] },
  { id: 'sweet-home', title: 'Sweet Home', image: sweetHome, tag: 'Top 10', genres: ['Horror', 'Fantasy'] },
  { id: 'the-chi', title: 'The Chi', image: theChi, tag: 'New Season', genres: ['Drama'] },
]

export const shorts = [
  { id: 's1', image: short1, duration: '0:45' },
  { id: 's2', image: short2, duration: '0:45' },
  { id: 's3', image: short3, duration: '0:45' },
  { id: 's4', image: starBoy, duration: '0:30' },
]

export const keepWatching = [
  { id: 'k1', title: 'Electric Dreams', image: esinBaba, progressText: '85% watched · 14 min left' },
  { id: 'k2', title: 'Kin of the Kingdom', image: citation, progressText: '62% watched · 6 min left' },
  { id: 'k3', title: 'The Herd', image: theHerd, progressText: '30% watched · 52 min left' },
]

export const becauseYouWatched = [
  { id: 'b1', title: 'Star Boy', image: starBoy },
  { id: 'b2', title: 'The Herd', image: theHerd },
  { id: 'b3', title: 'Citation', image: citation },
]

// `background` is used when a live card has no picture (Figma shows plain colour cards).
export const liveNow = [
  { id: 'l1', channel: 'SuperSport', title: 'SuperSport Premier', image: theGame, progress: 0.4 },
  { id: 'l2', channel: 'The Voice Nigeria', title: 'Africa Magic', background: 'linear-gradient(135deg, #210820, #501216)', progress: 0.75 },
  { id: 'l3', channel: 'Breaking News', title: 'CNN International', background: 'linear-gradient(135deg, #0a1c4c, #12307a)', progress: 0.2 },
]

export const topTen = [
  { id: 't1', title: 'Sweet Home', image: sweetHome },
  { id: 't2', title: 'Enola Holmes', image: enolaHolmes },
  { id: 't3', title: 'A Danfo Christmas', image: danfoChristmas },
  { id: 't4', title: 'Star Boy', image: starBoy },
]

export const newReleases = [
  { id: 'n1', title: 'Esin Baba', image: esinBaba },
  { id: 'n2', title: 'Citation', image: citation },
  { id: 'n3', title: 'The Herd', image: theHerd },
]

export const liveChannels = [
  { id: 'c1', name: 'Disney Channel', image: channelDisney },
  { id: 'c2', name: 'CNN', image: channelCnn },
  { id: 'c3', name: 'Disney Channel', image: channelDisney },
]

export const trendingNow = [
  { id: 'tr1', title: 'Sweet Home', image: sweetHome },
  { id: 'tr2', title: 'Enola Holmes', image: enolaHolmes },
  { id: 'tr3', title: 'A Danfo Christmas', image: danfoChristmas },
]

export const promo = { id: 'valentine', title: 'Promises Made In Love — Valentine stories streaming now', image: promoBanner }

export const onlyOnMtn = [
  { id: 'o1', title: 'The Game', image: theGame },
  { id: 'o2', title: 'The Chi', image: theChi },
  { id: 'o3', title: 'Star Boy', image: starBoy },
]

export const upcomingShows = [
  { id: 'u1', title: 'Upcoming show', image: upcoming1 },
  { id: 'u2', title: 'Upcoming show', image: upcoming2 },
]
