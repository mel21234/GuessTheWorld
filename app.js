/* =====================================================================
   RANK THE WORLD — game logic (plain JavaScript, no libraries)
   ---------------------------------------------------------------------
   File overview
   1. CONFIG        – launch date, number of attempts, site address
   2. STRINGS       – every piece of UI text (English + Estonian)
   3. Storage       – safe localStorage helpers
   4. Dates         – which puzzle is today, countdown to midnight
   5. Game state    – order of cards, attempts, locked cards
   6. Rendering     – cards, history, reveal screen, modals
   7. Drag & drop   – Pointer Events (mouse + touch) and arrow buttons
   8. Stats         – played, win %, streaks, distribution
   9. Start-up

   Puzzle data lives in puzzles.js. See the comment at the top of that
   file for how to add a new puzzle.
   ===================================================================== */

/* ---------- 1. CONFIG ---------- */
const CONFIG = {
  // Puzzle #1 is shown on this day (YYYY-MM-DD, player's local date).
  LAUNCH_DATE: "2026-10-19",
  ATTEMPTS: 3,
  // Shown at the bottom of the share text. Leave "" to use the page's own address.
  SITE_URL: "",
  STORAGE_PREFIX: "rtw-",
  // Set to true to show the editor's confidence rating on the reveal screen.
  SHOW_CONFIDENCE: false,
  // Where "Create account or log in" should go once you have a sign-up page.
  // Leave "" and the pop-up says accounts are coming soon.
  ACCOUNT_URL: ""
};

/* ---------- 2. STRINGS ----------
   To add a language: copy the `en` block, translate the values, and add
   the language code to LANGUAGES. Puzzle text can be translated by adding
   e.g. `translations: { et: { question: "...", metric: "...", surprisingFact: "..." } }`
   to a puzzle in puzzles.js. Missing translations fall back to English. */
const LANGUAGES = ["en", "et"];

