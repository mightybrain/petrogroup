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