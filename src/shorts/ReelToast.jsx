// The gold pop-up message above the tab bar ("Following MTNTV+sport", "Saved to My List", …).
// Figma: #917226 pill, initial in a yellow circle, bold title + small line, × to close.
import { X } from 'lucide-react'

export default function ReelToast({ initial, title, subtitle, onClose }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-[#917226]/95 px-3 py-2.5 backdrop-blur-md">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-black italic">
        {initial}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold">{title}</p>
        <p className="truncate text-[10px] text-white/80">{subtitle}</p>
      </div>
      <button type="button" onClick={onClose} aria-label="Close" className="shrink-0 text-white/90">
        <X size={16} />
      </button>
    </div>
  )
}
