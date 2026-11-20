// Where clicking a title goes: shows open the series page, everything else the movie page.
// Used by Home, Search, Movies, My Stuff and My Library, so it lives in helpers/.
export function detailsPath(title) {
  return title.type === 'show' ? `/series/${title.id}` : `/movie/${title.id}`
}
