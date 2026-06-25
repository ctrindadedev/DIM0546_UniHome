import { UsersApi } from "../shared/api/users.api.js";

const form = document.getElementById("profile-form");
const statusEl = document.getElementById("profile-status");
const saveButton = document.querySelector("[data-save-profile]");
const resetButton = document.querySelector("[data-reset-profile]");
const summaryTags = document.querySelector("[data-summary-tags]");
const labels = {
  sleepTime: {
    "antes-22": "Dorme cedo",
    "22-00": "Dorme até meia-noite",
    "00-02": "Dorme tarde",
    "depois-02": "Madrugada",
  },
  wakeTime: {
    "antes-7": "Acorda cedo",
    "7-9": "Acorda pela manhã",
    "9-11": "Acorda mais tarde",
    "depois-11": "Rotina tardia",
  },
  studyRoutine: {
    manha: "Estuda de manhã",
    tarde: "Estuda à tarde",
    noite: "Estuda à noite",
    flexivel: "Rotina flexível",
  },
};

function setStatus(message, type = "neutral") {
  statusEl.textContent = message;
  statusEl.dataset.type = type;
}

function setSaving(isSaving) {
  saveButton.disabled = isSaving;
  resetButton.disabled = isSaving;
  saveButton.textContent = isSaving ? "Salvando..." : "Salvar Perfil";
}

function setField(name, value) {
  const field = form.elements[name];
  if (!field) return;

  if (field.type === "checkbox") {
    field.checked = Boolean(value);
    return;
  }

  field.value = value ?? "";
}

function updateSliderOutputs() {
  form.querySelectorAll(".slider").forEach((slider) => {
    const out = document.querySelector(`[data-output="${slider.name}"]`);
    if (out) out.textContent = slider.value;
  });
}

function renderSummary(user) {
  const profile = user.profile ?? {};
  const avatarUrl = user.avatarUrl || "https://i.pravatar.cc/200?img=12";

  document.querySelector("[data-summary-name]").textContent = user.name;
  document.querySelector("[data-summary-course]").textContent = `${user.course} · ${user.university}`;
  document.querySelector("[data-summary-clean]").textContent = profile.cleanlinessLevel ?? "-";
  document.querySelector("[data-summary-noise]").textContent = profile.noiseToleranceLevel ?? "-";
  document.querySelector("[data-summary-social]").textContent = profile.socialLevel ?? "-";
  document.querySelectorAll("[data-photo-preview], [data-avatar-preview]").forEach((img) => {
    img.src = avatarUrl;
  });

  const tags = [
    labels.studyRoutine[profile.studyRoutine],
    labels.sleepTime[profile.sleepTime],
    labels.wakeTime[profile.wakeTime],
    profile.acceptsPets ? "Aceita pets" : "Sem pets",
    profile.neighborhood,
  ].filter(Boolean);

  summaryTags.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
}

function fillForm(user) {
  const profile = user.profile ?? {};

  setField("name", user.name);
  setField("email", user.email);
  setField("phone", user.phone);
  setField("avatarUrl", user.avatarUrl);
  setField("university", user.university);
  setField("course", user.course);
  setField("semester", user.semester);
  setField("bio", user.bio);
  setField("cleanlinessLevel", profile.cleanlinessLevel ?? 4);
  setField("noiseToleranceLevel", profile.noiseToleranceLevel ?? 3);
  setField("socialLevel", profile.socialLevel ?? 3);
  setField("sleepTime", profile.sleepTime ?? "22-00");
  setField("wakeTime", profile.wakeTime ?? "antes-7");
  setField("studyRoutine", profile.studyRoutine ?? "noite");
  setField("acceptsPets", profile.acceptsPets);
  setField("hasPets", profile.hasPets);
  setField("budgetMin", profile.budgetMin ?? 0);
  setField("budgetMax", profile.budgetMax ?? 0);
  setField("neighborhood", profile.neighborhood);
  updateSliderOutputs();
  renderSummary(user);
}

function getFormData() {
  const data = new FormData(form);

  return {
    name: data.get("name").trim(),
    email: data.get("email").trim(),
    phone: data.get("phone").trim() || null,
    avatarUrl: data.get("avatarUrl").trim() || null,
    university: data.get("university"),
    course: data.get("course").trim(),
    semester: data.get("semester"),
    bio: data.get("bio").trim(),
    profile: {
      cleanlinessLevel: Number(data.get("cleanlinessLevel")),
      noiseToleranceLevel: Number(data.get("noiseToleranceLevel")),
      socialLevel: Number(data.get("socialLevel")),
      sleepTime: data.get("sleepTime"),
      wakeTime: data.get("wakeTime"),
      studyRoutine: data.get("studyRoutine"),
      acceptsPets: data.has("acceptsPets"),
      hasPets: data.has("hasPets"),
      budgetMin: Number(data.get("budgetMin")),
      budgetMax: Number(data.get("budgetMax")),
      neighborhood: data.get("neighborhood").trim(),
    },
  };
}

async function loadProfile() {
  try {
    setStatus("Carregando perfil...");
    const response = await UsersApi.getMe();
    fillForm(response.data);
    setStatus("Perfil carregado", "success");
  } catch (error) {
    setStatus("Não foi possível carregar o perfil", "error");
  }
}

form.querySelectorAll(".slider").forEach((slider) => {
  slider.addEventListener("input", updateSliderOutputs);
});

form.addEventListener("input", () => {
  updateSliderOutputs();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const payload = getFormData();

  if (payload.profile.budgetMax < payload.profile.budgetMin) {
    setStatus("Revise o orçamento informado", "error");
    form.elements.budgetMax.focus();
    return;
  }

  try {
    setSaving(true);
    setStatus("Salvando perfil...");
    const response = await UsersApi.updateMe(payload);
    fillForm(response.data);
    setStatus("Perfil salvo", "success");
  } catch (error) {
    const message = error.data?.error?.message || "Não foi possível salvar o perfil";
    setStatus(message, "error");
  } finally {
    setSaving(false);
  }
});

resetButton.addEventListener("click", loadProfile);

loadProfile();
