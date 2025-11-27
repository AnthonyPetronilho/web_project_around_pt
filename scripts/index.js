// Aguarda o DOM para garantir que #card-template exista antes de usá-lo
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Cartões iniciais
  // =========================
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
  const templateNode = document.querySelector("#card-template");

  if (!cardsContainer) {
    console.error('Container ".cards__list" não encontrado.');
  }
  if (!templateNode) {
    console.error(
      'Template "#card-template" não encontrado. Os cartões não serão renderizados.'
    );
  }

  const cardTemplate = templateNode
    ? templateNode.content.querySelector(".card")
    : null;

  // Handler do like
  function handleLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  // Cria um elemento de cartão a partir do template, com valores padrão
  function getCardElement(
    name = "Lugar sem nome",
    link = "./images/placeholder.jpg"
  ) {
    if (!cardTemplate) return null;

    const cardElement = cardTemplate.cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    likeButton.addEventListener("click", handleLikeButton);

    return cardElement;
  }

  // Adiciona o cartão ao início do container
  function renderCard(name, link, container) {
    const card = getCardElement(name, link);
    if (card && container) {
      container.prepend(card);
    }
  }

  // Renderiza os cartões iniciais somente se o template existir
  if (cardTemplate && cardsContainer) {
    initialCards.forEach((card) => {
      renderCard(card.name, card.link, cardsContainer);
    });
  }

  // =========================
  // Pop-up: Editar perfil
  // =========================
  const editModal = document.querySelector("#edit-popup");
  const editButton = document.querySelector(".profile__edit-button");
  const editCloseButton = editModal?.querySelector(".popup__close");

  const formElement = document.querySelector("#edit-profile-form");
  const nameInput = editModal?.querySelector(".popup__input_type_name");
  const jobInput = editModal?.querySelector(".popup__input_type_description");
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

  // Fechar ao clicar no overlay (editar perfil)
  editModal?.addEventListener("mousedown", (evt) => {
    if (evt.target === editModal) {
      closeModal(editModal);
    }
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

  // =========================
  // Pop-up: Novo Local
  // =========================
  const newCardModal = document.querySelector("#new-card-popup");
  const addCardButton = document.querySelector(".profile__add-button");
  const newCardCloseButton = newCardModal?.querySelector(".popup__close");
  const newCardForm = document.querySelector("#new-card-form");
  const newCardNameInput = newCardForm?.querySelector(
    ".popup__input_type_card-name"
  );
  const newCardLinkInput = newCardForm?.querySelector(".popup__input_type_url");

  // Abrir/fechar/overlay
  addCardButton?.addEventListener(
    "click",
    () => newCardModal && openModal(newCardModal)
  );
  newCardCloseButton?.addEventListener(
    "click",
    () => newCardModal && closeModal(newCardModal)
  );
  newCardModal?.addEventListener("mousedown", (evt) => {
    if (evt.target === newCardModal) {
      closeModal(newCardModal);
    }
  });

  // Submit: cria novo cartão no topo
  function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const name = (newCardNameInput?.value || "").trim() || undefined;
    const link = (newCardLinkInput?.value || "").trim() || undefined;

    renderCard(name, link, cardsContainer);

    newCardForm?.reset();
    if (newCardModal) closeModal(newCardModal);
  }

  newCardForm?.addEventListener("submit", handleCardFormSubmit);
});
