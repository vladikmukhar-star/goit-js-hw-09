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

    formState.email = parsedData.email ? parsedData.email.trim() : '';
    formState.message = parsedData.message ? parsedData.message.trim() : '';

    form.elements.email.value = formState.email;
    form.elements.message.value = formState.message;
  } catch (error) {
    console.error('Помилка парсингу JSON з localStorage:', error);
  }
}

form.addEventListener('input', event => {
  const target = event.target;

  if (target.name === 'email' || target.name === 'message') {
    formState[target.name] = target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formState.email || !formState.message){
    alert('Fill please all fields');
    return;
  }

  console.log({ ...formState });

  localStorage.removeItem(STORAGE_KEY);
  formState.email = '';
  formState.message = '';
  form.reset();
});