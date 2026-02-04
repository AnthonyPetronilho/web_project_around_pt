import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import { validationConfig } from "./utils.js";
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

const userInfo = new UserInfo({
  name: ".profile__title",
  job: ".profile__description",
  avatar: ".profile__image",
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => console.log(err));

api
  .getInitialCards()
  .then((cardsData) => {
    cardsData.forEach((card) => renderCard(card));
  })
  .catch((err) => console.log(err));

//popup do avatar:
const avatarPopup = new PopupWithForm("#avatar-popup", (inputValues) => {
  api
    .updateAvatar(inputValues.avatar)
    .then((updatedUserData) => {
      userInfo.setUserInfo({
        name: updatedUserData.name,
        job: updatedUserData.about,
        avatar: updatedUserData.avatar,
      });
      avatarPopup.close();
    })
    .catch((err) => console.log("Erro ao atualizar avatar:", err));
});

avatarPopup.setEventListeners();

const avatarEditButton = document.querySelector(".profile__avatar-edit-button");
avatarEditButton.addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarPopup.open();
});

const avatarForm = document.querySelector("#avatar-form");
const avatarValidator = new FormValidator(validationConfig, avatarForm);
avatarValidator.enableValidation();

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
