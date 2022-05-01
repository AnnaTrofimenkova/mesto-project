export class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.handleOver = this.handleOver.bind(this);

    this.closeButton = this._selector.querySelector('.popup__close-icon');
    this.setCloseEventListeners();
  }

  openPopup() {
    this._selector.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this.handleOver);
  }

  closePopup() {
    this._selector.classList.remove("popup_opened");
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
