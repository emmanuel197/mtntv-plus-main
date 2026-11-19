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
