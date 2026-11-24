// The frame every sign-in screen sits in (WONA's AuthShell, in MTN TV+ colours — MTN TV+ has no
// sign-in designs): a darkened picture behind, and a see-through card in the middle with the logo,
// a title, a line of help text, then the screen's own content.
// Phone: real pixel sizes. Desktop (md:): design pixels (var(--d)) of the 1728px web design.
import { Link } from 'react-router'
import MtnTvLogo from '@/shared-ui/MtnTvLogo.jsx'
import backdrop from './pictures/sign-in-backdrop.webp'

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24 md:px-[calc(53*var(--d))] md:py-[calc(160*var(--d))]">
      <img src={backdrop} alt="" className="absolute inset-0 size-full object-cover" />
      {/* dark layer so the card and text stay readable over the picture */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      <div className="relative w-full max-w-[350px] rounded-[20px] border border-white/15 bg-black/50 p-6 backdrop-blur-md md:max-w-[calc(520*var(--d))] md:rounded-[calc(24*var(--d))] md:p-[calc(48*var(--d))]">
        <Link to="/" aria-label="MTN TV+ home" className="inline-block">
          <MtnTvLogo className="size-12 md:size-[calc(64*var(--d))]" />
        </Link>
        <h1 className="mt-5 text-2xl font-bold italic md:mt-[calc(28*var(--d))] md:text-[calc(32*var(--d))]">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-white/65 md:mt-[calc(8*var(--d))] md:text-[calc(16*var(--d))]">{subtitle}</p>}
        <div className="mt-6 md:mt-[calc(32*var(--d))]">{children}</div>
      </div>
    </div>
  )
}
