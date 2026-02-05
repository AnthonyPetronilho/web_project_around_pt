import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__button");
    this._defaultSubmitText = this._submitButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading, loadingText = "Salvando...") {
    if (!this._submitButton) return;

    if (isLoading) {
      this._submitButton.textContent = loadingText;
      this._submitButton.classList.add("popup__button_loading");
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._defaultSubmitText;
      this._submitButton.classList.remove("popup__button_loading");
      this._submitButton.disabled = false;
    }
  }
}

export default PopupWithForm;
