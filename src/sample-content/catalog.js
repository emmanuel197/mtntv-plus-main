// Stand-in catalogue shared by several screens (web Home, Search) until the Uniqcast server is
// connected in Step 3–5. Pictures come from the WONA/AfriPlay project — the same designs as MTN TV+.
// When real data arrives, this folder can be deleted.
//
// Fields: type 'movie' | 'show' | 'channel', metadata = the small grey line ("2024 · 1h 53m"),
// genres = what category searches match on.
import kwMermaids from './pictures/kw-invasion-of-the-mermaids.webp'
import kwWonderWoman from './pictures/kw-wonder-woman-3.webp'
import kwVisAVis from './pictures/kw-vis-a-vis.webp'
import kwManOfMissions from './pictures/kw-man-of-missions.webp'
import kwChiefOfWar from './pictures/kw-chief-of-war.webp'
import esinBaba from './pictures/poster-esin-baba.webp'
import citation from './pictures/poster-citation.webp'
import familyFire from './pictures/poster-family-fire.webp'
import loveSpice from './pictures/poster-love-spice.webp'
import oneLastBite from './pictures/poster-one-last-bite.webp'
import liveSupersport from './pictures/live-supersport-premier.webp'
import liveBayou from './pictures/live-the-bayou.webp'
import liveAcrimony from './pictures/live-acrimony-2.webp'
import liveSquidGame from './pictures/live-squid-game.webp'
import liveNowhere from './pictures/live-nowhere.webp'
import prisonBreak from './pictures/poster-prison-break.webp'
import danfo from './pictures/poster-a-danfo-christmas.webp'
import babyDriver from './pictures/poster-baby-driver.webp'
import sweetHome from './pictures/poster-sweet-home.webp'
import loveInEveryWord from './pictures/poster-love-in-every-word.webp'
import soyayya2 from './pictures/poster-soyayya-ruwan-zuma-2.webp'
import nineteen92 from './pictures/poster-1992.webp'
import thePassage from './pictures/poster-the-passage.webp'
import sweetGirl from './pictures/poster-sweet-girl.webp'
import hulu from './pictures/channel-hulu.webp'
import hboMax from './pictures/channel-hbo-max.webp'
import universalTv from './pictures/channel-universal-tv.webp'
import tubi from './pictures/channel-tubi.webp'
import disney from './pictures/channel-disney.webp'
import theGame from './pictures/poster-the-game.webp'
import theChi from './pictures/poster-the-chi.webp'
import wura from './pictures/poster-wura.webp'
// (WONA's file for this was named soyayya-ruwan-zuma, but the picture is Enola Holmes)
import enola from './pictures/poster-enola-holmes.webp'
import bestResultBackdrop from './pictures/best-result-backdrop.webp'
import bestResultTitleArt from './pictures/best-result-title-art.webp'
import ntaLogo from './pictures/best-result-nta-logo.webp'

// ── Titles (one record each) ──
export const titles = {
  prisonBreak: { id: 't-prison-break', type: 'show', title: 'Prison Break', image: prisonBreak, metadata: '2024 · Series', genres: ['Action', 'Drama'] },
  enola: { id: 't-enola', type: 'movie', title: 'Enola Holmes', image: enola, metadata: '2020 · 2h 3m', genres: ['Drama', 'kids & Family'] },
  danfo: { id: 't-danfo', type: 'movie', title: 'A Danfo Christmas', image: danfo, metadata: '2023 · 1h 42m', genres: ['Comedy'] },
  babyDriver: { id: 't-baby-driver', type: 'movie', title: 'Baby Driver', image: babyDriver, metadata: '2017 · 1h 53m', genres: ['Action'] },
  sweetHome: { id: 't-sweet-home', type: 'show', title: 'Sweet Home', image: sweetHome, metadata: '2024 · Series', genres: ['Horror', 'Sci-fi'] },
  soyayya: { id: 't-soyayya', type: 'movie', title: 'Soyayya Ruwan Zuma', image: soyayya2, metadata: '2024 · 1h 58m', genres: ['Drama'] },
  esinBaba: { id: 't-esin-baba', type: 'movie', title: 'Esin Baba', image: esinBaba, metadata: '2024 · 1h 53m', genres: ['Drama', 'Documentary'] },
  citation: { id: 't-citation', type: 'movie', title: 'Citation', image: citation, metadata: '2020 · 2h 31m', genres: ['Drama'] },
  familyFire: { id: 't-family-fire', type: 'show', title: 'Family Fire', image: familyFire, metadata: '2020 · 4 Episodes', genres: ['Drama'] },
  loveSpice: { id: 't-love-spice', type: 'movie', title: 'Love & Spice', image: loveSpice, metadata: '2023 · 1h 47m', genres: ['Comedy'] },
  oneLastBite: { id: 't-one-last-bite', type: 'movie', title: 'One Last Bite', image: oneLastBite, metadata: '2024 · 1h 40m', genres: ['Horror'] },
  loveInEveryWord: { id: 't-love-in-every-word', type: 'movie', title: 'Love in Every Word', image: loveInEveryWord, metadata: '2024 · 1h 55m', genres: ['Drama'] },
  nineteen92: { id: 't-1992', type: 'movie', title: '1992', image: nineteen92, metadata: '2024 · 1h 47m', genres: ['Action', 'Drama'] },
  thePassage: { id: 't-the-passage', type: 'show', title: 'The Passage', image: thePassage, metadata: '2019 · Series', genres: ['Sci-fi', 'Horror'] },
  sweetGirl: { id: 't-sweet-girl', type: 'movie', title: 'Sweet Girl', image: sweetGirl, metadata: '2021 · 1h 50m', genres: ['Action'] },
  theGame: { id: 't-the-game', type: 'show', title: 'The Game', image: theGame, metadata: '2024 · Series', genres: ['Comedy'] },
  theChi: { id: 't-the-chi', type: 'show', title: 'The Chi', image: theChi, metadata: '2023 · Series', genres: ['Drama'] },
  wura: { id: 't-wura', type: 'show', title: 'Wura', image: wura, metadata: '2024 · Series', genres: ['Drama'] },
}

export const channels = [
  { id: 'ch-hulu', type: 'channel', title: 'Hulu', image: hulu, metadata: 'TV Channel', genres: ['Comedy', 'Drama'] },
  { id: 'ch-hbo-max', type: 'channel', title: 'HBO Max', image: hboMax, metadata: 'TV Channel', genres: ['Drama', 'Action'] },
  { id: 'ch-universal', type: 'channel', title: 'Universal TV', image: universalTv, metadata: 'TV Channel', genres: ['Action'] },
  { id: 'ch-tubi', type: 'channel', title: 'Tubi', image: tubi, metadata: 'TV Channel', genres: ['Comedy'] },
  { id: 'ch-disney', type: 'channel', title: 'Disney Channel', image: disney, metadata: 'TV Channel', genres: ['kids & Family', 'Animation'] },
]

export const keepWatchingPictures = { kwMermaids, kwWonderWoman, kwVisAVis, kwManOfMissions, kwChiefOfWar }
export const liveNowPictures = { liveSupersport, liveBayou, liveAcrimony, liveSquidGame, liveNowhere }

// Everything searchable, in one list
export const searchableCatalog = [...Object.values(titles), ...channels]

// WONA's "Best Results" card at the top of search results (an advertisement slot)
export const bestResult = {
  title: 'Prison Break',
  backdrop: bestResultBackdrop,
  titleArt: bestResultTitleArt,
  advertiserLogo: ntaLogo,
  genres: ['Drama', 'Thriller', 'Crime'],
}
