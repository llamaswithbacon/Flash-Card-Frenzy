// config.js
// Deck/language settings and the app's UI text live here, separate from the
// app logic in app.js. A future deck in a different language only needs its
// own seed-cards.json + a copy of this file, not changes to app.js.

// Key used to save all Options settings in localStorage.
const SETTINGS_STORAGE_KEY = 'et-settings-v1';

// Settings used the very first time the app runs, before Carl changes anything.
const DEFAULT_SETTINGS = {
  direction: 'esToEn', // 'esToEn' | 'enToEs' | 'mixed' — exactly one, ever (audio arrives in Phase 5, for every direction)
  categories: {
    words: true,
    phrases: true,
    questions: false,
    numbers: false
  },
  moneySub: {
    wholeDollars: true,
    cents: true
  },
  moneyMax: 1000,
  sessionLength: 10,
  showTimer: false
};

// Stops for the Money "maximum amount" slider.
const MONEY_MAX_STEPS = [10, 20, 50, 100, 200, 500, 1000];

const CATEGORY_LABELS = {
  words: 'Words',
  phrases: 'Phrases',
  questions: 'Common Questions',
  numbers: 'Numbers'
};

const STRINGS = {
  appTitle: 'Español en el Taller',
  playButton: '▶️ Play',
  moneyButton: '💰 Money',
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
  directionEnToEs: 'English front → Spanish back',
  directionMixed: 'Mixed (both directions)',

  optionsCategoriesHeading: 'Categories',
  lastCategoryMessage: 'At least one category has to stay on.',

  optionsMoneyHeading: 'Money practice',
  moneyWholeDollars: 'Whole dollars (e.g. $47)',
  moneyCents: 'Dollars and cents (e.g. $47.83)',
  lastMoneySubMessage: 'At least one Money option has to stay on.',
  moneyMaxLabel: 'Maximum amount:',

  optionsSessionLengthHeading: 'Session length',
  optionsTimerHeading: 'Timer',
  showTimerLabel: 'Show session timer during practice',

  peekFront: '👁 Hold to see front'
};
