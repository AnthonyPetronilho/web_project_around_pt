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

initialCards.forEach(function (card) {
  console.log(card.name);
});

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
