import { toggleButtonState, validationConfig } from './validate'
import { openPopup, closePopup } from './modal.js'
import { popBigPhotoCard, popupProfile, popupNewCard, profileTitle, profileSubtitle, popupFormNewCard, popupAvatar, profileAvatar } from '../index.js'
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

// массив для шести карточекnp
// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];


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
        let findId = item.id;

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
        editLike(findId)
          .then((data) => {
            elementCard.querySelector('.element__count-likes').textContent = data.likes.length//выводит новое значения лайка
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      })
  });

  getCard(item)
    .then(() => {
      if (item.ownerId == myID) { }
      else {
        elementCard.querySelector('.element__tresh').classList.add("element__tresh-nonActive");// удалить значек мусорник
      }
    })
    .catch((err) => {
      console.log(err);
    });;


  // функция муроски в создании новой карточки
  elementCard.querySelector('.element__tresh').addEventListener('click', (evt) => {
    getCard(item)
      .then(() => {
        let findId = item.id;
        deleteCard(findId)
          .then(() => {
            evt.target.closest('.element').remove();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });


  return elementCard;
}

// функция добавления новой карточки
export function addNewCard(name, link, likes, id, ownerId) {
  const elementCard = createCard({ name, link, likes, id, ownerId });
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

  addCard(objForCard)
    .then(() => {
      addNewCard(inputNameNewCard.value, inputLink.value);
      closePopup(popupNewCard);
      popupFormNewCard.reset();
      buttonSubmitId.textContent = "Сохранить";
      toggleButtonState(buttonSubmitId, false, validationConfig.inactiveButtonClass);
    })
    .catch((err) => {
      console.log(err);
    });;


}


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