const STRINGS = {
  en: {
    locale: "en-US",
    howToPlay: "How to play",
    statistics: "Statistics",
    settings: "Settings",
    changeLanguage: "Change language",
    todaysRanking: "Today's ranking",
    most: "MOST ↑",
    least: "LEAST ↓",
    submit: "Submit",
    dragHint: "Drag the cards, or use the arrows, then press Submit.",
    nextPuzzle: "Next puzzle in",
    atMidnight: "at 00:00 your time",
    darkMode: "Dark mode",
    reducedMotion: "Reduced motion",
    reducedMotionDesc: "Turns off card flips and shakes",
    aboutData: "About our data",
    read: "Read",
    attemptOf: (n, max) => `Attempt ${n} of ${max}`,
    attemptsLeft: (n) => (n === 1 ? "1 attempt left" : `${n} attempts left`),
    wonIn: (n, max) => `You got it in ${n}/${max}!`,
    wonSub: "Here's the real data behind today's ranking.",
    lost: "So close! Here's the real order.",
    lostSub: "Every number below comes from a named source.",
    surprisingFact: "Fact of the day",
    menu: "Menu",
    closeMenu: "Close menu",
    archive: "Puzzle archive",
    archiveDesc: "Missed a day? Pick any earlier puzzle.",
    archiveBadge: "From the archive",
    backToToday: "Back to today's puzzle",
    prevMonth: "Previous month",
    nextMonth: "Next month",
    legendWon: "Solved",
    legendLost: "Missed",
    legendStarted: "Started",
    accountEyebrow: "Free account",
    accountTitle: (n) => `You've finished ${n} ${n === 1 ? "puzzle" : "puzzles"} on this device.`,
    accountBody: "An account keeps them on every device, and it comes with a few extras.",
    accountPerks: [
      ["Your history, everywhere", "Finished puzzles and streaks follow you to any device."],
      ["Leaderboard", "Compare scores with friends and see how you rank."],
      ["Advanced stats", "See which topics you're best at and how close your guesses get."],
      ["Never lose a streak", "Switch phones or clear your browser without starting over."]
    ],
    accountCta: "Create account or log in",
    accountNotNow: "Not now",
    accountFootnote: "You never need an account to play.",
    accountSoon: "Accounts are coming soon. Until then, your games stay saved in this browser.",
    sources: "Sources",
    hideSources: "Hide sources",
    dataYear: (y) => `data year ${y}`,
    share: "Share",
    copied: "Result copied — paste it anywhere!",
    copyFailed: "Couldn't copy. Select and copy the text manually.",
    played: "Played",
    winPct: "Win %",
    currentStreak: "Current streak",
    maxStreak: "Max streak",
    distribution: "Wins by number of attempts",
    lossLabel: "X",
    moveUp: "Move up",
    moveDown: "Move down",
    position: (n) => `position ${n}`,
    lockedLabel: "locked, correct",
    confidence: { high: "Data check: high", medium: "Data check: medium", "needs-check": "Data check: needs checking" },
    tryAgain: "Not quite — try again!",
    helpHtml: `
      <p>Every day there's one new ranking. Put the <strong>5 cards</strong> in order from <strong>MOST</strong> (top) to <strong>LEAST</strong> (bottom).</p>
      <p>Drag a card, or use its ▲ ▼ arrows. You have <strong>3 attempts</strong>.</p>
      <div class="mini-example">
        <div class="mini-tile green">🇫🇮 Finland</div>
        <p class="mini-caption"><strong>Green</strong>: exactly the right spot. It locks in place.</p>
        <div class="mini-tile yellow">🇯🇵 Japan</div>
        <p class="mini-caption"><strong>Yellow</strong>: one spot away from where it belongs.</p>
        <div class="mini-tile">🇧🇷 Brazil</div>
        <p class="mini-caption"><strong>Gray</strong>: two or more spots away.</p>
      </div>
      <p>When the game ends you'll see the real numbers, where each one comes from, and one surprising fact.</p>
      <p>A new puzzle arrives every day at midnight, your local time.</p>`,
    aboutHtml: `
      <p>Rank the World is built on one promise: <strong>every number is real and has a source you can check.</strong></p>
      <p>We use official or well-established sources, for example:</p>
      <ul>
        <li>World Bank — World Development Indicators</li>
        <li>Eurostat, OECD, UN agencies (FAO, UN Population Division)</li>
        <li>International Energy Agency (IEA)</li>
        <li>NASA, USDA FoodData Central, CIA World Factbook</li>
        <li>National statistics offices and official organisations</li>
      </ul>
      <p>The <strong>year of the data</strong> is always shown, because many numbers change over time. When a value is rounded, we mark it with ≈.</p>
      <p>Spotted a mistake? Tell us — we'd rather fix it than be wrong.</p>`
  },

  et: {
    locale: "et-EE",
    howToPlay: "Kuidas mängida",
    statistics: "Statistika",
    settings: "Seaded",
    changeLanguage: "Vaheta keelt",
    todaysRanking: "Tänane järjestus",
    most: "KÕIGE ROHKEM ↑",
    least: "KÕIGE VÄHEM ↓",
    submit: "Kontrolli",
    dragHint: "Lohista kaarte või kasuta nooli, siis vajuta „Kontrolli“.",
    nextPuzzle: "Järgmine mõistatus",
    atMidnight: "kell 00:00 sinu aja järgi",
    darkMode: "Tume režiim",
    reducedMotion: "Vähem liikumist",
    reducedMotionDesc: "Lülitab kaartide pööramise ja raputamise välja",
    aboutData: "Meie andmetest",
    read: "Loe",
    attemptOf: (n, max) => `Katse ${n}/${max}`,
    attemptsLeft: (n) => (n === 1 ? "1 katse jäänud" : `${n} katset jäänud`),
    wonIn: (n, max) => `Õige! Said hakkama ${n}/${max} katsega.`,
    wonSub: "Siin on tänase järjestuse päris andmed.",
    lost: "Nii lähedal! Siin on õige järjestus.",
    lostSub: "Iga allolev number pärineb nimetatud allikast.",
    surprisingFact: "Päeva fakt",
    menu: "Menüü",
    closeMenu: "Sulge menüü",
    archive: "Mõistatuste arhiiv",
    archiveDesc: "Jäi päev vahele? Vali mõni varasem mõistatus.",
    archiveBadge: "Arhiivist",
    backToToday: "Tagasi tänase mõistatuse juurde",
    prevMonth: "Eelmine kuu",
    nextMonth: "Järgmine kuu",
    legendWon: "Lahendatud",
    legendLost: "Ei tulnud välja",
    legendStarted: "Pooleli",
    accountEyebrow: "Tasuta konto",
    accountTitle: (n) => `Oled selles seadmes lahendanud ${n} ${n === 1 ? "mõistatuse" : "mõistatust"}.`,
    accountBody: "Kontoga on need sul igas seadmes olemas, ja lisaks saad mõned boonused.",
    accountPerks: [
      ["Ajalugu igas seadmes", "Lahendatud mõistatused ja seeriad liiguvad sinuga kaasa."],
      ["Edetabel", "Võrdle tulemusi sõpradega ja vaata, kus sa oled."],
      ["Täpsem statistika", "Vaata, millised teemad sul paremini lähevad."],
      ["Seeria ei kao", "Vaheta telefoni või tühjenda brauser ilma otsast alustamata."]
    ],
    accountCta: "Loo konto või logi sisse",
    accountNotNow: "Mitte praegu",
    accountFootnote: "Mängimiseks pole kontot kunagi vaja.",
    accountSoon: "Kontod tulevad peagi. Seni on sinu mängud salvestatud selles brauseris.",
    sources: "Allikad",
    hideSources: "Peida allikad",
    dataYear: (y) => `andmete aasta: ${y}`,
    share: "Jaga",
    copied: "Tulemus kopeeritud!",
    copyFailed: "Kopeerimine ebaõnnestus. Kopeeri tekst käsitsi.",
    played: "Mängitud",
    winPct: "Võidu %",
    currentStreak: "Praegune seeria",
    maxStreak: "Pikim seeria",
    distribution: "Võidud katsete arvu järgi",
    lossLabel: "X",
    moveUp: "Liiguta üles",
    moveDown: "Liiguta alla",
    position: (n) => `koht ${n}`,
    lockedLabel: "lukus, õige",
    confidence: { high: "Andmete kontroll: kõrge", medium: "Andmete kontroll: keskmine", "needs-check": "Andmed vajavad kontrolli" },
    tryAgain: "Peaaegu — proovi uuesti!",
    helpHtml: `
      <p>Iga päev on üks uus järjestus. Pane <strong>5 kaarti</strong> järjekorda: <strong>KÕIGE ROHKEM</strong> üleval, <strong>KÕIGE VÄHEM</strong> all.</p>
      <p>Lohista kaarti või kasuta ▲ ▼ nooli. Sul on <strong>3 katset</strong>.</p>
      <div class="mini-example">
        <div class="mini-tile green">🇫🇮 Soome</div>
        <p class="mini-caption"><strong>Roheline</strong>: täpselt õigel kohal. Kaart lukustub.</p>
        <div class="mini-tile yellow">🇯🇵 Jaapan</div>
        <p class="mini-caption"><strong>Kollane</strong>: õigest kohast üks samm eemal.</p>
        <div class="mini-tile">🇧🇷 Brasiilia</div>
        <p class="mini-caption"><strong>Hall</strong>: kaks või rohkem sammu eemal.</p>
      </div>
      <p>Mängu lõpus näed päris numbreid, nende allikaid ja ühte üllatavat fakti.</p>
      <p>Uus mõistatus tuleb iga päev keskööl sinu aja järgi.</p>`,
    aboutHtml: `
      <p>Rank the World põhineb ühel lubadusel: <strong>iga number on päris ja sellel on allikas, mida saab kontrollida.</strong></p>
      <p>Kasutame ametlikke või tunnustatud allikaid, näiteks:</p>
      <ul>
        <li>Maailmapank — World Development Indicators</li>
        <li>Eurostat, OECD, ÜRO asutused (FAO, ÜRO rahvastikuosakond)</li>
        <li>Rahvusvaheline Energiaagentuur (IEA)</li>
        <li>NASA, USDA FoodData Central, CIA World Factbook</li>
        <li>Statistikaametid ja ametlikud organisatsioonid</li>
      </ul>
      <p><strong>Andmete aasta</strong> on alati näha, sest paljud numbrid muutuvad ajas. Ümardatud väärtused on tähistatud märgiga ≈.</p>
      <p>Leidsid vea? Anna teada — parandame selle hea meelega.</p>`
  }
};

