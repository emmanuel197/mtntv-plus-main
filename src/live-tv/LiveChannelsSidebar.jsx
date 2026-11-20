// The "All Live Channels" list down the right side of the desktop Live TV page (WONA's LiveChannelsSidebar).
// Title + count pill, then one card per channel.
import DesktopChannelCard from './DesktopChannelCard.jsx'

export default function LiveChannelsSidebar({ title, channels, activeId, onSelect }) {
  return (
    <aside className="flex w-[calc(380*var(--d))] shrink-0 flex-col gap-[calc(33*var(--d))]">
      <div className="flex items-center gap-[calc(11*var(--d))] border-b border-white/10 py-[calc(21*var(--d))]">
        <h3 className="text-[calc(18*var(--d))] font-bold italic">{title}</h3>
        <span className="rounded-full bg-white/10 px-[calc(12*var(--d))] py-[calc(5*var(--d))] text-[calc(14*var(--d))] font-medium text-white/75">
          {channels.length}
        </span>
      </div>

      <div className="flex flex-col gap-[calc(24*var(--d))]">
        {channels.map((c, i) => (
          <DesktopChannelCard key={c.id} channel={c} selected={c.id === activeId} striped={i % 2 === 1} onSelect={() => onSelect(c)} />
        ))}
        {channels.length === 0 && <p className="text-center text-[calc(14*var(--d))] text-white/50">No channels match.</p>}
      </div>
    </aside>
  )
}
