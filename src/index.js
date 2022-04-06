import './pages/index.css';
import { openPopup, closePopup } from './components/modal.js'
import { addNewCard, handleNewCardFormSubmit, handleProfileFormSubmit } from './components/card.js'
import { enableValidation } from './components/validate.js'
//import { getCard, getName, editName } from './components/api.js'


// константы редактированиz значения в попапе
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');

//getCard()
// .then((data) => {
//data.forEach(function (item) {
// addNewCard(item.name, item.link);
//});
//})

//getName()
//.then((data) => {
// console.log(data);
//profileTitle.textContent = data.name;
//profileSubtitle.textContent = data.about;
//profileAvatar.src = data.avatar;
//})



// попап редактирования профиля
const body = document.querySelector('.body');
const profileEditButton = document.querySelector('.profile__edit-button');
export const popupProfile = document.querySelector('.popup');
const profilePopupCloseIcon = document.querySelector('.popup__close-icon');
const profileForm = document.querySelector('.popup__form');
const formInput = profileForm.querySelector('.popup__input');// 5 месяц
const formError = profileForm.querySelector(`.${formInput.id}-error`); // 5 месяц
const popupTitle = document.querySelector('.popup__title');


//попап новой карточки
const newCardButton = document.querySelector('.profile__add-button');
export const popupNewCard = document.querySelector('.popup_new-card');
const popupFormNewCard = document.querySelector('.popup__form_new-card');
const popupCloseIconNewCard = document.querySelector('.popup__close-icon_new-card');
const popupButtonNewCard = document.querySelector('#popup__button_new_card');

//фото карточек
export const popBigPhotoCard = document.querySelector('.popup-photo-card');
const closeBigPhoto = document.querySelector('.popup-photo-card__close-icon');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

popupFormNewCard.addEventListener('submit', handleNewCardFormSubmit);

//открытие попапа профиля
profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
});

//открытие попапа карточки
newCardButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});


//закрытие попапа профиля
profilePopupCloseIcon.addEventListener('click', () => {
  closePopup(popupProfile)
});

//закрытие попапа карточки
popupCloseIconNewCard.addEventListener('click', () => {
  closePopup(popupNewCard)
});
//закрытие попапа большого фото
closeBigPhoto.addEventListener('click', () => {
  closePopup(popBigPhotoCard)
});


;

profileForm.addEventListener('submit', handleProfileFormSubmit);


// 5 мес массовая валидация


enableValidation();


// клик по overlay

document.addEventListener('click', function (evt) {
  if (evt.target.classList.contains("popup__form") || evt.target.classList.contains("popup__title")
    || evt.target.classList.contains("popup__input") || evt.target.classList.contains("popup__input")
    || evt.target.classList.contains("popup__input-error") || evt.target.classList.contains("popup__button")) {
  } else
    closePopup(evt.target);
})

//клик по esc

document.addEventListener('keydown', function (evt) {
  if (evt.key == 'Escape') {
    popupProfile.classList.remove("popup_opened");
    popupNewCard.classList.remove("popup_opened");
  }
});
