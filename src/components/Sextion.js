import { Card } from './card.js'

export class Sextion {
  constructor(cards, selector, user) {
    this.cards = cards;
    this.elements = document.querySelector(selector);
    this.user = user;
  }

  renderer() {
    this.cards.forEach(card => {
      this.addItem(card);
    })
  }

  // функция добавления новой карточки
  addItem(item) {
    const card = new Card(item, '.element', this.user);
    const cardElement = card.createCard();
    this.elements.prepend(cardElement);
  };
}
