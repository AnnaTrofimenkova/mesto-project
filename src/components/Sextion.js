import { Card } from './Card.js'
import { api } from './Api.js'

export class Sextion { // Sextion)::;))))//
  constructor(cards, selector, user, popupNewCard) {
    this.cards = cards;
    this.elements = document.querySelector(selector);
    this.user = user;
    this.popupNewCard = popupNewCard;
  }

  renderer() {
    this.cards.forEach(card => {
      this.addItem(card);
    })
  }

  // функция добавления новой карточки
  addItem(item) {
    const card = new Card(item, '.element', this.user);
    const cardElement = card.createDOMCard();
    this.elements.prepend(cardElement);
  };


  //добавление карточки по клику
  addNewCard(evt) {
    evt.preventDefault();

    this.popupNewCard.setSubmitButtonText("Сохранение...");
    const objForCard = {
      name: this.popupNewCard.getInputValue('#name-new-card'),
      link: this.popupNewCard.getInputValue('#link-new-card')
    }

    api.addCard(objForCard)
      .then((newCard) => {
        this.addItem(newCard); //Добавление в DOM
        this.popupNewCard.closePopup();
        this.popupNewCard.resetForm();
        this.popupNewCard.resetValidation();
        this.popupNewCard.setSubmitButtonText("Сохранить");
      })
      .finally(() => this.popupNewCard.setSubmitButtonText("Сохранить"))
      .catch((err) => {
        console.log(err);
      });
  };
}
