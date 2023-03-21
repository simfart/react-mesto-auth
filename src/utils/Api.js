class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData)
  }

  getInitialUserCards() {
    return this._request(`${this._baseUrl}/cards/`, {
      headers: this._headers,
    })
  }

  createNewCard(data) {
    return this._request(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
  }

  setLikes(idCard, isLiked) {
    return this._request(`${this._baseUrl}/cards/${idCard}/likes/`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    })
  }

  deleteCards(idCard) {
    return this._request(`${this._baseUrl}/cards/${idCard}/`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  getInitialUserInfo() {
    return this._request(`${this._baseUrl}/users/me/`, {
      headers: this._headers,
    })
  }

  editlUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  editAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'de757743-a43f-41c7-85c7-5187f80aa0ab',
    'Content-Type': 'application/json'
  }
});

export default api