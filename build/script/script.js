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

class FaqItem {
  constructor(element) {
    this.element = element;
    this.descriptionWrapper = element.querySelector('.js-faq-description-wrapper');
    this.description = element.querySelector('.js-faq-description');

    this.faqItemOpenedClassName = 'faq-item_opened';

    this.faqManager = null;

    this.initHandlers();
  }

  isOpened() {
    return this.element.classList.contains(this.faqItemOpenedClassName);
  }

  open() {
    if (this.faqManager) {
      this.faqManager.handleItemOpen();
    }

    this.element.classList.add(this.faqItemOpenedClassName);

    this.descriptionWrapper.style.height = this.description.clientHeight + 'px';
  }

  close() {
    this.element.classList.remove(this.faqItemOpenedClassName);

    this.descriptionWrapper.style.height = 0;
  }

  initHandlers() {
    this.element.addEventListener('click', () => {
      if (this.isOpened()) {
        this.close();

        return;
      }

      this.open();
    });

    window.addEventListener('resize', () => {
      if (this.isOpened()) {
        this.descriptionWrapper.style.height = this.description.clientHeight + 'px';
      }
    })
  }

  setFaqManager(manager) {
    this.faqManager = manager;
  }
}

class FaqManager {
  constructor() {
    this.faqItems = [];
  }

  closeAll() {
    this.faqItems.forEach((item) => {
      item.close();
    })
  }

  handleItemOpen() {
    this.closeAll();
  }

  addFaqItem(faqItem) {
    faqItem.setFaqManager(this);

    this.faqItems.push(faqItem);
  }
}

class Tabs {
  constructor(tabsContainer) {
    this.tabsContainer = tabsContainer;

    this.buttons = tabsContainer.querySelectorAll('.js-tab-btn');

    this.content = tabsContainer.querySelector('.js-tab-content');

    this.contentItems = tabsContainer.querySelectorAll('.js-tab-content-item');

    this.keyAttributeName = 'data-key';
    this.inTransitionModifierClassName = 'tabs__content_in-transition';
    this.activeTabModifierClassName = 'tabs__btn_active';
    this.activeContentModifierClassName = 'tabs__content-item_active';

    this.activeTabBtn = null;

    this.init();
  }

  isInTransition() {
    return this.content.classList.contains(this.inTransitionModifierClassName);
  }

  startTransition() {
    this.content.classList.add(this.inTransitionModifierClassName);
  }

  endTransition() {
    this.content.classList.remove(this.inTransitionModifierClassName);
  }

  setActiveContent() {
    const key = this.activeTabBtn.getAttribute(this.keyAttributeName);

    this.contentItems.forEach((item) => {
      const itemKey = item.getAttribute(this.keyAttributeName);

      if (itemKey !== key) {
        item.classList.remove(this.activeContentModifierClassName);

        return;
      }
      
      item.classList.add(this.activeContentModifierClassName);
    })
  }

  setActiveTab(tab) {
    if (this.isInTransition()) {
      return;
    }

    if (tab.classList.contains(this.activeTabModifierClassName)) {
      return;
    }

    this.buttons.forEach((item) => {
      item.classList.remove(this.activeTabModifierClassName);
    })

    tab.classList.add(this.activeTabModifierClassName);

    this.activeTabBtn = tab;

    this.startTransition();

    setTimeout(() => {
      this.setActiveContent();

      this.endTransition();
    }, 300)
  }

  init() {
    this.buttons.forEach((item) => {
      item.addEventListener('click', () => {
        this.setActiveTab(item);
      })
    })
  }
}

function initReviewSwiper(selector) {
  if (!selector || !document.querySelector(selector)) {
    return;
  }

  new Swiper(selector, {
    speed: 1200,
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      661: {
        slidesPerView: 2,
      },
    },
    navigation: {
      nextEl: '.js-review-swiper-btn-next',
      prevEl: '.js-review-swiper-btn-prev',
    },
  })
}

function initShippingCountriesSwiper(selector) {
  if (!selector || !document.querySelector(selector)) {
    return;
  }

  const breakPoint = 1160;

  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 16,
  }

  let swiper;

  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth > breakPoint && swiper){
      swiper.destroy();
      
      swiper = null;

      return;
    }
      
    if (document.documentElement.clientWidth <= breakPoint && !swiper){
      swiper = new Swiper(selector, swiperOptions)
    }
  })

  if (document.documentElement.clientWidth > breakPoint) {
    return;
  }

  swiper = new Swiper(selector, swiperOptions)
}

class ModalManager {
  static instance = null;

  constructor() {
    if (!ModalManager.instance) {
      this.init();

      ModalManager.instance = this;
    }

    return ModalManager.instance;
  }

  init() {
    this.modals = {};
  }

  addModal(key, modal) {
    if (!key || !modal) {
      throw new Error('Не указан ключ или элемент модального окна');
    }

    if (this.modals[key]) {
      throw new Error(`Модальное окно с ключом ${key} уже существует`);
    }

    this.modals[key] = modal;

    modal.setModalManager(this);

    return this;
  }

  openModal(key) {
    this.modals[key]?.openModal();
  }

  closeModal(key) {
    this.modals[key]?.closeModal();
  }

  hasOpenedModals() {
    const modals = Object.values(this.modals);

    return modals.some((modal) => modal.isOpened());
  }

