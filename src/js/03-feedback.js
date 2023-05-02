import _throttle from 'lodash.throttle';
const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formValue = {};

loadForm();

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', _throttle(onFormInput, 500));

function onFormInput(evt) {
  formValue = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  formValue[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formValue));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (!evt.target.email.value || !evt.target.message.value) {
    alert('Please, enter all data!');
    return;
  }
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formValue);
}

function loadForm() {
  let savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!savedForm) {
    return;
  }

  formEl.email.value = savedForm.email || '';
  formEl.message.value = savedForm.message || '';
}
