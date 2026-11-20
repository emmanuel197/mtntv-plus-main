// "Join the conversation" sheet: shown when a signed-out person tries to like, comment, follow or save.
// Lives here (not in shorts/) because it's about signing in, and other screens can reuse it later.
// Figma: dark sheet (#272727) from the bottom, play icon in a yellow ring, two buttons, a "continue" link.
import { useNavigate } from 'react-router'
import { Play } from 'lucide-react'

export default function SignInPrompt({ onClose }) {
  const navigate = useNavigate()
  return (
    // The dark backdrop: tapping it closes the sheet
    <div className="fixed inset-0 z-[70] flex flex-col justify-end bg-black/60" onClick={onClose}>
      <div
        // stopPropagation: taps inside the sheet must not reach the backdrop and close it
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center rounded-t-3xl border-t border-white/15 bg-[#272727]/95 px-9 pt-2.5 pb-8 text-center backdrop-blur-md"
      >
        <span className="h-1 w-9 rounded-full bg-white/40" />
        <span className="mt-4 flex size-10 items-center justify-center rounded-full border-2 border-brand">
          <Play size={16} fill="currentColor" className="ml-0.5 text-brand" />
        </span>
        <h2 className="mt-3 text-lg font-bold">Join the conversation</h2>
        <p className="mt-1 text-xs text-white/65">Log in or create an account to like, comment, and engage with creators.</p>

        <button
          type="button"
          onClick={() => navigate('/signin')}
          className="mt-5 h-[47px] w-full rounded-full bg-gradient-to-r from-[#c8b800] to-brand text-sm font-bold"
        >
          Log In to MTN TV+
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="mt-3 h-[47px] w-full rounded-full border border-white/30 bg-white/15 text-sm"
        >
          Create a free account
        </button>
        <button type="button" onClick={onClose} className="mt-3 text-[11px] text-white/65">
          Continue browsing without account
        </button>
      </div>
    </div>
  )
}
