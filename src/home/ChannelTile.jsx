// Channel logo tile in "Browse Live Channels". Figma: 160×88, yellow 1px border, rounded corners.
export default function ChannelTile({ image, name }) {
  return (
    <div className="h-[88px] w-[160px] shrink-0 overflow-hidden rounded-lg border border-brand bg-surface">
      <img src={image} alt={name} loading="lazy" className="size-full object-cover" />
    </div>
  )
}
