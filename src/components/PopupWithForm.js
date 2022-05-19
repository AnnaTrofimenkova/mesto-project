

import { Popup } from './Popup'

export class PopupWithForm extends Popup {
  constructor(selector, submitFormCallback) {
    super(selector);
    this._buttonSubmit = this._popup.querySelector('.popup__button');
    this.popupForm = this._popup.querySelector('.popup__form');
    this.submitFormCallback = submitFormCallback;
    this.inputs = this.popupForm.querySelectorAll('.popup__input');
  }


  closePopup() {
    super.closePopup();

    if (this._formValidator) {
      this._formValidator.resetInputs();
      this._formValidator.toggleButtonState(false);
    }
  }

  setFormValidator(formValidator) {
    this._formValidator = formValidator;
  }

  setSubmitButtonText(text) {
    this._buttonSubmit.textContent = text;
  }

  setInputValue(inputSelector, value) {
    const input = this._popup.querySelector(inputSelector);
    input.value = value;
  }

  setSubmitEventListener(listenerFunction) {
    this._buttonSubmit.addEventListener('click', listenerFunction);
  }


  _getInputValues() {

    const inputValues = {};

    this.inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submitFormCallback(this._getInputValues());
    })
  }
}
