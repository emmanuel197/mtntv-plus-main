// "Unfollow @creator?" box with Cancel and a yellow Unfollow button. Used by both players.
// `className` sets how it is placed: the phone player passes "absolute", the desktop one "fixed".
export default function UnfollowDialog({ creator, onCancel, onConfirm, className = 'absolute' }) {
  return (
    // Dark backdrop: clicking it cancels
    <div className={`${className} inset-0 z-[65] flex items-center justify-center bg-black/60 px-8`} onClick={onCancel}>
      {/* max-w keeps it a small box on wide screens (a phone is narrower than this anyway) */}
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[340px] rounded-2xl bg-[#272727] p-6 text-center">
        <p className="text-[15px] font-semibold">Unfollow {creator}?</p>
        <div className="mt-4 flex gap-3">
          <button type="button" onClick={onCancel} className="h-10 flex-1 rounded-full border border-white/30 text-sm">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="h-10 flex-1 rounded-full bg-brand text-sm font-semibold text-black">
            Unfollow
          </button>
        </div>
      </div>
    </div>
  )
}
