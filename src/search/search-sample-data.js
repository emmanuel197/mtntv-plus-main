// Stand-in content for Search, until the real search call (Uniqcast `v3/{operator}/search/global/{text}`)
// is wired in Step 3. The searchable titles are in src/sample-content/catalog.js (shared with web Home);
// the page filters them in the browser, standing in for the server.
import actionImg from './sample-images/category-action.webp'
import comedyImg from './sample-images/category-comedy.webp'
import dramaImg from './sample-images/category-drama.webp'
import sciFiImg from './sample-images/category-sci-fi.webp'
import kidsImg from './sample-images/category-kids-and-family.webp'
import horrorImg from './sample-images/category-horror.webp'
import documentaryImg from './sample-images/category-documentary.webp'
import aiClipsImg from './sample-images/category-ai-clips.webp'
import animationImg from './sample-images/category-animation.webp'

// Search starts suggesting from 2 characters (Figma: "Type 2+ characters to see suggestions")
export const MIN_QUERY_LENGTH = 2

// What a first-time visitor sees under "Recent Searches" (after that, their own searches are remembered)
export const startingRecentSearches = ['Action Movies', 'The Witcher', 'Special Tv shows', 'Squid Game', 'Baby Driver']

export const trendingSearches = ['Black Panther: Wakanda Forever', 'The Last of Us', 'Avatar: The Way of Water', 'House of the Dragon', 'Succession']

export const categories = [
  { id: 'action', label: 'Action', image: actionImg },
  { id: 'comedy', label: 'Comedy', image: comedyImg },
  { id: 'drama', label: 'Drama', image: dramaImg },
  { id: 'sci-fi', label: 'Sci-fi', image: sciFiImg },
  { id: 'kids', label: 'kids & Family', image: kidsImg },
  { id: 'horror', label: 'Horror', image: horrorImg },
  { id: 'documentary', label: 'Documentary', image: documentaryImg },
  { id: 'ai-clips', label: 'AI Clips', image: aiClipsImg },
  { id: 'animation', label: 'Animation', image: animationImg },
]

// The searchable titles live in src/sample-content/catalog.js (shared with the web Home page).
