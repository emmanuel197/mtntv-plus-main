// The footer at the bottom of every desktop page (hidden on phones). From the MTN TV+ web design
// (same as WONA's): logo + Instagram / Twitter / YouTube on the left, four columns of links,
// "©2007-2026 MTN TV+" underneath. 339 design pixels tall. The links have no pages yet.
import MtnTvLogo from '@/shared-ui/MtnTvLogo.jsx'
import instagram from './footer-pictures/instagram.svg'
import twitter from './footer-pictures/twitter.svg'
import youtube from './footer-pictures/youtube.svg'

const COLUMNS = [
  ['Investor Relation', 'Privacy', 'Contact Us', 'Audio Descriptions'],
  ['Help Center', 'Legal Notices', 'Not Sharing my personal information'],
  ['Gift Cards', 'MTNTV+ Shop', 'Cookie preferences', 'Ads choices'],
  ['Media Center', 'Terms of Use', 'Coperate Information'],
]

export default function SiteFooter() {
  return (
    <footer className="relative hidden h-[calc(339*var(--d))] overflow-hidden border-t border-white/10 bg-[#0d0d0d] md:block">
      {/* soft yellow glow on the right, like the design */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-[calc(80*var(--d))] size-[calc(369*var(--d))] -translate-y-1/2 rounded-full bg-brand/15 blur-[calc(160*var(--d))]"
      />

      <div className="absolute top-[calc(54*var(--d))] left-[calc(61*var(--d))] flex w-[calc(1528*var(--d))] items-start justify-between">
        <div className="flex flex-col gap-[calc(16*var(--d))]">
          <MtnTvLogo className="size-[calc(84*var(--d))]" />
          <div className="flex items-center gap-[calc(28*var(--d))]">
            <img src={instagram} alt="Instagram" className="size-[calc(36*var(--d))]" />
            <img src={twitter} alt="Twitter" className="size-[calc(36*var(--d))]" />
            <img src={youtube} alt="YouTube" className="size-[calc(36*var(--d))]" />
          </div>
        </div>

        <div className="flex items-start gap-[calc(52*var(--d))] text-white/60">
          {COLUMNS.map((column) => (
            <ul key={column[0]} className="flex w-[calc(222*var(--d))] flex-col gap-[calc(24*var(--d))]">
              {column.map((label) => (
                <li key={label} className="text-[calc(18*var(--d))] leading-[calc(28*var(--d))]">
                  {label}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <p className="absolute top-[calc(287*var(--d))] left-[calc(64*var(--d))] text-[calc(18*var(--d))] text-white/50">@2007-2026 MTN TV+</p>
    </footer>
  )
}