/* ---------- 3. Storage (wrapped in try/catch: private mode can block it) ---------- */
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(CONFIG.STORAGE_PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(CONFIG.STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      /* storage unavailable — the game still works for this visit */
    }
  }
};

const settings = Object.assign(
  { dark: false, reducedMotion: false, lang: "en" }, // light mode unless the player turns dark mode on
  store.get("settings", {})
);
if (!LANGUAGES.includes(settings.lang)) settings.lang = "en";

function t() { return STRINGS[settings.lang] || STRINGS.en; }

/* ---------- 4. Dates ---------- */
// Count days using the player's LOCAL calendar date (ignores DST jumps).
function localDayNumber(date) {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
}
function launchDayNumber() {
  const [y, m, d] = CONFIG.LAUNCH_DATE.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

const today = new Date();
// TODAY = today's puzzle (0 = launch day). DAY = the puzzle on screen,
// which can be an older one picked from the archive calendar.
const TODAY = Math.max(0, localDayNumber(today) - launchDayNumber());
let DAY = TODAY;
let PUZZLE = puzzleForDay(DAY);
let PUZZLE_NUMBER = DAY + 1;
const N = 5; // every puzzle has 5 items

function puzzleForDay(day) {
  return PUZZLES[day % PUZZLES.length];
}
// The calendar date a puzzle belongs to (local time).
function dateForDay(day) {
  const [y, m, d] = CONFIG.LAUNCH_DATE.split("-").map(Number);
  return new Date(y, m - 1, d + day);
}
const isArchive = () => DAY !== TODAY;

PUZZLES.forEach((p) => {
  if (p.confidence === "needs-check") console.warn(`Puzzle id ${p.id} is marked "needs-check" — verify it before publishing.`);
});

// Puzzle text in the current language (falls back to English).
function pt(field) {
  const tr = PUZZLE.translations && PUZZLE.translations[settings.lang];
  return (tr && tr[field]) || PUZZLE[field];
}

/* ---------- Seeded random (same shuffle for everyone on the same day) ---------- */
function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
function startingOrder() {
  const rand = mulberry32(hashString(`rank-the-world-${DAY}-${PUZZLE.id}`));
  let order;
  // Shuffle until at most one card is already in the right place
  // (so the start is never the correct answer, and never too easy).
  for (let tries = 0; tries < 200; tries++) {
    order = [...Array(N).keys()];
    for (let i = N - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const correct = order.filter((item, slot) => item === slot).length;
    if (correct <= 1) break;
  }
  return order;
}

/* ---------- 5. Game state ----------
   order[slot]  = index of the item in that slot (item index 0 = correct #1)
   locked[slot] = true once that slot turned green
   attempts     = list of colour rows, e.g. ["g","y","x","x","g"]          */
function freshState() {
  return {
    day: DAY,
    puzzleId: PUZZLE.id,
    order: startingOrder(),
    locked: Array(N).fill(false),
    attempts: [],
    lastSubmittedOrder: null,
    status: "playing",
    statsRecorded: false
  };
}
// Every day's game is saved separately so archive puzzles keep their progress.
const games = store.get("games", {});
(() => {
  const old = store.get("game", null); // games saved by the first version
  if (old && typeof old.day === "number" && !games[old.day]) games[old.day] = old;
})();
function gameFor(day) {
  const saved = games[day];
  return saved && saved.puzzleId === puzzleForDay(day).id ? saved : null;
}
let state = gameFor(DAY) || freshState();
function saveState() {
  games[DAY] = state;
  store.set("games", games);
}

function colourFor(slot, order) {
  const diff = Math.abs(order[slot] - slot);
  return diff === 0 ? "g" : diff === 1 ? "y" : "x";
}
const isOver = () => state.status !== "playing";
let animating = false;

/* ---------- DOM helpers ---------- */
const $ = (sel) => document.querySelector(sel);
const listEl = $("#rank-list");
const tiles = []; // tiles[itemIndex] = <li>

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2200);
}

