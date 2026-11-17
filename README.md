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

### How to add, edit, or remove a flashcard
1. From the main menu, tap **⚙️ Options**, then **✏️ Manage Cards**.
2. Pick a category (Words / Phrases / Questions) at the top.
3. Tap the checkbox on any card to turn it on or off — it stays in the list
   so you can turn it back on later.
4. Tap ✏️ to edit a card, or 🗑️ to delete it permanently (you'll be asked
   to confirm — this can't be undone except by restoring an older backup).
5. Tap **+ Add card** to create a new one. Spanish and English text are
   required; "Other acceptable Spanish answers" is optional (one per line)
   and covers alternate ways to say the same thing for Voice practice
   grading. Questions cards also get Sí/No example answers.
6. Your changes save automatically and survive future app updates — they're
   kept separate from the built-in card list, not mixed into it.

### Replacing the app icon
The app icon is just two image files in the repository — `IMG_1070.png`
(192x192) and `IMG_1071.png` (512x512). To swap in your own: open each file
in the repository, tap the pencil (edit) icon, and use GitHub's "Upload
files" option to replace it with your new image **using the same filename**.
No other file needs to change.

### Backing up your cards
On the Manage Cards screen, **⬇️ Export backup** downloads a JSON file with
your cards, settings, and practice stats. **⬆️ Import backup** restores
from one of those files (this replaces whatever's currently on the phone,
so only do it if that's what you want). The main menu will remind you to
back up if it's been 30+ days since your last export.

---

## Project status

See [ROADMAP.md](./ROADMAP.md) for the full build plan and progress. Currently:
**Phases 3 through 7 (Money cards, Timers, Audio + offline, Voice mode, Manage cards +
backup) are all confirmed on Carl's iPhone, including English-guess voice recognition
on Spanish-front cards. Phase 8 (Polish: light/dark toggle, tap targets, per-card
accuracy, daily streak, Weakest Cards mode) is built and published, awaiting Carl's
phone test.**
