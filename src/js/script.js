//= partials/faq.js

//= partials/tabs.js

//= partials/review-swiper.js

//= partials/modal.js

// Faq
function initFaq() {
  const faqManager = new FaqManager();

  document.querySelectorAll('.js-faq-item').forEach((item) => {
    const faqItem = new FaqItem(item);

    faqManager.addFaqItem(faqItem);
  })
}

// Табы
function initTabs() {
  document.querySelectorAll('.js-tabs').forEach((element) => {
    new Tabs(element);
  })
}

// Свайпер
function initSwiper() {
  initReviewSwiper('.js-review-swiper');
}

// Модальные окна
function initModals() {
  const bidModal = new Modal(
    document.getElementById('bid-modal'),
    document.querySelectorAll('.js-bid-modal-btn'),
  );

  // const successModal = new Modal(document.getElementById('success-modal'));

  // const errorModal = new Modal(document.getElementById('error-modal'));

  new ModalManager()
    .addModal('bid-modal', bidModal)
    // .addModal('success-modal', successModal)
    // .addModal('error-modal', errorModal);
}

// // Формы
// function initForms() {
//   ['contact-us-form', 'contact-us-form-modal', 'get-demo-form-modal'].forEach((selector) => {
//     const element = document.getElementById(selector);

//     if (!element) {
//       return;
//     }

//     const modalManager = new ModalManager();

//     const form = initForm(element, modalManager, 'success-modal', 'error-modal');

//     const parentModal = modalManager.getParentModal(element);

//     if (parentModal) {
//       parentModal.setNestedForm(form);
//     }
//   })
// }

// Бургер
function initBurger() {
  document.querySelector('.js-burger-btn').addEventListener('click', () => {
    document.body.classList.toggle('burger-opened');
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initFaq();

  initTabs();

  initSwiper();

  initModals();

  initBurger();
});