function reducedMotion() {
  return settings.reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------- 6. Rendering ---------- */
function applyTheme() {
  // Always light unless the player switched dark mode on in Settings.
  const dark = settings.dark === true;
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  document.querySelector('meta[name="theme-color"]').setAttribute("content", dark ? "#121213" : "#FFFFFF");
  document.documentElement.classList.toggle("reduce-motion", settings.reducedMotion);
  $("#toggle-dark").setAttribute("aria-checked", String(dark));
  $("#toggle-motion").setAttribute("aria-checked", String(settings.reducedMotion));
}

function renderStaticText() {
  const s = t();
  document.documentElement.lang = settings.lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (typeof s[key] === "string") el.textContent = s[key];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (typeof s[key] === "string") el.setAttribute("aria-label", s[key]);
  });
  $("#lang-label").textContent = settings.lang.toUpperCase();

  const dateStr = new Intl.DateTimeFormat(s.locale, { month: "short", day: "numeric", year: "numeric" }).format(dateForDay(DAY));
  $("#puzzle-meta").textContent = `#${PUZZLE_NUMBER} · ${dateStr}`;
  $("#archive-bar").hidden = !isArchive();
  $("#archive-label").textContent = s.archiveBadge;
  $("#btn-today").textContent = s.backToToday;
  $("#drawer-title").textContent = s.archive;
  $("#drawer-desc").textContent = s.archiveDesc;
  $("#btn-menu").setAttribute("aria-label", s.menu);
  $("#drawer-close").setAttribute("aria-label", s.closeMenu);
  $("#question").textContent = pt("question");
  $("#metric").textContent = pt("metric");
  $("#help-body").innerHTML = s.helpHtml;
  $("#about-body").innerHTML = s.aboutHtml;
}

function itemName(i) {
  const tr = PUZZLE.translations && PUZZLE.translations[settings.lang];
  return (tr && tr.items && tr.items[i]) || PUZZLE.items[i].name;
}

function buildTiles() {
  listEl.innerHTML = "";
  PUZZLE.items.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = "tile";
    li.tabIndex = 0;
    li.dataset.item = i;
    li.innerHTML = `
      <span class="tile-rank"></span>
      <span class="tile-emoji" aria-hidden="true">${item.emoji}</span>
      <span class="tile-name"></span>
      <span class="tile-actions">
        <button class="arrow-btn up" type="button">▲</button>
        <button class="arrow-btn down" type="button">▼</button>
      </span>
      <span class="handle" aria-hidden="true">⋮⋮</span>`;
    li.querySelector(".up").addEventListener("click", (e) => { e.stopPropagation(); moveByArrow(i, -1); });
    li.querySelector(".down").addEventListener("click", (e) => { e.stopPropagation(); moveByArrow(i, +1); });
    li.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") { e.preventDefault(); moveByArrow(i, -1); li.focus(); }
      if (e.key === "ArrowDown") { e.preventDefault(); moveByArrow(i, +1); li.focus(); }
    });
    li.addEventListener("pointerdown", (e) => onPointerDown(e, i));
    tiles[i] = li;
    listEl.appendChild(li);
  });
}

function stepPx() {
  const first = tiles[0];
  const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tile-gap")) || 10;
  return (first ? first.offsetHeight : 64) + gap;
}

// Put every tile at the y-position of its slot (skips the one being dragged).
function positionTiles() {
  const step = stepPx();
  state.order.forEach((item, slot) => {
    const tile = tiles[item];
    const pos = `translateY(${slot * step}px)`;
    tile.style.setProperty("--pos", pos);
    if (!drag || drag.item !== item || !drag.active) tile.style.transform = pos;
  });
}

// Which colour should a tile show right now?
function tileColour(slot) {
  if (state.locked[slot]) return "g";
  const last = state.attempts[state.attempts.length - 1];
  if (!last || !state.lastSubmittedOrder) return null;
  // Only keep the old colour if the card hasn't moved since the last submit.
  if (isOver() || state.lastSubmittedOrder[slot] === state.order[slot]) return last[slot];
  return null;
}

function paintTiles() {
  const s = t();
  const free = freeSlots();
  state.order.forEach((item, slot) => {
    const tile = tiles[item];
    const colour = tileColour(slot);
    tile.classList.toggle("green", colour === "g");
    tile.classList.toggle("yellow", colour === "y");
    tile.classList.toggle("gray", colour === "x");
    const locked = state.locked[slot] || isOver();
    tile.classList.toggle("locked", locked);
    tile.querySelector(".tile-rank").textContent = slot + 1;
    tile.querySelector(".tile-name").textContent = itemName(item);
    const idx = free.indexOf(slot);
    const up = tile.querySelector(".up");
    const down = tile.querySelector(".down");
    up.disabled = locked || idx <= 0;
    down.disabled = locked || idx === -1 || idx >= free.length - 1;
    up.setAttribute("aria-label", `${s.moveUp}: ${itemName(item)}`);
    down.setAttribute("aria-label", `${s.moveDown}: ${itemName(item)}`);
    tile.setAttribute("aria-label",
      `${itemName(item)}, ${s.position(slot + 1)}${state.locked[slot] ? ", " + s.lockedLabel : ""}`);
  });
}

function renderHistory() {
  const box = $("#history");
  box.innerHTML = state.attempts
    .map((row) => `<div class="history-row">${row.map((c) => `<span class="${c === "g" ? "g" : c === "y" ? "y" : ""}"></span>`).join("")}</div>`)
    .join("");
}

function renderAttempts() {
  const s = t();
  const used = state.attempts.length;
  const box = $("#attempts");
  box.innerHTML = Array.from({ length: CONFIG.ATTEMPTS }, (_, i) => `<span class="dot ${i < used ? "used" : ""}"></span>`).join("");
  box.setAttribute("aria-label", isOver() ? "" : s.attemptsLeft(CONFIG.ATTEMPTS - used));
  $("#btn-submit").hidden = isOver();
  $("#hint").hidden = isOver();
  $("#btn-submit").disabled = animating;
}

function renderAll() {
  positionTiles();
  paintTiles();
  renderHistory();
  renderAttempts();
  if (isOver()) renderReveal();
}

/* ----- Reveal screen ----- */
function barWidths() {
  const values = PUZZLE.items.map((it) => it.value);
  if (PUZZLE.hideBars || values.some((v) => v <= 0)) return null;
  const max = Math.max(...values);
  if (PUZZLE.barScale === "log") {
    const min = Math.min(...values);
    const lo = Math.log10(min) - 0.5;
    const hi = Math.log10(max);
    return values.map((v) => Math.max(3, ((Math.log10(v) - lo) / (hi - lo)) * 100));
  }
  return values.map((v) => Math.max(2, (v / max) * 100));
}

