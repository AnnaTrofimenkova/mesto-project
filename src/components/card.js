
import { toggleButtonState, validationConfig, FormValidator } from './validate'
import { openPopup, closePopup } from './modal.js'
import { popBigPhotoCard, popupProfile, popupNewCard, profileTitle, profileSubtitle, popupFormNewCard, popupAvatar, profileAvatar, userID } from '../index.js'
import { editName, addCard, deleteCard, getCard, editLike, delLike, editAva, api } from './api.js'


// константы аватара
const inputAvatar = document.querySelector('#link-new-avatar');
const buttonSubmitAva = document.querySelector("#popup__button_new_avatar")
// константы добавления большой картинки
const titleBigPhotoCard = document.querySelector(".popup-photo-card__title");
const photoBigPhotoCard = document.querySelector(".popup-photo-card__photo");
//константы СОЗДАНИЯ новой карточки
const elementThere = document.querySelector('#element-template').content;//их версия

// константы добавления новой карточки
export const elements = document.querySelector('.elements');
const buttonSubmit = document.querySelector('.popup__button');
const buttonSubmitId = document.querySelector('#popup__button_new_card');
// константы добавления карточки по клику
const inputNameNewCard = document.querySelector('#name-new-card');
const inputLink = document.querySelector('#link-new-card');
export const inputName = document.querySelector('#name');
export const inputProfession = document.querySelector('#profession');





//функция удаления карточки
function removeCard(evt) {
  const target = evt.target;
  target.closest('.element').remove()
}
// функция добавления новой карточки
export function addNewCard(item) {
  // const elementCard = createCard(item);
  // elements.prepend(elementCard);
  const card = new Card(item, '.element');
  const cardElement = card.createCard();
  elements.prepend(cardElement);
};
//добавление карточки по клику
export function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  buttonSubmitId.textContent = "Сохранение...";
  const objForCard = {
    name: inputNameNewCard.value,
    link: inputLink.value
  }

  api.addCard(objForCard)
    .then((data) => {
      //console.log(data);
      addNewCard(data); //Добавление в DOM
      const popupNewCard = new Popup('.popup_new-card');
      console.log({ popupNewCard })
      popupNewCard.closePopup();
      popupFormNewCard.reset();
      const formValidator = new FormValidator(popupFormNewCard, validationConfig);
      formValidator.enableValidation();
      //toggleButtonState(buttonSubmitId, false, validationConfig.inactiveButtonClass);
    })
    .finally(() => buttonSubmitId.textContent = "Сохранить")
    .catch((err) => {
      console.log(err);
    });
};
//редактирование значения в попапе
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  buttonSubmit.textContent = "Сохранение...";
  const objForPrifile = {
    name: profileTitle.textContent,
    about: profileSubtitle.textContent
  }
  api.editName(objForPrifile)
    .then(() => {
      closePopup(popupProfile)
      profileTitle.textContent = inputName.value;
      profileSubtitle.textContent = inputProfession.value;
    })
    .finally(() => buttonSubmit.textContent = "Сохранить")
    .catch((err) => {
      console.log(err);
    });
};
//редактирование аватарки
export function handleAvaFormSubmit(evt) {
  evt.preventDefault();
  buttonSubmitAva.textContent = "Сохранение...";
  const objForAva = {
    avatar: inputAvatar.value,
  }
  api.editAva(objForAva)
    .then((data) => {
      closePopup(popupAvatar)
      profileAvatar.src = data.avatar;
    })
    .finally(() => buttonSubmitAva.textContent = "Сохранить")
    .catch((err) => {
      console.log(err);
    });;
};





const popupNewCardtest = document.querySelector('.popup_new-card');


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


export class Card {
  constructor(data, templateSelector) {

    this.data = data;
    this._templateSelector = templateSelector;
    this._popup = new Popup('.popup-photo-card');
  }


  //функция СОЗДАНИЯ новой карточки
  createCard() {
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
    if (this.data.owner._id === userID.id) {
      elementCard.querySelector('.element__tresh').addEventListener('click', (evt) => {
        api.deleteCard(this.data._id)
          .then(() => {
            removeCard(evt)
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      elementCard.querySelector('.element__tresh').classList.add("element__tresh-nonActive");// удалить значек мусорник
    }
    if (this.data.likes.find((like) => like._id === userID.id) ? true : false) {
      buttonLikes.classList.add('element__like_active');
    };

    // функция удаления по мусорнику в создании новой карточки
    return elementCard;
  }


  _toggleLike(evt, item, countLikes) {
    if (item.likes.find((like) => like._id === userID.id) ? true : false) {
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
    titleBigPhotoCard.textContent = this.data.name;
    photoBigPhotoCard.src = this.data.link;
    photoBigPhotoCard.alt = this.data.name;
    this._popup.openPopup();
  }

}






