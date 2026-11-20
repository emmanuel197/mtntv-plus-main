# Figma designs

✅ VERIFIED 2026-11-19 (read through the Figma REST API with view-only access).

File: `mtn tv plus`, key `rMknIO7ilGeZwKaRJddbv1`
Link: https://www.figma.com/design/rMknIO7ilGeZwKaRJddbv1/mtn-tv-plus

## Access
- The user has **view-only** access → Figma plugins (Desktop Bridge) can't run, and Figma's Dev Mode MCP isn't enabled.
- What works: the figma-console connector's REST calls with the file link — `figma_get_file_data` (structure, sizes, auto-layout, fills) and `figma_get_component_image` (PNG render of any node).
- What doesn't: `figma_get_variables` (Variables REST API is Enterprise-only). The file has **0 published styles and 0 components**, so tokens must be read from node fills/text, not from a token list.
- `verbosity: "full"` requests timed out on 2026-11-19 after ~8 quick calls — space requests out.

## Pages
| Page | Node | Contents |
|---|---|---|
| thumbnail | `0:1` | — |
| Moblie (sic) | `0:3` | Section "MTN Designs" `1:18290` |
| web : | `2:9442` | Desktop frames, 1728px wide |

### Mobile sections (inside `1:18290`, frames 393px wide)
Homepage Designs `1:18291` (Home Screens `1:18292`, `1:18614`) · EP first user story `1:18929` · Reels Section `1:20390` ·
Comment section `1:20840` · liking and unliking `1:21694` · Swiping up `1:22142` · Search Functionality `1:22278` ·
search `1:22773` · Edge Cases `1:23421` · Sharing `1:24283`

### Web sections (inside `2:9442`, frames 1728px wide)
Homepage `2:9443` · Reels Section - Desktop `2:10343` · Comment Section - Desktop `2:10677` ·
Search Functionality - Desktop `2:11243` · SEARCH RESULTS `2:11799` · EP first user story `2:12332` (EPG / Live TV) · EP filter `2:14976`

## Mobile home (`1:18292`) — what it shows
Top bar: MTN TV+ logo, "Get Bundle" yellow pill, notification icon. Tabs: All / Movies / TV Shows.
Hero carousel with "New Release" tag, "Watch Now" yellow pill + "+" button, dots.
Floating bottom bar: Home · Live TV · Shorts · Search · More.
Rows: MTN TV+ Shorts (NEW), Continue watching (progress), Because You Watched, Live on MTN TV+ Now,
Top 10 Movies & Shows, New Release on MTN TV+, Browse Live Channels, Trending Now, promo banner,
Only on MTN TV+, Upcoming TV Shows.
(The second row is titled **"Keep Watching"** in italics — hidden under the tab bar in the Figma frame; confirmed by the user 2026-11-19.)

### Mobile home measurements (✅ built 2026-11-19 in `src/home/`)
Taken from the 393px render + node data. Figma's first 47px are the phone status bar; the web build drops it (everything in the hero is 47px higher than Figma).
| Part | Size / position (web) |
|---|---|
| Page side margin | 23px |
| Hero | 577px tall (Figma 624 − 47); blurred poster background, fades to black |
| Top bar | logo 40×40 at top 10px; Get Bundle 78×30 bold italic 13px; bell circle 30px with red dot; 11px apart |
| Category tabs | top 58px; 24px tall, 12px text, 12px side padding, selected = yellow pill |
| Hero column | round poster 253px at top 90px, then 12px gaps: tag pill 26 (border `#A78622`) · title art 60 · genres 16 (12px bold italic, yellow dots) · dots 8 (active 28×8 yellow) · Watch Now 106×36 + "+" 36 |
| Row title | 30px row, 18px bold italic; 12px gap to cards; 16px between rows |
| Shorts | 110px circles, gap 12, yellow "0:45" badge |
| Keep Watching | 199×127, gap 8, play circle 36 |
| Because You Watched / New Release / Trending / Only on | posters 157×182, gap 10 |
| Live Now | 157×95, gap 8; LIVE badge `#B42318`; progress fill `#DE003D` on `#EFE5F7` |
| Top 10 | posters 118×182, gap 10, yellow rank numbers |
| Browse Live Channels | 160×88, gap 8, 1px brand-yellow border |
| Promo banner | 348×420 (user export) |
| Upcoming TV Shows | 243×303, gap 10 |
| Tab bar | 348×66 pill, bottom 16px, bg `#1C2222` ~85%, icons 24, labels 12px italic, active yellow |
| Yellow glows | 3 blurred circles: 291px at (−43, 1194), 341px at (148, 1705), 294px at (229, 3084) |
Arrows: bright on "Only on MTN TV+" and "Upcoming TV Shows"; faint on "Browse Live Channels" and "Trending Now".

