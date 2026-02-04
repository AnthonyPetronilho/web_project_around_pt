class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  updateUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Erro: ${res.status}`);
      })
      .then((newCardData) => {
        renderCard(newCardData);
        newCardPopup.close();
      });
  }

  likeCard(cardId) {
    console.log("likeCard");
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      //body: JSON.stringify({
      //isLiked: true,
      //}),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      //body: JSON.stringify({
      //isLiked: false,
      //}),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "eb356727-edde-43bf-88cf-6fefe7c1082a",
    "Content-Type": "application/json",
  },
});

export default api;
