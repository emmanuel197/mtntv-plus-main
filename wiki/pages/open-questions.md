# Open questions

Only unanswered items. Each row says what is unknown, what it holds up, and who can answer.

| # | What we don't know | What it holds up | Who |
|---|---|---|---|
| 1 | MTN TV+'s own operator values (`operator_uid`, id, prefix), servers and test account. **Until then (decided 2026-11-19): AfriPlay MTN Ghana's** — `afriplaymtnghana`, id 237, prefix `amngh`, shared servers, Ghana `+233`. The user will ask the PM for the real ones when the build is done. | Going live | PM |
| 6 | Passwordless with a shared default password, like AfriPlay/WONA? **Built that way for now (2026-11-21)**, password in `.env.local` `VITE_DEFAULT_PASSWORD`. | Going live | PM |
| 9 | A superuser test number on `afriplaymtnghana`. `0000000000` (user's pick, 2026-11-24) is **not** one: the MTN operator answers `valid:false, superuser:false` ("IP4 not in any ip4 network range") off MTN data, for every form of the zeros number. On `afriplayghana` it passes the network check and the code gets sent, but nobody receives it. So the code → login → bundle path is untested with a real account: needs MTN mobile data with a real number, or a superuser number from the PM. | Testing sign-in end to end | User / PM |
| 8 | Figma access stays view-only (designers won't grant Dev Mode, 2026-11-19); REST calls stopped after ~8. Screens come from PNGs/screenshots the user sends. | Reading more screens | — |
