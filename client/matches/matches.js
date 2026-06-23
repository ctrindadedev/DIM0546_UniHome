import { MatchesApi } from "../shared/api/matches.api.js";
import { ApiError } from "../shared/api/api-error.js";

const currentUserId = 1;
const grid = document.getElementById("matches");
const searchInput = document.getElementById("match-search");
const studyRoutineInput = document.getElementById("study-routine");
const acceptsPetsInput = document.getElementById("accepts-pets");
const compatibilityInput = document.getElementById("min-compatibility");
const compatibilityValue = document.getElementById("compatibility-value");
const filterButton = document.querySelector("[data-filter-apply]");

let matches = [];

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function renderMatches(items) {
  if (!items.length) {
    grid.innerHTML = '<p class="match-state">Nenhum colega encontrado.</p>';
    return;
  }

  grid.innerHTML = items
    .map(
      (match) => `
        <article class="match-card">
          <img
            class="match-avatar"
            src="https://i.pravatar.cc/200?img=${match.userId + 20}"
            alt="${escapeHtml(match.name)}"
          />
          <h4>${escapeHtml(match.name)}</h4>
          <div class="course">
            ${escapeHtml(match.course)} · ${escapeHtml(match.university)}
          </div>
          <div class="compat-bar">
            <div
              class="compat-fill"
              style="width: ${match.compatibility}%"
            ></div>
          </div>
          <div class="compat-label">
            Compatibilidade: ${match.compatibility}%
          </div>
          <ul class="match-reasons">
            ${match.reasons
              .slice(0, 3)
              .map((reason) => `<li>${escapeHtml(reason)}</li>`)
              .join("")}
          </ul>
          <div class="match-actions">
            <a
              class="btn btn-outline"
              href="../perfil/perfil.html?userId=${match.userId}"
            >
              Ver Perfil
            </a>
            <button class="btn btn-primary" data-message-user="${match.userId}">
              Mensagem
            </button>
          </div>
        </article>
      `,
    )
    .join("");
}

function applySearch() {
  const term = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const filteredMatches = matches.filter((match) =>
    [match.name, match.course, match.university].some((value) =>
      value.toLocaleLowerCase("pt-BR").includes(term),
    ),
  );

  renderMatches(filteredMatches);
}

function getFilters() {
  return {
    minCompatibility: compatibilityInput.value,
    studyRoutine: studyRoutineInput.value,
    acceptsPets: acceptsPetsInput.value,
  };
}

async function loadMatches() {
  grid.innerHTML = '<p class="match-state">Buscando colegas...</p>';
  filterButton.disabled = true;

  try {
    const response = await MatchesApi.getByUserId(currentUserId, getFilters());
    matches = response.data;
    applySearch();
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.data?.error?.message || error.message
        : "Não foi possível conectar à API.";

    grid.innerHTML = `<p class="match-state match-state-error">${escapeHtml(message)}</p>`;
  } finally {
    filterButton.disabled = false;
  }
}

compatibilityInput.addEventListener("input", () => {
  compatibilityValue.value = `${compatibilityInput.value}%`;
});

filterButton.addEventListener("click", loadMatches);
searchInput.addEventListener("input", applySearch);

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-message-user]");

  if (button) {
    window.alert("Conversa disponível em breve.");
  }
});

loadMatches();
