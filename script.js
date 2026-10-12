"use strict";

const tournaments = [
  {
    id: "valorant",
    name: "VALORANT",
    game: "Valorant",
    category: "FPS",
    mode: "5v5 Tactical FPS",
    prize: 5000,
    players: "5 players / team",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1100&q=80",
    description: "Coordinate every move. Win every round. Make the final play count."
  },
  {
    id: "cs2",
    name: "COUNTER-STRIKE 2",
    game: "Counter-Strike 2",
    category: "FPS",
    mode: "5v5 Tactical FPS",
    prize: 4000,
    players: "5 players / team",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1100&q=80",
    description: "Sharp aim, smart tactics, and no room for careless mistakes."
  },
  {
    id: "bgmi",
    name: "BGMI",
    game: "BGMI",
    category: "Battle Royale",
    mode: "Squad Battle Royale",
    prize: 5000,
    players: "4 players / team",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1100&q=80",
    description: "Drop smart, rotate early, and be the last squad standing."
  },
  {
    id: "rocket-league",
    name: "ROCKET LEAGUE",
    game: "Rocket League",
    category: "Sports",
    mode: "3v3 Sports",
    prize: 2500,
    players: "3 players / team",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1100&q=80",
    description: "Fast cars, aerial plays, and spectacular goals."
  },
  {
    id: "apex",
    name: "APEX LEGENDS",
    game: "Apex Legends",
    category: "Battle Royale",
    mode: "Squad Battle Royale",
    prize: 3500,
    players: "3 players / team",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1100&q=80",
    description: "Choose your legend, coordinate your squad, and claim victory."
  },
  {
    id: "fortnite",
    name: "FORTNITE",
    game: "Fortnite",
    category: "Battle Royale",
    mode: "Solo / Duo Battle",
    prize: 3000,
    players: "1–2 players",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1100&q=80",
    description: "Build, adapt, survive, and outplay the competition."
  },
  {
    id: "dota2",
    name: "DOTA 2",
    game: "Dota 2",
    category: "MOBA",
    mode: "5v5 Strategy",
    prize: 4500,
    players: "5 players / team",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1100&q=80",
    description: "Draft carefully, control the map, and take down the Ancient."
  },
  {
    id: "lol",
    name: "LEAGUE OF LEGENDS",
    game: "League of Legends",
    category: "MOBA",
    mode: "5v5 Strategy",
    prize: 4000,
    players: "5 players / team",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1100&q=80",
    description: "Master your lane, fight as a team, and dominate the Rift."
  },
  {
    id: "tekken",
    name: "TEKKEN 8",
    game: "Tekken 8",
    category: "Fighting",
    mode: "1v1 Fighting",
    prize: 2000,
    players: "Solo players",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1100&q=80",
    description: "Read your opponent, land the combo, and take the championship."
  },
  {
    id: "eafc",
    name: "EA SPORTS FC",
    game: "EA Sports FC",
    category: "Sports",
    mode: "1v1 Football",
    prize: 2500,
    players: "Solo players",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1100&q=80",
    description: "Build your attack, defend under pressure, and score the winner."
  }
];

// Fictional examples for the interface only, not actual match results.
const sampleLeaderboard = [
  { rank: 1, name: "Crimson Wolves", game: "Valorant", wins: 12, points: 2840 },
  { rank: 2, name: "Phantom Unit", game: "Counter-Strike 2", wins: 10, points: 2610 },
  { rank: 3, name: "Last Circle", game: "BGMI", wins: 9, points: 2395 },
  { rank: 4, name: "Turbo Titans", game: "Rocket League", wins: 8, points: 2170 },
  { rank: 5, name: "Night Protocol", game: "Valorant", wins: 7, points: 1950 }
];

const STORAGE_KEY = "nexus_demo_registrations_v2";
const EVENT_DATE_KEY = "nexus_demo_event_date_v1";
const DAY_MS = 24 * 60 * 60 * 1000;

const $ = (selector) => document.querySelector(selector);

function safeReadRegistrations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(isValidRecord) : [];
  } catch (error) {
    console.warn("NEXUS could not read local demo records.", error);
    return [];
  }
}

function isValidRecord(record) {
  return record &&
    typeof record === "object" &&
    typeof record.id === "string" &&
    typeof record.playerName === "string" &&
    typeof record.tournament === "string";
}

