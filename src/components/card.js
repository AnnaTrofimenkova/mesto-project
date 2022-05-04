
import { PopupWithImage } from './Popup'
import { api } from './Api.js'


//константы СОЗДАНИЯ новой карточки
const elementThere = document.querySelector('#element-template').content;//их версия

// константы добавления новой карточки

export const inputName = document.querySelector('#name');
export const inputProfession = document.querySelector('#profession');



export class Card {
  constructor(data, templateSelector, user) {

    this.data = data;
    this._templateSelector = templateSelector;
    this._popup = new PopupWithImage('.popup-photo-card');
    this.user = user;
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
    cardImage.addEventListener('click', () => {
      this._addNewPhotoCard();
    });
    buttonLikes.addEventListener('click', (evt) => {
      this._toggleLike(evt, this.data, countLikes);
    });
    if (this.data.owner._id === this.user._id) {
      elementCard.querySelector('.element__tresh').addEventListener('click', (evt) => {
        api.deleteCard(this.data._id)
          .then(() => {
            this._removeCardFromDOM(evt)
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      elementCard.querySelector('.element__tresh').classList.add("element__tresh-nonActive");// удалить значек мусорник
    }
    if (this.data.likes.find((like) => like._id === this.user._id) ? true : false) {
      buttonLikes.classList.add('element__like_active');
    };

    // функция удаления по мусорнику в создании новой карточки
    return elementCard;
  }

  //функция удаления карточки
  _removeCardFromDOM(evt) {
    const target = evt.target;
    target.closest('.element').remove()
  }


  _toggleLike(evt, item, countLikes) {
    if (item.likes.find((like) => like._id === this.user._id) ? true : false) {
      console.log("хочу удалить лайк")
      api.delLike(item._id)
        .then((data) => {
          countLikes.textContent = data.likes.length//выводит новое значения лайка
          item.likes = data.likes;
          evt.target.classList.remove('element__like_active');

        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      console.log("хочу поставить лайк")
      api.editLike(item._id)
        .then((data) => {
          countLikes.textContent = data.likes.length//выводит новое значения лайка
          item.likes = data.likes;
          evt.target.classList.add('element__like_active');
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  // функция добавления большой картинки
  _addNewPhotoCard() {
    this._popup.openPopup(this.data.name, this.data.link);
  }

}






