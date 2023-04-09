import throttle from 'lodash.throttle';

import "../css/common.css";
import "../css/03-feedback.css"

const LOCALSTORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".js-feedback-form");
const textarea = document.querySelector("textarea");
const input = document.querySelector("input");

const formData = {
  email: '',
  message: ''
};

populateTextareaEmail();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', onFormInput);
textarea.addEventListener('input', throttle(onTextareaInput, 500));
input.addEventListener('input', throttle(onInput, 500));

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    console.log("Please fill in all fields");
    return;
  }

  console.log("send form");
  event.target.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  console.log(formData);
}

function onTextareaInput(event) {
  const message = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ ...formData, message }));
  console.log(message);
}

function onInput(event) {
  const email = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ ...formData, email }));
  console.log(email);
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
}

function populateTextareaEmail() {
  const savedState = localStorage.getItem(LOCALSTORAGE_KEY);

  if (savedState) {
    try {
      const { email, message } = JSON.parse(savedState);

      if (email) {
        input.value = email;
        formData.email = email;
      }

      if (message) {
        textarea.value = message;
        formData.message = message;
      }

    } catch (error) {
      console.error(error);
      // handle error
    }
  }
}
