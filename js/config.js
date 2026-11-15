// config.js
// Deck/language settings and the app's UI text live here, separate from the
// app logic in app.js. A future deck in a different language only needs its
// own seed-cards.json + a copy of this file, not changes to app.js.

// Categories turned on by default, until the Options screen (Phase 2) lets
// this be changed and saved.
const DEFAULT_ENABLED_CATEGORIES = ['words', 'phrases'];

// Cards per session, until the Phase 2 slider replaces this.
const DEFAULT_SESSION_LENGTH = 10;

const CATEGORY_LABELS = {
  words: 'Words',
  phrases: 'Phrases',
  questions: 'Common Questions'
};

const STRINGS = {
  appTitle: 'Español en el Taller',
  playButton: '▶️ Play',
  optionsButton: '⚙️ Options',
  optionsComingSoon: 'Options are coming in Phase 2. For now, every session uses Words + Phrases, 10 cards, shuffled.',
  backButton: '← Back',
  gotIt: '✓ Got it',
  missed: '✗ Missed',
  next: 'Next →',
  endSession: '✕ End',
  summaryTitle: 'Session complete!',
  playAgain: '▶️ Play again',
  mainMenu: 'Main menu',
  noCardsEnabled: 'No cards are available yet for the categories you have on.',
  loadError: 'Could not load the flashcards. Check your connection and reload.'
};
