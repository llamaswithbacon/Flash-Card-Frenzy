// app.js — Phase 1: main menu, tap-to-flip sessions, self-grading, summary.
// Card content comes from seed-cards.json; language/UI text comes from config.js.

const screens = {
  menu: document.getElementById('menu-screen'),
  options: document.getElementById('options-screen'),
  session: document.getElementById('session-screen'),
  summary: document.getElementById('summary-screen')
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ---- Static text ----
document.getElementById('app-title').textContent = STRINGS.appTitle;
document.getElementById('play-btn').textContent = STRINGS.playButton;
document.getElementById('options-btn').textContent = STRINGS.optionsButton;
document.getElementById('options-text').textContent = STRINGS.optionsComingSoon;
document.getElementById('options-back-btn').textContent = STRINGS.backButton;
document.getElementById('end-session-btn').textContent = STRINGS.endSession;
document.getElementById('missed-btn').textContent = STRINGS.missed;
document.getElementById('gotit-btn').textContent = STRINGS.gotIt;
document.getElementById('next-btn').textContent = STRINGS.next;
document.getElementById('summary-title').textContent = STRINGS.summaryTitle;
document.getElementById('play-again-btn').textContent = STRINGS.playAgain;
document.getElementById('summary-menu-btn').textContent = STRINGS.mainMenu;

// ---- Deck loading ----
let allCards = [];

fetch('./seed-cards.json')
  .then(res => res.json())
  .then(data => {
    allCards = data.cards;
  })
  .catch(err => {
    console.error(err);
    alert(STRINGS.loadError);
  });

// ---- Shuffle helper ----
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---- Session state ----
let session = null; // { queue, index, correct, startedAt }

function buildSession() {
  const pool = allCards.filter(c =>
    c.isEnabled && DEFAULT_ENABLED_CATEGORIES.includes(c.category)
  );
  if (pool.length === 0) {
    alert(STRINGS.noCardsEnabled);
    return null;
  }

  const queue = [];
  let shuffled = shuffle(pool.slice());
  let i = 0;
  while (queue.length < DEFAULT_SESSION_LENGTH) {
    if (i >= shuffled.length) {
      shuffled = shuffle(pool.slice());
      i = 0;
    }
    queue.push(shuffled[i]);
    i++;
  }

  return {
    queue,
    index: 0,
    correct: 0,
    startedAt: Date.now()
  };
}

// ---- Rendering a card ----
const cardInner = document.getElementById('card-inner');
const cardFront = document.getElementById('card-front');
const cardBack = document.getElementById('card-back');
const gradingRow = document.getElementById('grading-row');
const nextRow = document.getElementById('next-row');
const progressText = document.getElementById('progress-text');

function renderCard() {
  const card = session.queue[session.index];
  cardInner.classList.remove('flipped');
  gradingRow.style.display = 'none';
  nextRow.style.display = 'none';

  cardFront.textContent = card.spanish;

  cardBack.innerHTML = '';
  const backMain = document.createElement('div');
  backMain.textContent = card.english;
  cardBack.appendChild(backMain);

  if (card.category === 'questions') {
    const si = document.createElement('div');
    si.className = 'card-sub';
    si.textContent = 'Sí: ' + card.siAnswer;
    const no = document.createElement('div');
    no.className = 'card-sub';
    no.textContent = 'No: ' + card.noAnswer;
    cardBack.appendChild(si);
    cardBack.appendChild(no);
  }

  progressText.textContent = (session.index + 1) + ' / ' + session.queue.length;
}

cardInner.addEventListener('click', function () {
  if (!cardInner.classList.contains('flipped')) {
    cardInner.classList.add('flipped');
    gradingRow.style.display = 'flex';
  }
});

function grade(isCorrect) {
  if (isCorrect) session.correct++;
  gradingRow.style.display = 'none';
  nextRow.style.display = 'flex';
}

document.getElementById('gotit-btn').addEventListener('click', () => grade(true));
document.getElementById('missed-btn').addEventListener('click', () => grade(false));

document.getElementById('next-btn').addEventListener('click', function () {
  session.index++;
  if (session.index >= session.queue.length) {
    finishSession();
  } else {
    renderCard();
  }
});

function finishSession() {
  const elapsedSeconds = Math.round((Date.now() - session.startedAt) / 1000);
  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;

  document.getElementById('summary-cards').textContent =
    'Cards done: ' + session.queue.length;
  document.getElementById('summary-correct').textContent =
    'Correct: ' + session.correct + ' / ' + session.queue.length;
  document.getElementById('summary-time').textContent =
    'Time: ' + mins + ':' + String(secs).padStart(2, '0');

  showScreen('summary');
}

function startSession() {
  const s = buildSession();
  if (!s) return;
  session = s;
  showScreen('session');
  renderCard();
}

// ---- Navigation ----
document.getElementById('play-btn').addEventListener('click', startSession);
document.getElementById('play-again-btn').addEventListener('click', startSession);
document.getElementById('options-btn').addEventListener('click', () => showScreen('options'));
document.getElementById('options-back-btn').addEventListener('click', () => showScreen('menu'));
document.getElementById('end-session-btn').addEventListener('click', () => showScreen('menu'));
document.getElementById('summary-menu-btn').addEventListener('click', () => showScreen('menu'));
