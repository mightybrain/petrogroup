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