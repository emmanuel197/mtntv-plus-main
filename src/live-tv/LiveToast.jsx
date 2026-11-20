// A small message that pops up at the bottom of the screen for a moment ("Reminder set for …").
// It closes itself after 2.5 seconds, or when × is pressed. Same gold colour as the Reels toast.
import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function LiveToast({ message, onClose }) {
  // Start a timer each time a new message appears; cancel it if the message changes or closes first
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, 2500)
    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null
  return (
    <div className="fixed bottom-[calc(40*var(--d))] left-1/2 z-50 flex -translate-x-1/2 items-center gap-[calc(14*var(--d))] rounded-[calc(16*var(--d))] bg-[#917226]/95 px-[calc(20*var(--d))] py-[calc(14*var(--d))] text-[calc(15*var(--d))] font-semibold shadow-lg backdrop-blur-md">
      {message}
      <button type="button" onClick={onClose} aria-label="Close" className="text-white/90">
        <X className="size-[calc(18*var(--d))]" />
      </button>
    </div>
  )
}
