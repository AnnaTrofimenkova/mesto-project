//5 мес массовая валидация

// const showInputError = (formElement, inputElement, errorMessage) => {
//   inputElement.classList.add('popup__input_type_error');
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('popup__input-error_active');
// };

// const hideInputError = (formElement, inputElement) => {
//   inputElement.classList.remove('popup__input_type_error');
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   errorElement.classList.remove('form__input-error_active');
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };


// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add('popup__button__submit_inactive');
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove('popup__button__submit_inactive');
//     buttonElement.disabled = false;
//   }
// };

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const buttonElement = formElement.querySelector('.popup__button');

//   toggleButtonState(inputList, buttonElement);


//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });

//   });
// };

// export function enableValidation() {
//   const formList = Array.from(document.querySelectorAll('.popup__form'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });

//     setEventListeners(formElement);
//   });
// }


// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// export const validationConfig = {
//   formSelector: '.popup__form',// попала
//   inputSelector: '.popup__input',// попала
//   submitButtonSelector: '.popup__button',// попала
//   inactiveButtonClass: 'ppopup__button__submit_inactive',// попала
//   inputErrorClass: 'popup__input_type',
// }


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
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

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
  inputErrorClass: 'popup__input-error_active',
}


const { inputSelector, ...rest } = validationConfig;
console.log(rest);


//enableValidation(validationConfig);


