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
    const totalCents = randomInt(1, maxCents);
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
