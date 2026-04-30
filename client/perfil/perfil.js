// Atualiza o valor visual dos sliders de hábitos em tempo real
document.querySelectorAll(".slider").forEach((slider) => {
  const out = document.querySelector(`[data-output="${slider.id}"]`);
  if (out) {
    const update = () => (out.textContent = slider.value);
    slider.addEventListener("input", update);
    update();
  }
});

// Simula o  submit do formulário de perfil
const profileForm = document.getElementById("profile-form");
if (profileForm) {
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Perfil salvo com sucesso!");
  });
}
