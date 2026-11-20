// Small building blocks shared by the account screens (My Stuff, My Library, Profile).
// Ported from WONA's MoreUi.jsx in MTN TV+ colours. "Phone…" pieces use real pixels;
// "Desktop…" pieces use design pixels of the 1728px web design (calc(N*var(--d))).
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { SORTS } from './my-stuff-store.js'

// ── Phone ──

// Round yellow-edged back button, the same one Get Bundle and Notifications use
export function BackButton() {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="Back"
      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/80"
    >
      <ChevronLeft size={18} className="text-brand" />
    </button>
  )
}

// Back button on the left, bold italic title in the middle (WONA's 62px screen header)
export function PhoneHeader({ title, right }) {
  return (
    <header className="relative flex h-[62px] items-center justify-between px-[21px]">
      <BackButton />
      <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-bold italic">{title}</h1>
      {right}
    </header>
  )
}

// All / Movies / Tv Shows: the chosen one is a yellow pill, the others plain text
export function FilterTabs({ tabs, value, onChange, desktop = false }) {
  return (
    <div className={`flex items-center ${desktop ? 'gap-[calc(12*var(--d))]' : 'gap-3'}`}>
      {tabs.map((t) => {
        const active = value === t.id
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={[
              'rounded-full',
              desktop ? 'h-[calc(40*var(--d))] px-[calc(20*var(--d))] text-[calc(16*var(--d))]' : `h-[25px] text-xs ${active ? 'px-3' : ''}`,
              active ? 'bg-brand font-semibold text-black' : desktop ? 'bg-white/10 text-white/80 hover:bg-white/20' : 'text-white/80',
            ].join(' ')}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

// "Date Added ⌄" button with a small menu under it. variant "text" = no pill around it.
export function SortMenu({ value, onChange, variant = 'pill', desktop = false }) {
  const [open, setOpen] = useState(false)
  const box = useRef(null)

  // Close the menu when you tap anywhere outside it
  useEffect(() => {
    if (!open) return undefined
    const close = (e) => !box.current?.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  const current = SORTS.find((s) => s.id === value)
  const size = desktop ? 'text-[calc(16*var(--d))]' : 'text-xs'

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={[
          'flex items-center gap-1.5 text-white/80',
          size,
          variant === 'pill' &&
            (desktop
              ? 'h-[calc(40*var(--d))] rounded-full border border-white/10 bg-white/10 px-[calc(18*var(--d))]'
              : 'h-9 rounded-full border border-white/10 bg-white/10 px-3.5'),
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {variant === 'pill' ? current.label : 'Sort by'}
        <ChevronDown className={desktop ? 'size-[calc(16*var(--d))]' : 'size-3.5'} />
      </button>
      {open && (
        <div
          className={`absolute right-0 z-20 mt-1.5 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#262422] shadow-lg ${desktop ? 'min-w-[calc(180*var(--d))]' : 'min-w-[150px]'}`}
        >
          {SORTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                onChange(s.id)
                setOpen(false)
              }}
              className={`text-left ${desktop ? 'px-[calc(16*var(--d))] py-[calc(12*var(--d))]' : 'px-3.5 py-2.5'} ${size} ${s.id === value ? 'bg-white/10 font-semibold text-brand' : 'text-white/80 hover:bg-white/5'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// A titled group: "Movies (06)" heading with an arrow, then a row that scrolls sideways
// (or a 3-across grid when one filter is chosen). Phone only.
export function PhoneSection({ title, count, onMore, grid = false, children }) {
  return (
    <section className="flex flex-col gap-[22px]">
      <div className="flex items-center justify-between px-[21px]">
        <h2 className="flex items-baseline gap-1 text-base font-semibold">
          {title}
          {count != null && <span className="text-[13px] font-normal text-white/40">({String(count).padStart(2, '0')})</span>}
        </h2>
        {onMore && (
          <button type="button" aria-label={`See all ${title}`} onClick={onMore} className="text-white/85">
            <ChevronRight size={22} />
          </button>
        )}
      </div>
      <div className={`px-[21px] ${grid ? 'grid grid-cols-3 gap-x-2.5 gap-y-4' : 'no-scrollbar flex gap-2.5 overflow-x-auto'}`}>{children}</div>
    </section>
  )
}

// 117×181 poster with a thin light border (fluid = fills a grid cell, same shape)
export function PhonePoster({ title, image, onClick, fluid = false, children }) {
  return (
    <div className={`relative shrink-0 ${fluid ? 'aspect-[117/181] w-full' : 'h-[181px] w-[117px]'}`}>
      <button type="button" onClick={onClick} aria-label={title} className="size-full overflow-hidden rounded-[4.5px] border border-white/70">
        <img src={image} alt={title} className="size-full object-cover" />
      </button>
      {children}
    </div>
  )
}

// "Your list is empty": round icon, title, short text, Browse Titles, then a "how to" card.
// desktop = the same thing sized for the web page.
export function EmptyState({ icon, title, body, howToTitle, steps, desktop = false }) {
  const navigate = useNavigate()
  const dp = desktop // shorter name for the many size switches below
  return (
    <div className={`mx-auto flex flex-col items-center ${dp ? 'max-w-[calc(520*var(--d))] pt-[calc(48*var(--d))]' : 'px-[21px] pt-10'}`}>
      <span
        className={`flex items-center justify-center rounded-full border border-white/15 bg-[#262422] text-brand ${dp ? 'size-[calc(100*var(--d))]' : 'size-20'}`}
      >
        {icon}
      </span>
      <h2 className={`text-center font-bold italic ${dp ? 'mt-[calc(22*var(--d))] text-[calc(24*var(--d))]' : 'mt-[18px] text-lg'}`}>{title}</h2>
      <p className={`text-center text-white/75 ${dp ? 'mt-[calc(12*var(--d))] text-[calc(16*var(--d))]' : 'mt-2.5 max-w-[300px] text-sm leading-[18px]'}`}>{body}</p>
      <button
        type="button"
        onClick={() => navigate('/')}
        className={`rounded-full bg-brand font-semibold text-black hover:opacity-90 ${dp ? 'mt-[calc(28*var(--d))] h-[calc(50*var(--d))] px-[calc(32*var(--d))] text-[calc(16*var(--d))]' : 'mt-7 h-[43px] w-[117px] text-[13px]'}`}
      >
        Browse Titles
      </button>
      <div className={`w-full rounded-xl border border-white/15 bg-[#1a1a1a] ${dp ? 'mt-[calc(32*var(--d))] p-[calc(24*var(--d))]' : 'mt-6 px-[15px] py-[18px]'}`}>
        <h3 className={`font-medium uppercase ${dp ? 'text-[calc(14*var(--d))]' : 'text-xs'}`}>{howToTitle}</h3>
        <ol className={`flex flex-col text-white/60 ${dp ? 'mt-[calc(14*var(--d))] gap-[calc(10*var(--d))] text-[calc(14*var(--d))]' : 'mt-3 gap-2 text-xs leading-[15px]'}`}>
          {steps.map((s, i) => (
            <li key={i}>
              {i + 1}. {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

// ── Desktop ──

// Page title (36 design px, bold italic) with an optional line under it and things on the right
export function DesktopPageTitle({ title, subtitle, right }) {
  return (
    <div className="flex items-end justify-between gap-[calc(24*var(--d))]">
      <div className="flex flex-col gap-[calc(6*var(--d))]">
        <h1 className="text-[calc(36*var(--d))] leading-tight font-bold italic">{title}</h1>
        {subtitle && <p className="text-[calc(16*var(--d))] text-white/70">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}

// The dark grey desktop page with a centred column (max 1200 design px)
export function DesktopPage({ children, width = 1200 }) {
  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      <div
        className="mx-auto flex flex-col gap-[calc(32*var(--d))] px-[calc(53*var(--d))] pt-[calc(48*var(--d))] pb-[calc(96*var(--d))]"
        // width + the 53px margins on each side
        style={{ maxWidth: `calc(${width + 106} * var(--d))` }}
      >
        {children}
      </div>
    </div>
  )
}

// Desktop section heading: "Owned Titles (04)" in 24 design px bold italic
export function DesktopSectionTitle({ title, count, right }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="flex items-baseline gap-[calc(8*var(--d))] text-[calc(24*var(--d))] font-bold italic">
        {title}
        {count != null && <span className="text-[calc(16*var(--d))] font-normal text-white/40 not-italic">({String(count).padStart(2, '0')})</span>}
      </h2>
      {right}
    </div>
  )
}
