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
    this.hiddenContentModifierClassName = 'tabs__content_hidden';
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

  isContentHidden() {
    return this.content.classList.contains(this.hiddenContentModifierClassName);
  }

  hideContent() {
    this.startTransition();

    this.content.classList.add(this.hiddenContentModifierClassName);
  }

  showContent() {
    this.content.classList.remove(this.hiddenContentModifierClassName);
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

    this.hideContent();
  }

  setActiveContent() {
    if (!this.isContentHidden()) {
      this.endTransition();

      return;
    }

    const key = this.activeTabBtn.getAttribute(this.keyAttributeName);

    this.contentItems.forEach((item) => {
      const itemKey = item.getAttribute(this.keyAttributeName);

      if (itemKey !== key) {
        item.classList.remove(this.activeContentModifierClassName);

        return;
      }
      
      item.classList.add(this.activeContentModifierClassName);
    })

    this.showContent();
  }

  init() {
    this.buttons.forEach((item) => {
      item.addEventListener('click', () => {
        this.setActiveTab(item);
      })
    })

    this.content.addEventListener('transitionend', () => {
      this.setActiveContent();
    })
  }
}

function initReviewSwiper(selector) {
  if (!selector || !document.querySelector(selector)) {
    return;
  }

  new Swiper(selector, {
    speed: 1200,
    // slidesPerView: 1,
    slidesPerView: 2,
    spaceBetween: 16,
    loop: false,
    // autoHeight: true,
    direction: 'horizontal',
    // breakpoints: {
    //   1480: {
    //     slidesPerView: 2,
    //   },
    // },
    navigation: {
      nextEl: '.js-review-swiper-btn-next',
      prevEl: '.js-review-swiper-btn-prev',
    },
  })
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
  let locationMap = new ymaps.Map(id, {
      center: [55.728829, 60.521423],
      zoom: 13
  })

  locationMap.geoObjects.add(
      new ymaps.Placemark([55.728829, 60.521423], {
          hintContent:'',
          balloonContent:''
      }, {
          iconLayout: 'default#image',
          iconImageHref: '../images/pin.png',
          iconImageSize: [27, 35],
          iconImageOffset: [-14, -35]
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

  initBurger();

  initLangMenu();
});