## Colours and fonts
- Page background `#000000` (frame fill, REST). ✅ VERIFIED
- Brand yellow `#FFC90D` — flat fill on the logo and the active "All" tab, sampled from the PNG render. ✅ VERIFIED (pixel sample)
  "Watch Now" samples as `#FAC80D` and "Get Bundle" as ~`#E1B314` (likely opacity/gradient over the hero) — use `#FFC90D` unless the designer says otherwise.
- Text white `#FFFFFF`. ✅ VERIFIED (pixel sample)
- Yellow glow ellipse `#C2B801` (decorative). 🔶 LIKELY
- Secondary text: white at 65% opacity (`#FFFFFF 65%`), 10px, line height 100% — from the user's Figma inspect screenshot. ✅ VERIFIED
  That text's inspect panel says **SF Pro** (Apple's system font, can't be shipped on the web) → we use DM Sans.
- Font: **DM Sans** (user, 2026-11-19); weights vary per text, so set per element. Loaded from `@fontsource-variable/dm-sans`.
- Card/surface colour: not in Figma → `#1A1A1A` picked by us; the user will tune it.

## REST access stopped (2026-11-19)
After ~8 calls, every Figma REST call (file data and image export) timed out. Figma caps REST API calls for
View/Collab seats very tightly per month, so this is probably that cap. ⚠️ ASSUMPTION — not confirmed.
Until it resets, work from the PNGs already rendered and from screenshots the user sends.

## Mobile Live TV ("EP first user story", `1:18929`) — ✅ built 2026-11-19 in `src/live-tv/`
Source: 7 user screenshots (All, list continuation, Sports, News, Entertainment, Movies, Kids), scaled ×1.365 to 393px; layout cross-checked with WONA's `MobileLiveTvPage.jsx` (390 basis).
| Part | Size / position (web, status bar removed) |
|---|---|
| Category chips | top 57px; All · Sports · News · Entertainment · Movies · Kids; 26px tall, 13px, 8px apart; selected yellow, others `#1F1B19` + white 70% |
| Featured block | All + Sports only. LIVE + "124.5K watching" 11px · channel logo 21×20 + name 13px semibold + "· Ch 5" white 15% · title 18px bold italic yellow, 2 lines, line height 26 · picture 130×130 right |
| Time row / bar | 11px white 55% (start · remaining · end) · 4px bar, yellow on `#211F1E` |
| Buttons | Watch Now 109×36 yellow 13px semibold (not italic) · Full Guide 116×36 `#1C1A19` + 1px white 15% border; 8px apart |
| List title | "All Live Channels" (or the category name), 18px bold italic; count 11px right; thin white 5% lines above/below |
| Channel row | edge to edge, 1px `#342906` lines top+bottom, 16px between rows; logo 44 rounded; channel 11px white 60% + tag pill 8px; LIVE + title 14px bold; "Next: …" 11px; bar 220×3 (yellow live, grey not live); bell 20px right |
| Selected row | first row by default; `white 5%` background, 3px yellow left edge, yellow bell |
| Tag pills | Sports `#36300A` · News `#2E0200` · Entertainment `#2B1236` · Movies `#3B0D14` · Kids `#101D24` |
| Background | warm glow `#2A1100` from the bottom-left |
Not live (no LIVE badge, grey bar): Kids Tv, Disney Ch. The design's "20 channels" is placeholder text; the app shows the real count.
Tab bar labels: upright, not italic (user, 2026-11-19 — overrides the earlier "keep italic").

