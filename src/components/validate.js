// //5 мес массовая валидация вэбинар

const showError = (errorElement, inputElement, inputErrorClass) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(inputErrorClass)
}

const hideError = (errorElement, inputElement, inputErrorClass) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.remove(inputErrorClass)
}

const checkInputValidity = (formElement, inputElement, config) => {
  const isInputNotValid = !inputElement.validity.valid;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (isInputNotValid) {
    showError(errorElement, inputElement, config);
  } else {
    hideError(errorElement, inputElement, config);
  }
}

const toggleButtonState = (button, isActive, inactiveButtonClass) => {
  if (isActive) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(inactiveButtonClass);
    button.disabled = 'disabled';
  }
}


const setEventListers = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) => {
  const inputsList = formElement.querySelectorAll(inputSelector);
  const submitButton = formElement.querySelector(submitButtonSelector);


  Array.from(inputsList).forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      const isFormValid = formElement.checkValidity();
      checkInputValidity(formElement, inputElement, inputErrorClass)
      toggleButtonState(submitButton, isFormValid, inactiveButtonClass)
    })
  })

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log('отправка формы');
  })

}


export const enableValidation = ({ formSelector, ...rest }) => {
  const forms = document.querySelectorAll(formSelector);
  Array.from(forms).forEach(formElement => {
    setEventListers(formElement, rest)
  })
}


export const validationConfig = {
  formSelector: '.popup__form',//ok
  inputSelector: '.popup__input',//ok
  submitButtonSelector: '.popup__button',//ok
  inactiveButtonClass: 'popup__button__submit_inactive',//ok
  inputErrorClass: 'popup__input_type_error',
}


const { inputSelector, ...rest } = validationConfig;
console.log(rest);


//enableValidation(validationConfig);


