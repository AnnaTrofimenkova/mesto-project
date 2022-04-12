
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
const myID = "386333379b5bc17b5d067749"
const inputName = document.querySelector('#name');
const inputProfession = document.querySelector('#profession');
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
  elementCard.querySelector('.element__title').textContent = item.name;
  elementCard.querySelector('.element__count-likes').textContent = item.likes;// 5 месяц лайки
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardImage.addEventListener('click', () => {
    addNewPhotoCard(item.name, item.link);
  });
  elementCard.querySelector('.element__like').addEventListener('click', function (evt) {
    getCard(item)
      .then(() => {
        let findId = item._id;
        if (evt.target.classList.contains('element__like_active')) {
          console.log("хочу удалить лайк")
          delLike(findId)
            .then((data) => {
              elementCard.querySelector('.element__count-likes').textContent = data.likes.length//выводит новое значения лайка
            })
            .catch((err) => {
              console.log(err);
            });
        }
        else {
          console.log("хочу поставить лайк")
          editLike(findId)
            .then((data) => {
              elementCard.querySelector('.element__count-likes').textContent = data.likes.length//выводит новое значения лайка
            })
            .catch((err) => {
              console.log(err);
            });
        };
        evt.target.classList.toggle('element__like_active');
      })
      .catch((err) => {
        console.log(err);
      })
  });
  if (item.owner._id === userID.id) {
    elementCard.querySelector('.element__tresh').addEventListener('click', (evt) => {
      deleteCard(item._id)
        .then(() => {
          removeCard(evt)
        })
    });
  } else {
    elementCard.querySelector('.element__tresh').classList.add("element__tresh-nonActive");// удалить значек мусорник
  }
  // функция удаления по мусорнику в создании новой карточки
  return elementCard;
}
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
  let objForCard = {
    name: inputNameNewCard.value,
    link: inputLink.value
  }
  //console.log(item)
  addCard(objForCard)
    .then((data) => {
      addNewCard(data); //Добавление в DOM
      closePopup(popupNewCard);
      popupFormNewCard.reset();
      buttonSubmitId.textContent = "Сохранить";
      toggleButtonState(buttonSubmitId, false, validationConfig.inactiveButtonClass);
      //document.querySelector('.element__tresh').classList.remove("element__tresh-nonActive");//точно?
    })
    .catch((err) => {
      console.log(err);
    });
};
//редактирование значения в попапе
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  buttonSubmit.textContent = "Сохранение...";
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputProfession.value;
  let objForPrifile = {
    name: profileTitle.textContent,
    about: profileSubtitle.textContent
  }
  editName(objForPrifile)
    .then(() => {
      closePopup(popupProfile)
      buttonSubmit.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });;
};
//редактирование аватарки
export function handleAvaFormSubmit(evt) {
  evt.preventDefault();
  buttonSubmitAva.textContent = "Сохранение...";
  let objForAva = {
    avatar: inputAvatar.value,
  }
  editAva(objForAva)
    .then((data) => {
      closePopup(popupAvatar)
      profileAvatar.src = data.avatar;
      buttonSubmitAva.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });;
};
//console.log(buttonSubmit);




























