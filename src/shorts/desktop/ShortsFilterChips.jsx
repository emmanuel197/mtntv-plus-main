// The row of filter pills at the top of the desktop Shorts page (For You / Trending / Sports / Movies).
// From WONA's ShortsFilterChips: 38 tall, 16 side padding, 18px text, 16 apart (design pixels).
// The picked pill is yellow with black text. For now picking one only changes the highlight
// (sample data has no categories yet).
const FILTERS = ['For You', 'Trending', 'Sports', 'Movies']

export default function ShortsFilterChips({ active, onChange, filters = FILTERS }) {
  return (
    <div className="flex items-center gap-[calc(16*var(--d))]">
      {filters.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onChange(label)}
          className={`flex h-[calc(38*var(--d))] items-center rounded-full px-[calc(16*var(--d))] text-[calc(18*var(--d))] transition-colors ${
            label === active ? 'bg-brand font-semibold text-black' : 'bg-white/10 text-white/75 hover:bg-white/15 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
