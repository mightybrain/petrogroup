class Validator {
  static instance = null;

  constructor() {
    if (!Validator.instance) {
      this.init();

      Validator.instance = this;
    }

    return this;
  }

  validateName(inputEl) {
    const reg = /^[a-zA-Zа-яА-Я- ]{1,}$/;
  
    return reg.test(inputEl.value.trim());
  }
  
  validatePhone(inputEl) {
    return inputEl.value.length === 11 && !inputEl.value.replace(/\d+/g, '').length;
  }
  
  validateEmail(inputEl) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    return emailPattern.test(inputEl.value);
  }
  
  validateCheckbox(chekboxEl) {
    return chekboxEl.checked;
  }

  validateCheckboxGroup(checkboxElems) {
    return checkboxElems.some((item) => item.checked);
  }

  validateFile(fileInput) {
    // Валидировать файл тут
    return true
  }

  init() {
    this.validators = {
      name: this.validateName,
      phone: this.validatePhone,
      email: this.validateEmail,
      checkbox: this.validateCheckbox,
      checkboxGroup: this.validateCheckboxGroup,
      file: this.validateFile,
    }
  }

  getValidator(key) {
    return this.validators[key];
  }
}