function renderReveal() {
  const s = t();
  const box = $("#reveal");
  const won = state.status === "won";
  const widths = barWidths();
  const src = PUZZLE.source;

  const rows = PUZZLE.items.map((it, i) => `
    <li class="answer-row">
      <span class="answer-rank">${i + 1}</span>
      <span class="answer-emoji" aria-hidden="true">${it.emoji}</span>
      <span class="answer-name">${escapeHtml(itemName(i))}</span>
      <span class="answer-value">${escapeHtml(it.display)}</span>
      ${widths ? `<span class="answer-bar"><span data-w="${widths[i].toFixed(1)}"></span></span>` : ""}
    </li>`).join("");

  // One line per number: value — source (dataset), data year.
  const srcLines = PUZZLE.items.map((it, i) => {
    const own = it.source;
    const name = own ? own.name : src.name;
    const url = own ? own.url : src.url;
    const label = url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(name)}</a>` : escapeHtml(name);
    const dataset = own ? "" : ` — ${escapeHtml(src.dataset)}`;
    return `<li><strong>${escapeHtml(itemName(i))}</strong>: ${escapeHtml(it.display)} · ${label}${dataset}, ${escapeHtml(s.dataYear(src.year))}</li>`;
  }).join("");

  const factSrc = PUZZLE.factSource
    ? `<p class="fact-src">${escapeHtml(s.sources)}: <a href="${escapeHtml(PUZZLE.factSource.url)}" target="_blank" rel="noopener">${escapeHtml(PUZZLE.factSource.name)}</a></p>`
    : "";

  box.innerHTML = `
    <h2 class="reveal-title">${escapeHtml(won ? s.wonIn(state.attempts.length, CONFIG.ATTEMPTS) : s.lost)}</h2>
    <p class="reveal-sub">${escapeHtml(won ? s.wonSub : s.lostSub)}</p>
    <section class="card"><ol class="answer-list">${rows}</ol></section>
    <section class="card fact-card">
      <h3>${escapeHtml(s.surprisingFact)}</h3>
      <p>${escapeHtml(pt("surprisingFact"))}</p>
      ${factSrc}
    </section>
    <div class="share-wrap">
      <button class="primary-btn share-btn" id="btn-share" type="button">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/></svg>
        ${escapeHtml(s.share)}
      </button>
      <button class="secondary-btn" id="btn-sources" type="button" aria-expanded="false" aria-controls="sources">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
        <span>${escapeHtml(s.sources)}</span>
      </button>
    </div>
    <!-- Sources stay hidden until the player asks for them -->
    <section class="sources" id="sources" hidden>
      <h3>${escapeHtml(s.sources)}</h3>
      <ul>${srcLines}</ul>
      ${PUZZLE.note ? `<p class="source-note">${escapeHtml(pt("note"))}</p>` : ""}
      ${CONFIG.SHOW_CONFIDENCE ? `<span class="confidence">${escapeHtml(s.confidence[PUZZLE.confidence] || PUZZLE.confidence)}</span>` : ""}
    </section>`;
  box.hidden = false;
  $("#btn-share").addEventListener("click", share);
  $("#btn-sources").addEventListener("click", toggleSources);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    box.querySelectorAll(".answer-bar span").forEach((bar) => { bar.style.width = bar.dataset.w + "%"; });
  }));
}

/* ----- Sources button: show the sources list and scroll down to it ----- */
function toggleSources() {
  const section = $("#sources");
  const btn = $("#btn-sources");
  const opening = section.hidden;
  section.hidden = !opening;
  btn.setAttribute("aria-expanded", String(opening));
  btn.querySelector("span").textContent = opening ? t().hideSources : t().sources;
  if (opening) {
    section.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  }
}

/* ----- Share (no spoilers: only coloured squares) ----- */
function shareText() {
  const map = { g: "🟩", y: "🟨", x: "⬜" };
  const rows = state.attempts.map((row) => row.map((c) => map[c]).join("")).join("\n");
  const score = state.status === "won" ? `${state.attempts.length}/${CONFIG.ATTEMPTS}` : `X/${CONFIG.ATTEMPTS}`;
  const site = CONFIG.SITE_URL || (location.host ? location.host + location.pathname.replace(/index\.html$/, "") : "rank-the-world.example");
  return `Rank the World #${PUZZLE_NUMBER} 🌍\n${rows}\n${score}\n${site.replace(/\/$/, "")}`;
}

function share() {
  const text = shareText();
  const fallback = () => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      toast(ok ? t().copied : t().copyFailed);
    } catch (e) {
      toast(t().copyFailed);
    }
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => toast(t().copied), fallback);
  } else {
    fallback();
  }
}

/* ---------- 7. Moving cards ---------- */
function freeSlots() {
  return [...Array(N).keys()].filter((s) => !state.locked[s]);
}

// Move the item in `fromSlot` to `toSlot`. Locked (green) slots never move;
// the other cards slide around them.
function moveFree(fromSlot, toSlot) {
  const free = freeSlots();
  const a = free.indexOf(fromSlot);
  const b = free.indexOf(toSlot);
  if (a === -1 || b === -1 || a === b) return false;
  const seq = free.map((s) => state.order[s]);
  const [moved] = seq.splice(a, 1);
  seq.splice(b, 0, moved);
  free.forEach((s, i) => { state.order[s] = seq[i]; });
  return true;
}

function moveByArrow(item, dir) {
  if (isOver() || animating) return;
  const slot = state.order.indexOf(item);
  if (state.locked[slot]) return;
  const free = freeSlots();
  const target = free[free.indexOf(slot) + dir];
  if (target === undefined) return;
  if (moveFree(slot, target)) {
    saveState();
    positionTiles();
    paintTiles();
  }
}

