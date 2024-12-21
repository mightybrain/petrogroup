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