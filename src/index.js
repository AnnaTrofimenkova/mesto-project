import './pages/index.css';
import { openPopup, closePopup } from './components/modal.js'
import { addNewCard, handleNewCardFormSubmit, handleProfileFormSubmit, handleAvaFormSubmit, inputName, inputProfession, Popup } from './components/card.js'
import { enableValidation, validationConfig } from './components/validate.js'
import { getCard, getName, editName, api } from './components/api.js'



// константы редактированиz значения в попапе
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');
export const userID = { id: "" }


//const api = new Api(config);
console.log(api)

Promise.all([api.getName(), api.getCard()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    inputName.value = userData.name;
    inputProfession.value = userData.about;

    userID.id = userData._id;
    cards.forEach(function (item) {
      addNewCard(item);
    })

  })
  .catch(err => {
    console.log(err);
  });




// попап редактирования профиля
const body = document.querySelector('.body');
const profileEditButton = document.querySelector('.profile__edit-button');
export const popupProfile = document.querySelector('.popup');
const profilePopupCloseIcon = document.querySelector('.popup__close-icon');
const profileForm = document.querySelector('.popup__form');
const formInput = profileForm.querySelector('.popup__input');// 5 месяц
const popupTitle = document.querySelector('.popup__title');
const avatarEdit = document.querySelector('.profile__avatar-cont');// 5 месяц
export const popupAvatar = document.querySelector('.popup_new-avatar');
const avatarPopupCloseIcon = document.querySelector('.popup__close-icon_avatar');
const popupFormAvatar = document.querySelector('.popup__form_avatar')

//попап новой карточки
const newCardButton = document.querySelector('.profile__add-button');
export const popupNewCard = document.querySelector('.popup_new-card');
export const popupFormNewCard = document.querySelector('.popup__form_new-card');
const popupCloseIconNewCard = document.querySelector('.popup__close-icon_new-card');
const popupButtonNewCard = document.querySelector('#popup__button_new_card');
console.log(popupNewCard);

//фото карточек
export const popBigPhotoCard = document.querySelector('.popup-photo-card');
const closeBigPhoto = document.querySelector('.popup-photo-card__close-icon');


popupFormNewCard.addEventListener('submit', handleNewCardFormSubmit);
popupFormAvatar.addEventListener('submit', handleAvaFormSubmit);

//открытие попапа профиля
profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
});

//открытие попапа аватара
avatarEdit.addEventListener('click', () => {
  openPopup(popupAvatar);
});

const popup1 = new Popup(popupNewCard); // поправила на класс

//открытие попапа карточки
newCardButton.addEventListener('click', () => {
  popup1.openPopup(); // поправила на класс
});


//закрытие попапа профиля
profilePopupCloseIcon.addEventListener('click', () => {
  closePopup(popupProfile)
});

//закрытие попапа аватара
avatarPopupCloseIcon.addEventListener('click', () => {
  closePopup(popupAvatar)
});


//закрытие попапа карточки
popupCloseIconNewCard.addEventListener('click', () => {
  popup1.closePopup();// поправила на класс
});
//закрытие попапа большого фото
closeBigPhoto.addEventListener('click', () => {
  closePopup(popBigPhotoCard)
});

profileForm.addEventListener('submit', handleProfileFormSubmit);


// 5 мес массовая валидация
enableValidation(validationConfig);





