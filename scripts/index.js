import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards, validationConfig } from "./utils.js";

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const handleImageClick = (name, link) => {
  imagePopup.open(name, link);
};

const cardsContainer = document.querySelector(".cards__list");

function renderCard(name, link) {
  const cardElement = new Card(name, link, handleImageClick).generateCard();
  cardsContainer.prepend(cardElement);
}

initialCards.forEach((card) => renderCard(card.name, card.link));

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editPopup = new PopupWithForm("#edit-popup", (inputValues) => {
  profileTitle.textContent = inputValues.name;
  profileDescription.textContent = inputValues.description;
  editPopup.close();
});
editPopup.setEventListeners();

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", () => {
  const nameInput = document.getElementById("edit-name");
  const jobInput = document.getElementById("edit-about");
  nameInput.value = profileTitle.textContent.trim();
  jobInput.value = profileDescription.textContent.trim();

  editPopup.open();
});

const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const name = inputValues["place-name"];
  const link = inputValues.link;

  renderCard(name, link);
  newCardPopup.close();
});
newCardPopup.setEventListeners();

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const profileValidator = new FormValidator(validationConfig, editForm);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, newCardForm);
cardValidator.enableValidation();
