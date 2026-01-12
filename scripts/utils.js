const imageModal = document.querySelector("#image-popup");
const popupImage = imageModal?.querySelector(".popup__image");
const popupCaption = imageModal?.querySelector(".popup__caption");

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const handleImageClick = (card) => {
  popupImage.src = card._link;
  popupImage.alt = card._name;
  popupCaption.textContent = card._name;
  openModal(imageModal);
};

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

export {
  imageModal,
  validationConfig,
  handleImageClick,
  openModal,
  closeModal,
};
