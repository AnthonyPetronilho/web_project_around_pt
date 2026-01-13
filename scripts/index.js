import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  imageModal,
  initialCards,
  validationConfig,
  openModal,
  closeModal,
} from "./utils.js";

const imageCloseButton = imageModal?.querySelector(".popup__close");

imageCloseButton?.addEventListener("click", () => closeModal(imageModal));
imageModal?.addEventListener("mousedown", (evt) => {
  if (evt.target === imageModal) closeModal(imageModal);
});

const cardsContainer = document.querySelector(".cards__list");
const templateNode = document.querySelector("#card-template");
const cardTemplate = templateNode
  ? templateNode.content.querySelector(".card")
  : null;

function renderCard(name, link, container) {
  const card = new Card(name, link).generateCard();
  if (card && container) container.prepend(card);
}

if (cardTemplate && cardsContainer) {
  initialCards.forEach((card) =>
    renderCard(card.name, card.link, cardsContainer)
  );
}

const editModal = document.querySelector("#edit-popup");
const editButton = document.querySelector(".profile__edit-button");
const editCloseButton = editModal?.querySelector(".popup__close");

const formElement = document.querySelector("#edit-profile-form");
const nameInput = document.getElementById("edit-name");
const jobInput = document.getElementById("edit-about");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

editModal?.addEventListener("mousedown", (evt) => {
  if (evt.target === editModal) closeModal(editModal);
});

function fillProfileForm() {
  if (!nameInput || !jobInput) return;
  nameInput.value = profileTitle.textContent.trim();
  jobInput.value = profileDescription.textContent.trim();
}

function handleOpenEditModal() {
  fillProfileForm();

  if (editModal) openModal(editModal);
}

editButton?.addEventListener("click", handleOpenEditModal);
editCloseButton?.addEventListener("click", () => closeModal(editModal));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (!formElement || !nameInput || !jobInput) return;

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  if (editModal) closeModal(editModal);
}
formElement?.addEventListener("submit", handleProfileFormSubmit);

const newCardModal = document.querySelector("#new-card-popup");
const addCardButton = document.querySelector(".profile__add-button");
const newCardCloseButton = newCardModal?.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const newCardNameInput = document.getElementById("new-card-title");
const newCardLinkInput = document.getElementById("new-card-link");

newCardModal?.addEventListener("mousedown", (evt) => {
  if (evt.target === newCardModal) closeModal(newCardModal);
});
newCardCloseButton?.addEventListener(
  "click",
  () => newCardModal && closeModal(newCardModal)
);

function handleOpenNewCardModal() {
  newCardForm?.reset();

  if (newCardModal) openModal(newCardModal);
}

addCardButton?.addEventListener("click", handleOpenNewCardModal);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  if (!newCardForm || !newCardNameInput || !newCardLinkInput) return;

  const name = newCardNameInput.value.trim();
  const link = newCardLinkInput.value.trim();

  renderCard(name, link, cardsContainer);

  newCardForm.reset();
  closeModal(newCardModal);
}
newCardForm?.addEventListener("submit", handleCardFormSubmit);

const profileValidator = new FormValidator(validationConfig, formElement);
profileValidator.enableValidation();
const cardValidator = new FormValidator(validationConfig, newCardForm);
cardValidator.enableValidation();
