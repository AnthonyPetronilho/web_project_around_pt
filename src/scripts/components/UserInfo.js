class UserInfo {
  constructor(userSelectors) {
    this._nameElement = document.querySelector(userSelectors.name);
    this._jobElement = document.querySelector(userSelectors.job);
    this._avatarElement = document.querySelector(userSelectors.avatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement ? this._avatarElement.src : "",
    };
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._jobElement.textContent = userData.job;
    if (this._avatarElement && userData.avatar) {
      this._avatarElement.src = userData.avatar;
    }
  }
}

export default UserInfo;
