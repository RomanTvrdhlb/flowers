const topSliders = document.querySelectorAll(".top-slider");

document.addEventListener("DOMContentLoaded", function(e) {
    
  topSliders && topSliders.forEach(function(slider){
    const swiper = slider.querySelector('.swiper-container');
    const pagination = slider.querySelector('.swiper-pagination');

    new Swiper(swiper, {
      spaceBetween  : 36,
      slidesPerView : 3,
      speed         : 2500,
      observer      : true,
      observeParents: true,
      centeredSlides: true,
      initialSlide  : 1,
      
      pagination:{
        el: pagination,
      },

      breakpoints: {
        320: {
          spaceBetween  : 10,
        },
        576: {
          spaceBetween  : 15,
        },
        640: {
          spaceBetween  : 25,
        },
        1024: {
          spaceBetween  : 36,
        }
      }
    });

  });
})