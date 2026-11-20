// The series details page (/series/:id), ported from WONA's SeriesDetailsPage: the same top part
// as a movie, plus the season picker and episode list (both drawn by TitleDetails / EpisodeList).
// Unknown id → "Title not found". A movie id here → sends you to /movie/<id> instead.
import { Navigate, useParams } from 'react-router'
import TitleDetails from './TitleDetails.jsx'
import TitleNotFound from './TitleNotFound.jsx'
import { getTitleDetails } from './movies-sample-data.js'

export default function SeriesDetailsPage() {
  const { id } = useParams()
  const details = getTitleDetails(id)

  if (!details) return <TitleNotFound />
  if (details.type !== 'show') return <Navigate to={`/movie/${id}`} replace />

  // key={id}: a new series starts at Season 1 instead of keeping the last one's season
  return <TitleDetails key={id} details={details} />
}
