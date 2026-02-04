import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import { initialCards, validationConfig } from "./utils.js";
import api from "./components/Api.js";
import UserInfo from "./components/UserInfo.js";

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const handleImageClick = (name, link) => {
  imagePopup.open(name, link);
};

const cardsContainer = document.querySelector(".cards__list");

function renderCard(cardData) {
  const cardElement = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      id: cardData._id,
      isLiked: cardData.isLiked,
    },
    handleImageClick,
  ).generateCard();

  cardsContainer.prepend(cardElement);
}
//nessa função precisa passar o ID e o estado (likeCard em api e generateCard em card)

// initialCards.forEach((card) => renderCard(card.name, card.link));

const userInfo = new UserInfo({
  name: ".profile__title",
  job: ".profile__description",
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
  })
  .catch((err) => console.log(err));

api
  .getInitialCards()
  .then((cardsData) => {
    //console.log(cardsData);
    cardsData.forEach((card) => renderCard(card));
  })
  .catch((err) => console.log(err));

//editar perfil
const editPopup = new PopupWithForm("#edit-popup", (inputValues) => {
  api
    .updateUserInfo({
      name: inputValues.name,
      about: inputValues.description,
    })
    .then((updatedUserData) => {
      userInfo.setUserInfo({
        name: updatedUserData.name,
        job: updatedUserData.about,
      });
      editPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
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

//novo card
const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const name = inputValues["place-name"];
  const link = inputValues.link;

  api
    .addCard({ name, link })
    .then((newCardData) => {
      renderCard(newCardData);
      newCardPopup.close();
    })
    .catch((err) => {
      console.log("Erro ao adicionar cartão:", err);
    });
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
