// The Search tab: searches movies, TV shows and channels.
// MTN TV+ designs: the bar, the landing and the edge cases. WONA's mobile design: everything the MTN
// designers left out (suggestions while typing, the results page, Best Results card, loading boxes).
import { useNavigate } from 'react-router'
import { detailsPath } from '@/helpers/details-path.js'
import SearchScreen from './SearchScreen.jsx'
import { trendingSearches, categories } from './search-sample-data.js'
import { searchableCatalog, bestResult } from '@/sample-content/catalog.js'

export default function SearchPage() {
  const navigate = useNavigate()
  // Channels open Live TV; movies and shows open their details page
  const open = (item) => navigate(item.type === 'channel' ? '/live-tv' : detailsPath(item))

  return (
    <SearchScreen
      storageKey="mtntv:recentSearches"
      catalog={searchableCatalog}
      trending={trendingSearches}
      categories={categories}
      bestResult={bestResult}
      onOpen={open}
    />
  )
}
