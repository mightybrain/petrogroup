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