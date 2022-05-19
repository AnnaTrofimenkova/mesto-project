// //5 мес массовая валидация вэбинар


export class FormValidator {
  constructor(formElement, config) {
    this.config = config;
    this.formElement = formElement;
    this.submitButton = this.formElement.querySelector(this.config.submitButtonSelector);//нахожу свою кнопку сохранить
    this.inputsList = this.formElement.querySelectorAll(this.config.inputSelector);
    this.setEventListers();
  }

  _showError(errorElement, inputElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this.config.inputErrorClass)
  }

  _hideError(errorElement, inputElement) {
    errorElement.textContent = '';
    inputElement.classList.remove(this.config.inputErrorClass)
  }

  resetInputs() {
    this.formElement.reset();
    // сбросить сообщения об ошибках
    this.inputsList.forEach((inputElement) => {
      const errorSpan = this.formElement.querySelector(`.${inputElement.id}-error`);
      this._hideError(errorSpan, inputElement);
    });

  }

  checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);

    if (isInputNotValid) {
      this._showError(errorElement, inputElement);
      this.toggleButtonState(false);
    } else {
      this._hideError(errorElement, inputElement);
      this.toggleButtonState(true);
    }
  }


  toggleButtonState(isActive) {
    if (isActive) {
      this.submitButton.classList.remove(this.config.inactiveButtonClass);
      this.submitButton.disabled = false;
    } else {
      this.submitButton.classList.add(this.config.inactiveButtonClass);
      this.submitButton.disabled = 'disabled';
    }
  }

  setEventListers() {
    Array.from(this.inputsList).forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        const isFormValid = this.formElement.checkValidity();
        this.checkInputValidity(inputElement)
        this.toggleButtonState(isFormValid)
      })
    })
  }


}

export const validationConfig = {
  formSelector: '.popup__form',//ok
  inputSelector: '.popup__input',//ok
  submitButtonSelector: '.popup__button',//ok
  inactiveButtonClass: 'popup__button__submit_inactive',//ok
  inputErrorClass: 'popup__input_type_error',
}

const { inputSelector, ...rest } = validationConfig;


