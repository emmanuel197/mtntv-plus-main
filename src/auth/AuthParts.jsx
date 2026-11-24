// Small pieces shared by the sign-in screens: the phone number box, the 6-digit code boxes,
// the yellow button, and the red error line.
import { useRef, useState } from 'react'
import { env } from '@/app-settings/env.js'
import { cleanNumber } from './phone-number.js'

// Phone number box with the country code shown in front (+233 for Ghana)
export function PhoneNumberInput({ value, onChange, onEnter, autoFocus }) {
  return (
    <label className="flex h-12 items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 focus-within:border-brand md:h-[calc(60*var(--d))] md:gap-[calc(14*var(--d))] md:rounded-[calc(14*var(--d))] md:px-[calc(20*var(--d))]">
      <span className="text-sm text-white/60 md:text-[calc(18*var(--d))]">+{env.countryCallingCode}</span>
      <span className="h-5 w-px bg-white/20 md:h-[calc(26*var(--d))]" />
      <input
        value={value}
        onChange={(e) => onChange(cleanNumber(e.target.value))}
        onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
        inputMode="numeric" // phones show the number keypad
        autoComplete="tel-national"
        autoFocus={autoFocus}
        placeholder="e.g. 0244123456"
        aria-label="Phone number"
        className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-white/35 md:text-[calc(18*var(--d))]"
      />
    </label>
  )
}

// Six boxes for the SMS code: typing moves to the next box, Backspace goes back, pasting fills all six
const LENGTH = 6
//
// The boxes keep their own list of six digits. `latest` always holds the newest list, so fast
// typing (or a phone filling in the SMS code) never works from an out-of-date copy, and an
// empty box stays empty instead of the later digits sliding left into it.
export function CodeInput({ onChange, onComplete }) {
  const boxes = useRef([])
  const [digits, setDigits] = useState(() => Array(LENGTH).fill(''))
  const latest = useRef(digits)

  const save = (next) => {
    latest.current = next
    setDigits(next)
    const code = next.join('')
    onChange(code)
    if (code.length === LENGTH) onComplete?.(code)
  }

  // Put digits in starting at box `from` (one typed digit, or a whole pasted/autofilled code)
  const fillFrom = (from, raw) => {
    const typed = raw.replace(/\D/g, '').split('').slice(0, LENGTH - from)
    if (!typed.length) return
    const next = [...latest.current]
    typed.forEach((d, k) => (next[from + k] = d))
    save(next)
    boxes.current[Math.min(from + typed.length, LENGTH - 1)]?.focus()
  }

  const typeInto = (i, raw) => {
    const clean = raw.replace(/\D/g, '')
    if (!clean) {
      // the box was cleared
      const next = [...latest.current]
      next[i] = ''
      return save(next)
    }
    // A box already holding a digit gets the new one typed over it; several digits = autofill
    fillFrom(i, clean.length > 1 && latest.current[i] ? clean.slice(1) : clean)
  }

  return (
    <div
      className="flex justify-between gap-2 md:gap-[calc(12*var(--d))]"
      onPaste={(e) => {
        e.preventDefault()
        fillFrom(0, e.clipboardData.getData('text'))
      }}
    >
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (boxes.current[i] = el)}
          value={digit}
          onChange={(e) => typeInto(i, e.target.value)}
          onKeyDown={(e) => e.key === 'Backspace' && !latest.current[i] && i > 0 && boxes.current[i - 1]?.focus()}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'} // lets phones offer the code from the SMS
          autoFocus={i === 0}
          aria-label={`Digit ${i + 1}`}
          className="size-12 rounded-xl border border-white/15 bg-white/10 text-center text-xl outline-none focus:border-brand md:size-[calc(60*var(--d))] md:rounded-[calc(14*var(--d))] md:text-[calc(24*var(--d))]"
        />
      ))}
    </div>
  )
}

export function YellowButton({ children, busy, ...props }) {
  return (
    <button
      type="button"
      disabled={busy}
      className="flex h-12 w-full items-center justify-center rounded-full bg-brand text-base font-semibold text-black disabled:opacity-60 md:h-[calc(60*var(--d))] md:text-[calc(18*var(--d))]"
      {...props}
    >
      {children}
    </button>
  )
}

export function ErrorLine({ children }) {
  if (!children) return null
  return (
    <p role="alert" className="text-[13px] text-[#f97066] md:text-[calc(15*var(--d))]">
      {children}
    </p>
  )
}
