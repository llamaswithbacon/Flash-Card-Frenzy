// es-numbers.js — Spanish number-to-words + money/number card generators.
// Language-specific logic lives here, separate from app.js, so another
// language's deck could swap in its own version later.

const ES_UNITS = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const ES_TEENS = {
  10: 'diez', 11: 'once', 12: 'doce', 13: 'trece', 14: 'catorce', 15: 'quince',
  16: 'dieciséis', 17: 'diecisiete', 18: 'dieciocho', 19: 'diecinueve'
};
const ES_TWENTIES = {
  20: 'veinte', 21: 'veintiuno', 22: 'veintidós', 23: 'veintitrés', 24: 'veinticuatro',
  25: 'veinticinco', 26: 'veintiséis', 27: 'veintisiete', 28: 'veintiocho', 29: 'veintinueve'
};
const ES_TENS = { 3: 'treinta', 4: 'cuarenta', 5: 'cincuenta', 6: 'sesenta', 7: 'setenta', 8: 'ochenta', 9: 'noventa' };
const ES_HUNDREDS = { 2: 'doscientos', 3: 'trescientos', 4: 'cuatrocientos', 5: 'quinientos', 6: 'seiscientos', 7: 'setecientos', 8: 'ochocientos', 9: 'novecientos' };

// Numbers 0-99. `apocope` shortens a trailing "uno" to "un" (and "veintiuno"
// to "veintiún"), which is required when the number is followed by a noun
// it modifies, e.g. "un dólar", "veintiún centavos".
function wordsUnder100(n, apocope) {
  if (n < 10) return (apocope && n === 1) ? 'un' : ES_UNITS[n];
  if (n === 10) return 'diez';
  if (n < 20) return ES_TEENS[n];
  if (n === 20) return 'veinte';
  if (n < 30) return (apocope && n === 21) ? 'veintiún' : ES_TWENTIES[n];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  const tensWord = ES_TENS[tens];
  if (ones === 0) return tensWord;
  const onesWord = (apocope && ones === 1) ? 'un' : ES_UNITS[ones];
  return tensWord + ' y ' + onesWord;
}

// Numbers 0-999 in Spanish words.
function numberToWords(n, apocope) {
  if (n === 0) return 'cero';
  if (n === 100) return 'cien';
  if (n < 100) return wordsUnder100(n, apocope);
  const hundredsDigit = Math.floor(n / 100);
  const remainder = n % 100;
  let words = hundredsDigit === 1 ? 'ciento' : ES_HUNDREDS[hundredsDigit];
  if (remainder > 0) words += ' ' + wordsUnder100(remainder, apocope);
  return words;
}

