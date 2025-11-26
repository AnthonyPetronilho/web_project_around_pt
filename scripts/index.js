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

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close");
const modal = document.querySelector("#edit-popup");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

editButton.addEventListener("click", () => openModal(modal));
closeButton.addEventListener("click", () => closeModal(modal));

function fillProfileForm() {
  const currentName = document.querySelector(".profile__title").textContent;
  const currentAbout = document.querySelector(
    ".profile__description"
  ).textContent;

  document.querySelector("#name-input").value = currentName;
  document.querySelector("#about-input").value = currentAbout;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modal);
}

editButton.addEventListener("click", handleOpenEditModal);

formElement.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let aboutValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = aboutValue;

  closeModal(modal);
}
