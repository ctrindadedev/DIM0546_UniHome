const properties = [
  {
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80",
    price: 1800,
    addr: "Vila Mariana, São Paulo",
    beds: 2,
    baths: 1,
    rating: 4.8,
  },
  {
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80",
    price: 1200,
    addr: "Butantã – 600m USP",
    beds: 1,
    baths: 1,
    rating: 4.5,
  },
  {
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&q=80",
    price: 2300,
    addr: "Pinheiros",
    beds: 3,
    baths: 2,
    rating: 4.9,
  },
  {
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80",
    price: 950,
    addr: "República – Centro",
    beds: 1,
    baths: 1,
    rating: 4.2,
  },
  {
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=700&q=80",
    price: 2100,
    addr: "Perdizes",
    beds: 2,
    baths: 2,
    rating: 4.7,
  },
  {
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=80",
    price: 1650,
    addr: "Vila Madalena",
    beds: 2,
    baths: 1,
    rating: 4.6,
  },
];

// Injeção no DOM
const grid = document.getElementById("properties");
if (grid) {
  grid.innerHTML = properties
    .map(
      (p) => `
    <div class="property-card">
      <img class="property-img" src="${p.img}" alt="Imóvel"/>
      <div class="property-body">
        <div class="property-price">R$ ${p.price.toLocaleString("pt-BR")} <small>/mês</small></div>
        <div class="property-addr">📍 ${p.addr}</div>
        <div class="property-meta">
          <span>🛏️ ${p.beds} quarto${p.beds > 1 ? "s" : ""}</span>
          <span>🚿 ${p.baths} banheiro${p.baths > 1 ? "s" : ""}</span>
          <span class="rating">⭐ ${p.rating}/5</span>
        </div>
        <button class="btn btn-primary btn-block">Ver Detalhes</button>
      </div>
    </div>
  `,
    )
    .join("");
}

// Botão de filtro demo
document.querySelectorAll("[data-filter-apply]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.textContent = "Filtrando...";
    setTimeout(() => (btn.textContent = "Aplicar Filtros"), 600);
  });
});
