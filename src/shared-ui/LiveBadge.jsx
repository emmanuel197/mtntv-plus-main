// The small red "● LIVE" pill. Shared: Home's live cards and the Live TV screen both use it.
export default function LiveBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex h-[15px] shrink-0 items-center gap-1 rounded-full bg-live px-1.5 text-[8px] leading-none font-bold text-white ${className}`}
    >
      <span className="size-1 rounded-full bg-white" />
      LIVE
    </span>
  )
}