// "X dólares con Y centavos" phrasing, dropping whichever side is zero.
function amountToWords(dollars, cents) {
  const parts = [];
  if (dollars > 0) {
    parts.push(numberToWords(dollars, true) + (dollars === 1 ? ' dólar' : ' dólares'));
  }
  if (cents > 0) {
    parts.push(numberToWords(cents, true) + (cents === 1 ? ' centavo' : ' centavos'));
  }
  if (parts.length === 2) return parts[0] + ' con ' + parts[1];
  return parts[0];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Realistic shop-price amounts to weight the generator toward, per the brief.
const REALISTIC_PRICES = [
  15.00, 19.99, 24.99, 29.99, 34.99, 39.99, 45.50, 49.99, 59.99, 69.95,
  79.99, 89.95, 99.00, 109.99, 129.00, 149.99, 179.95, 189.99, 229.99,
  249.00, 299.99, 349.99, 399.00, 449.99, 499.00, 599.00, 749.00, 899.00
];

// kind: 'whole' or 'cents'. maxAmount caps the dollar amount (default $1000).
function generateMoneyCard(kind, maxAmount) {
  maxAmount = maxAmount || 1000;
  const eligiblePrices = REALISTIC_PRICES.filter(p => p <= maxAmount);
  let dollars, cents;
  if (eligiblePrices.length > 0 && Math.random() < 0.65) {
    const base = eligiblePrices[randomInt(0, eligiblePrices.length - 1)];
    if (kind === 'whole') {
      dollars = Math.round(base);
      cents = 0;
    } else {
      dollars = Math.floor(base);
      cents = Math.round((base - dollars) * 100);
    }
  } else if (kind === 'whole') {
    dollars = randomInt(1, Math.max(1, Math.floor(maxAmount)));
    cents = 0;
  } else {
    const maxCents = Math.max(1, Math.round(maxAmount * 100));
    // ~15% of the time, force a clean $X.00 amount rather than leaving it to
    // the ~1-in-100 chance of totalCents landing on an exact multiple of 100.
    const totalCents = Math.random() < 0.15
      ? randomInt(1, Math.max(1, Math.floor(maxAmount))) * 100
      : randomInt(1, maxCents);
    dollars = Math.floor(totalCents / 100);
    cents = totalCents % 100;
  }

  const english = kind === 'whole' ? ('$' + dollars) : ('$' + dollars + '.' + String(cents).padStart(2, '0'));
  const spanish = amountToWords(dollars, cents);
  return {
    id: 'money-' + kind + '-' + dollars + '-' + cents + '-' + Math.random().toString(36).slice(2, 6),
    category: 'money', spanish, english, pronunciationHint: ''
  };
}

// Plain counting cards (0-100) for the vocab Numbers category — no "dólares".
function generateNumberCard() {
  const value = randomInt(0, 100);
  return {
    id: 'num-' + value + '-' + Math.random().toString(36).slice(2, 6),
    category: 'numbers', spanish: numberToWords(value, false), english: String(value), pronunciationHint: ''
  };
}

function generateNumberCardPool(count) {
  const pool = [];
  for (let i = 0; i < count; i++) pool.push(generateNumberCard());
  return pool;
}

// ---- Voice-practice matching ----
// Normalizes and fuzzy-scores a heard transcript against a card's Spanish
// answer (and its acceptable alternates), for the voice-practice mic button.

const ES_ACCENT_FOLD = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ñ': 'n', 'ü': 'u' };

function foldAccents(text) {
  return text.replace(/[áéíóúñü]/g, function (ch) { return ES_ACCENT_FOLD[ch]; });
}

// A recognizer can transcribe a spoken number as digits ("20") instead of
// words ("veinte") — convert any digit runs back to Spanish words so that
// still compares correctly against card.spanish.
function digitsToSpanishWords(text) {
  return text.replace(/\d+/g, function (match) {
    return numberToWords(parseInt(match, 10), false);
  });
}

// For fuzzy comparison only — lowercase, digits spelled out, accents
// folded, punctuation stripped. Never used for display; the original heard
// transcript is always shown to Carl as-is.
function normalizeSpanish(text) {
  let normalized = digitsToSpanishWords(String(text).toLowerCase());
  normalized = foldAccents(normalized);
  normalized = normalized.replace(/[^a-z\s]/g, ' ');
  return normalized.replace(/\s+/g, ' ').trim();
}

// For English (or any language without Spanish-specific quirks) — just
// lowercase + strip punctuation. No accent folding needed, and no
// digit-to-words conversion either: English speech recognizers already
// transcribe spoken numbers as digits on their own, so a heard "47"
// already matches a target "47" without conversion.
function normalizeGeneric(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

// A few card.english entries use display shorthand — "card (credit/debit)",
// "miles / mileage" — that would unfairly fail a word-recall check against
// the full string. Also try it with any parenthetical removed, and each
// "/"-separated part on its own, so saying just "card" or "miles" still
// counts. Doesn't touch the seed data, just widens what's checked against.
function englishAnswerVariants(text) {
  const variants = [text];
  text.split('/').map(function (part) { return part.trim(); }).filter(Boolean).forEach(function (part) {
    if (part !== text) variants.push(part);
  });
  const withoutParens = text.replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
  if (withoutParens && withoutParens !== text) variants.push(withoutParens);
  return variants;
}

function levenshteinDistance(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prevRow = Array.from({ length: n + 1 }, function (_, j) { return j; });
  for (let i = 1; i <= m; i++) {
    const currRow = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      currRow[j] = Math.min(
        prevRow[j] + 1,
        currRow[j - 1] + 1,
        prevRow[j - 1] + cost
      );
    }
    prevRow = currRow;
  }
  return prevRow[n];
}

function similarityRatio(a, b) {
  const maxLen = Math.max(a.length, b.length, 1);
  return 1 - levenshteinDistance(a, b) / maxLen;
}

function wordsFuzzyMatch(a, b, wordThreshold) {
  return a === b || similarityRatio(a, b) >= wordThreshold;
}

// Scores how many of a target answer's words were actually heard (word-level
// recall) rather than a whole-string character ratio. A whole-string ratio
// dilutes a single wrong/mispronounced word across a long phrase — "Abra el
// cofre, por favor" with one botched word still looks ~90% right character-
// for-character — so it under-detects exactly the mistake grading needs to
// catch. Scoring per word instead makes one wrong word cost one word, no
// matter how long the phrase is. wordThreshold is also reused as the
// per-word fuzzy cutoff, so Easy/Normal/Strict controls both how close each
// word has to sound and how many of them have to match.
function scoreTranscriptAgainstAnswer(transcript, answer, wordThreshold, normalizeFn) {
  const targetWords = normalizeFn(answer).split(' ').filter(Boolean);
  const heardWords = normalizeFn(transcript).split(' ').filter(Boolean);
  if (targetWords.length === 0) return 0;
  const matchedCount = targetWords.filter(function (tw) {
    return heardWords.some(function (hw) { return wordsFuzzyMatch(tw, hw, wordThreshold); });
  }).length;
  return matchedCount / targetWords.length;
}

// Scores a heard transcript against a card's answer plus any acceptable
// alternates, returning whichever one matched best. normalizeFn picks the
// language — normalizeSpanish for the Spanish side, normalizeGeneric (or
// any other language's own normalizer) for everything else.
function scoreAgainstAnswers(transcript, answers, wordThreshold, normalizeFn) {
  let best = { score: 0, answer: answers[0] || '' };
  answers.forEach(function (answer) {
    const score = scoreTranscriptAgainstAnswer(transcript, answer, wordThreshold, normalizeFn);
    if (score > best.score) best = { score: score, answer: answer };
  });
  return best;
}

// Per-word match info for "here's what I heard" feedback, against whichever
// answer scored best in scoreAgainstAnswers.
function wordMatchHighlights(transcript, bestAnswer, wordThreshold, normalizeFn) {
  const targetWords = normalizeFn(bestAnswer).split(' ').filter(Boolean);
  const rawWords = transcript.trim().split(/\s+/).filter(Boolean);
  return rawWords.map(function (rawWord) {
    const normWord = normalizeFn(rawWord);
    const matched = targetWords.some(function (tw) { return wordsFuzzyMatch(normWord, tw, wordThreshold); });
    return { word: rawWord, matched: matched };
  });
}
