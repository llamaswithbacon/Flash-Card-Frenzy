// config.js
// Deck/language settings and the app's UI text live here, separate from the
// app logic in app.js. A future deck in a different language only needs its
// own seed-cards.json + a copy of this file, not changes to app.js.

// Key used to save all Options settings in localStorage.
const SETTINGS_STORAGE_KEY = 'et-settings-v1';

// Key used to save the lifetime practice-time total (separate from Options
// settings since it's accumulated data, not a user preference).
const STATS_STORAGE_KEY = 'et-stats-v1';

// Settings used the very first time the app runs, before Carl changes anything.
const DEFAULT_SETTINGS = {
  direction: 'esToEn', // 'esToEn' | 'enToEs' | 'mixed' — exactly one, ever (audio arrives in Phase 5, for every direction)
  categories: {
    words: true,
    phrases: true,
    questions: false,
    numbers: false
  },
  moneyKind: 'whole', // 'whole' | 'cents' — exactly one, ever
  moneyMax: 1000,
  sessionLength: 10,
  showTimer: false,
  autoPlay: false,
  slowSpeed: false,
  voiceName: '', // '' = browser default Spanish voice
  voicePracticeEnabled: true,
  voiceStrictness: 'normal' // 'easy' | 'normal' | 'strict' — exactly one, ever
};

// Stops for the Money "maximum amount" slider.
const MONEY_MAX_STEPS = [10, 20, 50, 100, 200, 500, 1000];

// How closely each individual word has to be pronounced/heard to count as a
// match, by strictness level — every word in the answer still has to be
// said; this only controls how forgiving the matching is per word. Tunable
// here without touching the matching logic.
const VOICE_MATCH_THRESHOLDS = { easy: 0.6, normal: 0.75, strict: 0.9 };

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

  optionsAudioHeading: 'Audio',
  speakButton: '🔊',
  autoPlayLabel: 'Auto-play Spanish audio',
  slowSpeedLabel: 'Speak slowly',
  voicePickerLabel: 'Voice',
  updateAvailable: 'Update available — tap to refresh',

  optionsCategoriesHeading: 'Categories',
  lastCategoryMessage: 'At least one category has to stay on.',

  optionsMoneyHeading: 'Money practice',
  moneyWholeDollars: 'Whole dollars (e.g. $47)',
  moneyCents: 'Dollars and cents (e.g. $47.83)',
  moneyMaxLabel: 'Maximum amount:',

  optionsSessionLengthHeading: 'Session length',
  optionsTimerHeading: 'Timer',
  showTimerLabel: 'Show session timer during practice',

  peekFront: '👁 Hold to see front',

  totalPracticeLabel: 'Total practice: ',

  optionsVoiceHeading: 'Voice practice',
  voicePracticeEnabledLabel: 'Enable voice practice (🎤)',
  voiceStrictnessLabel: 'How strict should grading be?',
  voiceStrictnessEasy: 'Easy',
  voiceStrictnessNormal: 'Normal',
  voiceStrictnessStrict: 'Strict',

  micButton: '🎤',
  micListening: '🎤 Listening…',
  micDenied: 'Microphone access was denied. You can enable it in Settings, or just use Got it / Missed.',
  micNoSpeech: "Didn't catch that — try again or grade yourself.",
  heardLabel: 'Heard: '
};
