
import { toggleButtonState, validationConfig } from './validate'
import { openPopup, closePopup } from './modal.js'
import { popBigPhotoCard, popupProfile, popupNewCard, profileTitle, profileSubtitle, popupFormNewCard, popupAvatar, profileAvatar, userID } from '../index.js'
import { editName, addCard, deleteCard, getCard, editLike, delLike, editAva, api } from './api.js'


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
      api.deleteCard(item._id)
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
    api.delLike(item._id)
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
    api.editLike(item._id)
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

  api.addCard(objForCard)
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
  api.editName(objForPrifile)
    .then(() => {
      closePopup(popupProfile)
      profileTitle.textContent = inputName.value;
      profileSubtitle.textContent = inputProfession.value;
    })
    .finally(() => buttonSubmit.textContent = "Сохранить")
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
  api.editAva(objForAva)
    .then((data) => {
      closePopup(popupAvatar)
      profileAvatar.src = data.avatar;
    })
    .finally(() => buttonSubmitAva.textContent = "Сохранить")
    .catch((err) => {
      console.log(err);
    });;
};



// 6 месяц. Упражняюсь с классами. Тестирую на кард

//создаю в ручную объект Card без класса
// const сard = {
//   name: "Кижи",
//   link: "https://madampodari.ru/wp-content/uploads/7/3/e/73e3e2f38032ebbb4d3f804264d59c4a.jpeg",
//   isliked: false,
//   likes: 0,
//   canTresh: false,
//   owner:
//   {
//     _id: "123"
//   },
//   getLike: getLikefun,
//   delLike: delLikefun

// };



//addNewCard(сard);

// //создаю функцию, которая будет созавать объекты без Класса

// function getLikefun() {
//   this.isliked = true;
// }

// function delLikefun() {
//   this.isliked = true;
// }



// function createSong(name, link) {
//   // создаём новый объект песни
//   const newSong = {
//     name,
//     link,
//     isliked: false,
//     getLike: getLikefun,
//     delLike: delLikefun,
//   }


//   return newSong; // возвращаем этот объект
// }

// // теперь создавать объекты песен гораздо проще
// const song1 = createSong('Футбольный мяч', 'https://madampodari.ru/wp-content/uploads/7/3/e/73e3e2f38032ebbb4d3f804264d59c4a.jpeg');
// const song2 = createSong('На заре', 'https://madampodari.ru/wp-content/uploads/7/3/e/73e3e2f38032ebbb4d3f804264d59c4a.jpeg');
// const song3 = createSong('Ай', 'https://madampodari.ru/wp-content/uploads/7/3/e/73e3e2f38032ebbb4d3f804264d59c4a.jpeg');

// console.log(song1);
// console.log(song1.isliked);
// song1.getLike();
// console.log(song1.isliked);
// не создаю пока визуально карточку, потому,что нужно переписывать коз из-за API.
//пока достаточно модели


// class Card {
//   constructor(name, link) {
//     this.name = name;
//     this.link = link;
//     this.isLiked = false;
//     this.canTresh = false;
//     this.likes = 0;
//   }

//   getLikefun() {
//     this.isliked = true;
//   }

//   delLikefun() {
//     this.isliked = false;
//   }

// };


// const card1 = new Card('Кижи', 'https://madampodari.ru/wp-content/uploads/7/3/e/73e3e2f38032ebbb4d3f804264d59c4a.jpeg');
// console.log(card1);
// console.log(card1.isLiked);
// card1.getLikefun();
// console.log(card1.isliked)


// document.addEventListener('click', function () {
//   card1.delLikefun();
//   console.log(card1.isliked)
// });


// тестирую попап

// class PopopforCard {
//   constructor(selector) {
//     this.selector = selector;
//   }

//   openPopupClass() {
//     this.classList.add("popup_opened");
//   }
//   closePopupClass() {
//     this.classList.remove("popup_opened");
//   }
// }
// const popup1 = new PopopforCard(popupNewCard);
// console.log(popup1)
// popup1.openPopupClass();

// function opentest() {
//   this.main.classList.add("popup_opened");
// }

const popupNewCardtest = document.querySelector('.popup_new-card');
// const popup = {

//   main: popupNewCardtest,
//   open: opentest,
// }
//console.log(popup.open())

export class Popup {
  constructor(selector) {
    this.selector = selector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this.handleOver = this.handleOver.bind(this);
  }

  openPopup() {
    this.selector.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this.handleOver);
  }

  closePopup() {
    this.selector.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this.handleOver);
  }

  // клик по overlay
  handleOver(evt) {
    if (evt.target.classList.contains('popup')) {
      this.closePopup(evt.target);
    }
  }

  //клик по esc
  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      const openedPopup = document.querySelector(".popup_opened")
      if (openedPopup) {
        this.closePopup(openedPopup);
      }
    }
  }

}

//const newCardButtontest = document.querySelector('.profile__add-button');
//const popup1 = new Popup(popupNewCardtest);
//popup1.openPopup();

//открытие попапа карточки
// newCardButtontest.addEventListener('click', () => {
//   popup1.openPopup();
// });









class Student {
  constructor(name, cohort) {
    this.name = name;
    this.cohort = cohort;
  }

  getInfo() {
    return {
      name: this.name,
      cohort: this.cohort
    }
  }
}

const student1 = new Student('ann', 8);
console.log(student1.getInfo());

class StudentWeb extends Student {
  constructor(name, cohort, length) {
    super(name, cohort);
    this.web = "web+";
    this.length = length;
  }

}


const student2 = new StudentWeb('ann', 8, 6);
console.log(student2);



class Card {
  constructor(name, image, selector) {

    this.name = name;
    this.image = image;
    this._selector = selector;
  }

  _addNewCard() {
    const elementCard = createCard(data);
    elements.prepend(elementCard);
  }

  //функция СОЗДАНИЯ новой карточки
  createCard(data) {
    const elementCard = elementThere.querySelector('.element').cloneNode(true);
    const cardImage = elementCard.querySelector('.element__photo');
    const countLikes = elementCard.querySelector('.element__count-likes');
    const buttonLikes = elementCard.querySelector('.element__like');
    elementCard.querySelector('.element__title').textContent = data.name;
    countLikes.textContent = this.likes.length;// 5 месяц лайки
    cardImage.src = this.link;
    cardImage.alt = this.name;
    cardImage.addEventListener('click', () => {
      addNewPhotoCard(data.name, data.link);
    });
    buttonLikes.addEventListener('click', function (evt) {
      toggleLike(evt, data, countLikes);
    });
    if (data.owner._id === userID.id) {
      elementCard.querySelector('.element__tresh').addEventListener('click', (evt) => {
        api.deleteCard(data._id)
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
    if (data.likes.find((like) => like._id === userID.id) ? true : false) {
      buttonLikes.classList.add('element__like_active');
    };

    // функция удаления по мусорнику в создании новой карточки
    return elementCard;
  }
}




const card2 = new Card("rfhfxftdcr", "yyfhy", 223, 6, "bfbf");
console.log(card2);
card2.createCard(card2);

