// The address of the watch page for something: /watch/movie/michael?title=Michael
// kind: 'movie' | 'episode' | 'live' | 'trailer'. The title rides along only to show on the page.
export const watchPath = (kind, id, title) =>
  `/watch/${kind}/${encodeURIComponent(id)}${title ? `?title=${encodeURIComponent(title)}` : ''}`
