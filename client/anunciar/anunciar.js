const API_URL = 'http://localhost:3001/api/properties';

const form = document.getElementById('property-form');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');

function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = `feedback ${type}`;
}

function clearErrors() {
  form.querySelectorAll('.field-error').forEach(el => (el.textContent = ''));
  form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
}

function setFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  if (input) input.classList.add('invalid');
  if (error) error.textContent = message;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();
  feedback.className = 'feedback hidden';

  const title = form.title.value.trim();
  const price = parseFloat(form.price.value);
  const beds = parseInt(form.beds.value, 10);
  const address = form.address.value.trim();
  const description = form.description.value.trim();

  let hasError = false;

  if (title.length < 5) {
    setFieldError('title', 'O título precisa ter no mínimo 5 caracteres.');
    hasError = true;
  }
  if (!price || price <= 0) {
    setFieldError('price', 'Informe um valor de aluguel válido.');
    hasError = true;
  }
  if (!beds || beds < 1) {
    setFieldError('beds', 'O imóvel precisa ter pelo menos 1 quarto.');
    hasError = true;
  }
  if (address.length < 10) {
    setFieldError('address', 'Endereço muito curto. Inclua rua, número e bairro.');
    hasError = true;
  }
  if (description.length < 20) {
    setFieldError('description', 'Forneça uma descrição com pelo menos 20 caracteres.');
    hasError = true;
  }

  if (hasError) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Publicando...';

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, price, beds, address, description }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.message || 'Erro ao publicar o anúncio.';
      showFeedback(msg, 'error');
      return;
    }

    showFeedback('Imóvel publicado com sucesso!', 'success');
    form.reset();
  } catch {
    showFeedback('Não foi possível conectar ao servidor. Verifique se ele está rodando.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Publicar Anúncio';
  }
});
