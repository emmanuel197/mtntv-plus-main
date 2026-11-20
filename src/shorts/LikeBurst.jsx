// The double-tap "like" animation — WONA's LikeBurst, in MTN TV+ yellow instead of WONA's pink:
// the reel flashes yellow, a glossy yellow heart pops inside a white-ringed disc, two yellow rings
// and six short rays spread out with small glowing dots, then it all fades (~0.9 s).
// Everything is sized in "em" so the one `size` (outer width) scales the whole burst.
// `size` is pixels (phone: 250) or a CSS length (desktop: "calc(260 * var(--d))").
// The animations (like-tint, like-pop, like-ring, like-ray, like-dot) are in styles/global.css.
const RAYS = [-62, -18, 28, 152, 198, 242] // angles in degrees
const DOTS = [-80, -5, 60, 110, 175, 250]

export default function LikeBurst({ size = 250 }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 bg-brand/25" style={{ animation: 'like-tint 900ms ease-out forwards' }} />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        // 1em = a 24th of the width, whether size is a number or a CSS length
        style={{ width: size, height: size, fontSize: typeof size === 'number' ? size / 24 : `calc(${size} / 24)` }}
      >
        <span className="absolute inset-0 rounded-full border-[0.22em] border-brand/60" style={{ animation: 'like-ring 900ms ease-out forwards' }} />
        <span className="absolute inset-[3.5em] rounded-full border-[0.24em] border-brand/85" style={{ animation: 'like-ring 900ms 60ms ease-out both' }} />

        {RAYS.map((deg) => (
          <span key={deg} className="absolute top-1/2 left-1/2 h-[0.34em] w-[3em] origin-left" style={{ transform: `rotate(${deg}deg)` }}>
            <span
              className="block size-full rounded-full bg-gradient-to-r from-white to-brand"
              style={{ animation: 'like-ray 900ms ease-out forwards', '--like-from': '6em', '--like-to': '8.5em' }}
            />
          </span>
        ))}

        {DOTS.map((deg) => (
          <span key={deg} className="absolute top-1/2 left-1/2 size-0" style={{ transform: `rotate(${deg}deg)` }}>
            <span
              className="absolute size-[0.7em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe27a] shadow-[0_0_0.5em_#ffc90d]"
              style={{ animation: 'like-dot 900ms ease-out forwards', '--like-from': '8.5em', '--like-to': '11.4em' }}
            />
          </span>
        ))}

        <span
          className="absolute inset-[6.5em] flex items-center justify-center rounded-full border-[0.16em] border-white/85 bg-brand/25 shadow-[0_0_1.2em_rgba(255,201,13,0.6)]"
          style={{ animation: 'like-pop 900ms cubic-bezier(0.34,1.56,0.64,1) forwards' }}
        >
          <svg viewBox="0 0 24 22" className="w-[6em]">
            <defs>
              <linearGradient id="like-heart-yellow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffe27a" />
                <stop offset="1" stopColor="#ffc90d" />
              </linearGradient>
            </defs>
            <path
              fill="url(#like-heart-yellow)"
              d="M12 21.6 10.3 20C4.2 14.5.2 10.9.2 6.5.2 2.9 3 .2 6.6.2c2 0 4 .9 5.4 2.4C13.4 1.1 15.4.2 17.4.2c3.6 0 6.4 2.7 6.4 6.3 0 4.4-4 8-10.1 13.5L12 21.6Z"
            />
            <circle cx="12" cy="13" r="1.3" fill="#fff" opacity="0.9" />
          </svg>
        </span>
      </div>
    </>
  )
}
