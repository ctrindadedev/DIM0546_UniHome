
// Avatar dropdown
document.addEventListener('click', (e) => {
  const avatar = e.target.closest('[data-avatar-toggle]');
  const dropdown = document.getElementById('user-dropdown');
  if (!dropdown) return;
  if (avatar) {
    dropdown.classList.toggle('show');
  } else if (!e.target.closest('#user-dropdown')) {
    dropdown.classList.remove('show');
  }
});

// Mobile sidebar toggle
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-menu-toggle]')) {
    document.querySelector('.sidebar')?.classList.toggle('open');
  } else if (!e.target.closest('.sidebar') && !e.target.closest('[data-menu-toggle]')) {
    document.querySelector('.sidebar')?.classList.remove('open');
  }
});

// Habit sliders live value
document.querySelectorAll('.slider').forEach(slider => {
  const out = document.querySelector(`[data-output="${slider.id}"]`);
  if (out) {
    const update = () => out.textContent = slider.value;
    slider.addEventListener('input', update);
    update();
  }
});

// Profile form fake submit
const profileForm = document.getElementById('profile-form');
if (profileForm) {
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Perfil salvo com sucesso! 🎉');
  });
}

// Filter "apply" demo
document.querySelectorAll('[data-filter-apply]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.textContent = 'Filtrando...';
    setTimeout(() => btn.textContent = 'Aplicar Filtros', 600);
  });
});
