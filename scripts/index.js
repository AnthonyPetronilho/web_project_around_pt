// Cartões iniciais
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

// =========================
// Template e renderização
// =========================
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Cria um elemento de cartão a partir do template, com valores padrão
function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg"
) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
}

// Adiciona o cartão ao início do container
function renderCard(name, link, container) {
  const card = getCardElement(name, link);
  container.prepend(card);
}

// Renderiza os cartões iniciais
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

// =========================
// Lógica do popup de perfil
// =========================
const editModal = document.querySelector("#edit-popup");
const editButton = document.querySelector(".profile__edit-button");
const editCloseButton = editModal.querySelector(".popup__close");

const formElement = document.querySelector("#edit-profile-form");
const nameInput = editModal.querySelector(".popup__input_type_name");
const jobInput = editModal.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

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

// Fecha ao clicar no overlay (edit-popup)
editModal.addEventListener("mousedown", (evt) => {
  if (evt.target === editModal) {
    closeModal(editModal);
  }
});

function fillProfileForm() {
  nameInput.value = profileTitle.textContent.trim();
  jobInput.value = profileDescription.textContent.trim();
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

if (editButton) {
  editButton.addEventListener("click", handleOpenEditModal);
}

if (editCloseButton) {
  editCloseButton.addEventListener("click", () => closeModal(editModal));
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editModal);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// =========================
// Popup "Novo Local" e novo cartão
// =========================
const newCardModal = document.querySelector("#new-card-popup");
const addCardButton = document.querySelector(".profile__add-button");
const newCardCloseButton = newCardModal.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const newCardNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const newCardLinkInput = newCardForm.querySelector(".popup__input_type_url");

// Abrir o popup ao clicar no "+"
if (addCardButton) {
  addCardButton.addEventListener("click", () => openModal(newCardModal));
}

// Fechar pelo botão de fechar
if (newCardCloseButton) {
  newCardCloseButton.addEventListener("click", () => closeModal(newCardModal));
}

// Fechar ao clicar no overlay
newCardModal.addEventListener("mousedown", (evt) => {
  if (evt.target === newCardModal) {
    closeModal(newCardModal);
  }
});

// Manipulador do formulário "Novo Local"
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  // Trim e fallback para acionar os padrões se necessário
  const name = newCardNameInput.value.trim() || undefined;
  const link = newCardLinkInput.value.trim() || undefined;

  // Adiciona o novo cartão no início
  renderCard(name, link, cardsContainer);

  // Limpa o formulário e fecha o popup
  newCardForm.reset();
  closeModal(newCardModal);
}

// Ouve o submit do formulário "Novo Local"
newCardForm.addEventListener("submit", handleCardFormSubmit);
