class UserInfo {
  constructor(userSelectors) {
    this._nameElement = document.querySelector(userSelectors.name);
    this._jobElement = document.querySelector(userSelectors.job);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._jobElement.textContent = userData.job;
  }
}

export default UserInfo;
