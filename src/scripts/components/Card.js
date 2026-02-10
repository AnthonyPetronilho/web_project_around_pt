class Card {
  constructor(
    { name, link, id, isLiked },
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
  ) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._isLiked = isLiked;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    }

    this._setEventListeners();
    return this._element;
  }

  _getTemplate() {
    return document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeButton = () => {
    this._handleLikeClick(this);
  };

  _handleDeleteButton = () => {
    this._handleDeleteClick(this);
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._likeButton.classList.contains("card__like-button_is-active");
  }

  toggleLike() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;
