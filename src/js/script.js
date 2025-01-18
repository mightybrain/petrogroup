//= partials/validator.js

//= partials/faq.js

//= partials/tabs.js

//= partials/review-swiper.js

//= partials/shipping-countries-swiper.js

//= partials/modal.js

//= partials/yandex-map.js

//= partials/form.js

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

  initShippingCountriesSwiper('.js-shipping-countries-swiper');
}

// Модальные окна
function initModals() {
  const bidModal = new Modal(
    document.getElementById('bid-modal'),
    document.querySelectorAll('.js-bid-modal-btn'),
  );

  const cvModal = new Modal(
    document.getElementById('cv-modal'),
    document.querySelectorAll('.js-cv-modal-btn'),
  );

  // const successModal = new Modal(document.getElementById('success-modal'));

  // const errorModal = new Modal(document.getElementById('error-modal'));

  new ModalManager()
    .addModal('bid-modal', bidModal)
    .addModal('cv-modal', cvModal)
    // .addModal('success-modal', successModal)
    // .addModal('error-modal', errorModal);
}

// Формы
function initForms() {
  const modalManager = new ModalManager();

  const validator = new Validator()

  document.querySelectorAll('.js-form').forEach((item) => {
    const form = new CustomForm(item, validator, modalManager);

    const parentModal = modalManager.getParentModal(item);

    if (parentModal) {
      parentModal.setNestedForm(form);
    }
  })
}

// Бургер
function initBurger() {
  document.querySelector('.js-burger-btn').addEventListener('click', () => {
    document.body.classList.toggle('burger-opened');
  })
}

function initLangMenu() {
  document.querySelector('.js-lang-btn').addEventListener('click', () => {
    document.body.classList.toggle('lang-opened');
  })

  document.querySelector('.js-lang-overlay').addEventListener('click', () => {
    document.body.classList.remove('lang-opened');
  })
}

if(document.getElementById('map')){
  ymaps.ready(() => {
    initYandexMap('map')
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFaq();

  initTabs();

  initSwiper();

  initModals();

  initForms();

  initBurger();

  initLangMenu();
});