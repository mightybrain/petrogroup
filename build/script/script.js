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

    this.buttons = tabsContainer.querySelectorAll('.js-tab-button');

    this.content = tabsContainer.querySelector('.js-tab-content');

    this.contentItems = tabsContainer.querySelectorAll('.js-tab-content-item');

    this.keyAttributeName = 'data-key';
    this.inTransitionModifierClassName = 'tabs__content_in-transition';
    this.hiddenContentModifierClassName = 'tabs__content_hidden';
    this.activeTabModifierClassName = 'tabs__item-button_active';
    this.activeContentModifierClassName = 'tabs__content-item_active';

    this.activeTabButton = null;

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

    this.activeTabButton = tab;

    this.hideContent();
  }

  setActiveContent() {
    if (!this.isContentHidden()) {
      this.endTransition();

      return;
    }

    const key = this.activeTabButton.getAttribute(this.keyAttributeName);

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

document.addEventListener('DOMContentLoaded', () => {
  initFaq();

  initTabs();
});