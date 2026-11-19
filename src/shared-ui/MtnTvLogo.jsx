// Stand-in logo (yellow tile with "MTN TV+") until we get the real logo file from the designers.
// Shared because the navbar, phone top bar and sign-in screens all show it.
export default function MtnTvLogo({ className = '' }) {
  return (
    <span
      className={`inline-flex size-10 items-center justify-center rounded-lg bg-brand text-[10px] leading-none font-extrabold text-black ${className}`}
    >
      MTN
      <br />
      TV+
    </span>
  )
}
