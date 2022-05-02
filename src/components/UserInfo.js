import { api } from './api.js'


//  Это ПРОФАЙЛ!!

export class UserInfo {
  constructor(namePols, self) {
    this._namePols = namePols;
    this._self = self;
    // получить лементы из страницы title & subtitle
  }

  getUserInfo() {
    // сделать запрос на сервер и если ок, то заполняем элементы с title & subtitle
    api.getName();

  }

  setUserInfo() {
    api.editName();
  }

}

//я же на входе ничего не передаю
const userInfo1 = new UserInfo(".profile__title", ".profile__subtitle");
userInfo1.getUserInfo()
console.log(userInfo1.getUserInfo());

