

// функция открытия попапа
export function openPopup(popupAny) {
  popupAny.classList.add("popup_opened");
  document.addEventListener('keydown', handleEscape);
  document.addEventListener('click', handleOver);
}
// функция закрытия попапа
export function closePopup(popupAny) {
  popupAny.classList.remove("popup_opened");
  document.removeEventListener('keydown', handleEscape);//когда добавляю не работает
  document.removeEventListener('click', handleOver);//когда добавляю не работает
}
// клик по overlay
function handleOver(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(evt.target);
  }
}
//клик по esc
function handleEscape(evt) {
  if (evt.key == 'Escape') {
    const openedPopup = document.querySelector(".popup_opened")
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};


