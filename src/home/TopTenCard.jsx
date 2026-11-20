// Poster in "Top 10 Movies & Shows" with its big yellow rank number. Figma: 118×182 poster.
import PosterCard from '@/shared-ui/PosterCard.jsx'

export default function TopTenCard({ rank, image, title }) {
  return (
    <div className="relative shrink-0">
      <PosterCard image={image} title={title} width={118} height={182} />
      <span
        className="absolute bottom-0 left-1 text-[44px] leading-none font-extrabold text-brand italic"
        style={{ WebkitTextStroke: '1px rgb(0 0 0 / 0.6)' }}
      >
        {rank}
      </span>
    </div>
  )
}
