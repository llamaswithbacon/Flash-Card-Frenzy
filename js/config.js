// config.js
// Deck/language settings and the app's UI text live here, separate from the
// app logic in app.js. A future deck in a different language only needs its
// own seed-cards.json + a copy of this file, not changes to app.js.

// Key used to save all Options settings in localStorage.
const SETTINGS_STORAGE_KEY = 'et-settings-v1';

// Settings used the very first time the app runs, before Carl changes anything.
const DEFAULT_SETTINGS = {
  directions: {
    esToEn: true,   // Spanish front -> English back
    esEnAudio: false, // Spanish + English front -> pronunciation/audio back (audio arrives in Phase 5)
    enToEs: false   // English front -> Spanish back
  },
  categories: {
    money: false,
    words: true,
    phrases: true,
    questions: false
  },
  moneySub: {
    wholeDollars: true,
    cents: true
  },
  sessionLength: 10,
  showTimer: false
};

const CATEGORY_LABELS = {
  money: 'Money',
  words: 'Words',
  phrases: 'Phrases',
  questions: 'Common Questions'
};

const STRINGS = {
  appTitle: 'Español en el Taller',
  playButton: '▶️ Play',
  optionsButton: '⚙️ Options',
  backButton: '← Back',
  gotIt: '✓ Got it',
  missed: '✗ Missed',
  next: 'Next →',
  endSession: '✕ End',
  summaryTitle: 'Session complete!',
  playAgain: '▶️ Play again',
  mainMenu: 'Main menu',
  noCardsEnabled: 'No cards are available yet for the categories you have on.',
  loadError: 'Could not load the flashcards. Check your connection and reload.',

  optionsDirectionsHeading: 'Card direction',
  directionEsToEn: 'Spanish front → English back',
  directionEsEnAudio: 'Spanish + English front → pronunciation back',
  directionEnToEs: 'English front → Spanish back',
  lastDirectionMessage: 'At least one card direction has to stay checked.',

  optionsCategoriesHeading: 'Categories',
  lastCategoryMessage: 'At least one category has to stay on.',
  moneyWholeDollars: 'Whole dollars (e.g. $47)',
  moneyCents: 'Dollars and cents (e.g. $47.83)',
  lastMoneySubMessage: 'At least one Money option has to stay on.',
  moneyComingSoon: 'Money cards arrive in Phase 3 — this just saves your preference for now.',

  optionsSessionLengthHeading: 'Session length',
  optionsTimerHeading: 'Timer',
  showTimerLabel: 'Show session timer during practice',

  audioComingSoon: 'Audio playback arrives in Phase 5.'
};
