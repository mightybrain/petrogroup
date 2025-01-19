class CustomForm {
  constructor(form, validator, modalManager) {
    this.form = form;
    this.validator = validator;
    this.modalManager = modalManager;

    this.isLoading = false;

    this.formItems = Array.from(form.querySelectorAll('.js-form-item'));

    this.submitBtn = form.querySelector('.js-submit-btn');

    this.isLoadingModifierClassName = 'form_is-loading';
    this.errorModifierClassName = 'form__item_error';

    this.initHandlers();
  }

  resetError(item) {
    item.classList.remove(this.errorModifierClassName);
  }

  resetForm() {
    this.form.reset();
  }

  handleParentModalClosed() {
    // this.resetForm();
  }

  setError(item) {
    item.classList.add(this.errorModifierClassName);

    const inputElems = item.querySelectorAll('input');

    const resetError = () => {
      this.resetError(item);

      inputElems.forEach((inputEl) => {
        inputEl.removeEventListener('change', resetError);
      })
    }

    inputElems.forEach((inputEl) => {
      inputEl.addEventListener('change', resetError);
    })
  }

  validateField(item) {
    const validatorKey = item.getAttribute('data-type');

    if (!validatorKey) {
      return true;
    }

    const validator = this.validator.getValidator(validatorKey);

    if (!validator) {
      return false;
    }

    const isRequired = item.hasAttribute('data-req');

    if (validatorKey === 'checkboxGroup') {
      const inputElems = Array.from(item.querySelectorAll('input'));

      return !isRequired || validator(inputElems);
    }

    const inputEl = item.querySelector('input');

    return (!isRequired && !inputEl.value) || validator(inputEl);
  }

  validateForm() {
    const itemsWithError = this.formItems.filter((item) => !this.validateField(item));

    itemsWithError.forEach((item) => {
      this.setError(item);
    })

    const formIsValid = !itemsWithError.length;

    return formIsValid;
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formIsValid = this.validateForm();

    // if (!formIsValid || this.isLoading) {
    //   return;
    // }

    // this.isLoading = true;

    // form.classList.add(this.isLoadingModifierClassName);
  }

  initHandlers() {
    // phoneInput.addEventListener('input', () => {
    //   const value = phoneInput.value.replace(/\D+/g, '');

    //   phoneInput.value = formatPhoneNumber(value);

    //   handleFieldTouch(phoneInput);
    // });

    this.form.addEventListener('submit', (event) => {
      this.handleSubmit(event);
    });
  }
}
