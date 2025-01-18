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
    const phonePattern = /^\+?[\d\s\-()]+$/;
    
    return phonePattern.test(inputEl.value) && inputEl.value.length === 18; // с учетом маски 11 цифр + 7 элементов маски
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

  init() {
    this.validators = {
      name: this.validateName,
      phone: this.validatePhone,
      email: this.validateEmail,
      checkbox: this.validateCheckbox,
      checkboxGroup: this.validateCheckboxGroup,
    }
  }

  getValidator(key) {
    return this.validators[key];
  }
}
