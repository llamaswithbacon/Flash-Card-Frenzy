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

**Status: ✅ Phase 2 complete.** Confirmed by Carl on his iPhone home-screen icon: settings persisted after fully closing and reopening the app, and a session played correctly.

Note: Money moved out of the category list in Phase 3 — see that phase for why.

---

## Phase 3: Money cards

- [x] Spanish number-to-words converter (dollars and cents), with the tricky cases from brief Section 3
- [x] Unit tests for the converter (thorough — this is the riskiest logic in the app)
- [x] Whole-dollar and dollars-and-cents generators, weighted toward realistic shop prices
- [x] Money sub-toggles (whole dollars / cents), at least one on when Money is on
- [x] **Design change (Carl's call):** Money is its own practice mode with a **💰 Money** button on the main menu, instead of a category mixed in with vocabulary. The Options screen's "Money practice" section (the whole-dollars/cents sub-toggles) now controls that mode directly.
- [x] **Design change (Carl's call):** added a **Numbers** category to vocab mode — plain generated counting cards (0–100), separate from Money, using the same converter.
- [x] Publish to GitHub Pages

**Done when:** all converter unit tests pass, and money cards show up correctly when enabled.

**Status: ✅ Phase 3 complete, confirmed by Carl on his iPhone.** All 67 converter
unit tests pass (see [money-tests.html](money-tests.html)). Three small issues Carl found
while testing — card backs rendering smaller than fronts, the Money whole-dollars/cents
choice not being exclusive, and the dollars-and-cents deck rarely producing a clean
`$X.00` amount — are fixed together with the Phase 5 work below.

---

## Phase 4: Timers

- [x] Saved total-practice-time tracker on the main menu, persists permanently
- [x] Live session timer (shown when the toggle is on)
- [x] Timer uses `visibilitychange` + real timestamps, pauses while app is backgrounded
- [x] Frequent saves (every few seconds + on `visibilitychange`/`pagehide`), not just on exit
- [x] Publish to GitHub Pages

**Done when:** total practice time adds up correctly across several sessions and app restarts/backgrounding.

**Status: ✅ Phase 4 complete, confirmed by Carl on his iPhone.**

---

## Phase 5: Audio (text-to-speech) + offline

- [x] 🔊 button plays the Spanish side via `speechSynthesis` — reads whichever side (front or
      back) is currently showing the Spanish term, so it works the same in all three card-direction modes
- [x] Auto-play option (works after the first tap of a session, per iOS audio rules)
- [x] Slow-speed option
- [x] Voice picker in Options if multiple Spanish voices are available
- [x] Service worker (`sw.js`) now actually registered — it existed since Phase 3 but was
      never wired up; caches the app shell + cards so it works in airplane mode
- [x] "Update available — tap to refresh" banner when a new version is published, so a
      cache-first service worker never leaves Carl silently stuck on stale content
- [x] Publish to GitHub Pages

**Done when:** every Spanish card can be read aloud, and the app opens and plays cards with no signal.

**Status: ✅ Phase 5 complete, confirmed by Carl on his iPhone — including a real
airplane-mode test.** TTS (🔊 button, auto-play, slow-speed, voice picker), offline
support via the service worker, and the update-available banner all work as intended.
One follow-up fix shipped after the initial publish: the 🔊 button is now hidden on
English-front cards until the card is flipped to reveal the Spanish side, so it can't
be used to hear the answer before attempting it — confirmed working by Carl.

---

## Phase 6: Voice mode / pronunciation check

Plan this phase against the Phase 0 browser-test results first.

- [x] Mic permission flow, with guidance if denied
- [x] Speech recognition (`webkitSpeechRecognition`, `es-MX`) wired to the 🎤 button
- [x] Normalize transcript (case/punctuation/accents) and convert numerals to words before comparing
- [x] Fuzzy match scoring with Easy/Normal/Strict thresholds (tunable)
- [x] Alternate acceptable answers per card (e.g. carro/coche, lo/la, sí/no answers)
- [x] "Here's what I heard" feedback with mismatched words highlighted
- [x] Hide 🎤 wherever recognition isn't available (no note needed — see status)
- [x] Publish to GitHub Pages

**Done when:** saying a card correctly gets ✓ and mumbling gets ✗ at Normal strictness — or the agreed fallback works, if live recognition isn't available on Carl's setup.

**Status: ✅ Phase 6 complete, confirmed by Carl on his iPhone.** Scoring was fixed
after his first test caught every answer scoring correct regardless of mispronunciation
— the original check compared the whole heard phrase against the whole answer as one
string, which diluted a single wrong word across a longer sentence. It now checks
word-by-word and requires every word to be heard; strictness only controls how
forgiving each word's pronunciation match is. Carl confirms it works, with Strict still
somewhat lenient in places — likely a phone/browser speech-recognition limitation
(the recognizer can auto-correct a mispronounced word to the right spelling on its
own, which no scoring logic can see past) rather than a bug, and Carl's fine with that
for now. **Simplification from the original plan, with Carl's OK:** skipped the
Chrome→Safari recognition handoff, since Phase 0 already confirmed recognition works
natively in both browsers on Carl's phone.

**Follow-up (2026-11-18):** voice practice now also recognizes the **English** guess
on Spanish-front cards, not just the Spanish guess on English-front cards — built
ahead of any real need, at Carl's request, so a future multi-language version of this
app can reuse the same "recognize whichever side is hidden" architecture. Matching was
generalized to accept a per-language normalizer; English scoring also tries a card's
text with any "(...)" or "a / b" shorthand split apart, so a short correct answer like
"card" still matches `"card (credit/debit)"`. Pushed and published — awaiting Carl's
phone test of the English-recognition direction specifically (Spanish-guess mode is
unchanged and still confirmed).

---

## Phase 7: Manage cards + backup

- [x] "Manage cards" screen: add/edit/delete/enable any card (Words, Phrases, Common Questions)
- [x] Per-card on/off toggle ("white list / black list") — **expanded, with Carl's
      OK:** every card, built-in or custom, can also be fully deleted, not just
      disabled (with a confirm step first, since that's harder to undo)
- [x] Edits and new cards survive future publishes (seed data merges, never overwrites)
- [x] Export cards/settings/stats to a JSON file (download / share sheet)
- [x] Import from a JSON file (file picker)
- [x] "Back up your cards" reminder if 30+ days since last export
- [x] README updated with how to add/edit cards
- [x] Publish to GitHub Pages

**Done when:** Carl adds a new phrase on his phone, it shows up in practice, and he can export and re-import his data without losing anything.

**Status: 🧪 Built, tested locally, published — awaiting Carl's phone test.** Verified
locally: adding a custom card (shows up in practice immediately), disabling and fully
deleting a built-in card, editing a built-in card's text surviving a reload (the merge
against the unchanged seed file), and a full export→wipe→import round-trip restoring
cards, settings, and stats exactly. Numbers and Money aren't covered — they're
generated, not static cards, per the roadmap's own scope. What needs Carl's
real-device check: using the screen itself on his phone (especially the file
export/import flow through iOS's share sheet, which the local sandbox can't fully
exercise).

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