function saveRegistrations(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return true;
  } catch (error) {
    console.error("NEXUS could not save local demo records.", error);
    return false;
  }
}

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function renderTournamentCards() {
  const grid = $("#tournamentGrid");
  const query = $("#gameSearch").value.trim().toLowerCase();
  const selectedGame = $("#gameFilter").value;
  const selectedCategory = $("#categoryFilter").value;
  const minimumPrize = Number($("#prizeFilter").value);

  const filtered = tournaments.filter((tournament) => {
    const matchesSearch =
      tournament.name.toLowerCase().includes(query) ||
      tournament.game.toLowerCase().includes(query) ||
      tournament.category.toLowerCase().includes(query) ||
      tournament.description.toLowerCase().includes(query);

    const matchesGame = selectedGame === "all" || tournament.game === selectedGame;
    const matchesCategory =
      selectedCategory === "all" || tournament.category === selectedCategory;
    const matchesPrize = tournament.prize >= minimumPrize;

    return matchesSearch && matchesGame && matchesCategory && matchesPrize;
  });

  $("#resultsCount").textContent =
    `${filtered.length} tournament${filtered.length === 1 ? "" : "s"} found`;

  $("#noResults").classList.toggle("hidden", filtered.length !== 0);

  grid.innerHTML = filtered.map((tournament, index) => `
    <article class="tournament-card" style="animation-delay:${index * 75}ms">
      <div class="card-art"
        style="background-image:url('${tournament.image}')"
        role="img"
        aria-label="${escapeHTML(tournament.game)} themed gaming artwork"></div>

      <div class="card-topline">
        <span class="card-tag">${escapeHTML(tournament.category)}</span>
        <span class="card-status">DEMO EVENT</span>
      </div>

      <div class="card-content">
        <span class="eyebrow">NEXUS / ${String(index + 1).padStart(2, "0")}</span>
        <h3>${escapeHTML(tournament.name)}</h3>
        <p>${escapeHTML(tournament.description)}</p>

        <div class="card-meta">
          <span>◈ <strong>${escapeHTML(tournament.mode)}</strong></span>
          <span>♟ <strong>${escapeHTML(tournament.players)}</strong></span>
        </div>

        <div class="card-bottom">
          <div class="prize-value">
            ${formatINR(tournament.prize)}
            <small>ILLUSTRATIVE PRIZE POOL</small>
          </div>
          <a class="card-register" href="#register"
            data-tournament="${escapeHTML(tournament.game)}">REGISTER ↗</a>
        </div>
      </div>
    </article>
  `).join("");
}

