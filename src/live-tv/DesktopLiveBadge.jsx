// The red "● LIVE" pill at desktop size (the phone one in shared-ui is fixed at 8px text).
// WONA sizes in design pixels: 10px bold text, 10/4 padding, small white dot.
export default function DesktopLiveBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-[calc(6*var(--d))] rounded-full bg-live px-[calc(10*var(--d))] py-[calc(4*var(--d))] text-[calc(10*var(--d))] leading-none font-bold text-white">
      <span className="size-[calc(6*var(--d))] rounded-full bg-white" />
      LIVE
    </span>
  )
}
