// Round preview in the "MTN TV+ Shorts" row. Figma: 110px circle, yellow length badge near the bottom.
export default function ShortsPreviewCard({ image, duration }) {
  return (
    <div className="relative size-[110px] shrink-0">
      <img src={image} alt="" loading="lazy" className="size-full rounded-full border border-white/20 object-cover" />
      <span className="absolute bottom-3 left-1/2 flex h-4 -translate-x-1/2 items-center rounded-full bg-brand px-1.5 text-[10px] font-bold text-black">
        {duration}
      </span>
    </div>
  )
}
