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
    // this.closeButton.addEventListener('click', callbackFunc);
  }

  // клик по overlay
  handleOver(evt) {
    if (evt.target.classList.contains('popup')) {
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

}

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
  }

  // тут что-то типа эдд нью фото кард из класса кард
  openPopup(name, link) {
    this._selector.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this.handleOver);
  }
}

export class PopupWithForm extends Popup {
  constructor(selector) {
    super(selector);
    this._buttonSubmit = this._popup.querySelector('.popup__button');
  }

  setSubmitButtonText(text) {
    this._buttonSubmit.textContent = text;
  }

  setInputValue(inputSelector, value) {
    const input = this._popup.querySelector(inputSelector);
    input.value = value;
  }

  getInputValue(inputSelector) {
    return this._popup.querySelector(inputSelector).value;
  }

  setSubmitEventListener(listenerFunction) {
    this._buttonSubmit.addEventListener('click', listenerFunction);
  }
}