## Mobile Shorts / Reels (Reels, Comment, liking, Swiping up sections) — ✅ built 2026-11-19 in `src/shorts/`
Source: 10 user screenshots (feed top + For You, player, comments, empty comments, typing, replying, sign-in prompt, following toast). Behaviour (swipe, like, double-tap, follow toast, unfollow confirm) follows WONA's `MobileShortsPlayer.jsx`; no earlier project built comments, so those follow the screenshots only.
| Part | Size / position (web, status bar removed) |
|---|---|
| Feed | tabs (shared `CategoryTabs`) → 27px → circles 74px (2.5px yellow ring, 10px apart) → 24px → LIVE reel card 347×194 (2px yellow border) → 21px → "Trending Now" (yellow 4×16 bar, lilac `#EBD2FF` arrow) → 16px → cards 110×130 (rank circle `#D4C901`) → "For You" 2 columns 8px apart, tiles 197/141 alternating (left starts tall) |
| Player top | back + more: 36px circles, yellow border, 19px from top; "MTN TV+ Shorts" 16px bold italic; chips 25px tall at 77px (inactive `#485158` 80%) |
| Button column | 44px yellow circles, 23px from right, bottom 220px; labels 10px bold; creator = plain yellow circle with +/✓ badge |
| Caption | bottom 91px: handle 17px bold italic + "M" 16px + Follow pill 22px (yellow outline → filled "Following"); caption 11px; 3px bar + 12px white dot; times 11px; hashtags 13px bold italic yellow; audio 10px |
| Toast | `#917226` 95%, bottom 94px, 30px side insets, 3 s |
| Comments sheet | bottom 67%, `#55574A` 95% + blur, 28px top corners; header 44px ("1,247 Comments" 12px yellow, sort + ×); comment avatar 30, handle 11 yellow, text 12, meta 10; reel becomes a 213px-wide card at top 77px with a yellow glow |
| Comment box | avatar 34 + white box 44px tall, 1.5px yellow border; typing: emoji row (😊👌💕🤔🙌😂), box ≥58px, "n / 150" counter; Enter posts |
| Empty | 142px `#544B2D` circle with yellow "•••" bubble + sparkles; "No comments yet" 16px; "Comment First" 34px yellow pill; "↓ or type below" 9px |
| Sign-in prompt | `#272727` sheet; play icon in 40px yellow ring; "Join the conversation" 18px; Log In (yellow gradient) + Create account (outlined) 47px; continue link 11px |
The tab bar shows on the player but is covered while a sheet/dialog is open (player lifts from z-30 to z-50).
🪦 STALE: Search screenshot with the Shorts tab lit was first read as a search inside Shorts and built at `/shorts/search`; the user confirmed 2026-11-19 that **Shorts has no search** (the tab highlight was a design slip) and it was removed.
❓ Baobab-tree reel frame isn't in any earlier project — main reel uses WONA's football frame until exported from Figma.

### Share Reel sheet — ✅ built 2026-11-19 (`shorts/ShareReelSheet.jsx`)
`#2B2B2B` sheet, 28px top corners; thumbnail 52×71 (yellow border) + title 14px + "@creator · NK likes"; "Share via" 13px; five 53px circles (WhatsApp `#25D366`, Facebook `#1877F2`, X black, Instagram `#C13584`, Copy Link yellow gradient, label green `#4CAF50`); link field 39px with "✓ Copied" pill (`#2E7D32`); Cancel 44px pill. WhatsApp/Facebook/X open their web share pages; Instagram has none, so it copies the link. Icons copied from econet-main (`shorts/share-icons/`). Sharing doesn't need an account.

