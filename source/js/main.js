//-----vars---------------------------------------
const activeMode = "active-mode",
  activeClass = "active",
  windowEl = window,
  documentEl = document,
  htmlEl = document.documentElement,
  bodyEl = document.body,
  header = document.querySelector("header"),
  burger = document.querySelectorAll(".burger"),
  mobileMenu = document.querySelector(".mobile"),
  overlay = document.querySelector("[data-overlay]"),
  bannerSliders = document.querySelectorAll(".banner-slider"),
  filterSliders = document.querySelectorAll(".filter-slider"),
  modals = [...document.querySelectorAll("[data-popup]")],
  modalsButton = [...document.querySelectorAll("[data-btn-modal]")],
  innerButtonModal = [...document.querySelectorAll("[data-btn-inner]")],
  navBox = document.querySelector(".nav-box"),
  hideParent = document.querySelector("[data-hide-parent]"),
  dataHidden = document.querySelectorAll("[data-clip]"),
  warnCards = document.querySelectorAll(".warn-card"),
  servicesCards = document.querySelectorAll(".services-card"),
  serviceCards = document.querySelectorAll(".service-card"),
  textAreas = document.querySelectorAll("textarea[data-area]"),
  bannerCards = document.querySelectorAll(".banner-card"),
  calendars = document.querySelectorAll(".date-select__input");
//------------------------------------------------

