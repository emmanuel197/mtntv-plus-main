// One search result tile, WONA's mobile style: posters 109×147 shape, channels 3:2,
// 5px corners and a thin pale border (#E1E7F8). Used by the suggestions and the results page.
export default function ResultTile({ item, onOpen }) {
  const channel = item.type === 'channel'
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`overflow-hidden rounded-[5px] border border-[#e1e7f8] ${channel ? 'aspect-[3/2]' : 'aspect-[109/147]'}`}
    >
      <img src={item.image} alt={item.title} loading="lazy" className="size-full object-cover" />
    </button>
  )
}