## Mobile Search — ✅ built 2026-11-19 in `src/search/`
Source: 9 user screenshots (landing, searching, no results, connection error ×2, voice failed, categories). Extra states taken from WONA's `MobileSearchPage.jsx` (AfriPlay design) because the screenshots don't show them: suggestions while typing, results page with tabs, results loading skeleton, remove one recent search, See Less, × to clear the box.
| Part | Size / colour |
|---|---|
| Search bar | 51px pill, `#B2B2B2` fill, 2px `#F5C621` border, 15px dark text; 10px from the top; no logo bar on this screen; sticks to the top while scrolling |
| Hint | ⓘ "Type 2+ characters to see suggestions", 11px, yellow 85% |
| Recent | 17px bold italic title + "Clear All" 12px yellow; rows 50px (clock, 14px text, ×); 3 shown, then See More / See Less; remembered in localStorage (`mtntv:recentSearches`) |
| Top 5 Trending | rows 53px, yellow outlined numbers, arrow; collapses with the yellow chevron |
| Categories | 3 columns, 111×116 tiles, 9px gap, 14px bold labels; pictures from econet-main |
| Searching | 30px spinning ring (green), "Searching ..." 11px — shown while typing pauses (0.4 s) |
| No results | 40px yellow ⓘ ring, "No results for" + yellow query, "Did you mean: “…?”" pill `#262626` (closest category/title by letter pairs) |
| Connection Error | 30px `#E9695F` ⓘ ring, title 15px bold, text 12px, "Try Again" 30px yellow pill. Shown when the device is offline, or when the test word **offline** is typed |
| Voice input failed | `#FEE4E2` card, red (`--color-live`) text, under the bar for 3.5 s. Mic button in the bar (not placed in Figma) uses the browser's speech recognition |
| Results (from AfriPlay) | tabs All/Movies/Tv Shows/Tv Channels (26px chips), "Found NN results for", groups with counts, posters 3 columns, channels 2 columns |

## Screens with no MTN TV+ design — built from WONA (user, 2026-11-19)
| Screen | Route / folder | Source |
|---|---|---|
| Get Bundle ("Choose your plan") | `/bundles`, `src/bundles/` | WONA `SubscriptionsPage` + `SubscriptionCard` + `SubscriptionModal`. Plans = **AfriPlay Ghana's MTN plans** (GH₵, data bonus lines MTN-only), not WONA's USD ones, because MTN TV+ borrows the MTN Ghana operator. Subscribe needs sign-in; steps Auto-Renewal/On-Demand → confirm + email → "Almost there" (purchase call not wired yet). `/subscription-history` placeholder. |
| More | `/more`, `src/my-account/MorePage.jsx` | WONA `more/MorePage`: profile row + green plan pill, My Stuff / My Library tiles, ACCOUNT list, red Sign Out. Signed out → "Log in or sign up" row. Profile / My Stuff / My Library are placeholders; Downloads / Settings / Help show "coming soon" (no screens in WONA either). |
| Notifications | `/notifications`, `src/notifications/` | WONA `NotificationsPage`: All / Unread chips with counts, Mark all as read, cards (yellow unread dot, ×). One shared list (`notifications-store.js`) drives the page, the bell's red dot and the More row dot. Sample messages until the CRM inbox call. |
Tab bar icons: AfriPlay/WONA SVGs (`navigation/tab-icons/`), drawn as CSS masks so they take the text colour (white / yellow when active).

