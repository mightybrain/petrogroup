function initShippingCountriesSwiper(selector) {
  if (!selector || !document.querySelector(selector)) {
    return;
  }

  const breakPoint = 1160;

  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 16,
  }

  let swiper;

  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth > breakPoint && swiper){
      swiper.destroy();
      
      swiper = null;

      return;
    }
      
    if (document.documentElement.clientWidth <= breakPoint && !swiper){
      swiper = new Swiper(selector, swiperOptions)
    }
  })

  if (document.documentElement.clientWidth > breakPoint) {
    return;
  }

  swiper = new Swiper(selector, swiperOptions)
}
