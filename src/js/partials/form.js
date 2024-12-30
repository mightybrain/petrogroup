// import { postForm } from './telegram';
// import { validateName, validateText, validateEmail, validatePhone, validatePersonalData } from './validators';

// function formatPhoneNumber(value) {
//   const numberLength = 11;

//   let result = '+';

//   if (value.length === 0) {
//     return '';
//   }

//   for (let i = 0; i < value.length && i < numberLength; i++) {
//     switch (i) {
//       case 0:
//         result += '7 (';
//         continue;
//       case 4:
//         result += ') ';
//         break;
//       case 7:
//       case 9:
//         result += '-';
//         break;
//       default:
//         break;
//     }

//     result += value[i];
//   }

//   return result;
// };

// export function initForm(form, modalManager, successModalKey, errorModalKey) {
//   if (!form) {
//     return;
//   }

//   let formIsLoading = false;

//   const nameInput = form.querySelector('.js-name-input');
//   const phoneInput = form.querySelector('.js-phone-input');
//   const emailInput = form.querySelector('.js-email-input');
//   const companyInput = form.querySelector('.js-company-input');
//   const personalDataCheckbox = form.querySelector('.js-personal-data-input');
//   const submitBtn = form.querySelector('.js-submit-btn');

//   const inputErrorClassName = 'common__input_error';
//   const inputNotEmptyClassName = 'common__input_not-empty';
//   const formIsLoadingClassName = 'common__form_is-loading';

//   function disableSubmit() {
//     submitBtn.setAttribute('disabled', '');
//   }

//   function enableSubmit() {
//     submitBtn.removeAttribute('disabled');
//   }

//   function resetNotEmpty(element) {
//     element.classList.remove(inputNotEmptyClassName);
//   }

//   function setNotEmpty(element) {
//     element.classList.add(inputNotEmptyClassName);
//   }

//   function resetError(element) {
//     element.classList.remove(inputErrorClassName);
//   }

//   function setError(element) {
//     element.classList.add(inputErrorClassName);

//     element.addEventListener('input', () => {
//       resetError(element);
//     }, { once: true });
//   }

//   function resetFieldsMarks() {
//     const errorFields = form.querySelectorAll(`.${inputErrorClassName}`);

//     errorFields.forEach(resetError);

//     const notEmptyFields = form.querySelectorAll(`.${inputNotEmptyClassName}`);

//     notEmptyFields.forEach(resetNotEmpty);
//   }

//   function handleFieldTouch(element) {
//     if (element.value === '') {
//       resetNotEmpty(element);

//       return;
//     }

//     setNotEmpty(element);
//   }

//   function resetForm() {
//     form.reset();

//     resetFieldsMarks();

//     enableSubmit();
//   }

//   function handleParentModalClosed() {
//     resetForm();
//   }

//   function validateField(element, validator) {
//     const isValid = validator(element);

//     if (!isValid) {
//       setError(element);
//     }

//     return isValid;
//   }

//   function validateForm() {
//     const isValidName = validateField(nameInput, validateName);
//     const isValidEmail = validateField(emailInput, validateEmail);
//     const isValidPhone = validateField(phoneInput, validatePhone);
//     const isValidCompany = validateField(companyInput, validateText);
//     const isValidPersonalData = validateField(personalDataCheckbox, validatePersonalData);

//     return [isValidName, isValidEmail, isValidPhone, isValidCompany, isValidPersonalData]
//       .every(Boolean);
//   }

//   function generateSuccessMessage() {
//     return `Привет!
//       \nПоступила новая заявка с лэндинга SimpleConstruction.
//       \nИмя: ${nameInput.value.trim()}
//       \nТелефон: ${phoneInput.value}
//       \nEmail: ${emailInput.value}
//       \nКомпания: ${companyInput.value?.trim() || 'Не указано'}
//     `;
//   }

//   async function onSubmit(event) {
//     event.preventDefault();

//     const formIsValid = validateForm();

//     if (!formIsValid || formIsLoading) {
//       return;
//     }

//     formIsLoading = true;

//     form.classList.add(formIsLoadingClassName);

//     try {
//       const message = generateSuccessMessage();

//       await postForm(message);

//       resetForm();

//       modalManager.closeAnyModal();

//       modalManager.openModal(successModalKey);
//     } catch (error) {
//       console.error(error);

//       modalManager.openModal(errorModalKey);
//     } finally {
//       formIsLoading = false;

//       form.classList.remove(formIsLoadingClassName);
//     }
//   }

//   function updateSubmitBtnState() {
//     if (personalDataCheckbox.checked) {
//       enableSubmit();

//       return;
//     }

//     disableSubmit();
//   }

//   function initHandlers() {
//     [nameInput, emailInput, companyInput].forEach((element) => {
//       element.addEventListener('input', () => {
//         handleFieldTouch(element);
//       });
//     })

//     phoneInput.addEventListener('input', () => {
//       const value = phoneInput.value.replace(/\D+/g, '');

//       phoneInput.value = formatPhoneNumber(value);

//       handleFieldTouch(phoneInput);
//     });

//     phoneInput.addEventListener('focus', () => {
//       if (phoneInput.value === '') {
//         phoneInput.value = '+7 (';
//       }
//     });

//     phoneInput.addEventListener('blur', () => {
//       if (phoneInput.value === '+7 (') {
//         phoneInput.value = '';
//       }

//       handleFieldTouch(phoneInput);
//     });

//     personalDataCheckbox.addEventListener('change', () => {
//       updateSubmitBtnState();
//     });

//     form.addEventListener('submit', onSubmit);
//   }

//   initHandlers();

//   return {
//     handleParentModalClosed,
//   }
// }