/* ----- Drag & drop with Pointer Events (mouse, touch and pen) ----- */
let drag = null;

function onPointerDown(e, item) {
  if (isOver() || animating) return;
  if (e.button !== undefined && e.button !== 0) return;
  if (e.target.closest(".arrow-btn")) return;
  const slot = state.order.indexOf(item);
  if (state.locked[slot]) return;
  const tile = tiles[item];
  const listTop = listEl.getBoundingClientRect().top;
  drag = {
    item,
    pointerId: e.pointerId,
    startY: e.clientY,
    grabOffset: e.clientY - listTop - slot * stepPx(),
    active: false
  };
  tile.setPointerCapture(e.pointerId);
  tile.addEventListener("pointermove", onPointerMove);
  tile.addEventListener("pointerup", onPointerUp);
  tile.addEventListener("pointercancel", onPointerUp);
}

function onPointerMove(e) {
  if (!drag || e.pointerId !== drag.pointerId) return;
  const tile = tiles[drag.item];
  if (!drag.active) {
    if (Math.abs(e.clientY - drag.startY) < 4) return;
    drag.active = true;
    tile.classList.add("dragging");
  }
  e.preventDefault();
  const step = stepPx();
  const listTop = listEl.getBoundingClientRect().top;
  const maxY = (N - 1) * step;
  const y = Math.min(maxY + step * 0.3, Math.max(-step * 0.3, e.clientY - listTop - drag.grabOffset));
  tile.style.transform = `translateY(${y}px)`;

  const hovered = Math.min(N - 1, Math.max(0, Math.round(y / step)));
  const current = state.order.indexOf(drag.item);
  if (hovered !== current && !state.locked[hovered]) {
    if (moveFree(current, hovered)) {
      positionTiles();
      paintTiles();
    }
  }
}

function onPointerUp(e) {
  if (!drag || e.pointerId !== drag.pointerId) return;
  const tile = tiles[drag.item];
  tile.removeEventListener("pointermove", onPointerMove);
  tile.removeEventListener("pointerup", onPointerUp);
  tile.removeEventListener("pointercancel", onPointerUp);
  try { tile.releasePointerCapture(e.pointerId); } catch (err) { /* already released */ }
  const wasActive = drag.active;
  drag = null;
  tile.classList.remove("dragging");
  positionTiles();
  paintTiles();
  if (wasActive) saveState();
}

/* ----- Submit an attempt ----- */
function submit() {
  if (isOver() || animating) return;
  const colours = state.order.map((_, slot) => colourFor(slot, state.order));
  state.attempts.push(colours);
  state.lastSubmittedOrder = state.order.slice();
  colours.forEach((c, slot) => { if (c === "g") state.locked[slot] = true; });

  const won = colours.every((c) => c === "g");
  if (won) state.status = "won";
  else if (state.attempts.length >= CONFIG.ATTEMPTS) state.status = "lost";
  saveState();

  animating = true;
  renderAttempts();
  revealColours(colours).then(() => {
    animating = false;
    renderAll();
    if (!won && !isOver()) {
      if (!reducedMotion()) {
        listEl.classList.remove("shake");
        void listEl.offsetWidth; // restart the animation
        listEl.classList.add("shake");
      }
      toast(t().tryAgain);
    }
    if (isOver()) finishGame();
  });
}

// Flip the cards one by one (150 ms apart) and colour them halfway through the flip.
function revealColours(colours) {
  return new Promise((resolve) => {
    if (reducedMotion()) {
      paintTiles();
      resolve();
      return;
    }
    const stagger = 150;
    const flip = 500;
    state.order.forEach((item, slot) => {
      const tile = tiles[item];
      setTimeout(() => {
        tile.classList.remove("flip");
        void tile.offsetWidth;
        tile.classList.add("flip");
        setTimeout(() => {
          tile.classList.toggle("green", colours[slot] === "g");
          tile.classList.toggle("yellow", colours[slot] === "y");
          tile.classList.toggle("gray", colours[slot] === "x");
        }, flip / 2);
        setTimeout(() => tile.classList.remove("flip"), flip);
      }, slot * stagger);
    });
    setTimeout(resolve, (N - 1) * stagger + flip + 50);
  });
}

function finishGame() {
  const justFinished = !state.statsRecorded;
  if (justFinished) {
    recordStats(state.status === "won", state.attempts.length);
    state.statsRecorded = true;
    saveState();
  }
  renderReveal();
  setTimeout(() => {
    $("#reveal").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  }, 250);
  // Give the player a moment to see the answer, then suggest an account.
  if (justFinished) setTimeout(maybeShowAccountPrompt, 2200);
}

/* ---------- Account pop-up (shown at most once a day, after a finished game) ---------- */
function finishedCount() {
  return Object.values(games).filter((g) => g && g.status && g.status !== "playing").length;
}

function maybeShowAccountPrompt() {
  if (store.get("accountPromptDay", null) === TODAY) return;
  if (document.querySelector(".modal-backdrop:not([hidden])")) return; // don't stack pop-ups
  store.set("accountPromptDay", TODAY);
  openAccountPrompt();
}

const PERK_ICONS = [
  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="13" height="16" rx="2"/><rect x="9" y="8" width="13" height="12" rx="2"/></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 5h3v2a3 3 0 0 1-3 3"/><path d="M7 5H4v2a3 3 0 0 0 3 3"/></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2s5 4.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.8 2-5 0 2 1 3 2 3 0-3 1-6 1-8z"/></svg>'
];

