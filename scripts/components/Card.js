import api from "./Api.js";

class Card {
  constructor({ name, link, id, isLiked }, handleCardClick) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._isLiked = isLiked;
    this._handleCardClick = handleCardClick;
  }
  //this._cardSelector
  //this._imageClick
  //this.-handleDelete
  //this._handleLike

  generateCard() {
    this._element = this._getTemplate();

    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    }
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    return this._element;
  }
  //achar o id do botão de curtir

  _getTemplate() {
    const templateNode = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
    return templateNode;
  }

  _handleLikeButton = () => {
    const isCurrentlyLiked = this._likeButton.classList.contains(
      "card__like-button_is-active",
    );

    const request = isCurrentlyLiked
      ? api.unlikeCard(this._id)
      : api.likeCard(this._id);

    request
      .then(() => {
        this._likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export default Card;
