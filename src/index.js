import './pages/index.css';
import { PopupWithForm } from './components/Popup'
import { enableValidation, validationConfig } from './components/Validate.js'
import { api } from './components/Api.js'
import { UserInfo } from './components/UserInfo.js'
import { Sextion } from './components/Sextion.js'


// константы редактированиz значения в попапе
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');


const userInfo = new UserInfo(".profile__title", ".profile__subtitle", ".profile__avatar");
userInfo.getUserInfo()

const popupNewCard = new PopupWithForm('.popup_new-card');

Promise.all([api.getCard(), api.getName()]).then(([cards, user]) => {
  const section = new Sextion(cards, '.elements', user, popupNewCard);
  section.renderer();

  popupNewCard.setSubmitEventListener(section.addNewCard.bind(section));

}).catch(err => {
  console.log(err);
});


// попап редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');


const avatarEdit = document.querySelector('.profile__avatar-cont');// 5 месяц


//попап новой карточки
const newCardButton = document.querySelector('.profile__add-button');
export const popupFormNewCard = document.querySelector('.popup__form_new-card');


//фото карточек
export const popBigPhotoCard = document.querySelector('.popup-photo-card');


const popupProfile = new PopupWithForm('.popup_profile');
const popupAvatar = new PopupWithForm('.popup_new-avatar');


//открытие попапа профиля
profileEditButton.addEventListener('click', () => {
  popupProfile.openPopup();
});

//открытие попапа аватара
avatarEdit.addEventListener('click', () => {
  popupAvatar.openPopup();
});


// //открытие попапа карточки
newCardButton.addEventListener('click', () => {
  popupNewCard.openPopup(); // поправила на класс
});

popupProfile.setSubmitEventListener(userInfo.setUserInfo.bind(userInfo));

popupAvatar.setSubmitEventListener(userInfo.setUserAvatar.bind(userInfo));



// 5 мес массовая валидация
enableValidation(validationConfig);

