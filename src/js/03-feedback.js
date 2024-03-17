import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('.feedback-form input[name="email"]'),
  messageInput: document.querySelector(
    '.feedback-form textarea[name="message"]'
  ),
};

const LOCAL_STORAGE_KEY = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? {};

refs.feedbackForm.addEventListener('submit', onFormSubmit);
refs.feedbackForm.addEventListener('input', throttle(onFormInput, 500));

populateData();

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  formData.email = '';
  formData.message = '';
}

function populateData() {
  const savedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedFormData) {
    const parsedFormData = JSON.parse(savedFormData);
    refs.emailInput.value = parsedFormData.email || '';
    refs.messageInput.value = parsedFormData.message || '';
  }
}
