// The small pop-up pill at the bottom of the details pages ("Player coming soon").
// On phones it sits above the floating tab bar. Screen readers announce it (role="status").
import { Info } from 'lucide-react'

export default function FlashMessage({ message }) {
  if (!message) return null
  return (
    <div
      role="status"
      className="fixed bottom-28 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#2a2a2a]/95 px-4 py-2.5 text-sm whitespace-nowrap shadow-2xl backdrop-blur-md md:bottom-[calc(48*var(--d))] md:gap-[calc(10*var(--d))] md:px-[calc(24*var(--d))] md:py-[calc(14*var(--d))] md:text-[calc(18*var(--d))]"
    >
      <Info className="size-4 text-brand md:size-[calc(20*var(--d))]" />
      {message}
    </div>
  )
}
