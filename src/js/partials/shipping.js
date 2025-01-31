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

  toggleActiveCountry(activeCountry) {
    if (!activeCountry) {
      return
    }

    const currentActiveCountry = this.element.getAttribute('data-country');

    if (currentActiveCountry === activeCountry) {
      return
    }

    this.element.setAttribute('data-country', activeCountry);
  }

  init() {
    this.pins.forEach((item) => {
      item.addEventListener('click', () => {
        this.toggleActiveCountry(item.getAttribute('data-country'));
      })
    })

    this.btns.forEach((item) => {
      item.addEventListener('click', () => {
        this.toggleActiveCountry(item.getAttribute('data-country'));
      })
    })
  }
}