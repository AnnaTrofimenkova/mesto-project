

export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.handleOver = this.handleOver.bind(this);

    this.closeButton = this._popup.querySelector('.popup__close-icon');
    this.setCloseEventListeners();
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this.handleOver);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this.handleOver);
  }

  setCloseEventListeners() {
    this.closeButton.addEventListener('click', this.closePopup.bind(this));
  }

  // клик по overlay
  handleOver(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.closePopup(evt.target);
    }
  }

  //клик по esc
  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      const openedPopup = document.querySelector(".popup_opened")
      if (openedPopup) {
        this.closePopup(openedPopup);
      }
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup_opened")) {
          this.closePopup();
      }
    })
  }

}

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this.popupCardTitle = document.querySelector(".popup-photo-card__title");
    this.popupCardPhoto = document.querySelector(".popup-photo-card__photo");
  }

  // тут что-то типа эдд нью фото кард из класса кард
  openPopup(name, link) {
    this.popupCardTitle.textContent = name;
    this.popupCardPhoto.src = link;
    this.popupCardPhoto.alt = name;
    super.openPopup();
  }
}

export class PopupWithForm extends Popup {
  constructor(selector, submitFormCallback) {
    super(selector);
    this._buttonSubmit = this._popup.querySelector('.popup__button');
    this.popupForm = this._popup.querySelector('.popup__form');
    this.submitFormCallback = submitFormCallback;
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

  closePopup() {
    super.closePopup();
    this.popupForm.reset();
  }

  resetValidation() {
    console.log("'hdfjkdkf");
   this._formValidator.enableValidation();
  }

  _getInputValues() {
		const inputs = this.popupForm.querySelectorAll('.popup__input');
		const inputValues = {};

		inputs.forEach(input => {
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
