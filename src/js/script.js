//= partials/validator.js

//= partials/faq.js

//= partials/tabs.js

//= partials/scroll-tabs.js

//= partials/review-swiper.js

//= partials/shipping-countries-swiper.js

//= partials/modal.js

//= partials/yandex-map.js

//= partials/form.js

//= partials/vacancy-preview.js

//= partials/logistics.js

//= partials/shipping.js

//= partials/video.js

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

function initScrollTabs() {
  document.querySelectorAll('.js-scroll-tabs').forEach((element) => {
    new ScrollTabs(element);
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

function initVacancyPreview() {
  document.querySelectorAll('.js-vacancy-preview').forEach((item) => {
    new VacancyPreview(item);
  })
}

function initLogistics() {
  if (document.querySelector('.js-logistics-map')) {
    new Logistics(document.querySelector('.js-logistics-map'))
  }
}

function initShipping() {
  if (document.querySelector('.js-shipping')) {
    new Shipping(document.querySelector('.js-shipping'));
  }
}

function initCustomVideo() {
  if (document.querySelector('.js-video')) {
    new CustomVideo(document.querySelector('.js-video'));
  }
}

if(document.getElementById('map')){
  ymaps.ready(() => {
    initYandexMap('map')
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFaq();

  initTabs();

  initScrollTabs();

  initSwiper();

  initModals();

  initForms();

  initBurger();

  initLangMenu();

  initVacancyPreview();

  initLogistics();

  initShipping();

  initCustomVideo();
});