//----customFunction------------------------------
const fadeIn = (el, timeout, display) => {
  el.style.opacity = 0;
  el.style.display = display || "block";
  el.style.transition = `all ${timeout}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
  }, 10);
};

const fadeOut = (el, timeout) => {
  el.style.opacity = 1;
  el.style.transition = `all ${timeout}ms ease`;
  el.style.opacity = 0;

  setTimeout(() => {
    el.style.display = "none";
  }, timeout);
};
// ----------------------------------------------------
const even = (n) => !(n % 2);

const removeCustomClass = (item, customClass = "active") => {
  item.classList.remove(customClass);
};

const toggleCustomClass = (item, customClass = "active") => {
  item.classList.toggle(customClass);
};

const addCustomClass = (item, customClass = "active") => {
  item.classList.add(customClass);
};

const removeClassInArray = (arr, customClass = "active") => {
  arr.forEach((item) => {
    item.classList.remove(customClass);
  });
};

const addClassInArray = (arr, customClass = "active") => {
  arr.forEach((item) => {
    item.classList.add(customClass);
  });
};

const toggleClassInArray = (arr, customClass = "active") => {
  arr.forEach((item) => {
    item.classList.toggle(customClass);
  });
};

const elementHeight = (el, variableName) => {
  if (el) {
    function initListener() {
      const elementHeight = el.offsetHeight;
      document
        .querySelector(":root")
        .style.setProperty(`--${variableName}`, `${elementHeight}px`);
    }

    window.addEventListener("DOMContentLoaded", initListener);
    window.addEventListener("resize", initListener);
  }
};

const disableScroll = () => {
  const fixBlocks = document?.querySelectorAll(".fixed-block");
  const pagePosition = window.scrollY;
  const paddingOffset = `${window.innerWidth - bodyEl.offsetWidth}px`;

  htmlEl.style.scrollBehavior = "none";
  fixBlocks.forEach((el) => {
    el.style.paddingRight = paddingOffset;
  });
  bodyEl.style.paddingRight = paddingOffset;
  bodyEl.classList.add("dis-scroll");
  bodyEl.dataset.position = pagePosition;
  bodyEl.style.top = `-${pagePosition}px`;
};

const enableScroll = () => {
  const fixBlocks = document?.querySelectorAll(".fixed-block");
  const pagePosition = parseInt(bodyEl.dataset.position, 10);
  fixBlocks.forEach((el) => {
    el.style.paddingRight = "0px";
  });
  bodyEl.style.paddingRight = "0px";

  bodyEl.style.top = "auto";
  bodyEl.classList.remove("dis-scroll");
  window.scroll({
    top: pagePosition,
    left: 0,
  });
};

//-----------------------------------------------------

// -------------dinamicHeiht---------------------------

let lastScroll = 0;
const defaultOffset = 40;

function stickyHeaderFunction(breakpoint) {
  let containerWidth = document.documentElement.clientWidth;
  if (containerWidth > `${breakpoint}`) {
    const scrollPosition = () =>
      window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains("sticky");

    window.addEventListener("scroll", () => {
      if (
        scrollPosition() > lastScroll &&
        !containHide() &&
        scrollPosition() > defaultOffset
      ) {
        addCustomClass(header, "sticky");
      } else if (scrollPosition() < defaultOffset) {
        removeCustomClass(header, "sticky");
      }

      lastScroll = scrollPosition();
    });
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  stickyHeaderFunction(320);
  elementHeight(header, "header-height");
});

//-----------------------------------------------------

//-------------burger----------------------------------
const mobileMenuHandler = function (overlay, mobileMenu, burger) {
  burger.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      toggleCustomClass(mobileMenu);
      toggleClassInArray(burger);
      toggleCustomClass(overlay);
      btn.classList.contains("active") ? disableScroll() : enableScroll();
    });
  });
};

const hideMenuHandler = function (overlay, mobileMenu, burger) {
  removeCustomClass(mobileMenu);
  removeClassInArray(burger);
  removeCustomClass(overlay);
  enableScroll();
};

if (overlay) {
  mobileMenuHandler(overlay, mobileMenu, burger);
  overlay.addEventListener("click", function (e) {
    e.target.classList.contains("overlay")
      ? hideMenuHandler(overlay, mobileMenu, burger)
      : null;
  });
}
//-----------------------------------------------------

//-------------anchor----------------------------------
document.addEventListener("DOMContentLoaded", function (e) {
  const anchors = document.querySelectorAll("[data-scroll]");

  anchors &&
    anchors.forEach((element) => {
      element.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
});
//-----------------------------------------------------

//----------------accordion----------------------------

let openedAccordion = null;

const getAccordions = function (accordionParrent, dataName) {
  return accordionParrent.querySelectorAll(`[${dataName}]`);
};

const closeAccordion = function (accordion, className = "active") {
  accordion.style.maxHeight = 0;
  removeCustomClass(accordion, className);
};

const openAccordion = function (
  accordion,
  className = "active",
  height = false
) {
  accordion.style.maxHeight = height ? height : accordion.scrollHeight + "px";
  addCustomClass(accordion, className);
};

const toggleAccordionButton = function (button, className = "active") {
  toggleCustomClass(button, className);
};

const checkIsAccordionOpen = function (accordion) {
  return accordion.classList.contains("active");
};

const accordionClickHandler = function (e) {
  e.preventDefault();

  let currentDataNumber = this.getAttribute(`data-id`);
  let accordionParent = this.parentNode;

  toggleAccordionButton(this);
  const accordionContent = accordionParent.querySelector(
    `[data-content="${currentDataNumber}"]`
  );
  const isAccordionOpen = checkIsAccordionOpen(accordionContent);

  if (isAccordionOpen) {
    closeAccordion(accordionContent);
    openedAccordion = null;
  } else {
    if (openedAccordion != null) {
      const mobileSettings = () => {
        let containerWidth = document.documentElement.clientWidth;
        if (
          containerWidth <= accordionParent.dataset.breakpoint &&
          accordionParent.dataset.single === "true"
        ) {
          closeAccordion(openedAccordion);
          toggleAccordionButton(
            accordionParent.querySelector(
              `[data-id="${openedAccordion.getAttribute("data-content")}"]`
            )
          );
        }
      };

      window.addEventListener("resize", () => {
        mobileSettings();
      });
      mobileSettings();
    }

    openAccordion(accordionContent);
    openedAccordion = accordionContent;
  }
};

const activateAccordion = function (accordions, handler) {
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", handler);
  });
};

const deactivateAccordion = function (accordions, handler) {
  accordions.forEach((accordion) => {
    accordion.removeEventListener("click", handler);
  });
};

const accordionDefaultOpen = function (accordionParent, currentId) {
  const defaultOpenContent = accordionParent.querySelector(
    `[data-content="${currentId}"]`
  );
  const defaultOpenButton = accordionParent.querySelector(
    `[data-id="${currentId}"]`
  );
  openedAccordion = defaultOpenContent;

  toggleAccordionButton(defaultOpenButton);
  openAccordion(defaultOpenContent);
};

const accInit = (accParrents, dataBtn, dataContent) => {
  accParrents.forEach(function (accordionParent) {
    if (accordionParent) {
      let accordions = getAccordions(accordionParent, dataBtn);
      let defaultOpenSetting;

      if (accordionParent.dataset.default) {
        defaultOpenSetting = accordionParent.dataset.default;
        accordionDefaultOpen(accordionParent, defaultOpenSetting);
      }

      activateAccordion(accordions, accordionClickHandler);
    }
  });
};

addEventListener("DOMContentLoaded", (event) => {
  const accParrents = document.querySelectorAll("[data-accordion-init]");
  accInit(accParrents, "data-id", "data-content");
});

//-----------------------------------------------------

//---------------------download------------------------
document.addEventListener("DOMContentLoaded", function (e) {
  const parrentsImage = document.querySelectorAll(".download");

  parrentsImage &&
    parrentsImage.forEach((downloadBlock) => {
      const fileInput = downloadBlock.querySelector(".download__input");
      const imagePreview = downloadBlock.querySelector(".download__image img");

      fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            imagePreview.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    });
});
//-----------------------------------------------------

//--------------------select---------------------------

const closeSelect = function (selectBody, select, className = "active") {
  selectBody.style.height = 0;
  removeCustomClass(select, className);
};

const openSelect = function (selectBody, select, className = "active") {
  selectBody.style.height = "auto";
  addCustomClass(select, className);
};

const checkIsSelectOpen = function (select) {
  return select.classList.contains("active");
};

document.addEventListener("DOMContentLoaded", function (e) {
  const select = document.querySelectorAll("[data-select]");

  if (select.length) {
    select.forEach((item) => {
      const selectCurrent = item.querySelector(".select__current");
      const selectInput = item.querySelector(".select__input");
      const selectOptions = [...item.querySelectorAll("svg")];
      const selectBody = item.querySelector(".select__body");

      selectOptions.map((option) => {
        option ? (option.style.pointerEvents = "none") : "";
      });

      if (selectInput) {
        const currentId = selectCurrent.getAttribute("data-id");
        selectInput.setAttribute("value", currentId);
      }

      item.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() !== "a") {
          e.preventDefault();
        }

        const isSelectOpen = checkIsSelectOpen(item);
        const el = e.target.dataset.type;
        const innerSelect = e.target.innerHTML;
        let items = item.querySelectorAll(`.select__list [data-id]`);
        let currentItem = item.querySelector(
          `.select__list [data-id='${selectInput.getAttribute("value")}']`
        );

        if (el === "option") {
          selectCurrent.innerHTML = innerSelect;
          selectInput.setAttribute("value", e.target.getAttribute("data-id"));
          selectCurrent.setAttribute(
            "data-id",
            e.target.getAttribute("data-id")
          );
          addCustomClass(selectCurrent, "check");
        }

        items.forEach(function (item) {
          item.style.display = "flex";
        });
        currentItem.style.display = "none";

        if (isSelectOpen) {
          closeSelect(selectBody, item);
        } else {
          openSelect(selectBody, item);
        }
      });

      document.addEventListener("click", function (event) {
        if (!item.contains(event.target) && checkIsSelectOpen(item)) {
          closeSelect(selectBody, item);
        }
      });
    });
  }
});
//-----------------------------------------------------

//-------------------modals----------------------------
let innerButton;
const commonFunction = function () {
  removeCustomClass(overlay, activeMode);
  removeCustomClass(overlay, activeClass);
  removeCustomClass(overlay, "mode");
  removeClassInArray(modals, activeClass);

  modals.forEach((modal) => fadeOut(modal, 300));
  enableScroll();
};

function findAttribute(element, attributeName) {
  let target = element;
  while (target && target !== document) {
    if (target.hasAttribute(attributeName)) {
      return target.getAttribute(attributeName);
    }
    target = target.parentNode;
  }
  return null;
}

function buttonClickHandler(e, buttonAttribute, activeClass) {
  e.preventDefault();
  const currentModalId = findAttribute(e.target, buttonAttribute);
  if (!currentModalId) {
    return;
  }

  const currentModal = overlay.querySelector(
    `[data-popup="${currentModalId}"]`
  );

  mobileMenu && removeCustomClass(mobileMenu, activeClass);
  burger && removeClassInArray(burger, activeClass);

  removeClassInArray(modals, activeClass);

  if (currentModal && currentModal.getAttribute("data-popup") === "filter") {
    addCustomClass(overlay, "mode");
  }

  addCustomClass(overlay, activeClass);
  addCustomClass(overlay, activeMode);
  addCustomClass(currentModal, activeClass);
  fadeIn(currentModal, 200, "flex");

  disableScroll();
  innerButton = overlay.querySelector(
    `${"[data-popup]"}.${activeClass} .close`
  );
}

function overlayClickHandler(e, activeClass) {
  if (e.target === overlay || e.target === innerButton) commonFunction();
}

function modalInit(buttonsArray, buttonAttribute, activeClass) {
  buttonsArray.map(function (btn) {
    btn.addEventListener("click", (e) =>
      buttonClickHandler(e, buttonAttribute, activeClass)
    );
  });
}

document.addEventListener("DOMContentLoaded", function (e) {
  overlay &&
    overlay.addEventListener("click", function (e) {
      overlayClickHandler(e, activeClass);
    });

  modalInit(modalsButton, "data-btn-modal", activeClass);
});
//-------------------------------------------------------------

//-----------------tabs----------------------------------------

const tabsFunction = function (
  tabsDataInitArray,
  tabsNavAttr,
  tabsContentAttr,
  tabsAsideAttr,
  active = "active"
) {
  tabsDataInitArray &&
    tabsDataInitArray.forEach((tabParent) => {
      if (tabParent) {
        const tabNav = [...tabParent.querySelectorAll(`[${tabsNavAttr}]`)];
        const tabContent = [
          ...tabParent.querySelectorAll(`[${tabsContentAttr}]`),
        ];
        const tabAside = [...tabParent.querySelectorAll(`[${tabsAsideAttr}]`)];

        tabNav.map((nav) => {
          nav.addEventListener("click", (e) => {
            e.preventDefault();
            const activeTabAttr = e.target.getAttribute(`${tabsNavAttr}`);
            removeClassInArray(tabNav, active);
            removeClassInArray(tabContent, active);
            removeClassInArray(tabAside, active);
            addClassInArray(
              tabParent.querySelectorAll(`[${tabsNavAttr}="${activeTabAttr}"]`),
              active
            );
            addCustomClass(
              tabParent.querySelector(
                `[${tabsContentAttr}="${activeTabAttr}"]`
              ),
              active
            );
            addCustomClass(
              tabParent.querySelector(`[${tabsAsideAttr}="${activeTabAttr}"]`),
              active
            );
          });
        });
      }
    });
};

document.addEventListener("DOMContentLoaded", function (e) {
  tabsFunction(
    document.querySelectorAll("[data-tabs-parrent]"),
    "data-tab",
    "data-tab-content",
    "data-aside-content"
  );
});
//-------------------------------------------------------------

//-----------------small-scripts-------------------------------
document.addEventListener("DOMContentLoaded", function (e) {
  if (navBox) {
    const btn = navBox.querySelector(".nav-box__btn");
    const wrapp = navBox.querySelector(".nav-box__wrapp");
    const arrow = navBox.querySelector(".nav-box__arrow");
    const links = navBox.querySelectorAll(".nav-box__link");

    btn &&
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        toggleCustomClass(wrapp, "active");
        toggleCustomClass(arrow, "active");
      });

    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        toggleCustomClass(wrapp, "active");
        toggleCustomClass(arrow, "active");
      });
    });
  }

  if (hideParent) {
    const items = hideParent.querySelectorAll(".filter-list__item");
    const showBtn = hideParent.querySelector(".hidden-btn");

    let flag = false;

    function toggleItems() {
      const mediaQuery = window.matchMedia(
        "(min-width: 576px) and (max-width: 768px)"
      );
      const threshold = mediaQuery.matches ? 4 : 3;

      items.forEach((item, index) => {
        if (index >= threshold) {
          fadeOut(item, 0);

          showBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!flag) {
              fadeIn(item, 200, "flex");
              showBtn.innerHTML = "Turn down";
              setTimeout(function () {
                flag = true;
              }, 1000);
            } else {
              fadeOut(item, 0);
              showBtn.innerHTML = "More categories";
              setTimeout(function () {
                flag = false;
              }, 1000);
            }
          });
        }
      });
    }

    toggleItems();
    window.addEventListener("resize", toggleItems);
  }

  if (dataHidden) {
    dataHidden.forEach(function (item) {
      const btn = item.querySelector("[data-clip-btn]");
      const box = item.querySelector("[data-clip-item]");

      const computedStyle = window.getComputedStyle(box);
      const originalHeight = parseInt(
        computedStyle.getPropertyValue("max-height")
      );

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const isOpen = box.getAttribute("data-clip-item") === "true";

        if (!isOpen) {
          btn.innerHTML = "Hide text";
          box.style.maxHeight = box.scrollHeight + "px";
          toggleCustomClass(btn, "active");
          setTimeout(function () {
            box.style.overflow = "auto";
          }, 450);
        } else {
          btn.innerHTML = "Show text";
          box.style.maxHeight = originalHeight + "px";
          toggleCustomClass(btn, "active");
          box.style.overflow = "hidden";
        }

        box.setAttribute("data-clip-item", !isOpen);
      });

      box.style.transition = "max-height 0.2s linear";
    });
  }

  if (warnCards) {
    warnCards.forEach(function (card) {
      const closeBtn = card.querySelector(".warn-card__close");
      const item = card.parentNode;
      const parent = item.parentNode;

      closeBtn &&
        closeBtn.addEventListener("click", function (e) {
          e.preventDefault();
          item.removeChild(card);
          item.remove();

          if (parent.children.length === 0) {
            parent.remove();
          }
        });
    });
  }

  if (servicesCards) {
    servicesCards.forEach(function (card) {
      const closeBtn = card.querySelector(".services-card__close");
      const item = card.parentNode;
      const parent = item.parentNode;

      closeBtn &&
        closeBtn.addEventListener("click", function (e) {
          e.preventDefault();
          item.removeChild(card);
          item.remove();

          if (parent.children.length === 0) {
            parent.remove();
          }
        });
    });
  }

  if (serviceCards) {
    serviceCards.forEach(function (card) {
      const wrapp = card.querySelector(".service-card__wrapp");
      const btn = card.querySelector(".edit-btn");
      const close = card.querySelector(".service-card__close");

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (wrapp.style.maxHeight) {
          wrapp.style.maxHeight = null;
          removeCustomClass(card, "active");
        } else {
          wrapp.style.maxHeight = wrapp.scrollHeight + "px";
          addCustomClass(card, "active");
        }

        if (card.classList.contains("active")) {
          window.addEventListener("resize", () => {
            wrapp.style.maxHeight = wrapp.scrollHeight + "px";
          });
        }
      });

      close.addEventListener("click", function (e) {
        e.preventDefault();
        wrapp.style.maxHeight = null;
        removeCustomClass(card, "active");
      });
    });
  }

  if (textAreas) {
    const maxChars = 64;

    textAreas.forEach((textArea) => {
      textArea.addEventListener("input", limitLines);
      window.addEventListener("resize", limitLines);
      limitLines();
    });

    function isMobile() {
      return window.innerWidth <= 450;
    }

    function limitLines() {
      if (isMobile()) {
        textAreas.forEach((textArea) => {
          if (textArea.value.length > maxChars) {
            textArea.value = textArea.value.slice(0, maxChars) + "...";
          }
        });
      }
    }
  }

  if (bannerCards) {
    bannerCards.forEach((card) => {
      card.addEventListener("click", function () {
        const link = this.getAttribute("data-link");
        if (link) {
          window.open(link, "_blank");
        }
      });
    });
  }
});
//-------------------------------------------------------------

//----------------fancybox--init-------------------------------
document.addEventListener("DOMContentLoaded", function(e) {
    const items = document.querySelectorAll('[data-fancybox]');
   
    if(items.length > 0){
        Fancybox.bind('[data-fancybox]', {});
    }
})
//-------------------------------------------------------------

//-------------------datepicker--------------------------------
calendars &&
    calendars.forEach(function (calendar) {
        const currentDate = new Date();
        if (!calendar.classList.contains("disable")) {
            calendar.value = currentDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long"
            });
        }

        new AirDatepicker(calendar, {
            view: 'months',
            minView: 'months',
            dateFormat: 'MMMM yyyy'
        })
});
//-------------------------------------------------------------

//------------------------sliders------------------------------
document.addEventListener("DOMContentLoaded", function(e) {
    
  filterSliders && filterSliders.forEach(function(slider){
    const swiper = slider.querySelector('.swiper-container');
    const sliderPrev = slider.querySelector('.swiper-button-prev');
    const sliderNext = slider.querySelector('.swiper-button-next');

    new Swiper(swiper, {
      spaceBetween  : 20,
      slidesPerView : 1,
      speed         : 800,
      observer      : true,
      observeParents: true,

      navigation: {
        nextEl: sliderNext && sliderNext,
        prevEl: sliderPrev && sliderPrev,
      },

    });

  });

  let swipers = [];

  function initSwipers() {
    const bannerSliders = document.querySelectorAll('.banner-slider');

    bannerSliders && bannerSliders.forEach(function(slider) {
      const swiperContainer = slider.querySelector('.swiper-container');
      const sliderPrev = slider.querySelector('.swiper-button-prev');
      const sliderNext = slider.querySelector('.swiper-button-next');

      if (window.innerWidth < 1024) {
        if (!swiperContainer.swiper) {
          const swiper = new Swiper(swiperContainer, {
            spaceBetween  : 20,
            speed         : 800,
            observer      : true,
            observeParents: true,
            navigation: {
              nextEl: sliderNext,
              prevEl: sliderPrev,
            },
            breakpoints: {
              0: {
                slidesPerView: 1,
              },
              650: {
                slidesPerView: 2,
              },
            },
          
          });
          swipers.push(swiper);
        }
      } else {
        if (swiperContainer.swiper) {
          swiperContainer.swiper.destroy(true, true);
        }
      }
    });
  }

  window.addEventListener('load', initSwipers);
  window.addEventListener('resize', initSwipers);
})
//-----------------------------------------------------------