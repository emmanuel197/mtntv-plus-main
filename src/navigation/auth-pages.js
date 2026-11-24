// The sign-in screens. The phone top bar and tab bar hide on these.
const AUTH_PAGES = ['/signin', '/signup', '/verify-code', '/out-of-region']

export const isAuthPage = (pathname) => AUTH_PAGES.includes(pathname)
