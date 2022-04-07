import { doEsc } from '../index.js'

// функция открытия попапа
export function openPopup(popupAny) {
  popupAny.classList.add("popup_opened");
  document.addEventListener('keydown', doEsc);

}


// функция закрытия попапа
export function closePopup(popupAny) {
  popupAny.classList.remove("popup_opened");

}
