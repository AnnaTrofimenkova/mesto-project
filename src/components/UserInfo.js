import { api } from './Api.js'
import { PopupWithForm } from './Popup.js';


//  Это ПРОФАЙЛ!!

export class UserInfo {
  constructor(profileTitleSelector, profileSubtitleSelector, avatarSelector) {
    // получить лементы из страницы title & subtitle & avatar
    this.profileTitle = document.querySelector(profileTitleSelector);
    this.profileSubtitle = document.querySelector(profileSubtitleSelector);
    this.profileAvatar = document.querySelector(avatarSelector);
    this._popupProfile = new PopupWithForm('.popup_profile');
    this._popupAvatar = new PopupWithForm('.popup_new-avatar');
  }

  getUserInfo() {
    // сделать запрос на сервер и если ок, то заполняем элементы с title & subtitle
   api.getName()
    .then(userData => {
      this.profileTitle.textContent = userData.name;
      this.profileSubtitle.textContent = userData.about;
      this.profileAvatar.src = userData.avatar;
      this._popupProfile.setInputValue('#name', userData.name)
      this._popupProfile.setInputValue('#profession', userData.about)
    })
    .catch(err => {
      console.log(err);
    });
  }

  setUserInfo(evt) {
    evt.preventDefault();
    //api.editName();

    //profilePopup.buttonSubmit.textContent = "Сохранение...";
    this._popupProfile.setSubmitButtonText("Сохранить...");


    const objForPrifile = {
      name: this._popupProfile.getInputValue('#name'),
      about: this._popupProfile.getInputValue('#profession')
    }
    api.editName(objForPrifile)
      .then(() => {
        //closePopup(popupProfile)
        this._popupProfile.closePopup()
        this.profileTitle.textContent = objForPrifile.name;
        this.profileSubtitle.textContent = objForPrifile.about;
      })
      .finally(() => this._popupProfile.setSubmitButtonText("Сохранить"))
      .catch((err) => {
        console.log(err);
      });
  }

  setUserAvatar(evt) {
    evt.preventDefault();

    this._popupProfile.setSubmitButtonText("Сохранить...");
    const objForAva = {
      avatar: this._popupAvatar.getInputValue('#link-new-avatar'),
    }

    api.editAva(objForAva)
      .then((data) => {
        this._popupAvatar.closePopup()
        this.profileAvatar.src = data.avatar;
      })
      .finally(() => this._popupProfile.setSubmitButtonText("Сохранить"))
      .catch((err) => {
        console.log(err);
      });
  }

}


