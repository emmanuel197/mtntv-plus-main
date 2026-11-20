// 42000 → "42K", 1247 → "1.2K", 2400000 → "2.4M", 98 → "98"
export function formatCount(n) {
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${+(n / 1_000).toFixed(1)}K`
  return String(n)
}
