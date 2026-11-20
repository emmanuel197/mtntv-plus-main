// The search box, AfriPlay/WONA style: 52px tall dark see-through pill with a faint border
// that turns yellow while you're typing (focus-within), white text.
// Right side: × to clear (while there's text) or a microphone for voice search (while empty).
// The Figma screens don't show where the mic sits; it's here because they include "Voice input failed".
import { forwardRef } from 'react'
import { Search, X, Mic } from 'lucide-react'

const SearchBar = forwardRef(function SearchBar(
  { value, onChange, onSubmit, onClear, onFocusChange, onMic, listening, placeholder },
  ref,
) {
  return (
    <div className="flex h-[52px] items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 text-white transition-colors focus-within:border-brand md:h-[calc(64*var(--d))] md:gap-[calc(14*var(--d))] md:px-[calc(28*var(--d))]">
      <Search strokeWidth={2} className="size-[18px] shrink-0 text-white/70 md:size-[calc(24*var(--d))]" />
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit()
          if (e.key === 'Escape') e.currentTarget.blur()
        }}
        placeholder={placeholder}
        enterKeyHint="search"
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/40 md:text-[calc(20*var(--d))]"
      />
      {value ? (
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onClear} aria-label="Clear search">
          <X size={18} />
        </button>
      ) : (
        <button
          type="button"
          onClick={onMic}
          aria-label={listening ? 'Stop listening' : 'Search by voice'}
          className={`flex size-8 items-center justify-center rounded-full ${listening ? 'animate-pulse bg-brand' : ''}`}
        >
          <Mic size={18} />
        </button>
      )}
    </div>
  )
})

export default SearchBar
