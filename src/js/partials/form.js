class FileUploader {
  constructor(formItemElement) {
    this.element = formItemElement;
    this.input = formItemElement.querySelector('input');
    this.fileLabel = formItemElement.querySelector('.js-file-label');

    this.defaultFileLabel = 'Файл не выбран';

    this.file = null;

    this.init();
  }

  init() {
    this.input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      
      if (file) {
        this.fileLabel.textContent = file.name;

        return;
      }

      this.fileLabel.textContent = this.defaultFileLabel;
    })
  }
}

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

    this.init();
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

    if (!formIsValid || this.isLoading) {
      return;
    }

    const formData = new FormData(event.target);

    console.log(Object.fromEntries(formData.entries()))

    // this.isLoading = true;

    // form.classList.add(this.isLoadingModifierClassName);
  }

  init() {
    this.formItems.forEach((item) => {
      const type = item.getAttribute('data-type');

      if (type === 'phone') {
        const input = item.querySelector('input')

        input.addEventListener('input', (event) => {
          const value = event.target.value.replace(/\D+/g, '');
  
          event.target.value = value.slice(0, 11);
        })
      }

      if (type === 'file') {
        new FileUploader(item)
      }
    })

    this.form.addEventListener('submit', (event) => {
      this.handleSubmit(event);
    });
  }
}