### Corrections (user, 2026-11-19)
- **Search landing** = Top 5 Trending Searches + Browse By Categories only (user screenshot). The "Type 2+ characters" hint + Recent Searches screen is the **edge case** shown while the box is active or holds 1 character (same as WONA: recent shows while the bar is active). 🪦 STALE: earlier build showed hint + recent on the landing.
- **Reels behave like WONA's player**: like, double-tap like, follow (+ toast "You'll see their reels in feed", unfollow asks first), save (+ toast "Added to My Stuff"), share work **without an account**. Only writing/replying to a comment needs sign-in (Figma "Join the conversation"); liking a comment doesn't. 🪦 STALE: earlier build gated like/follow/save behind sign-in.
- Double-tap burst = WONA's `LikeBurst` (tint, rings, rays, dots, heart in a white-ringed disc) in **yellow** (`#FFC90D` / `#FFE27A`), not WONA's pink. Liked/saved rail buttons switch to a dark circle with a yellow ring and icon.
- Also from WONA: controls (top bar, chips, caption, swipe hint) fade after 3.5 s idle and return on touch; "Swipe up for next" bouncing chevron; 3px yellow seam between reels while sliding; Esc goes back.

### Search — WONA's mobile design fills the gaps (user, 2026-11-19)
MTN designs kept for: search bar, landing (trending + categories), typing edge case, searching, no results, connection error, voice failed. WONA's `MobileSearchPage` used for what MTN left out: suggestions (3 rows + tiles), results page (tabs, "Found NN", **Best Results** ad card, "Movies (02)" groups), tiles 109×147 / 3:2 with 5px corners and `#E1E7F8` border, Top 5 Trending under "No results". Catalogue: `src/sample-content/catalog.js`.

## Web (desktop) Home — ✅ built 2026-11-19 (`src/home/Desktop*.jsx`)
Source: 6 user screenshots (×2.21 to 1728; last one ×1.70); sizes from WONA's desktop home (same layout: `HeroSection`, `ContentRail`, cards, `Navbar`, `Footer`).
Scaling: from 768px wide, `html` font-size = clamp(768px,100vw,1728px)/108, and `--d` = one design pixel (1rem/16) → `w-[calc(320*var(--d))]` = 320px of the 1728 design.
| Part | Design px |
|---|---|
| Navbar | floating pill (WONA style, 2026-11-20): 16 from top, 53 margins, rounded-full black/40 + blur 20, logo 50 + links grouped left; previously 97 tall full-width bar, logo 58, icons 24, labels 15, 36 apart; Home · Live Tv · Shorts · Movies · My stuff (Tv Channels removed — user, 2026-11-20); search, bell (red dot), avatar 36 |
| Hero | height min(1117, window); content 69 from bottom; tag pill; title art 136×375; ★ rating · maturity · year (20); genre chips `#262422` (18); description 624 wide (20); Watch Now 55 tall yellow; My Stuff `#535352`; dots bottom-right; 8 s per slide |
| Page | bg `#1B1B1B`; rows 48 apart, left margin 53, rows run off the right edge; titles 28 bold italic; 30 title→cards |
| Shorts circles | 227, gap 40, yellow duration badge |
| Keep Watching / Live On Tv Now | 330×179, gap 23, progress 6 (yellow / `#DE003D`), LIVE badge |
| Posters | 320×441, gap 23; hover: title 20, info 15, Play pill + "+" `#80650E`; Top 10 rank numbers 150 |
| Genres | 330×155 · Channels 331×191 (red border + dot) · Only on 375×518 gap 24 |
| Promo band | full width (stand-in cut from screenshot) |
| Footer | 339 tall, `#080808`, logo 84, socials 36, 4 link columns (18), ©2007-2026 MTN TV+ |
❓ Needed exports: Michael concert backdrop (hero) and the "Celebrating 30 Years" band at full size.

