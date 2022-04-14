
import { toggleButtonState, validationConfig } from './validate'
import { openPopup, closePopup } from './modal.js'
import { popBigPhotoCard, popupProfile, popupNewCard, profileTitle, profileSubtitle, popupFormNewCard, popupAvatar, profileAvatar, userID } from '../index.js'
import { editName, addCard, deleteCard, getCard, editLike, delLike, editAva } from './api.js'
// константы аватара
const inputAvatar = document.querySelector('#link-new-avatar');
const buttonSubmitAva = document.querySelector("#popup__button_new_avatar")
// константы добавления большой картинки
const titleBigPhotoCard = document.querySelector(".popup-photo-card__title");
const photoBigPhotoCard = document.querySelector(".popup-photo-card__photo");
//константы СОЗДАНИЯ новой карточки
const elementThere = document.querySelector('#element-template').content;//их версия

// константы добавления новой карточки
const elements = document.querySelector('.elements');
const buttonSubmit = document.querySelector('.popup__button');
const buttonSubmitId = document.querySelector('#popup__button_new_card');
// константы добавления карточки по клику
const inputNameNewCard = document.querySelector('#name-new-card');
const inputLink = document.querySelector('#link-new-card');
export const inputName = document.querySelector('#name');
export const inputProfession = document.querySelector('#profession');
// функция добавления большой картинки
function addNewPhotoCard(name, link) {
  titleBigPhotoCard.textContent = name;
  photoBigPhotoCard.src = link;
  photoBigPhotoCard.alt = name;
  openPopup(popBigPhotoCard);
};
//функция СОЗДАНИЯ новой карточки
function createCard(item) {
  const elementCard = elementThere.querySelector('.element').cloneNode(true);
  const cardImage = elementCard.querySelector('.element__photo');
  const countLikes = elementCard.querySelector('.element__count-likes');
  const buttonLikes = elementCard.querySelector('.element__like');
  elementCard.querySelector('.element__title').textContent = item.name;
  countLikes.textContent = item.likes.length;// 5 месяц лайки
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardImage.addEventListener('click', () => {
    addNewPhotoCard(item.name, item.link);
  });
  buttonLikes.addEventListener('click', function (evt) {
    toggleLike(evt, item, countLikes);
  });
  if (item.owner._id === userID.id) {
    elementCard.querySelector('.element__tresh').addEventListener('click', (evt) => {
      deleteCard(item._id)
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
  if (item.likes.find((like) => like._id === userID.id) ? true : false) {
    buttonLikes.classList.add('element__like_active');
  };

  // функция удаления по мусорнику в создании новой карточки
  return elementCard;
}

// функция добавления и убирания лайка

function toggleLike(evt, item, countLikes) {
  if (item.likes.find((like) => like._id === userID.id) ? true : false) {
    console.log("хочу удалить лайк")
    delLike(item._id)
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
    editLike(item._id)
      .then((data) => {
        countLikes.textContent = data.likes.length//выводит новое значения лайка
        item.likes = data.likes;
        evt.target.classList.add('element__like_active');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};



//функция удаления карточки
function removeCard(evt) {
  const target = evt.target;
  target.closest('.element').remove()
}
// функция добавления новой карточки
export function addNewCard(item) {
  const elementCard = createCard(item);
  elements.prepend(elementCard);
};
//добавление карточки по клику
export function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  buttonSubmitId.textContent = "Сохранение...";
  const objForCard = {
    name: inputNameNewCard.value,
    link: inputLink.value
  }

  addCard(objForCard)
    .then((data) => {
      addNewCard(data); //Добавление в DOM
      closePopup(popupNewCard);
      popupFormNewCard.reset();
      toggleButtonState(buttonSubmitId, false, validationConfig.inactiveButtonClass);
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
  editName(objForPrifile)
    .then(() => {
      closePopup(popupProfile)
      profileTitle.textContent = inputName.value;
      profileSubtitle.textContent = inputProfession.value;
    })
    .finally(() => buttonSubmitId.textContent = "Сохранить")
    .catch((err) => {
      console.log(err);
    });;
};
//редактирование аватарки
export function handleAvaFormSubmit(evt) {
  evt.preventDefault();
  buttonSubmitAva.textContent = "Сохранение...";
  const objForAva = {
    avatar: inputAvatar.value,
  }
  editAva(objForAva)
    .then((data) => {
      closePopup(popupAvatar)
      profileAvatar.src = data.avatar;
    })
    .finally(() => buttonSubmitId.textContent = "Сохранить")
    .catch((err) => {
      console.log(err);
    });;
};





























