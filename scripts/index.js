// ===== Dados iniciais =====
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".popup.popup_is-opened");
    if (opened) closeModal(opened);
  }
}

const imageModal = document.querySelector("#image-popup");
const imageCloseButton = imageModal?.querySelector(".popup__close");
const popupImage = imageModal?.querySelector(".popup__image");
const popupCaption = imageModal?.querySelector(".popup__caption");

imageCloseButton?.addEventListener("click", () => closeModal(imageModal));
imageModal?.addEventListener("mousedown", (evt) => {
  if (evt.target === imageModal) closeModal(imageModal);
});

const cardsContainer = document.querySelector(".cards__list");
const templateNode = document.querySelector("#card-template");
const cardTemplate = templateNode
  ? templateNode.content.querySelector(".card")
  : null;

function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
function handleDeleteButton(cardElement) {
  cardElement.remove();
}

function getCardElement(name, link) {
  if (!cardTemplate) return null;

  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", handleLikeButton);
  deleteButton.addEventListener("click", () => handleDeleteButton(cardElement));

  cardImage.addEventListener("click", () => {
    if (!imageModal || !popupImage || !popupCaption) return;
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imageModal);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const card = getCardElement(name, link);
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
const saveButton = formElement?.querySelector(".popup__button");

editModal?.addEventListener("mousedown", (evt) => {
  if (evt.target === editModal) closeModal(editModal);
});

function fillProfileForm() {
  if (!nameInput || !jobInput) return;
  nameInput.value = profileTitle.textContent.trim();
  jobInput.value = profileDescription.textContent.trim();
}

function showInputError(input) {
  const errorEl = editModal?.querySelector(`#${input.id}-error`);
  if (!errorEl) return;
  errorEl.textContent = input.validationMessage;
  errorEl.classList.add("popup__input-error_active");
  input.classList.add("popup__input_type_error");
}
function hideInputError(input) {
  const errorEl = editModal?.querySelector(`#${input.id}-error`);
  if (!errorEl) return;
  errorEl.textContent = "";
  errorEl.classList.remove("popup__input-error_active");
  input.classList.remove("popup__input_type_error");
}
function checkInputValidity(input) {
  if (!input.checkValidity()) {
    showInputError(input);
  } else {
    hideInputError(input);
  }
}
function toggleSaveButtonState() {
  if (!formElement || !saveButton || !nameInput || !jobInput) return;
  const formIsValid = nameInput.checkValidity() && jobInput.checkValidity();
  saveButton.disabled = !formIsValid;
  saveButton.classList.toggle("popup__button_disabled", !formIsValid);
}

function handleOpenEditModal() {
  fillProfileForm();

  if (nameInput) hideInputError(nameInput);
  if (jobInput) hideInputError(jobInput);

  toggleSaveButtonState();

  if (editModal) openModal(editModal);
}

editButton?.addEventListener("click", handleOpenEditModal);
editCloseButton?.addEventListener("click", () => closeModal(editModal));

[nameInput, jobInput].forEach((input) => {
  input?.addEventListener("input", () => {
    if (!input) return;
    checkInputValidity(input);
    toggleSaveButtonState();
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (!formElement || !nameInput || !jobInput) return;

  if (!formElement.checkValidity()) {
    checkInputValidity(nameInput);
    checkInputValidity(jobInput);
    toggleSaveButtonState();
    return;
  }

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
const newCardSaveButton = newCardForm?.querySelector(".popup__button");

newCardModal?.addEventListener("mousedown", (evt) => {
  if (evt.target === newCardModal) closeModal(newCardModal);
});
newCardCloseButton?.addEventListener(
  "click",
  () => newCardModal && closeModal(newCardModal)
);

function showNewCardInputError(input) {
  const errorEl = newCardModal?.querySelector(`#${input.id}-error`);
  if (!errorEl) return;
  errorEl.textContent = input.validationMessage;
  errorEl.classList.add("popup__input-error_active");
  input.classList.add("popup__input_type_error");
}
function hideNewCardInputError(input) {
  const errorEl = newCardModal?.querySelector(`#${input.id}-error`);
  if (!errorEl) return;
  errorEl.textContent = "";
  errorEl.classList.remove("popup__input-error_active");
  input.classList.remove("popup__input_type_error");
}
function checkNewCardInputValidity(input) {
  if (!input.checkValidity()) {
    showNewCardInputError(input);
  } else {
    hideNewCardInputError(input);
  }
}
function toggleNewCardButtonState() {
  if (!newCardSaveButton || !newCardNameInput || !newCardLinkInput) return;
  const formIsValid =
    newCardNameInput.checkValidity() && newCardLinkInput.checkValidity();
  newCardSaveButton.disabled = !formIsValid;
  newCardSaveButton.classList.toggle("popup__button_disabled", !formIsValid);
}

function handleOpenNewCardModal() {
  newCardForm?.reset();

  if (newCardNameInput) hideNewCardInputError(newCardNameInput);
  if (newCardLinkInput) hideNewCardInputError(newCardLinkInput);

  toggleNewCardButtonState();
  if (newCardModal) openModal(newCardModal);
}

addCardButton?.addEventListener("click", handleOpenNewCardModal);

[newCardNameInput, newCardLinkInput].forEach((input) => {
  input?.addEventListener("input", () => {
    if (!input) return;
    checkNewCardInputValidity(input);
    toggleNewCardButtonState();
  });
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  if (!newCardForm || !newCardNameInput || !newCardLinkInput) return;

  if (!newCardForm.checkValidity()) {
    checkNewCardInputValidity(newCardNameInput);
    checkNewCardInputValidity(newCardLinkInput);
    toggleNewCardButtonState();
    return;
  }

  const name = newCardNameInput.value.trim();
  const link = newCardLinkInput.value.trim();

  renderCard(name, link, cardsContainer);

  newCardForm.reset();
  toggleNewCardButtonState();
  if (newCardModal) closeModal(newCardModal);
}
newCardForm?.addEventListener("submit", handleCardFormSubmit);