function openAccountPrompt() {
  const s = t();
  const perks = s.accountPerks.map(([title, desc], i) => `
    <li class="perk">
      <span class="perk-icon">${PERK_ICONS[i] || ""}</span>
      <span><strong>${escapeHtml(title)}</strong><span>${escapeHtml(desc)}</span></span>
    </li>`).join("");
  $("#account-body").innerHTML = `
    <p class="account-eyebrow">${escapeHtml(s.accountEyebrow)}</p>
    <h2 id="account-title">${escapeHtml(s.accountTitle(finishedCount()))}</h2>
    <p class="account-lead">${escapeHtml(s.accountBody)}</p>
    <ul class="perks">${perks}</ul>
    <button class="primary-btn account-cta" id="btn-account" type="button">${escapeHtml(s.accountCta)}</button>
    <p class="account-soon" id="account-soon" hidden>${escapeHtml(s.accountSoon)}</p>
    <button class="text-btn account-later" type="button" data-close>${escapeHtml(s.accountNotNow)}</button>
    <p class="account-foot">${escapeHtml(s.accountFootnote)}</p>`;
  $("#btn-account").addEventListener("click", () => {
    if (CONFIG.ACCOUNT_URL) {
      window.open(CONFIG.ACCOUNT_URL, "_blank", "noopener");
    } else {
      $("#account-soon").hidden = false;
      $("#btn-account").disabled = true;
    }
  });
  openModal("modal-account");
}

/* ---------- Archive: menu drawer with a calendar ---------- */
let calMonth = null; // first day of the month shown in the calendar

function openDrawer() {
  const d = dateForDay(DAY);
  calMonth = new Date(d.getFullYear(), d.getMonth(), 1);
  renderCalendar();
  $("#drawer-backdrop").hidden = false;
  requestAnimationFrame(() => $("#drawer").classList.add("open"));
  $("#drawer").setAttribute("aria-hidden", "false");
  $("#btn-menu").setAttribute("aria-expanded", "true");
  setTimeout(() => $("#drawer-close").focus(), 50);
}

function closeDrawer() {
  $("#drawer").classList.remove("open");
  $("#drawer").setAttribute("aria-hidden", "true");
  $("#btn-menu").setAttribute("aria-expanded", "false");
  setTimeout(() => { $("#drawer-backdrop").hidden = true; }, reducedMotion() ? 0 : 250);
}

function renderCalendar() {
  const s = t();
  const first = dateForDay(0);
  const last = dateForDay(TODAY);
  const y = calMonth.getFullYear();
  const m = calMonth.getMonth();
  const monthName = new Intl.DateTimeFormat(s.locale, { month: "long", year: "numeric" }).format(calMonth);
  $("#cal-month").textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  $("#cal-prev").disabled = y < first.getFullYear() || (y === first.getFullYear() && m <= first.getMonth());
  $("#cal-next").disabled = y > last.getFullYear() || (y === last.getFullYear() && m >= last.getMonth());
  $("#cal-prev").setAttribute("aria-label", s.prevMonth);
  $("#cal-next").setAttribute("aria-label", s.nextMonth);

  // Weekday names, Monday first.
  const fmt = new Intl.DateTimeFormat(s.locale, { weekday: "narrow" });
  const heads = [...Array(7)].map((_, i) => `<span class="cal-head">${fmt.format(new Date(2024, 0, 1 + i))}</span>`).join("");

  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const lead = (new Date(y, m, 1).getDay() + 6) % 7; // Monday = 0
  let cells = "";
  for (let i = 0; i < lead; i++) cells += '<span class="cal-cell empty"></span>';
  for (let d = 1; d <= daysInMonth; d++) {
    const day = localDayNumber(new Date(y, m, d)) - launchDayNumber();
    const playable = day >= 0 && day <= TODAY;
    if (!playable) {
      cells += `<span class="cal-cell off">${d}</span>`;
      continue;
    }
    const g = gameFor(day);
    const status = g ? (g.status === "won" ? "won" : g.status === "lost" ? "lost" : g.attempts.length ? "started" : "") : "";
    const cls = ["cal-cell", "on", status, day === DAY ? "current" : "", day === TODAY ? "is-today" : ""].join(" ");
    const label = new Intl.DateTimeFormat(s.locale, { day: "numeric", month: "long" }).format(new Date(y, m, d));
    cells += `<button type="button" class="${cls}" data-day="${day}" aria-label="#${day + 1}, ${label}">${d}</button>`;
  }
  $("#cal-grid").innerHTML = heads + cells;
  $("#cal-legend").innerHTML = `
    <span><i class="dot-won"></i>${escapeHtml(s.legendWon)}</span>
    <span><i class="dot-lost"></i>${escapeHtml(s.legendLost)}</span>
    <span><i class="dot-started"></i>${escapeHtml(s.legendStarted)}</span>`;
  $("#cal-grid").querySelectorAll("button[data-day]").forEach((b) => {
    b.addEventListener("click", () => {
      closeDrawer();
      loadPuzzle(Number(b.dataset.day));
    });
  });
}

// Switch the page to another day's puzzle.
function loadPuzzle(day) {
  if (day === DAY) return;
  DAY = day;
  PUZZLE = puzzleForDay(DAY);
  PUZZLE_NUMBER = DAY + 1;
  state = gameFor(DAY) || freshState();
  animating = false;
  const box = $("#reveal");
  box.hidden = true;
  box.innerHTML = "";
  renderStaticText();
  buildTiles();
  listEl.classList.add("init");
  renderAll();
  requestAnimationFrame(() => requestAnimationFrame(() => listEl.classList.remove("init")));
  window.scrollTo({ top: 0, behavior: "auto" });
}

/* ---------- 8. Stats ---------- */
function loadStats() {
  return Object.assign(
    { played: 0, wins: 0, currentStreak: 0, maxStreak: 0, lastWonDay: null, dist: { 1: 0, 2: 0, 3: 0, fail: 0 } },
    store.get("stats", {})
  );
}

