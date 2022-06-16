
export class UserInfo {
  constructor(profileTitleSelector, profileSubtitleSelector, profileAvatarSelector) {
    // получить лементы из страницы title & subtitle & avatar
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      subtitle: this._profileSubtitle.textContent
    }
  }

  setUserInfo(userData) {
    this._profileTitle.textContent = userData.name;
    this._profileSubtitle.textContent = userData.about;
  }

  setAvatar(url) {
    this._profileAvatar.src = url;
  }

}

