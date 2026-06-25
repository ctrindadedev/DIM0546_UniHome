const API_URL = "http://localhost:3001/api/properties";

const STATIC_PROPERTIES = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80",
    price: 1800,
    address: "Vila Mariana, São Paulo",
    beds: 2,
    baths: 1,
    rating: 4.8,
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80",
    price: 1200,
    address: "Butantã – 600m USP",
    beds: 1,
    baths: 1,
    rating: 4.5,
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&q=80",
    price: 2300,
    address: "Pinheiros",
    beds: 3,
    baths: 2,
    rating: 4.9,
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80",
    price: 950,
    address: "República – Centro",
    beds: 1,
    baths: 1,
    rating: 4.2,
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=700&q=80",
    price: 2100,
    address: "Perdizes",
    beds: 2,
    baths: 2,
    rating: 4.7,
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=80",
    price: 1650,
    address: "Vila Madalena",
    beds: 2,
    baths: 1,
    rating: 4.6,
  },
];

function renderCard(p) {
  const beds = p.beds ?? 0;
  const baths = p.baths ?? "–";
  const rating = p.rating ? `<span class="rating">⭐ ${p.rating}/5</span>` : "";
  const img = p.img
    ? `<img class="property-img" src="${p.img}" alt="Imóvel"/>`
    : `<div class="property-img" style="background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-size:40px">🏠</div>`;

  return `
    <div class="property-card">
      ${img}
      <div class="property-body">
        <div class="property-price">R$ ${Number(p.price).toLocaleString("pt-BR")} <small>/mês</small></div>
        <div class="property-addr">📍 ${p.address}</div>
        <div class="property-meta">
          <span>🛏️ ${beds} quarto${beds !== 1 ? "s" : ""}</span>
          ${baths !== "–" ? `<span>🚿 ${baths} banheiro${baths !== 1 ? "s" : ""}</span>` : ""}
          ${rating}
        </div>
        <button class="btn btn-primary btn-block" data-property-detail="${p.id}">Ver Detalhes</button>
      </div>
    </div>
  `;
}

function renderGrid(properties) {
  const grid = document.getElementById("properties");
  if (!grid) return;
  grid.innerHTML = properties.map(renderCard).join("");
  bindDetailButtons();
}

function renderError(message) {
  const grid = document.getElementById("properties");
  if (!grid) return;
  grid.innerHTML = `<p style="color:var(--muted);grid-column:1/-1">${message}</p>`;
}

async function loadProperties() {
  try {
    const res = await fetch(API_URL);
    const { data } = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      renderGrid(STATIC_PROPERTIES);
    } else {
      renderGrid(data);
    }
  } catch (err) {
    console.error("[imoveis] erro ao buscar da API, usando dados estáticos:", err);
    renderGrid(STATIC_PROPERTIES);
  }
}

function bindDetailButtons() {
  document.querySelectorAll("[data-property-detail]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = btn.dataset.propertyDetail;
      const originalText = btn.textContent;
      btn.textContent = "Buscando...";

      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (res.status === 404) {
          alert("Este imóvel não está cadastrado no banco de dados.");
        } else if (!res.ok) {
          alert("Não foi possível conectar à API.");
        } else {
          const { data } = await res.json();
          alert(`${data.title}\n📍 ${data.address}\nR$ ${Number(data.price).toLocaleString("pt-BR")}/mês`);
        }
      } catch {
        alert("Não foi possível conectar à API.");
      } finally {
        btn.textContent = originalText;
      }
    });
  });
}

document.querySelectorAll("[data-filter-apply]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.textContent = "Filtrando...";
    setTimeout(() => (btn.textContent = "Aplicar Filtros"), 600);
  });
});

loadProperties();
