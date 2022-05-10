



//константы СОЗДАНИЯ новой карточки
const elementThere = document.querySelector('#element-template').content;//их версия

// константы добавления новой карточки

export const inputName = document.querySelector('#name');
export const inputProfession = document.querySelector('#profession');


export class Card {
  constructor({ cardItem, handleCardClick, handleLikeClick, handleDeleteIconClick, handleButtonLike  }, templateSelector) {

    this.data = cardItem;
    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteIconClick = handleDeleteIconClick;
    this.handleButtonLike = handleButtonLike;
    this._templateSelector = templateSelector;

  }


  //функция СОЗДАНИЯ новой карточки
  createDOMCard() {
    const elementCard = elementThere.querySelector(this._templateSelector).cloneNode(true);
    const cardImage = elementCard.querySelector('.element__photo');
    const countLikes = elementCard.querySelector('.element__count-likes');
    const buttonLikes = elementCard.querySelector('.element__like');
    elementCard.querySelector('.element__title').textContent = this.data.name;
    countLikes.textContent = this.data.likes.length;// 5 месяц лайки
    cardImage.src = this.data.link;
    cardImage.alt = this.data.name;
    cardImage.addEventListener('click', this.handleCardClick);
    buttonLikes.addEventListener('click', (evt) => {
      this.handleLikeClick(evt, this.data, countLikes);
    });
    this.handleDeleteIconClick(elementCard, this._removeCardFromDOM);

    this.handleButtonLike(() => {
     buttonLikes.classList.add('element__like_active');
    })


    // функция удаления по мусорнику в создании новой карточки
    return elementCard;
  }

  //функция удаления карточки
  _removeCardFromDOM(evt) {
    const target = evt.target;
    target.closest('.element').remove()
  }

}






