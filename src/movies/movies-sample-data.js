// Stand-in details for the Movies page and the movie/series details pages, until the server
// (Uniqcast movie/series details calls) is connected. The basic title info (name, poster, genres)
// comes from the shared catalogue (src/sample-content/catalog.js); this file adds the extras the
// details pages need, keyed by the same ids: description, rating, cast, seasons and episodes.
// Cast photos and episode pictures are WONA's sample pictures, so they don't match the real titles.
import { titles, bestResult } from '@/sample-content/catalog.js'
import colmanDomingo from './sample-images/cast-colman-domingo.webp'
import jaafarJackson from './sample-images/cast-jaafar-jackson.webp'
import niaLong from './sample-images/cast-nia-long.webp'
import johnBoyega from './sample-images/cast-john-boyega.webp'
import mattDamon from './sample-images/cast-matt-damon.webp'
import stevenYeun from './sample-images/cast-steven-yeun.webp'
import episode1 from './sample-images/episode-01.webp'
import episode2 from './sample-images/episode-02.webp'
import episode3 from './sample-images/episode-03.webp'
import episode4 from './sample-images/episode-04.webp'
import episode5 from './sample-images/episode-05.webp'
import episode6 from './sample-images/episode-06.webp'

// ── Cast (the same six sample photos, shared out between titles) ──
const people = {
  colman: { name: 'Colman Domingo', photo: colmanDomingo },
  jaafar: { name: 'Jaafar Jackson', photo: jaafarJackson },
  nia: { name: 'Nia Long', photo: niaLong },
  john: { name: 'John Boyega', photo: johnBoyega },
  matt: { name: 'Matt Damon', photo: mattDamon },
  steven: { name: 'Steven Yeun', photo: stevenYeun },
}
// cast('nia:Mama Tola', 'john:Femi') → [{ name, photo, role }, …]
const cast = (...entries) =>
  entries.map((entry) => {
    const [key, role] = entry.split(':')
    return { ...people[key], role }
  })

// ── Episodes ──
const stills = [episode1, episode2, episode3, episode4, episode5, episode6]
const episodeNames = ['Pilot', 'The Long Night', 'Crossroads', 'Old Debts', 'Homecoming', 'No Way Back', 'Fault Lines', 'The Reckoning']

// Makes one season of sample episodes: season(1, 6) → Season 1 with 6 episodes
function season(number, episodeCount, minutes = 52) {
  const episodes = Array.from({ length: episodeCount }, (_, i) => ({
    id: `s${number}e${i + 1}`,
    number: i + 1,
    title: episodeNames[(i + number - 1) % episodeNames.length],
    // a few minutes either side, so the list doesn't look copy-pasted
    duration: `${minutes + ((i * 7) % 9) - 4}m`,
    image: stills[(i + number) % stills.length],
    description: 'Secrets surface and loyalties are tested as the story takes a sharp turn.',
  }))
  return { number, episodes }
}

