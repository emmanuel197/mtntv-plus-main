// Stand-in content for the desktop (web) Home page, in the order of the MTN TV+ web design.
// Titles come from the shared catalogue (src/sample-content/catalog.js); Home-only pictures from home/.
// Replaced by real server data in Step 5.
import { titles, channels, keepWatchingPictures as kw, liveNowPictures as live } from '@/sample-content/catalog.js'
import { categories } from '@/search/search-sample-data.js'
import michaelPoster from './sample-images/michael-poster.jpg'
import michaelTitleArt from './sample-images/michael-title-art.png'
import promoBand from './sample-images/promo-celebrating-30-years-web.jpg'
import short1 from '@/shorts/sample-images/grid-01.webp'
import short2 from '@/shorts/sample-images/grid-08.webp'
import short3 from '@/shorts/sample-images/circle-h3.webp'
import short4 from '@/shorts/sample-images/circle-h5.webp'
import short5 from '@/shorts/sample-images/circle-09.webp'
import short6 from '@/shorts/sample-images/grid-05.webp'

// Hero slides. The Figma backdrop for Michael is a concert photo that isn't in any project yet,
// so the poster stands in. Other slides use the Keep Watching pictures as backdrops.
export const heroSlides = [
  {
    id: 'michael',
    title: 'Michael',
    backdrop: michaelPoster,
    titleArt: michaelTitleArt,
    tag: 'New Release',
    rating: '8.6',
    maturity: 'TV-MA',
    year: '2016',
    genres: ['Drama', 'Sci-Fi', 'Horror', 'Teen'],
    description:
      "Michael Jackson, a gifted performer destined for global fame, rises from his family's musical beginnings to become one of the world's most influential and celebrated entertainers.",
  },
  { id: 'ww3', title: 'Wonder Woman 3', backdrop: kw.kwWonderWoman, tag: 'Trending', rating: '7.9', maturity: 'PG-13', year: '2025', genres: ['Action', 'Fantasy'], description: 'Diana returns to face a threat that could end the age of heroes.' },
  { id: 'mermaids', title: 'Invasion of The Mermaids', backdrop: kw.kwMermaids, tag: 'Only on MTN TV+', rating: '7.2', maturity: 'PG', year: '2024', genres: ['Fantasy', 'Adventure'], description: 'When the tide turns, a coastal town learns the sea has been watching.' },
  { id: 'vis-a-vis', title: 'Vis A Vis', backdrop: kw.kwVisAVis, tag: 'New Season', rating: '8.1', maturity: 'TV-MA', year: '2023', genres: ['Drama', 'Crime'], description: 'Inside a women’s prison, alliances shift as fast as the guards.' },
  { id: 'man-of-missions', title: 'Man of Missions', backdrop: kw.kwManOfMissions, tag: 'Top 10', rating: '7.6', maturity: 'TV-14', year: '2024', genres: ['Action', 'Thriller'], description: 'One last job. Five cities. No way out.' },
  { id: 'chief-of-war', title: 'Chief of War', backdrop: kw.kwChiefOfWar, tag: 'New Release', rating: '8.0', maturity: 'TV-MA', year: '2025', genres: ['Drama', 'History'], description: 'A warrior chief fights to unite his islands against invaders.' },
]

export const shorts = [
  { id: 'fy2', image: short1, duration: '0:45' },
  { id: 'fy8', image: short2, duration: '0:45' },
  { id: 'c6', image: short3, duration: '0:45' },
  { id: 'c7', image: short4, duration: '0:45' },
  { id: 'c9', image: short5, duration: '0:45' },
  { id: 'fy7', image: short6, duration: '1:20' },
]

const watched = '65% watched · 35 min left'
export const keepWatching = [
  { id: 'k1', title: 'Invasion of The Mermaids', image: kw.kwMermaids, subtitle: watched, progress: 0.55 },
  { id: 'k2', title: 'Wonder Woman 3', image: kw.kwWonderWoman, subtitle: watched, progress: 0.55 },
  { id: 'k3', title: 'Vis A Vis', image: kw.kwVisAVis, subtitle: watched, progress: 0.55 },
  { id: 'k4', title: 'Man of Missions', image: kw.kwManOfMissions, subtitle: watched, progress: 0.55 },
  { id: 'k5', title: 'Chief of War', image: kw.kwChiefOfWar, subtitle: watched, progress: 0.55 },
]

export const becauseYouWatched = [titles.esinBaba, titles.citation, titles.familyFire, titles.loveSpice, titles.oneLastBite]

export const liveNow = [
  { id: 'l1', title: 'SuperSport Premier', image: live.liveSupersport, progress: 0.45 },
  { id: 'l2', title: 'The Bayou', image: live.liveBayou, progress: 0.6 },
  { id: 'l3', title: 'Acrimony 2 (2025)', image: live.liveAcrimony, progress: 0.3 },
  { id: 'l4', title: 'Squid Game', image: live.liveSquidGame, progress: 0.75 },
  { id: 'l5', title: 'Nowhere', image: live.liveNowhere, progress: 0.2 },
]

// Stand-in cut from the design screenshot (blurry when large) — swap for the Figma export
export const promo = { title: 'Celebrating 30 Years of MTN', image: promoBand }

export const topTen = [titles.prisonBreak, titles.enola, titles.danfo, titles.babyDriver, titles.sweetHome]

export const genres = categories

export const newReleases = [titles.loveInEveryWord, titles.soyayya, titles.nineteen92, titles.thePassage, titles.sweetGirl]

export const liveChannels = channels

export const onlyOnMtn = [titles.theGame, titles.theChi, titles.wura]
