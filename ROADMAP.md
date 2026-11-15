# Roadmap — "Español en el Taller"

Built one phase at a time. Each phase ends with something published to GitHub Pages
that Carl tests on his iPhone before the next phase starts.

Tech stack: plain HTML/CSS/JavaScript, no build step (no Vite, no frameworks) — chosen
because there's no Node/npm or git set up yet on this machine, and "edit a file, push it,
it's live" is the simplest possible workflow for publishing from a phone. Code stays
organized into separate data / language-logic / UI modules so it can still be wrapped
later with Capacitor for the App Store (see "Future ideas" below) without a rewrite.

---

## Phase 0: Setup, content review & browser test

- [x] Review Section 7 draft content with Carl and get his OK — **locked, see [CONTENT-FINAL.md](CONTENT-FINAL.md)**
- [x] Create Carl's free GitHub account (skip if he already has one)
- [x] Connect GitHub to Claude Code — ended up doing everything through github.com's own web UI instead (no git/admin tooling available on this machine)
- [x] Create the repository (public) — [flash-card-frenzy](https://github.com/llamaswithbacon/Flash-Card-Frenzy)
- [x] Turn on GitHub Pages, find the app's web address — https://llamaswithbacon.github.io/Flash-Card-Frenzy/
- [x] Publish a simple "Hello" page with `manifest.json` and an app icon, installable via Add to Home Screen
- [x] Publish a browser capability test page that checks, with a clear ✅/❌ per item:
  - Which browser (Chrome/Safari) and whether running standalone (home screen) or in a tab
  - Spanish text-to-speech: voices listed? test phrase plays?
  - Speech recognition: API exists? mic prompt appears? transcribes a Spanish test phrase?
  - Saving data: does a value survive closing and reopening the page?
  - Offline: does the page load in airplane mode after the first visit?
- [x] Carl runs the test page in all 4 ways: Chrome tab, Chrome home-screen, Safari tab, Safari home-screen, and reports the results table — see [README.md](README.md#phase-0-results--browser-capability-test)
- [x] Start `README.md` with a GitHub cheat sheet (web address + how to publish updates)

**Done when:** the Hello page opens full-screen from Carl's home screen icon, and we have
a results table showing what works in each of the 4 browser/launch combinations. That
table decides the voice-mode plan for Phase 6.

**Status: ✅ Phase 0 complete.** Speech recognition — the biggest risk — works correctly
in both Chrome and Safari. Full results in [README.md](README.md).

---

## Phase 1: Core flashcards

- [x] Card data model + `seed-cards.json` built from the locked content
- [x] Main menu screen (title, Play button, Options button)
- [x] Tap-to-flip card with flip animation
- [x] Shuffled session, no repeats within a session unless not enough cards
- [x] ✓ Got it / ✗ Missed grading
- [x] Progress indicator ("7 / 20") and Next
- [x] End-of-session summary screen (cards done, number right, time taken) with Play again / Main menu
- [x] Publish to GitHub Pages

**Done when:** Carl can play a 10-card session of Words and Phrases from his home-screen icon.

**Status: ✅ Phase 1 complete.** Confirmed by Carl on his iPhone home-screen icon: played a
full 10-card session, flipped cards, graded ✓/✗, reached the summary screen.
Note: the Options button currently shows a "coming in Phase 2" message — full settings land next phase.

---

## Phase 2: Options menu + saving

- [x] Card-direction checkboxes (Spanish→English, Spanish+English audio, English→Spanish), at least one always on
- [x] Category toggles (Money, Words, Phrases, Common Questions), at least one always on
- [x] Session-length slider (5–50 by 5)
- [x] Session timer toggle
- [x] Options screen Back button
- [x] Every setting saves immediately via `localStorage` and survives app restart
- [x] Publish to GitHub Pages

**Done when:** Carl changes settings, swipes the app closed, reopens it, and the settings are still set.

**Status: ✅ Phase 2 built and verified on the live site. Awaiting Carl's iPhone test.**
Note: Money category toggle saves correctly but won't produce cards until Phase 3 builds the money-card generator.

---

## Phase 3: Money cards

- [ ] Spanish number-to-words converter (dollars and cents), with the tricky cases from brief Section 3
- [ ] Unit tests for the converter (thorough — this is the riskiest logic in the app)
- [ ] Whole-dollar and dollars-and-cents generators, weighted toward realistic shop prices
- [ ] Money sub-toggles (whole dollars / cents), at least one on when Money is on
- [ ] Publish to GitHub Pages

**Done when:** all converter unit tests pass, and money cards show up correctly when enabled.

---

## Phase 4: Timers

- [ ] Saved total-practice-time tracker on the main menu, persists permanently
- [ ] Live session timer (shown when the toggle is on)
- [ ] Timer uses `visibilitychange` + real timestamps, pauses while app is backgrounded
- [ ] Frequent saves (every few seconds + on `visibilitychange`/`pagehide`), not just on exit
- [ ] Publish to GitHub Pages

**Done when:** total practice time adds up correctly across several sessions and app restarts/backgrounding.

---

## Phase 5: Audio (text-to-speech) + offline

- [ ] 🔊 button plays the Spanish side via `speechSynthesis`
- [ ] Auto-play option (works after the first tap of a session, per iOS audio rules)
- [ ] Slow-speed option
- [ ] Voice picker in Options if multiple Spanish voices are available
- [ ] Service worker caching the app shell, cards, and TTS so it works in airplane mode
- [ ] "Update available — tap to refresh" prompt when a new version is published
- [ ] Publish to GitHub Pages

**Done when:** every Spanish card can be read aloud, and the app opens and plays cards with no signal.

---

## Phase 6: Voice mode / pronunciation check

Plan this phase against the Phase 0 browser-test results first.

- [ ] Mic permission flow, with guidance if denied
- [ ] Speech recognition (`webkitSpeechRecognition`, `es-MX`) wired to the 🎤 button
- [ ] Normalize transcript (case/punctuation/accents) and convert numerals to words before comparing
- [ ] Fuzzy match scoring with Easy/Normal/Strict thresholds (tunable)
- [ ] Alternate acceptable answers per card (e.g. carro/coche, lo/la, sí/no answers)
- [ ] "Here's what I heard" feedback with mismatched words highlighted
- [ ] Fallback path if recognition isn't available anywhere (listen-and-repeat, self-graded) or only works in Safari (hand off from Chrome with an "Open voice practice in Safari" link, carrying the card + sending the result back without losing/splitting Chrome's stored data)
- [ ] Hide 🎤 and show a short note wherever recognition isn't available
- [ ] Publish to GitHub Pages

**Done when:** saying a card correctly gets ✓ and mumbling gets ✗ at Normal strictness — or the agreed fallback works, if live recognition isn't available on Carl's setup.

---

## Phase 7: Manage cards + backup

- [ ] "Manage cards" screen: add/edit/delete/enable any card (Words, Phrases, Common Questions)
- [ ] Per-card on/off toggle ("white list / black list")
- [ ] Edits and new cards survive future publishes (seed data merges, never overwrites)
- [ ] Export cards/settings/stats to a JSON file (download / share sheet)
- [ ] Import from a JSON file (file picker)
- [ ] "Back up your cards" reminder if 30+ days since last export
- [ ] README updated with how to add/edit cards
- [ ] Publish to GitHub Pages

**Done when:** Carl adds a new phrase on his phone, it shows up in practice, and he can export and re-import his data without losing anything.

---

## Phase 8: Polish

- [ ] Dark mode check
- [ ] Large text / big tap targets double-checked, no accidental zoom or text selection
- [ ] Nicer app icon and splash screen
- [ ] Simple stats: accuracy per card, streak
- [ ] Optional: "practice my weakest cards" mode
- [ ] Publish to GitHub Pages

**Done when:** Carl is happy using it daily at work.

---

## Future ideas (not building now, just not blocking them)

- **App Store version:** if the concept works, package with Capacitor and sell it on the
  App Store as a build-your-own-flashcard-language app. Needs a Mac (or cloud build
  service) and the $99/yr Apple Developer account. The plain-web, data/logic/UI-separated
  codebase from day one is what makes this possible without a rewrite.
- **Other languages and custom decks** for other users — the deck/language config
  structure is already in place from Phase 1, just not exposed in the UI yet.
