import './pages/index.css';
import { PopupWithForm } from './components/Popup'
import { enableValidation, validationConfig } from './components/Validate.js'
import { api } from './components/Api.js'
import { UserInfo } from './components/UserInfo.js'
import { Sextion } from './components/Sextion.js'
import { Card } from './components/Card.js'



// константы редактированиz значения в попапе
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');

const userInfo = new UserInfo(".profile__title", ".profile__subtitle", ".profile__avatar");

// попапы
const popupProfile = new PopupWithForm('.popup_profile');
const popupAvatar = new PopupWithForm('.popup_new-avatar');
const popupNewCard = new PopupWithForm('.popup_new-card');

api.getName()
  .then(userData => {
    userInfo.setUserInfo(userData);
    profileAvatar.src = userData.avatar;
  })
.catch(err => {
  console.log(err);
});


Promise.all([api.getCard(), api.getName()]).then(([cards, user]) => {
  const section = new Sextion(cards, '.elements', (cardItem) => {
    const card = new Card(cardItem, '.element', user);
    const cardElement = card.createDOMCard();
    section.elements.prepend(cardElement);
  });

  section.render();

  popupNewCard.setSubmitEventListener((event) => {
    event.preventDefault();

    popupNewCard.setSubmitButtonText("Сохранение...");

    const objForCard = {
      name: popupNewCard.getInputValue('#name-new-card'),
      link: popupNewCard.getInputValue('#link-new-card')
    }

    api.addCard(objForCard)
      .then((newCard) => {
        const card = new Card(newCard, '.element', newCard.owner);
        const cardElement = card.createDOMCard();
        section.addItem(cardElement); //Добавление в DOM
        popupNewCard.closePopup();
        popupNewCard.resetForm();
        popupNewCard.resetValidation();
        popupNewCard.setSubmitButtonText("Сохранить");
      })
      .finally(() => popupNewCard.setSubmitButtonText("Сохранить"))
      .catch((err) => {
        console.log(err);
      });
  });

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



//открытие попапа профиля
profileEditButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();

  popupProfile.setInputValue('#name', info.title);
  popupProfile.setInputValue('#profession', info.subtitle);

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

// клик по кнопке отправке данных профиля (по кнопке Сохранить)
popupProfile.setSubmitEventListener((event) => {
  event.preventDefault();

  popupProfile.setSubmitButtonText("Сохранить...");


  const objForPrifile = {
    name: popupProfile.getInputValue('#name'),
    about: popupProfile.getInputValue('#profession')
  }
  api.editName(objForPrifile)
    .then((userData) => {
      //closePopup(popupProfile)
      popupProfile.closePopup()
      userInfo.setUserInfo(userData);
    })
    .finally(() => popupProfile.setSubmitButtonText("Сохранить"))
    .catch((err) => {
      console.log(err);
    });
});

// клик по кнопке Сохранить попап Аватар
popupAvatar.setSubmitEventListener((event) => {
    event.preventDefault();

    popupProfile.setSubmitButtonText("Сохранить...");

    const objForAva = {
      avatar: popupAvatar.getInputValue('#link-new-avatar'),
    }

    api.editAva(objForAva)
      .then((data) => {
        console.log(data)
        popupAvatar.closePopup();
        profileAvatar.src = data.avatar;
      })
      .finally(() => popupProfile.setSubmitButtonText("Сохранить"))
      .catch((err) => {
        console.log(err);
      });
});



// 5 мес массовая валидация
enableValidation(validationConfig);

