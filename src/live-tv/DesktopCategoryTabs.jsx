// The "All · Sports · News · Entertainment · Movies · Kids" pills on the desktop Live TV page.
// From WONA's ChannelCategoryTabs: 40 design px tall, 22 side padding, 12 apart, 14px text.
// The chosen one is MTN yellow with black text; the rest are dark grey with a faint border.
export default function DesktopCategoryTabs({ categories, selected, onSelect }) {
  return (
    <div className="flex items-center gap-[calc(12*var(--d))]">
      {categories.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => onSelect(name)}
          className={`flex h-[calc(40*var(--d))] items-center rounded-full px-[calc(22*var(--d))] text-[calc(14*var(--d))] transition-colors ${
            selected === name
              ? 'bg-brand font-semibold text-black'
              : 'border border-white/15 bg-white/10 font-medium text-white hover:bg-white/15'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  )
}
