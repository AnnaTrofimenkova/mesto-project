
import { openPopup, closePopup } from './modal.js'
import { popBigPhotoCard, popupProfile, popupNewCard, profileTitle, profileSubtitle, popupFormNewCard } from '../index.js'

// константы добавления большой картинки
const titleBigPhotoCard = document.querySelector(".popup-photo-card__title");
const photoBigPhotoCard = document.querySelector(".popup-photo-card__photo");

//константы СОЗДАНИЯ новой карточки
const elementThere = document.querySelector('#element-template').content;//их версия

// константы добавления новой карточки
const elements = document.querySelector('.elements');
const buttonSubmit = document.querySelector('.popup__button');



// константы добавления карточки по клику
const inputNameNewCard = document.querySelector('#name-new-card');
const inputLink = document.querySelector('#link-new-card');


// массив для шести карточекnp
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

initialCards.forEach(function (item) {
  addNewCard(item.name, item.link);
});


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
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardImage.addEventListener('click', () => {
    addNewPhotoCard(item.name, item.link);
  });
  elementCard.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  elementCard.querySelector('.element__tresh').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  return elementCard;
}

// функция добавления новой карточки
export function addNewCard(name, link) {
  const elementCard = createCard({ name, link });
  elements.prepend(elementCard);
};

//добавление карточки по клику
export function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  addNewCard(inputNameNewCard.value, inputLink.value);
  closePopup(popupNewCard);
  popupFormNewCard.reset();
}

//редактирование значения в попапе
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputProfession.value;
  closePopup(popupProfile)
};
