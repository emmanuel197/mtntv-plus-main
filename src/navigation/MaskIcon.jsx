// Draws an SVG icon in the current text colour, by using the SVG as a stencil ("mask") over a box
// filled with that colour. One file can then show white normally and yellow when active.
// The quotes inside url("…") matter: small SVGs are built into the page as "data:" text with spaces
// and quotes in it, which breaks url(…) unless quoted.
export default function MaskIcon({ src, className = 'size-6' }) {
  const mask = `url("${src}") center / contain no-repeat`
  return <span aria-hidden className={`inline-block shrink-0 bg-current ${className}`} style={{ mask, WebkitMask: mask }} />
}
