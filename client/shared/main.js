// Dropdown do Avatar
document.addEventListener("click", (e) => {
  const avatar = e.target.closest("[data-avatar-toggle]");
  const dropdown = document.getElementById("user-dropdown");
  if (!dropdown) return;
  if (avatar) {
    dropdown.classList.toggle("show");
  } else if (!e.target.closest("#user-dropdown")) {
    dropdown.classList.remove("show");
  }
});

// Menu Mobile
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-menu-toggle]")) {
    document.querySelector(".sidebar")?.classList.toggle("open");
  } else if (
    !e.target.closest(".sidebar") &&
    !e.target.closest("[data-menu-toggle]")
  ) {
    document.querySelector(".sidebar")?.classList.remove("open");
  }
});
