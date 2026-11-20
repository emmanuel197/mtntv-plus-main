// One search result tile, WONA's mobile style: posters 109×147 shape, channels 3:2,
// 5px corners and a thin border (AfriPlay's is gold-tinted on dark, so brand yellow at 40%). Used by the suggestions and the results page.
export default function ResultTile({ item, onOpen }) {
  const channel = item.type === 'channel'
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`overflow-hidden rounded-[5px] border border-brand/40 ${channel ? 'aspect-[3/2]' : 'aspect-[109/147]'}`}
    >
      <img src={item.image} alt={item.title} loading="lazy" className="size-full object-cover" />
    </button>
  )
}
