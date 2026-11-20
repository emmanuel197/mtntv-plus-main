// The searching logic, kept apart from the screens so it's easy to swap for the real server call later.

// Items whose title or genre contains the text (ignoring capitals). "action movies" also matches
// "Action" because the words "movie(s)", "show(s)" and "tv" are ignored.
export function findMatches(items, text) {
  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w && !['movie', 'movies', 'show', 'shows', 'tv'].includes(w))
  if (words.length === 0) return []
  return items.filter((item) => {
    const haystack = [item.title, ...(item.genres ?? [])].join(' ').toLowerCase()
    return words.every((w) => haystack.includes(w))
  })
}

// "Did you mean …?" — the known word closest to what was typed, by shared letter pairs.
// Returns null when nothing is reasonably close.
export function closestSuggestion(text, candidates) {
  const pairs = (s) => {
    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '')
    const out = new Set()
    for (let i = 0; i < clean.length - 1; i++) out.add(clean.slice(i, i + 2))
    return out
  }
  const typed = pairs(text)
  let best = null
  let bestScore = 0
  for (const candidate of candidates) {
    const other = pairs(candidate)
    let shared = 0
    other.forEach((p) => typed.has(p) && shared++)
    const score = (2 * shared) / (typed.size + other.size || 1)
    if (score > bestScore) {
      bestScore = score
      best = candidate
    }
  }
  return bestScore >= 0.15 ? best : null
}
