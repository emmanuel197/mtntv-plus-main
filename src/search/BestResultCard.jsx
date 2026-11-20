// WONA's "Best Results" card at the top of the All results: a featured title shown as an
// advertisement — backdrop, "Best Results" corner tag, title art, "Advertisement", genres, advertiser logo.
// Sample-only (as in WONA): the real server has no "best result" slot yet.
export default function BestResultCard({ result }) {
  return (
    <div className="relative aspect-[350/270] w-full overflow-hidden rounded-[5px] border border-brand/40 md:aspect-auto md:h-[calc(420*var(--d))] md:rounded-[calc(16*var(--d))]">
      <img src={result.backdrop} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <span className="absolute top-0 left-0 rounded-br-md border border-brand bg-gradient-to-b from-black to-[#3a2f05] px-3 py-1.5 text-[10px] font-medium md:px-[calc(20*var(--d))] md:py-[calc(10*var(--d))] md:text-[calc(16*var(--d))]">
        Best Results
      </span>
      <img src={result.advertiserLogo} alt="Advertiser" className="absolute right-[18px] bottom-5 h-[34px] w-auto object-contain md:right-[calc(48*var(--d))] md:bottom-[calc(48*var(--d))] md:h-[calc(72*var(--d))]" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-[18px] md:gap-[calc(14*var(--d))] md:p-[calc(48*var(--d))]">
        <img src={result.titleArt} alt={result.title} className="h-[52px] w-auto self-start object-contain md:h-[calc(120*var(--d))]" />
        <span className="text-xs font-medium text-white/80 md:text-[calc(18*var(--d))]">Advertisement</span>
        <div className="flex items-center gap-2 text-xs text-white/85 md:text-[calc(18*var(--d))]">
          {result.genres.map((g, i) => (
            <span key={g} className="flex items-center gap-2">
              {i > 0 && <span className="text-brand">•</span>}
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
