// One programme in the "On Air Today" schedule: time, channel logo, category tag, title, channel,
// and a yellow button: "Replay" for shows that already aired, "Remind" for shows still to come.
// Clicking the row itself shows that channel in the featured block at the top.
import { RotateCcw, Bell } from 'lucide-react'

export default function ScheduleRow({ item, striped, onSelect, onAction }) {
  const isEarlier = item.when === 'earlier'
  return (
    <div
      onClick={() => onSelect(item)}
      className={`flex cursor-pointer items-center gap-[calc(20*var(--d))] rounded-[calc(12*var(--d))] px-[calc(16*var(--d))] py-[calc(14*var(--d))] transition-colors hover:bg-white/10 ${
        striped ? 'bg-white/5' : ''
      }`}
    >
      <span className="w-[calc(80*var(--d))] shrink-0 text-[calc(14*var(--d))] text-white/60">{item.time}</span>
      <img src={item.logo} alt="" className="size-[calc(52*var(--d))] shrink-0 rounded-[calc(8*var(--d))] object-cover" />
      <div className="flex min-w-0 flex-1 flex-col gap-[calc(4*var(--d))]">
        <span className="w-fit rounded-[calc(6*var(--d))] bg-white/10 px-[calc(8*var(--d))] py-[calc(2*var(--d))] text-[calc(10*var(--d))] text-white/80">
          {item.category}
        </span>
        <span className="text-[calc(14*var(--d))] leading-tight font-semibold">{item.title}</span>
        <span className="text-[calc(12*var(--d))] text-white/60">{item.channel}</span>
      </div>
      <button
        type="button"
        // stopPropagation: pressing Replay/Remind should not also count as a click on the row
        onClick={(e) => {
          e.stopPropagation()
          onAction(item)
        }}
        className="flex shrink-0 items-center gap-[calc(8*var(--d))] rounded-full bg-brand px-[calc(18*var(--d))] py-[calc(8*var(--d))] text-[calc(12*var(--d))] font-semibold text-black hover:bg-brand/90"
      >
        {isEarlier ? <RotateCcw className="size-[calc(15*var(--d))]" /> : <Bell className="size-[calc(15*var(--d))]" />}
        {isEarlier ? 'Replay' : 'Remind'}
      </button>
    </div>
  )
}
