import { handleImageClick } from "./index.js";

class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this.cardSelector = cardSelector;
  }

  generateCard() {
    this._element = this._getTemplate();
    console.log("teste");

    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventLisnteners();
    return this._element;
  }

  _getTemplate() {
    const templateNode = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
    return templateNode;
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle("card__like-button_is-active");
  };
  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventLisnteners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
    this._cardImage.addEventListener("click", () => handleImageClick(this));
  }
}

export default Card;
