// The in-between screens of Search, each from a Figma edge case:
//   Searching (spinner) · No results (+ "Did you mean") · Connection Error (+ Try Again)
//   · Results loading (grey placeholder boxes) · Voice input failed (red card)
import { Info, RotateCw } from 'lucide-react'

export function Searching() {
  return (
    <div className="flex flex-col items-center gap-3 pt-12">
      {/* A ring with one darker quarter, spinning */}
      <span className="size-[30px] animate-spin rounded-full border-[3px] border-[#1f3b26] border-t-[#4caf50]" />
      <p className="text-[11px] text-white/55">Searching ...</p>
    </div>
  )
}

export function NoResults({ text, suggestion, onSuggestion }) {
  return (
    <div className="flex flex-col items-center pt-10 text-center">
      <span className="flex size-10 items-center justify-center rounded-full border-[1.5px] border-brand text-brand">
        <span className="text-lg leading-none">i</span>
      </span>
      <p className="mt-3 text-sm text-white/55">No results for</p>
      <p className="mt-0.5 text-[15px] text-brand">"{text}"</p>
      {suggestion && (
        <button type="button" onClick={() => onSuggestion(suggestion)} className="mt-5 rounded-lg bg-[#262626] px-3.5 py-2 text-xs text-brand">
          Did you mean: <span className="text-white underline">“{suggestion}?”</span>
        </button>
      )}
    </div>
  )
}

export function ConnectionError({ onRetry }) {
  return (
    <div className="flex flex-col items-center px-8 pt-10 text-center">
      <span className="flex size-[30px] items-center justify-center rounded-full border-[1.5px] border-[#e9695f] text-[#e9695f]">
        <span className="text-sm leading-none">i</span>
      </span>
      <h3 className="mt-3 text-[15px] font-bold">Connection Error</h3>
      <p className="mt-1.5 text-xs text-white/50">We couldn't reach the server. Check your connection and try again.</p>
      <button type="button" onClick={onRetry} className="mt-4 flex h-[30px] items-center gap-1.5 rounded-full bg-brand px-4 text-xs font-semibold text-black">
        <RotateCw size={13} />
        Try Again
      </button>
    </div>
  )
}

export function ResultsLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-2">
        {[52, 70, 76, 92].map((w) => <span key={w} className="h-7 rounded-full bg-white/10" style={{ width: w }} />)}
      </div>
      <div className="mt-5 h-4 w-40 rounded bg-white/10" />
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {Array.from({ length: 9 }).map((_, i) => <div key={i} className="aspect-[2/3] rounded-md bg-white/10" />)}
      </div>
    </div>
  )
}

export function VoiceFailed({ message }) {
  return (
    <div role="alert" className="flex items-center gap-2.5 rounded-lg bg-[#fee4e2] px-3 py-2 text-live shadow-lg">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-current">
        <Info size={11} />
      </span>
      <div>
        <p className="text-xs font-semibold">Voice input failed</p>
        <p className="text-[10px] opacity-80">{message}</p>
      </div>
    </div>
  )
}
