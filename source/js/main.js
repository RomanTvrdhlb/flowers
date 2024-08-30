const topSliders = document.querySelectorAll(".top-slider");

document.addEventListener("DOMContentLoaded", function() {

  topSliders && topSliders.forEach(function(slider) {
    const swiper = slider.querySelector('.swiper-container');
    const pagination = slider.querySelector('.swiper-pagination');
    const swiperWrapper = slider.querySelector('.swiper-wrapper');
    const originalSlides = Array.from(swiperWrapper.children);

    let swiperInstance;
    let slidesCloned = false;

    const createSwiper = () => {
      swiperInstance = new Swiper(swiper, {
        spaceBetween  : 0,
        slidesPerView : 'auto',
        speed         : 2500,
        observer      : true,
        observeParents: true,
        centeredSlides: true,
        loop          : true,
        initialSlide  : 2,

        pagination: {
          el: pagination,
        },
        breakpoints: {
          320: {
            initialSlide: 2,
          },
          768: {
            initialSlide: 1,
            speed       : 1500,
          }
        }
      });
    };

    const cloneSlides = () => {
      if (originalSlides.length < 6 && !slidesCloned) {
        originalSlides.forEach(slide => {
          const clonedSlide = slide.cloneNode(true);
          swiperWrapper.appendChild(clonedSlide);
        });
        slidesCloned = true;
      }
    };

    cloneSlides();
    createSwiper();

    window.addEventListener('resize', () => {
      swiperInstance.update();
    });
  });
});
