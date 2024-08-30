const topSliders = document.querySelectorAll(".top-slider");

document.addEventListener("DOMContentLoaded", function() {

  topSliders && topSliders.forEach(function(slider) {
    const swiper = slider.querySelector('.swiper-container');
    const pagination = slider.querySelector('.swiper-pagination');
    const swiperWrapper = slider.querySelector('.swiper-wrapper');
    const originalSlides = Array.from(swiperWrapper.children);

    let swiperInstance;
    let slidesCloned = false; // Флаг для отслеживания клонирования

    const createSwiper = () => {
      swiperInstance = new Swiper(swiper, {
        spaceBetween  : 0,
        slidesPerView : 3,
        speed         : 2500,
        observer      : true,
        observeParents: true,
        centeredSlides: true,
        initialSlide: 1,

        pagination: {
          el: pagination,
        },

        breakpoints: {
          320: {
            loop: true,
            slidesPerView : 'auto',
            initialSlide: 2,
          },
          768: {
            loop: false,
            slidesPerView : 3,
            initialSlide: 1,
          },
          1024: {
            allowTouchMove: false,
          }
        }
      });
    };

    // Клонирование слайдов
    const cloneSlides = () => {
      if (window.innerWidth < 768 && !slidesCloned) {
        originalSlides.forEach(slide => {
          const clonedSlide = slide.cloneNode(true);
          swiperWrapper.appendChild(clonedSlide);
        });
        slidesCloned = true; // Устанавливаем флаг
      }
    };

    // Удаление клонированных слайдов
    const removeClonedSlides = () => {
      if (window.innerWidth >= 768 && slidesCloned) {
        // Удаляем все слайды, кроме оригинальных
        while (swiperWrapper.children.length > originalSlides.length) {
          swiperWrapper.removeChild(swiperWrapper.lastElementChild);
        }
        slidesCloned = false; // Сбрасываем флаг
      }
    };

    // Обработка состояния при загрузке страницы
    if (window.innerWidth < 768) {
      cloneSlides();
    } else {
      removeClonedSlides();
    }

    createSwiper();

    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        cloneSlides();
      } else {
        removeClonedSlides();
      }
      swiperInstance.update(); // Обновляем инстанс Swiper, чтобы он учел изменения
    });
  });
});
