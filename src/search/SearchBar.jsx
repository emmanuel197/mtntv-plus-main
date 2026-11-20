// The search box. Figma: 51px tall pill, light grey (#B2B2B2), 2px yellow border, dark text.
// Right side: × to clear (while there's text) or a microphone for voice search (while empty).
// The Figma screens don't show where the mic sits; it's here because they include "Voice input failed".
import { forwardRef } from 'react'
import { Search, X, Mic } from 'lucide-react'

const SearchBar = forwardRef(function SearchBar(
  { value, onChange, onSubmit, onClear, onFocusChange, onMic, listening, placeholder },
  ref,
) {
  return (
    <div className="flex h-[51px] items-center gap-3 rounded-full border-2 border-[#f5c621] bg-[#b2b2b2] px-4 text-black">
      <Search size={20} strokeWidth={2} className="shrink-0" />
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
        className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-[#1a1a1a]"
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
