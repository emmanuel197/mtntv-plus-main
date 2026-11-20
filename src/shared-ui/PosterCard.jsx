// A movie/show poster. Default size is the common Figma poster: 157×182 with slightly rounded corners.
// Shared: rows on Home, Search results and detail pages all show posters.
export default function PosterCard({ image, title, width = 157, height = 182, className = '' }) {
  return (
    <div className={`shrink-0 overflow-hidden rounded-md bg-surface ${className}`} style={{ width, height }}>
      <img src={image} alt={title} loading="lazy" className="size-full object-cover" />
    </div>
  )
}
