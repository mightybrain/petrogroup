function initShippingSwiper() {
  return new Swiper('.js-shipping-slider', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: false,
    direction: 'horizontal',
  })
}

if (document.querySelector('.js-shipping-slider')) {
  if (document.documentElement.clientWidth > 1160) {
    return;
  }

  let swiper = initShippingSwiper();

  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth > 1160 && swiper){
      swiper.destroy();
      
      swiper = null;

      return;
    }
      
    if (!swiper){
      swiper = initShippingSwiper();
    }
  })
}
