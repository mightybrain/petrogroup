function initReviewSwiper(selector) {
  if (!selector || !document.querySelector(selector)) {
    return;
  }

  new Swiper(selector, {
    speed: 1200,
    // slidesPerView: 1,
    slidesPerView: 2,
    spaceBetween: 16,
    loop: false,
    // autoHeight: true,
    direction: 'horizontal',
    // breakpoints: {
    //   1480: {
    //     slidesPerView: 2,
    //   },
    // },
    navigation: {
      nextEl: '.js-review-swiper-btn-next',
      prevEl: '.js-review-swiper-btn-prev',
    },
  })
}
