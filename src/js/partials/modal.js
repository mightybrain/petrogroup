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
