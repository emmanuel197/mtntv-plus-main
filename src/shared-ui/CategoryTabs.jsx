// The "All · Movies · TV Shows" switch under the logo (Home and Shorts). Figma: 24px tall, 12px text, selected = yellow pill.
// For now it only remembers the choice; filtering the rows comes with real data in Step 5.
const CATEGORIES = ['All', 'Movies', 'TV Shows']

export default function CategoryTabs({ selected, onSelect }) {
  return (
    <div className="flex">
      {CATEGORIES.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => onSelect(name)}
          className={`h-6 rounded-full px-3 text-xs ${selected === name ? 'bg-brand font-medium text-black' : 'text-text'}`}
        >
          {name}
        </button>
      ))}
    </div>
  )
}
