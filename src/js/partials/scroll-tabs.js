class ScrollTabs {
  constructor(tabsContainer) {
    this.tabsContainer = tabsContainer;

    this.buttons = tabsContainer.querySelectorAll('.js-tab-btn');

    this.keyAttributeName = 'data-key';
    this.activeTabModifierClassName = 'tabs__btn_active';

    this.init();
  }

  scrollToTabContent(tab) {
    this.buttons.forEach((item) => {
      item.classList.remove(this.activeTabModifierClassName);
    })

    tab.classList.add(this.activeTabModifierClassName);

    const key = tab.getAttribute(this.keyAttributeName);

    const content = document.querySelector(`#${key}`)

    if (content) {
      content.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  init() {
    this.buttons.forEach((item) => {
      item.addEventListener('click', () => {
        this.scrollToTabContent(item);
      })
    })
  }
}