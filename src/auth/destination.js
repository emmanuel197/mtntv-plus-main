// Where to go after signing in: the page the person was on (passed as ?redirectTo=…), or Home.
// Only addresses inside this site are allowed (starting with one "/"), and never back to a
// sign-in page — otherwise a link could send people somewhere else, or loop.
const AUTH_PAGES = ['/signin', '/signup', '/verify-code', '/out-of-region']

export function destinationFrom(search) {
  const wanted = new URLSearchParams(search).get('redirectTo') || '/'
  const safe = wanted.startsWith('/') && !wanted.startsWith('//') && !AUTH_PAGES.some((p) => wanted.startsWith(p))
  return safe ? wanted : '/'
}

// After signing in or out we reload the page at the destination, so every screen starts fresh
// with the new signed-in state.
export const goTo = (path) => window.location.assign(path)
