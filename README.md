# Español en el Taller

A Spanish flashcard app built for the shop — works as a regular website or as an app icon on your phone (no App Store needed).

**Live site:** https://llamaswithbacon.github.io/Flash-Card-Frenzy/

---

## Phase 0 results — browser capability test

Tested on iPhone 14, iOS 26.5.2, on 2026-11-13 and 2026-11-14.

| Check | Chrome tab | Chrome home screen | Safari tab | Safari home screen |
|---|---|---|---|---|
| Hello page loads | ✅ | ✅ | ✅ | ✅ |
| Spanish text-to-speech | ✅ | ✅ | ✅ | ✅ |
| Speech recognition (mic) | ✅ transcribed correctly | ✅ (via Hello page / main app, see note) | ✅ transcribed correctly | ✅ (via Hello page / main app, see note) |
| Saved data (localStorage) | ✅ | ✅ | ✅ | ✅ |
| Works offline (airplane mode) | ✅ | ✅ | ✅ | ✅ |

**Note on the mic test:** `test.html` is a separate diagnostic page that shares the same `manifest.json` as the Hello page. On this iPhone, both Chrome and Safari now follow the manifest's start page whenever you "Add to Home Screen," so a home-screen icon made from `test.html` actually opens the Hello page instead — that's a quirk of testing with two separate pages, not a real limitation. The real app is a single page, so this won't come up again. The important result — that the microphone and speech recognition genuinely work on this phone, in both browsers — is confirmed. That was the biggest risk called out in the project plan, and it's resolved.

**Phase 0 is complete.**

---

## GitHub cheat sheet

Everything for this project lives in one place on GitHub — no software to install, no computer needed. You can do all of this from your iPhone, in the GitHub app or at github.com.

- **Repository (where the code lives):** https://github.com/llamaswithbacon/Flash-Card-Frenzy
- **Live site (what you and Claude actually open to use/test the app):** https://llamaswithbacon.github.io/Flash-Card-Frenzy/

### How to see the current files
1. Open the repository link above.
2. Tap any filename to view it.

### How to publish an update
Any time a file in the repository is changed and saved ("committed"), the live site updates itself automatically within a minute or two. There's no separate "publish" button or step — saving the change *is* publishing it.

1. Open the file in the repository.
2. Tap the pencil (edit) icon.
3. Make your change.
4. Scroll down, add a short note about what you changed, and tap **Commit changes**.
5. Wait about a minute, then reload the live site to see the update.

### How to install the app on your phone
1. Open the live site link above in Chrome or Safari.
2. Tap the Share button (Safari) or the ⋮ menu (Chrome).
3. Tap **Add to Home Screen**.
4. An icon will appear on your home screen like any other app.

### How to add a new flashcard
*(This section will be filled in once Phase 1 is built — the app will store its cards in a simple file that's easy to edit without touching any code.)*

---

## Project status

See [ROADMAP.md](./ROADMAP.md) for the full build plan and progress. Currently:
**Phases 3 (Money cards), 4 (Timers), and 5 (Audio + offline) are all confirmed on
Carl's iPhone, including a real airplane-mode test. Phase 6 (Voice mode) is next.**
