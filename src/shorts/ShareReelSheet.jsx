// "Share Reel" sheet: reel thumbnail + title, five share buttons, the link with a Copy button, Cancel.
// Figma: dark sheet with rounded top, 53px round buttons in each app's colour, Copy Link yellow,
// the link and "✓ Copied" in green.
//
// WhatsApp / Facebook / X open their share pages in a new tab. Instagram has no web share page,
// so it copies the link (to paste into Instagram). Copy Link copies the reel's address.
// `desktop`: on a wide screen the same box sits in the middle as a pop-up instead of a bottom sheet.
import { useState } from 'react'
import { Check } from 'lucide-react'
import whatsappIcon from './share-icons/whatsapp.svg'
import facebookIcon from './share-icons/facebook.svg'
import xIcon from './share-icons/twitter.svg'
import instagramIcon from './share-icons/instagram.svg'
import copyLinkIcon from './share-icons/copy-link.svg'
import { formatCount } from './format-count.js'

export default function ShareReelSheet({ reel, likeCount, onClose, desktop = false }) {
  const [copied, setCopied] = useState(false)
  const url = `${window.location.origin}/shorts/${reel.id}`
  const text = encodeURIComponent(reel.title)
  const link = encodeURIComponent(url)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      // clipboard blocked (e.g. not https) — leave the button as "Copy"
    }
  }

  const targets = [
    { name: 'WhatsApp', icon: whatsappIcon, bg: 'bg-[#25d366]', open: `https://wa.me/?text=${text}%20${link}` },
    { name: 'Facebook', icon: facebookIcon, bg: 'bg-[#1877f2]', open: `https://www.facebook.com/sharer/sharer.php?u=${link}` },
    { name: 'Twitter/X', icon: xIcon, bg: 'bg-black border border-white/20', open: `https://twitter.com/intent/tweet?text=${text}&url=${link}` },
    { name: 'Instagram', icon: instagramIcon, bg: 'bg-[#c13584]', open: null },
    { name: 'Copy Link', icon: copyLinkIcon, bg: 'bg-gradient-to-br from-[#fff27a] to-[#e8cc00]', open: null, highlight: true },
  ]

  const share = (target) => {
    if (target.open) window.open(target.open, '_blank', 'noopener,noreferrer')
    else copy()
  }

  return (
    <div
      className={`fixed inset-0 z-[70] flex bg-black/50 ${desktop ? 'items-center justify-center' : 'flex-col justify-end'}`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#2b2b2b]/95 px-[22px] pt-2.5 pb-8 backdrop-blur-xl ${
          desktop ? 'w-[400px] rounded-[28px] border border-white/15' : 'rounded-t-[28px] border-t border-white/15'
        }`}
      >
        {!desktop && <span className="mx-auto block h-1 w-9 rounded-full bg-white/40" />}
        <h2 className="mt-4 text-center text-sm font-semibold">Share Reel</h2>

        <div className="mt-4 flex items-center gap-3 border-b border-white/10 pb-4">
          <img src={reel.image} alt="" className="h-[71px] w-[52px] shrink-0 rounded-lg border border-brand/70 object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{reel.title}</p>
            <p className="mt-1 text-xs text-white/55">
              {reel.creator} · {formatCount(likeCount)} likes
            </p>
          </div>
        </div>

        <p className="mt-3 text-[13px] text-white/70">Share via</p>
        <div className="mt-3 flex justify-between">
          {targets.map((t) => (
            <button key={t.name} type="button" onClick={() => share(t)} className="flex flex-col items-center gap-1.5">
              <span className={`flex size-[53px] items-center justify-center rounded-full ${t.bg}`}>
                <img src={t.icon} alt="" className="size-6" />
              </span>
              <span className={`text-[10px] ${t.highlight ? 'text-[#4caf50]' : 'text-white/55'}`}>{t.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 flex h-[39px] items-center gap-2 rounded-lg bg-black/35 pr-1.5 pl-3">
          <span className="min-w-0 flex-1 truncate text-[11px] text-[#4caf50]">{url.replace(/^https?:\/\//, '')}</span>
          <button
            type="button"
            onClick={copy}
            className={`flex h-7 shrink-0 items-center gap-1 rounded-md px-3 text-[11px] ${copied ? 'bg-[#2e7d32] text-[#a5d6a7]' : 'bg-white/15 text-white'}`}
          >
            {copied && <Check size={11} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <button type="button" onClick={onClose} className="mt-5 h-11 w-full rounded-full bg-white/10 text-base font-semibold text-white/70">
          Cancel
        </button>
      </div>
    </div>
  )
}
