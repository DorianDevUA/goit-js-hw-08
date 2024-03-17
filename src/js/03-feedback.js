import throttle from 'lodash.throttle';
const LOCALSTORAGE_KEY = 'feedback-form-state';

const feedbackForm = document.querySelector('.feedback-form');

initForm();

feedbackForm.addEventListener('input', throttle(onInputForm, 500));
feedbackForm.addEventListener('submit', onSubmitForm);

function initForm() {
  let savedFormData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedFormData) {
    savedFormData = JSON.parse(savedFormData);
    Object.entries(savedFormData).forEach(([name, value]) => {
      feedbackForm.elements[name].value = value;
    });
  }
}

function onInputForm(evt) {
  let savedFormData = localStorage.getItem(LOCALSTORAGE_KEY);
  savedFormData = JSON.parse(savedFormData) ?? {};
  savedFormData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(savedFormData));
}

function onSubmitForm(evt) {
  evt.preventDefault();
  console.log(
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) ??
      'localStorage is empty'
  );
  localStorage.removeItem(LOCALSTORAGE_KEY);
  evt.currentTarget.reset();
}