// Streak grows when you win on consecutive days; a loss or a missed day resets it.
// Archive games count towards Played / Win % / distribution, but not the streak.
function recordStats(won, attemptsUsed) {
  const st = loadStats();
  st.played += 1;
  if (won) {
    st.wins += 1;
    st.dist[attemptsUsed] = (st.dist[attemptsUsed] || 0) + 1;
  } else {
    st.dist.fail += 1;
  }
  if (!isArchive()) {
    if (won) {
      st.currentStreak = st.lastWonDay === TODAY - 1 ? st.currentStreak + 1 : 1;
      st.lastWonDay = TODAY;
      st.maxStreak = Math.max(st.maxStreak, st.currentStreak);
    } else {
      st.currentStreak = 0;
    }
  }
  store.set("stats", st);
}

function displayedStreak(st) {
  // If yesterday (or today) wasn't won, the streak is broken.
  return st.lastWonDay === TODAY || st.lastWonDay === TODAY - 1 ? st.currentStreak : 0;
}

function renderStats() {
  const s = t();
  const st = loadStats();
  const winPct = st.played ? Math.round((st.wins / st.played) * 100) : 0;
  const keys = ["1", "2", "3", "fail"];
  const max = Math.max(1, ...keys.map((k) => st.dist[k] || 0));
  const todayKey = state.status === "won" ? String(state.attempts.length) : state.status === "lost" ? "fail" : null;
  const bars = keys.map((k) => {
    const n = st.dist[k] || 0;
    const label = k === "fail" ? s.lossLabel : k;
    return `<div class="dist-row"><span class="dist-label">${label}</span>
      <span class="dist-bar ${k === todayKey ? "today" : ""}" style="width:${Math.max(8, (n / max) * 100)}%">${n}</span></div>`;
  }).join("");
  $("#stats-body").innerHTML = `
    <div class="stats-grid">
      <div><div class="stat-num">${st.played}</div><div class="stat-label">${s.played}</div></div>
      <div><div class="stat-num">${winPct}</div><div class="stat-label">${s.winPct}</div></div>
      <div><div class="stat-num">${displayedStreak(st)}</div><div class="stat-label">${s.currentStreak}</div></div>
      <div><div class="stat-num">${st.maxStreak}</div><div class="stat-label">${s.maxStreak}</div></div>
    </div>
    <h3 style="margin:0 0 8px;font-size:15px;font-weight:800">${s.distribution}</h3>
    ${bars}`;
}

/* ----- Modals ----- */
let lastFocus = null;
function openModal(id) {
  if (id === "modal-stats") renderStats();
  document.querySelectorAll(".modal-backdrop").forEach((m) => { m.hidden = true; });
  lastFocus = document.activeElement;
  const m = $("#" + id);
  m.hidden = false;
  const close = m.querySelector("[data-close]");
  if (close) close.focus();
}
function closeModals() {
  document.querySelectorAll(".modal-backdrop").forEach((m) => { m.hidden = true; });
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

/* ----- Countdown to local midnight ----- */
function startCountdown() {
  const el = $("#countdown");
  const tick = () => {
    const now = new Date();
    if (localDayNumber(now) !== localDayNumber(today)) {
      location.reload(); // a new puzzle is ready
      return;
    }
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const secs = Math.max(0, Math.floor((midnight - now) / 1000));
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const sec = String(secs % 60).padStart(2, "0");
    el.textContent = `${h}:${m}:${sec}`;
  };
  tick();
  setInterval(tick, 1000);
}

/* ---------- 9. Start-up ---------- */
function saveSettings() { store.set("settings", settings); }

function init() {
  applyTheme();
  renderStaticText();
  buildTiles();
  listEl.classList.add("init"); // place cards without the slide animation
  renderAll();
  requestAnimationFrame(() => requestAnimationFrame(() => listEl.classList.remove("init")));

  $("#btn-submit").addEventListener("click", submit);
  $("#btn-help").addEventListener("click", () => openModal("modal-help"));
  $("#btn-stats").addEventListener("click", () => openModal("modal-stats"));
  $("#btn-settings").addEventListener("click", () => openModal("modal-settings"));
  $("#btn-about").addEventListener("click", () => openModal("modal-about"));
  $("#btn-menu").addEventListener("click", openDrawer);
  $("#drawer-close").addEventListener("click", closeDrawer);
  $("#drawer-backdrop").addEventListener("click", (e) => { if (e.target.id === "drawer-backdrop") closeDrawer(); });
  $("#cal-prev").addEventListener("click", () => { calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1); renderCalendar(); });
  $("#cal-next").addEventListener("click", () => { calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1); renderCalendar(); });
  $("#btn-today").addEventListener("click", () => loadPuzzle(TODAY));
  document.querySelectorAll("[data-open]").forEach((b) => b.addEventListener("click", () => {
    closeDrawer();
    openModal(b.getAttribute("data-open"));
  }));
  $("#btn-lang").addEventListener("click", () => {
    settings.lang = LANGUAGES[(LANGUAGES.indexOf(settings.lang) + 1) % LANGUAGES.length];
    saveSettings();
    renderStaticText();
    renderAll();
    if (calMonth) renderCalendar();
  });
  $("#toggle-dark").addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    settings.dark = !isDark;
    saveSettings();
    applyTheme();
  });
  $("#toggle-motion").addEventListener("click", () => {
    settings.reducedMotion = !settings.reducedMotion;
    saveSettings();
    applyTheme();
  });

  document.querySelectorAll(".modal-backdrop").forEach((m) => {
    m.addEventListener("click", (e) => { if (e.target === m || e.target.closest("[data-close]")) closeModals(); });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeModals();
    if ($("#drawer").classList.contains("open")) closeDrawer();
  });
  window.addEventListener("resize", positionTiles);

  startCountdown();

  // Show the rules the very first time someone visits.
  if (!store.get("seenHelp", false)) {
    store.set("seenHelp", true);
    openModal("modal-help");
  }
}

init();