function populateTournamentSelect() {
  const tournamentSelect = $("#tournamentSelect");
  const gameFilter = $("#gameFilter");
  const categoryFilter = $("#categoryFilter");

  tournamentSelect.replaceChildren();
  gameFilter.replaceChildren();
  categoryFilter.replaceChildren();

  const defaultTournament = document.createElement("option");
  defaultTournament.value = "";
  defaultTournament.textContent = "Choose a game";
  tournamentSelect.appendChild(defaultTournament);

  const allGames = document.createElement("option");
  allGames.value = "all";
  allGames.textContent = "All games";
  gameFilter.appendChild(allGames);

  const allCategories = document.createElement("option");
  allCategories.value = "all";
  allCategories.textContent = "All categories";
  categoryFilter.appendChild(allCategories);

  const games = [...new Set(tournaments.map(t => t.game))];
  const categories = [...new Set(tournaments.map(t => t.category))];

  tournaments.forEach(tournament => {
    const option = document.createElement("option");
    option.value = tournament.game;
    option.textContent =
      `${tournament.name} | ${formatINR(tournament.prize)} prize pool`;
    tournamentSelect.appendChild(option);
  });

  games.forEach(game => {
    const option = document.createElement("option");
    option.value = game;
    option.textContent = game;
    gameFilter.appendChild(option);
  });

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function renderLeaderboard() {
  const body = $("#leaderboardBody");

  body.innerHTML = sampleLeaderboard.map((entry) => `
    <tr>
      <td><span class="rank-number ${entry.rank <= 3 ? "top-rank" : ""}">
        ${String(entry.rank).padStart(2, "0")}
      </span></td>
      <td>
        <div class="leader-team">
          <span class="team-avatar">${escapeHTML(entry.name.charAt(0))}</span>
          ${escapeHTML(entry.name)}
        </div>
      </td>
      <td><span class="game-pill">${escapeHTML(entry.game)}</span></td>
      <td>${entry.wins}</td>
      <td><span class="score-value">${entry.points.toLocaleString("en-IN")}</span></td>
    </tr>
  `).join("");
}

function renderRegistrationTable() {
  const body = $("#registrationTableBody");
  const records = safeReadRegistrations();

  $("#registrationCount").textContent = records.length;
  body.replaceChildren();

  if (records.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "No local demo registrations yet.";
    row.appendChild(cell);
    body.appendChild(row);
    return;
  }

  records.slice().reverse().forEach((record) => {
    const row = document.createElement("tr");
    const values = [
      record.registrationType || "Solo",
      record.playerName || "",
      record.teamName || "—",
      record.tournament || "",
      record.email || "",
      record.createdAt ? new Date(record.createdAt).toLocaleString() : ""
    ];

    values.forEach((value, index) => {
      const cell = document.createElement("td");

      if (index === 0) {
        const badge = document.createElement("span");
        badge.className = "type-badge";
        badge.textContent = value;
        cell.appendChild(badge);
      } else {
        // textContent displays user input as text, not executable HTML.
        cell.textContent = value;
      }

      row.appendChild(cell);
    });

    body.appendChild(row);
  });
}

function updateRegistrationFields() {
  const isTeam = $("#registrationType").value === "Team";

  document.querySelectorAll(".team-field").forEach((field) => {
    field.classList.toggle("hidden", !isTeam);

    field.querySelectorAll("input, select, textarea").forEach((control) => {
      control.disabled = !isTeam;
      control.required = isTeam && (
        control.id === "teamName" || control.id === "teamSize"
      );
    });
  });

  $("#teamName").required = isTeam;
  $("#teamSize").required = isTeam;
}

function getEventDate() {
  try {
    const saved = localStorage.getItem(EVENT_DATE_KEY);
    if (saved) {
      const parsed = new Date(saved);
      if (!Number.isNaN(parsed.getTime()) && parsed.getTime() > Date.now()) {
        return parsed;
      }
    }

    const nextDate = new Date(Date.now() + 30 * DAY_MS);
    nextDate.setMilliseconds(0);

    try {
      localStorage.setItem(EVENT_DATE_KEY, nextDate.toISOString());
    } catch (error) {
      console.warn("Countdown date could not be saved.", error);
    }

    return nextDate;
  } catch (error) {
    return new Date(Date.now() + 30 * DAY_MS);
  }
}

const eventDate = getEventDate();

function updateCountdown() {
  let remaining = Math.max(0, eventDate.getTime() - Date.now());
  const days = Math.floor(remaining / DAY_MS);
  remaining %= DAY_MS;
  const hours = Math.floor(remaining / (60 * 60 * 1000));
  remaining %= 60 * 60 * 1000;
  const minutes = Math.floor(remaining / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);

  $("#days").textContent = String(days).padStart(2, "0");
  $("#hours").textContent = String(hours).padStart(2, "0");
  $("#minutes").textContent = String(minutes).padStart(2, "0");
  $("#seconds").textContent = String(seconds).padStart(2, "0");

  $("#eventDateLabel").textContent = remaining === 0 &&
    eventDate.getTime() <= Date.now()
    ? "Demo countdown ended. Set a real event date before launch."
    : `Demo date: ${eventDate.toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric"
      })}`;
}

function showFormMessage(message, isError = false) {
  const target = $("#formMessage");
  target.textContent = message;
  target.classList.toggle("error", isError);
}

function handleRegistration(event) {
  event.preventDefault();
  showFormMessage("");

  const form = $("#registrationForm");
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const registrationType = data.get("registrationType");
  const selectedTournament = tournaments.find(
    (item) => item.game === data.get("tournament")
  );

  if (!selectedTournament) {
    showFormMessage("Please choose a valid tournament.", true);
    return;
  }

  const playerName = String(data.get("playerName") || "").trim();
  const email = String(data.get("email") || "").trim();
  const teamName = String(data.get("teamName") || "").trim();

  if (!playerName || !email) {
    showFormMessage("Enter the required player and email fields.", true);
    return;
  }

  if (registrationType === "Team" && !teamName) {
    showFormMessage("Enter a team name for team registration.", true);
    return;
  }

  const records = safeReadRegistrations();
  const record = {
    id: (window.crypto && typeof window.crypto.randomUUID === "function")
      ? window.crypto.randomUUID()
      : `nexus-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    registrationType,
    playerName,
    email,
    tournament: selectedTournament.game,
    teamName: registrationType === "Team" ? teamName : "",
    teamSize: registrationType === "Team" ? String(data.get("teamSize")) : "",
    teammates: registrationType === "Team"
      ? String(data.get("teammates") || "").trim()
      : "",
    notes: String(data.get("notes") || "").trim(),
    createdAt: new Date().toISOString()
  };

  if (!saveRegistrations([...records, record])) {
    showFormMessage(
      "This browser could not save the demo entry. Storage may be disabled or full.",
      true
    );
    return;
  }

  form.reset();
  updateRegistrationFields();
  renderRegistrationTable();
  showFormMessage(
    "Demo entry saved in this browser only. It has NOT been sent to an organizer."
  );
}

function csvSafe(value) {
  let text = String(value ?? "");

  // Prefix risky leading characters to reduce spreadsheet formula execution risk.
  if (/^[\s]*[=+\-@]/.test(text)) {
    text = "'" + text;
  }

  return `"${text.replace(/"/g, '""')}"`;
}

