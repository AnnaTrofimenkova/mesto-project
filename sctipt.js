// попап редактирования профиля
const body = document.querySelector('.body');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup');
const profilePopupCloseIcon = document.querySelector('.popup__close-icon');
const profileForm = document.querySelector('.popup__form');
const inputName = document.querySelector('#name');
const inputProfession = document.querySelector('#profession');
const popupTitle = document.querySelector('.popup__title');

//Шапка профиля
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');


//попап новой карточки
const newCardButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_new-card');
const popupFormNewCard = document.querySelector('.popup__form_new-card');
const popupCloseIconNewCard = document.querySelector('.popup__close-icon_new-card');
const popupButtonNewCard = document.querySelector('#popup__button_new_card');
const inputNameNewCard = document.querySelector('#name-new-card');
const inputLink = document.querySelector('#link-new-card');


// Карточки
const elements = document.querySelector('.elements'); //куда будем добавлять
const elementThere = document.querySelector('#element-template').content;//их версия


//фото карточек
const popBigPhotoCard = document.querySelector('.popup-photo-card');
const closeBigPhoto = document.querySelector('.popup-photo-card__close-icon');

// массив для шести карточек
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

// функция добавления большой картинки

function addNewPhotoCard(name, link) {
  document.querySelector(".popup-photo-card__title").textContent = name;
  document.querySelector(".popup-photo-card__photo").src = link;
  openPopup(popBigPhotoCard);

};

// функция СОЗДАНИЯ новой карточки

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
function addNewCard(name, link) {
  const elementCard = createCard({ name, link });
  //const elementCard = elementThere.querySelector('.element').cloneNode(true);
  //const cardImage = elementCard.querySelector('.element__photo');
  //elementCard.querySelector('.element__title').textContent = name;
  //cardImage.src = link;
  //cardImage.alt = name;
  //cardImage.addEventListener('click', () => {
  //addNewPhotoCard(name, link);
  //});
  //elementCard.querySelector('.element__like').addEventListener('click', function (evt) {
  //evt.target.classList.toggle('element__like_active');
  //});
  //elementCard.querySelector('.element__tresh').addEventListener('click', (evt) => {
  //evt.target.closest('.element').remove();
  // });
  elements.prepend(elementCard);
};


// добавление шести карточек
initialCards.forEach(function (item) {
  addNewCard(item.name, item.link);
});


// добавление карточки по клику
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  addNewCard(inputNameNewCard.value, inputLink.value);
  closePopup(popupNewCard);
  popupFormNewCard.reset()
}
popupFormNewCard.addEventListener('submit', handleNewCardFormSubmit);


// функция открытия попапа
function openPopup(popupAny) {
  popupAny.classList.add("popup_opened");
}

//открытие попапа профиля
profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
});

//открытие попапа карточки
newCardButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

// функция закрытия попапа
function closePopup(popupAny) {
  popupAny.classList.remove("popup_opened");
}

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


//редактирование значения в попапе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputProfession.value;
  closePopup(popupProfile)
};

profileForm.addEventListener('submit', handleProfileFormSubmit);


