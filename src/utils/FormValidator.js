export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputs = [...this._form.querySelectorAll(this._config.inputSelector)];
    this._btn = this._form.querySelector(this._config.submitButtonSelector);
  }

  _showError(input) {
    this._error = this._form.querySelector(`#${input.id}-error`);
    this._error.textContent = input.validationMessage;
    this._error.classList.add(this._config.errorClass);
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(input) {
    this._error = this._form.querySelector(`#${input.id}-error`);
    this._error.textContent = "";
    this._error.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity = (input) => {
    if (input.validity.valid) {
      this._hideError(input)
    } else {
      this._showError(input)
    }
  };

  _toggleButton() {
    const isformValid = this._inputs.every((input) => input.validity.valid);
    if (isformValid) {
      this._btn.classList.remove(this._config.inactiveButtonClass);
      this._btn.disabled = false;
    } else {
      this._btn.classList.add(this._config.inactiveButtonClass);
      this._btn.disabled = true;
    }
  }

  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  }

  resetValidation() {
    this._toggleButton();
    this._inputs.forEach((input) => {
      this._hideError(input);
    });
  }

  enableValidation() {
     this._setEventListeners();
  }
}
