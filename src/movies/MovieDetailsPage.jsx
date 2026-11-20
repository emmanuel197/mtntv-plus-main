// The movie details page (/movie/:id), ported from WONA's MovieDetailsPage.
// It looks the id up in the sample data and hands the title to TitleDetails, which draws the page.
// Unknown id → "Title not found". A series id here → sends you to /series/<id> instead.
import { Navigate, useParams } from 'react-router'
import TitleDetails from './TitleDetails.jsx'
import TitleNotFound from './TitleNotFound.jsx'
import { getTitleDetails } from './movies-sample-data.js'

export default function MovieDetailsPage() {
  const { id } = useParams()
  const details = getTitleDetails(id)

  if (!details) return <TitleNotFound />
  // replace: the wrong address isn't kept in the Back button history
  if (details.type === 'show') return <Navigate to={`/series/${id}`} replace />

  // key={id}: a new title starts fresh (My Stuff button, folded description) instead of reusing the old one's state
  return <TitleDetails key={id} details={details} />
}
