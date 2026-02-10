import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import { validationConfig } from "../scripts/utils.js";
import api from "../scripts/components/Api.js";
import UserInfo from "../scripts/components/UserInfo.js";

const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");

const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const avatarForm = document.querySelector("#avatar-form");

const profileValidator = new FormValidator(validationConfig, editForm);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, newCardForm);
cardValidator.enableValidation();

const avatarValidator = new FormValidator(validationConfig, avatarForm);
avatarValidator.enableValidation();

const userInfo = new UserInfo({
  name: ".profile__title",
  job: ".profile__description",
  avatar: ".profile__image",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const deletePopup = new PopupWithConfirmation("#delete-popup");
deletePopup.setEventListeners();

const handleImageClick = (name, link) => {
  imagePopup.open(name, link);
};

const handleDeleteClick = (cardInstance) => {
  deletePopup.setSubmitAction(() => {
    api
      .deleteCard(cardInstance.getId())
      .then(() => {
        cardInstance.removeCard();
        deletePopup.close();
      })
      .catch((err) => console.log("Erro ao deletar:", err));
  });

  deletePopup.open();
};

const cardsSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const card = new Card(
        {
          name: cardData.name,
          link: cardData.link,
          id: cardData._id,
          isLiked: cardData.isLiked,
        },
        handleImageClick,
        handleDeleteClick,
      );

      return card.generateCard();
    },
  },
  ".cards__list",
);

function addCardToPage(cardData) {
  const element = cardsSection._renderer(cardData);
  cardsSection.addItem(element);
}

const avatarPopup = new PopupWithForm("#avatar-popup", (inputValues) => {
  avatarPopup.renderLoading(true);

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
    .catch((err) => console.log("Erro ao atualizar avatar:", err))
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});
avatarPopup.setEventListeners();

const editPopup = new PopupWithForm("#edit-popup", (inputValues) => {
  editPopup.renderLoading(true);

  api
    .updateUserInfo({
      name: inputValues.name,
      about: inputValues.description,
    })
    .then((updatedUserData) => {
      userInfo.setUserInfo({
        name: updatedUserData.name,
        job: updatedUserData.about,
        avatar: updatedUserData.avatar,
      });
      editPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editPopup.renderLoading(false);
    });
});
editPopup.setEventListeners();

const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  newCardPopup.renderLoading(true);

  const name = inputValues["place-name"];
  const link = inputValues.link;

  api
    .addCard({ name, link })
    .then((newCardData) => {
      addCardToPage(newCardData);
      newCardPopup.close();
    })
    .catch((err) => console.log("Erro ao adicionar cartão:", err))
    .finally(() => newCardPopup.renderLoading(false));
});
newCardPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarPopup.open();
});

editButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();

  document.getElementById("edit-name").value = currentUser.name;
  document.getElementById("edit-about").value = currentUser.job;

  profileValidator.resetValidation();
  editPopup.open();
});

addCardButton.addEventListener("click", () => {
  cardValidator.resetValidation();
  newCardPopup.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cardsData.forEach((cardData) => {
      addCardToPage(cardData);
    });
  })
  .catch((err) => console.log(err));