function exportRegistrations() {
  const records = safeReadRegistrations();

  if (records.length === 0) {
    showFormMessage("There are no local demo entries to export.", true);
    return;
  }

  const headers = [
    "Registration Type", "Player/Captain", "Email", "Tournament",
    "Team Name", "Team Size", "Teammates", "Notes", "Date Saved"
  ];

  const rows = records.map((record) => [
    record.registrationType,
    record.playerName,
    record.email,
    record.tournament,
    record.teamName,
    record.teamSize,
    record.teammates,
    record.notes,
    record.createdAt
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map(csvSafe).join(","))
    .join("\r\n");

  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "nexus-demo-registrations.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function clearRegistrations() {
  const records = safeReadRegistrations();

  if (records.length === 0) {
    showFormMessage("There are no local demo entries to clear.", true);
    return;
  }

  const confirmed = window.confirm(
    "Delete all NEXUS demo registrations saved in this browser? This cannot be undone."
  );

  if (!confirmed) return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    renderRegistrationTable();
    showFormMessage("Local demo entries were cleared.");
  } catch (error) {
    showFormMessage("The browser could not clear local storage.", true);
  }
}

function setupMobileNavigation() {
  const toggle = $("#menuToggle");
  const nav = $("#navLinks");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

function setupScrollReveals() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

function setupEventListeners() {
  $("#gameSearch").addEventListener("input", renderTournamentCards);
  $("#gameFilter").addEventListener("change", renderTournamentCards);
  $("#categoryFilter").addEventListener("change", renderTournamentCards);
  $("#prizeFilter").addEventListener("change", renderTournamentCards);

  $("#resetFilters").addEventListener("click", () => {
    $("#gameSearch").value = "";
    $("#gameFilter").value = "all";
    $("#categoryFilter").value = "all";
    $("#prizeFilter").value = "0";
    renderTournamentCards();
  });

  $("#tournamentGrid").addEventListener("click", (event) => {
    const link = event.target.closest("[data-tournament]");
    if (!link) return;

    const game = link.dataset.tournament;
    $("#tournamentSelect").value = game;
  });

  $("#registrationType").addEventListener("change", updateRegistrationFields);
  $("#registrationForm").addEventListener("submit", handleRegistration);
  $("#exportCsv").addEventListener("click", exportRegistrations);
  $("#clearRegistrations").addEventListener("click", clearRegistrations);
}

function initNexus() {
  populateTournamentSelect();
  renderTournamentCards();
  renderLeaderboard();
  renderRegistrationTable();
  updateRegistrationFields();
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
  setupMobileNavigation();
  setupScrollReveals();
  setupEventListeners();
}

document.addEventListener("DOMContentLoaded", initNexus);