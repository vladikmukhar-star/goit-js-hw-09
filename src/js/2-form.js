const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email ? parsedData.email.trim() : '';
    formData.message = parsedData.message ? parsedData.message.trim() : '';

    if (form.elements.email) form.elements.email.value = formData.email;
    if (form.elements.message) form.elements.message.value = formData.message;
  } catch (error) {
    console.error('Помилка парсингу JSON з localStorage:', error);
  }
}

form.addEventListener('input', event => {
  const target = event.target;

  if (target.name === 'email' || target.name === 'message') {
    formData[target.name] = target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ ...formData });

  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
});