  closeAnyModal() {
    const modals = Object.values(this.modals);

    modals.forEach((modal) => {
      if (modal.isOpened()) {
        modal.closeModal();
      }
    })
  }

  getParentModal(element) {
    const modals = Object.values(this.modals);

    return modals.find((modal) => modal.hasNestedElement(element));
  }
}

class Modal {
  constructor(element, openModalBtns = []) {
    this.element = element;
    this.openModalBtns = openModalBtns;
    this.modalOverlay = element.querySelector('.js-modal-overlay');
    this.closeModalBtns = element.querySelectorAll('.js-modal-close-btn');

    this.modalManager = null;
    this.nestedForm = null;

    this.initHandlers();
  }

  isOpened() {
    return !this.element.hasAttribute('hidden');
  }

  openModal() {
    document.body.classList.add('modal-opened');

    this.element.removeAttribute('hidden');
  };

  closeModal() {
    this.element.setAttribute('hidden', '');

    if (!this.modalManager || !this.modalManager.hasOpenedModals()) {
      document.body.classList.remove('modal-opened');
    }

    if (this.nestedForm) {
      this.nestedForm.handleParentModalClosed();
    }
  };

  hasNestedElement(nestedElement) {
    return this.element.contains(nestedElement);
  }

  setNestedForm(form) {
    this.nestedForm = form;
  }

  setModalManager(manager) {
    this.modalManager = manager;
  }

  initHandlers() {
    this.openModalBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.openModal();
      });
    });

    this.closeModalBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.closeModal();
      });
    });

    this.modalOverlay?.addEventListener('click', (event) => {
      if (event.target === this.modalOverlay) {
        this.closeModal();
      }
    });
  
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !this.element.hasAttribute('hidden')) {
        this.closeModal();
      }
    });
  }
}

function initYandexMap(id){ 
  const locationMap = new ymaps.Map(id, {
    center: [59.977201, 30.314817],
    zoom: 17,
  })

  locationMap.geoObjects.add(
    new ymaps.Placemark([59.977201, 30.314817], {
      hintContent:'',
      balloonContent:'',
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../images/pin.png',
      iconImageSize: [40, 47],
      iconImageOffset: [-20, -23],
    })
  )

  locationMap.behaviors.disable('scrollZoom');
  locationMap.controls.remove('searchControl');
  locationMap.controls.remove('rulerControl');
  locationMap.controls.remove('typeSelector');
  locationMap.controls.remove('trafficControl');
  locationMap.controls.remove('geolocationControl');
  locationMap.controls.remove('fullscreenControl');
  locationMap.controls.remove('routeButtonControl');
}

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

class VacancyPreview {
  constructor(element) {
    this.element = element;
    this.container = element.querySelector('.js-hidden-content-container');
    this.content = element.querySelector('.js-hidden-content');
    this.toggleBtn = element.querySelector('.js-toggle-btn');

    this.vacancyPreviewOpenedClassName = 'vacancy-preview_opened';

    this.initHandlers();
  }

  isOpened() {
    return this.element.classList.contains(this.vacancyPreviewOpenedClassName);
  }

  open() {
    this.element.classList.add(this.vacancyPreviewOpenedClassName);

    this.container.style.height = this.content.clientHeight + 'px';

    this.toggleBtn.innerText = 'Скрыть';
  }

  close() {
    this.container.style.removeProperty('height');

    this.element.classList.remove(this.vacancyPreviewOpenedClassName);
  
    this.toggleBtn.innerText = 'Подробнее';
  }

  initHandlers() {
    this.toggleBtn.addEventListener('click', () => {
      if (this.isOpened()) {
        this.close();

        return;
      }

      this.open();
    });

    window.addEventListener('resize', () => {
      if (this.isOpened()) {
        this.container.style.height = this.content.clientHeight + 'px';
      }
    })
  }
}

class Logistics {
  constructor(element) {
    this.element = element;
    this.mapImage = element.querySelector('.js-logistics-map-image');
    this.pins = element.querySelector('.js-logistics-pins');

    this.init();
  }

  updateMapImagePosition(event) {
    this.mapImage.style.transform = `translateX(-${event.target.scrollLeft}px)`;
  }

  init() {
    this.pins.addEventListener('scroll', (event) => {
      this.updateMapImagePosition(event);
    })
  }
}

class Shipping {
  instance = null;

  constructor(element) {
    if (!Shipping.instance) {
      this.element = element;
      this.pins = element.querySelectorAll('.js-pin');
      this.btns = element.querySelectorAll('.js-country-btn');
  
      this.init()

      Shipping.instance = this;
    }

    return Shipping.instance
  }

  setActiveCountry(activeCountry) {
    if (!activeCountry) {
      this.element.removeAttribute('data-country');

      return
    }


    this.element.setAttribute('data-country', activeCountry);
  }

  init() {
    this.pins.forEach((item) => {
      item.addEventListener('click', () => {
        this.setActiveCountry(item.getAttribute('data-country'));
      })
    })

    this.btns.forEach((item) => {
      item.addEventListener('click', () => {
        this.setActiveCountry(item.getAttribute('data-country'));
      })
    })
  }
}

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

  initVacancyPreview();

  initLogistics();

  initShipping();
});