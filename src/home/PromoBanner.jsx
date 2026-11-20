// The large promo picture under "Trending Now". Figma: 348×420, inside the 23px page margins.
export default function PromoBanner({ image, title }) {
  return (
    <div className="px-page">
      <img src={image} alt={title} loading="lazy" className="aspect-[348/420] w-full max-w-[348px] rounded-lg object-cover" />
    </div>
  )
}
