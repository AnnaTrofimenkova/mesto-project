// попап редактирования профиля
const body = document.querySelector('.body');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup');
const profilePopupCloseIcon = document.querySelector('.popup__close-icon');
const profileForm = document.querySelector('.popup__form');
const formInput = profileForm.querySelector('.popup__input');// 5 месяц
const formError = profileForm.querySelector(`.${formInput.id}-error`); // 5 месяц
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
const titleBigPhotoCard = document.querySelector(".popup-photo-card__title");
const photoBigPhotoCard = document.querySelector(".popup-photo-card__photo");



// функция добавления большой картинки

function addNewPhotoCard(name, link) {
  titleBigPhotoCard.textContent = name;
  photoBigPhotoCard.src = link;
  photoBigPhotoCard.alt = name;
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


// 5 мес массовая валидация

const showInputError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add('popup__input_type_error');
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  inputElement.classList.remove('popup__input_type_error');
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};


const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button__submit_inactive');
  } else {
    buttonElement.classList.remove('popup__button__submit_inactive');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);


  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });

  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}
enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

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
