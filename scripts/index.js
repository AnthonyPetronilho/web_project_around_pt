import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import { initialCards, validationConfig } from "./utils.js";
import UserInfo from "./components/UserInfo.js";

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

const userInfo = new UserInfo({
  name: ".profile__title",
  job: ".profile__description",
});

const editPopup = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.name,
    job: inputValues.description,
  });

  editPopup.close();
});
editPopup.setEventListeners();

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();

  const nameInput = document.getElementById("edit-name");
  const aboutInput = document.getElementById("edit-about");

  nameInput.value = currentUser.name;
  aboutInput.value = currentUser.job;

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
