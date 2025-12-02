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

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg"
) {
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
    popupImage.src = link || "./images/placeholder.jpg";
    popupImage.alt = name || "Lugar sem nome";
    popupCaption.textContent = name || "Lugar sem nome";
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
const nameInput = editModal?.querySelector(".popup__input_type_name");
const jobInput = editModal?.querySelector(".popup__input_type_description");
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
  if (nameInput && jobInput) {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
  }
  if (editModal) closeModal(editModal);
}

formElement?.addEventListener("submit", handleProfileFormSubmit);

const newCardModal = document.querySelector("#new-card-popup");
const addCardButton = document.querySelector(".profile__add-button");
const newCardCloseButton = newCardModal?.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const newCardNameInput = newCardForm?.querySelector(
  ".popup__input_type_card-name"
);
const newCardLinkInput = newCardForm?.querySelector(".popup__input_type_url");

addCardButton?.addEventListener(
  "click",
  () => newCardModal && openModal(newCardModal)
);
newCardCloseButton?.addEventListener(
  "click",
  () => newCardModal && closeModal(newCardModal)
);
newCardModal?.addEventListener("mousedown", (evt) => {
  if (evt.target === newCardModal) closeModal(newCardModal);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = (newCardNameInput?.value || "").trim() || undefined;
  const link = (newCardLinkInput?.value || "").trim() || undefined;

  renderCard(name, link, cardsContainer);

  newCardForm?.reset();
  if (newCardModal) closeModal(newCardModal);
}

newCardForm?.addEventListener("submit", handleCardFormSubmit);
