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