// ── Extra details per title (keys are the catalogue ids) ──
// backdrop: a wide picture for the top of the page. Most titles don't have one yet, so the
// page falls back to a blurred copy of the poster (WONA does the same).
const extras = {
  't-esin-baba': {
    rating: '8.1', maturity: 'PG-13',
    description:
      "When a proud horse trainer loses his prized stallion, he travels across the old kingdom to win it back — and learns what his family has quietly given up for his pride. A warm, sweeping Yoruba drama about honour, debt and forgiveness.",
    cast: cast('colman:Baba Ade', 'nia:Iya Ade', 'jaafar:Tunde', 'john:The Rider'),
  },
  't-citation': {
    rating: '7.4', maturity: 'TV-MA',
    description:
      'A bright university student reports a respected professor, and finds herself fighting the whole institution to be believed. A tense drama about courage and speaking up.',
    cast: cast('nia:Dean Bello', 'john:Prof. Lucien', 'jaafar:Koffi'),
  },
  't-family-fire': {
    rating: '7.0', maturity: 'TV-14',
    description: 'Three siblings come home for their father’s birthday. By morning, an old secret has set the whole family alight.',
    cast: cast('nia:Auntie Bisi', 'colman:Papa Okon', 'steven:Daniel'),
  },
  't-love-spice': {
    rating: '6.9', maturity: 'PG',
    description: 'A chef who cooks with too much pepper meets a food critic who can’t take the heat. A sweet, funny romance served hot.',
    cast: cast('nia:Chef Amaka', 'jaafar:Kayode', 'john:Uche'),
  },
  't-one-last-bite': {
    rating: '6.5', maturity: 'R',
    description: 'Friends on a road trip stop at a roadside restaurant that never seems to close. The food is free. Leaving is not.',
    cast: cast('steven:Jin', 'john:Marcus', 'nia:The Owner'),
  },
  't-enola': {
    rating: '6.6', maturity: 'PG-13',
    description: 'On her sixteenth birthday, the clever younger sister of a famous detective finds her mother gone, and sets off to London to solve the mystery herself.',
    cast: cast('nia:Mrs. Holmes', 'matt:Mycroft', 'jaafar:Tewkesbury'),
  },
  't-danfo': {
    rating: '6.8', maturity: 'PG',
    description: 'A Lagos bus driver and his chatty passengers get stuck in Christmas Eve traffic. Nobody planned to spend the holiday together, but here they are.',
    cast: cast('john:Driver Sule', 'nia:Madam Joy', 'jaafar:Conductor'),
  },
  't-baby-driver': {
    rating: '7.5', maturity: 'R',
    description: 'A young getaway driver who times every escape to his music wants out of the crime world, but his boss has one more job planned.',
    cast: cast('jaafar:Baby', 'matt:Doc', 'nia:Debora', 'john:Bats'),
  },
  't-soyayya': {
    rating: '7.2', maturity: 'PG',
    description: 'Two young lovers from rival families in Kano dare to choose each other, and both families must decide what matters more.',
    cast: cast('jaafar:Sadiq', 'nia:Hajiya', 'colman:Alhaji'),
  },
  't-love-in-every-word': {
    rating: '7.0', maturity: 'PG',
    description: 'A shy poet writes love letters for other people, until one of them is meant for him.',
    cast: cast('jaafar:Tobi', 'nia:Folake', 'steven:Ken'),
  },
  't-1992': {
    rating: '6.7', maturity: 'R',
    description: 'As riots break out across the city, a father trying to keep his son safe is pulled into a dangerous heist.',
    cast: cast('john:Mercer', 'matt:Riggin', 'jaafar:Abraham'),
  },
  't-sweet-girl': {
    rating: '5.6', maturity: 'R',
    description: 'A grieving husband hunts the people he blames for his wife’s death, and his daughter will not let him do it alone.',
    cast: cast('matt:Ray Cooper', 'nia:Rachel', 'steven:Amos'),
  },
  't-prison-break': {
    backdrop: bestResult.backdrop,
    rating: '8.3', maturity: 'TV-14',
    description:
      'An engineer gets himself locked up in the same prison as his brother, who is on death row for a crime he didn’t commit. The escape plan is tattooed on his body.',
    cast: cast('matt:Michael', 'john:Lincoln', 'nia:Sara', 'colman:Warden Pope'),
    seasons: [season(1, 8, 44), season(2, 6, 44)],
  },
  't-sweet-home': {
    rating: '7.3', maturity: 'TV-MA',
    description: 'A lonely teenager moves into a run-down apartment block just as people everywhere start turning into monsters.',
    cast: cast('steven:Hyun-su', 'jaafar:Jae-heon', 'nia:Yi-kyung'),
    seasons: [season(1, 6, 50), season(2, 5, 50)],
  },
  't-the-passage': {
    rating: '7.0', maturity: 'TV-14',
    description: 'A federal agent is ordered to bring a young girl to a secret lab, and decides to protect her instead.',
    cast: cast('colman:Brad Wolgast', 'nia:Dr. Lear', 'john:Shauna'),
    seasons: [season(1, 6, 45)],
  },
  't-the-game': {
    rating: '6.9', maturity: 'TV-14',
    description: 'Life on and off the pitch for a team of pro footballers and the partners who keep them grounded.',
    cast: cast('jaafar:Malik', 'nia:Tasha', 'colman:Coach'),
    seasons: [season(1, 6, 30), season(2, 6, 30)],
  },
  't-the-chi': {
    rating: '7.6', maturity: 'TV-MA',
    description:
      "One death on Chicago's South Side sets off a chain of events that ties together a group of neighbours — a young cook, a hustler, a schoolboy and a father trying to do right.",
    cast: cast('jaafar:Kevin', 'colman:Ronnie', 'nia:Laverne', 'john:Emmett'),
    seasons: [season(1, 6, 55), season(2, 6, 55), season(3, 5, 55)],
  },
  't-wura': {
    rating: '7.1', maturity: 'TV-14',
    description: 'The head of a gold-mining empire in Ilesa will do anything to keep her power, even if it costs her family.',
    cast: cast('nia:Wura Amoo', 'colman:Tobi', 'jaafar:Kemi'),
    seasons: [season(1, 6, 25), season(2, 6, 25)],
  },
}

