const matches = [
  { img: 32, name: "Mariana Souza", course: "Engenharia – USP", pct: 95 },
  { img: 45, name: "Pedro Lima", course: "Direito – Mackenzie", pct: 88 },
  { img: 23, name: "Ana Carolina", course: "Medicina – Unifesp", pct: 82 },
  { img: 7, name: "Rafael Costa", course: "Arquitetura – USP", pct: 79 },
  { img: 49, name: "Júlia Mendes", course: "Psicologia – PUC", pct: 76 },
  { img: 60, name: "Bruno Alves", course: "Computação – Unicamp", pct: 73 },
];

const grid = document.getElementById("matches");

if (grid) {
  grid.innerHTML = matches
    .map(
      (m) => `
    <div class="match-card">
      <img class="match-avatar" src="https://i.pravatar.cc/200?img=${m.img}" alt="${m.name}"/>
      <h4>${m.name}</h4>
      <div class="course">${m.course}</div>
      <div class="compat-bar">
        <div class="compat-fill" style="width:${m.pct}%"></div>
      </div>
      <div class="compat-label">Compatibilidade: ${m.pct}%</div>
      <div class="match-actions">
        <button class="btn btn-outline">Ver Perfil</button>
        <button class="btn btn-primary">Mensagem</button>
      </div>
    </div>
  `,
    )
    .join("");
}

// Filtro simulado
document.querySelectorAll("[data-filter-apply]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.textContent = "Filtrando...";
    setTimeout(() => (btn.textContent = "Aplicar Filtros"), 600);
  });
});