### Search = AfriPlay's layout (user, 2026-11-20) — supersedes the two notes above
- **Landing (box not tapped, empty):** the tabbed browse view of the whole catalogue — All / Movies / Tv Shows / TV Channels, Best Results card, groups "Movies (11)"… (AfriPlay screenshot). 🪦 STALE: "landing = Top 5 Trending + categories".
- **Box tapped (or 1 character):** Recent Searches (5 shown, ×, "See More ›"), Top 5 Trending (28px outlined numbers), Browse By Categories. The MTN "Type 2+ characters" hint shows once 1 character is typed.
- Search bar: AfriPlay/WONA style — 52px dark see-through pill, white/15 border → yellow while focused. 🪦 STALE: grey #B2B2B2 bar.
- Tiles/Best Results border: brand yellow 40%. Sample recent/trending lists = AfriPlay's (titles exist in the catalogue).
- **Web:** same states, md: sizes in design px — 53 margins, bar sticks under the navbar (64 tall), results 6 posters / 4 channels per row, Best Results 420 tall, Recent + Trending side by side, categories 5 per row.

## Web screens built from WONA (2026-11-20) — MTN web Figma not readable (REST limit), user: "same structure as WONA/AfriPlay"
| Screen | Route | Files | WONA source |
|---|---|---|---|
| Live TV | `/live-tv` | `live-tv/DesktopLiveTv.jsx` + DesktopCategoryTabs, DesktopFeaturedProgram (scoreboard), LiveChannelsSidebar, OnAirSchedule/ScheduleRow, DesktopChannelCard, LiveToast | `LiveTvPage` + `sections/liveTv/*` |
| TV Guide | `/tv-guide` | `live-tv/TvGuidePage.jsx` (desktop + phone) | `TvGuidePage` |
| 🪦 Tv Channels | ~~`/tv-channels`~~ | removed 2026-11-20 at the user's request (navbar link, page, Live TV "See All") | — |
| Shorts feed | `/shorts` | `shorts/desktop/DesktopShortsFeed.jsx` + chips, avatar rail, grid, live banner, trending sidebar | `ShortsPage` + `sections/shorts/*` |
| Reel player | `/shorts/:id` | `shorts/desktop/DesktopReelPlayer.jsx` + ReelPlayerCard, ReelCaptionPanel, ReelNavArrows; shared logic `shorts/useReelActions.js`, `ReelStack.jsx`, `UnfollowDialog.jsx`; comments as a side panel | `ShortsPlayerPage` |
| Movies | `/movies?category=` | `movies/MoviesPage.jsx`, TitleCard | `MoviesPage` |
| Movie / Series details | `/movie/:id`, `/series/:id` | `movies/TitleDetails.jsx`, DetailsHero, EpisodeList, CastList, TitleNotFound; data `movies-sample-data.js` | `MovieDetailsPage`, `SeriesDetailsPage` |
| Profile & Account | `/profile?tab=` | `my-account/ProfilePage.jsx` (Profile, My Plan, Devices, Support, FAQs) | `ProfilePage` |
| My Stuff / My Library | `/my-stuff`, `/my-library` | `my-account/Desktop*/Phone*` + `my-stuff-store.js` (shared list: add/toggle/remove) | `MyStuffPage`, `more/*` |
| More / Notifications / Get Bundle / Subscription History | as before | md: layouts; `bundles/SubscriptionHistoryPage.jsx` | `SubscriptionsPage`, `NotificationsPage`, `SubscriptionHistoryPage` |
Wiring: `helpers/details-path.js` (title → /movie or /series); web Home posters + Search results open details; web "+"/details "+ My Stuff" use `my-stuff-store`; genre tiles → `/movies?category=`. Desktop pages sit on #1B1B1B (AppLayout `main`).
Stand-in content notes: details backdrops mostly blurred posters (WONA has none); cast photos/episode stills are WONA samples spread across titles; reels' Save doesn't add to My Stuff (reels aren't catalogue titles).
❓ Not done: real player (Watch Now shows "coming soon"); one shared Toast (Live TV, Shorts, Movies each have their own); bundle >500 KB (split per page later).