// ── Look-ups ──
const allTitles = Object.values(titles)

// "2024 · 1h 53m" → { year: '2024', duration: '1h 53m' } ("Series" / "4 Episodes" isn't a duration)
function splitMetadata(metadata = '') {
  const [year, rest] = metadata.split(' · ')
  return { year, duration: /\d+h|\d+m/.test(rest || '') ? rest : null }
}

// Everything the details page needs for one id, or null when there's no such title
export function getTitleDetails(id) {
  const title = allTitles.find((t) => t.id === id)
  if (!title) return null
  const extra = extras[id] || {}
  const { year, duration } = splitMetadata(title.metadata)
  return {
    ...title,
    year,
    duration,
    rating: extra.rating,
    maturity: extra.maturity,
    description: extra.description || '',
    cast: extra.cast || [],
    seasons: extra.seasons || [],
    // no wide picture yet → use the poster (the page blurs it so it doesn't look stretched)
    backdrop: extra.backdrop || title.image,
    hasRealBackdrop: Boolean(extra.backdrop),
  }
}

// "More like this": other titles sharing a genre first, then the rest, 10 at most
export function getMoreLikeThis(id) {
  const self = allTitles.find((t) => t.id === id)
  if (!self) return []
  const others = allTitles.filter((t) => t.id !== id)
  const sharesGenre = (t) => t.genres.some((g) => self.genres.includes(g))
  return [...others.filter(sharesGenre), ...others.filter((t) => !sharesGenre(t))].slice(0, 10)
}


// ── Movies page ──
// The genre chips (?category=<id>). "label" must match the catalogue's genre spelling.
export const genres = [
  { id: 'action', label: 'Action' },
  { id: 'comedy', label: 'Comedy' },
  { id: 'drama', label: 'Drama' },
  { id: 'horror', label: 'Horror' },
  { id: 'sci-fi', label: 'Sci-fi' },
  { id: 'documentary', label: 'Documentary' },
  { id: 'kids', label: 'kids & Family' },
]

export function titlesInGenre(label) {
  return allTitles.filter((t) => t.genres.includes(label))
}

// The rows shown when no genre is picked (WONA's Movies page rails, renamed for MTN TV+)
const t = titles
export const movieRows = [
  { id: 'new', name: 'New Releases on MTN TV+', items: [t.loveInEveryWord, t.soyayya, t.nineteen92, t.thePassage, t.sweetGirl, t.esinBaba] },
  { id: 'top', name: 'Top 10 Movies', isTop10: true, items: [t.prisonBreak, t.soyayya, t.danfo, t.babyDriver, t.sweetHome, t.enola, t.citation] },
  { id: 'only', name: 'Only on MTN TV+', items: [t.theGame, t.theChi, t.wura, t.familyFire] },
  { id: 'because', name: 'Because You Watched', items: [t.esinBaba, t.citation, t.familyFire, t.loveSpice, t.oneLastBite] },
]
