// The "All · Sports · News · Entertainment · Movies · Kids" chips. They scroll sideways on narrow phones.
// Figma: 26px tall, 13px text, 8px apart; selected = yellow pill, others = dark pill with dimmed text.
export default function LiveCategoryChips({ categories, selected, onSelect }) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-page">
      {categories.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => onSelect(name)}
          className={`h-[26px] shrink-0 rounded-full px-3 text-[13px] ${
            selected === name ? 'bg-brand font-semibold text-black' : 'bg-[#1f1b19] text-white/70'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  )
}
