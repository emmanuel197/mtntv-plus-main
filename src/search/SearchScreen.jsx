// The whole search experience of the Search tab.
// It decides which state to show, in this order:
//   no connection (or the test word "offline") → Connection Error
//   box not active and empty                    → landing (Top 5 Trending + Browse By Categories)
//   box active, or 1 character typed            → "Type 2+ characters" hint + Recent Searches + the landing
//   just pressed Enter / picked something       → grey loading boxes, then the results
//   still typing (waits 0.4 s after the last key) → "Searching ..."
//   nothing found                               → "No results for …" + "Did you mean"
//   otherwise                                   → up to 3 suggestions + matching tiles
// The page that uses it passes in what to search (`catalog`).
import { useEffect, useMemo, useRef, useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import SearchBar from './SearchBar.jsx'
import SearchLanding from './SearchLanding.jsx'
import TrendingSearches from './TrendingSearches.jsx'
import SearchResults from './SearchResults.jsx'
import ResultTile from './ResultTile.jsx'
import { Searching, NoResults, ConnectionError, ResultsLoading, VoiceFailed } from './SearchMessages.jsx'
import { useRecentSearches } from './useRecentSearches.js'
import { useOnlineStatus } from './useOnlineStatus.js'
import { useVoiceSearch } from './useVoiceSearch.js'
import { findMatches, closestSuggestion } from './find-matches.js'
import { MIN_QUERY_LENGTH, startingRecentSearches } from './search-sample-data.js'

const WAIT_AFTER_TYPING_MS = 400
const RESULTS_LOADING_MS = 600
const OFFLINE_TEST_WORD = 'offline' // type this to see the Connection Error screen while online

export default function SearchScreen({ storageKey, catalog, trending, categories, bestResult, onOpen }) {
  const [text, setText] = useState('')
  const [settledText, setSettledText] = useState('') // the text once typing pauses
  const [committed, setCommitted] = useState(false) // true after Enter / picking an item
  const [loadingResults, setLoadingResults] = useState(false)
  const [voiceError, setVoiceError] = useState(null)
  const [boxActive, setBoxActive] = useState(false) // the search box has the cursor in it
  const inputRef = useRef(null)
  const timers = useRef({})
  const online = useOnlineStatus()
  const { recent, remember, remove, clearAll } = useRecentSearches(storageKey, startingRecentSearches)

  const trimmed = text.trim()
  const longEnough = trimmed.length >= MIN_QUERY_LENGTH

  // Wait until typing pauses before searching, so we don't search on every key press
  useEffect(() => {
    const wait = setTimeout(() => setSettledText(longEnough ? trimmed : ''), WAIT_AFTER_TYPING_MS)
    return () => clearTimeout(wait)
  }, [trimmed, longEnough])

  // Clean up any running timers when leaving the page
  useEffect(() => () => Object.values(timers.current).forEach(clearTimeout), [])

  const matches = useMemo(() => findMatches(catalog, settledText), [catalog, settledText])

  const commit = (label) => {
    const clean = label.trim()
    setText(clean)
    setSettledText(clean)
    setCommitted(true)
    if (clean.length >= MIN_QUERY_LENGTH) remember(clean)
    setLoadingResults(true)
    clearTimeout(timers.current.results)
    timers.current.results = setTimeout(() => setLoadingResults(false), RESULTS_LOADING_MS)
    inputRef.current?.blur()
  }

  const showVoiceError = (message) => {
    setVoiceError(message)
    clearTimeout(timers.current.voice)
    timers.current.voice = setTimeout(() => setVoiceError(null), 3500)
  }
  const voice = useVoiceSearch({ onText: commit, onError: showVoiceError })

  const clear = () => {
    setText('')
    setCommitted(false)
    inputRef.current?.focus()
  }

  // ── which state to show ──
  const offline = longEnough && (!online || trimmed.toLowerCase() === OFFLINE_TEST_WORD)
  const stillTyping = longEnough && settledText !== trimmed

  let body
  if (offline) {
    body = <ConnectionError onRetry={() => (trimmed.toLowerCase() === OFFLINE_TEST_WORD ? clear() : commit(trimmed))} />
  } else if (!longEnough) {
    body = (
      <SearchLanding
        typing={boxActive || trimmed.length > 0}
        recent={recent}
        onRemoveRecent={remove}
        onClearRecent={clearAll}
        trending={trending}
        categories={categories}
        onPick={commit}
      />
    )
  } else if (committed && loadingResults) {
    body = <ResultsLoading />
  } else if (stillTyping) {
    body = <Searching />
  } else if (matches.length === 0) {
    const ideas = [...categories.map((c) => `${c.label} movies`), ...catalog.map((c) => c.title), ...trending]
    // WONA: after "No results", a divider and the trending searches to try instead
    body = (
      <div className="flex flex-col gap-7">
        <NoResults text={trimmed} suggestion={closestSuggestion(trimmed, ideas)} onSuggestion={commit} />
        <div className="border-t border-white/10" />
        <TrendingSearches trending={trending} onPick={commit} />
      </div>
    )
  } else if (committed) {
    body = <SearchResults matches={matches} text={trimmed} bestResult={bestResult} onOpen={onOpen} />
  } else {
    // Suggestions while typing: up to 3 distinct titles, then the matching tiles
    const titles = [...new Set(matches.map((m) => m.title))].slice(0, 3)
    body = (
      <div>
        {titles.map((title) => (
          <button
            key={title}
            type="button"
            onClick={() => commit(title)}
            className="flex h-12 w-full items-center gap-3 border-b border-white/[0.07] text-left"
          >
            <SearchIcon size={15} className="shrink-0 text-white/55" />
            <span className="min-w-0 flex-1 truncate text-sm">{title}</span>
          </button>
        ))}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {matches.map((m) => (
            <ResultTile key={m.id} item={m} onOpen={onOpen} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="px-page pb-28">
      {/* The bar stays at the top while results scroll under it */}
      <div className="sticky top-0 z-20 -mx-page bg-black px-page pt-2.5 pb-4">
        <SearchBar
          ref={inputRef}
          value={text}
          onChange={(v) => {
            setText(v)
            setCommitted(false)
          }}
          onSubmit={() => longEnough && commit(trimmed)}
          onClear={clear}
          onFocusChange={setBoxActive}
          onMic={voice.start}
          listening={voice.listening}
          placeholder="Search for movies, shows, genres"
        />
        {voiceError && (
          <div className="absolute inset-x-12 top-[68px]">
            <VoiceFailed message={voiceError} />
          </div>
        )}
      </div>

      {body}
    </div>
  )
}
