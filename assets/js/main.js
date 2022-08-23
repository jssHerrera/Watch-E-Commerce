/*===============  ===============*/
const navMenu = document.getElementById("nav-menu"),
  // ----------------------------------------
  // Toggle
  navToggle = document.getElementById("nav-toggle"),
  // ----------------------------------------
  // Closed
  navClose = document.getElementById("nav-close"),
  // ----------------------------------------
  // link
  navLink = document.querySelectorAll(".nav__link"),
  // ----------------------------------------
  // header (scrollHeader)
  header = document.getElementById("header"),
  // ----------------------------------------
  // Section[id]
  sections = document.querySelectorAll("section[id]");

/*===============  ===============*/
/*=============== SHOW CART ===============*/
const cart = document.getElementById("cart"),
  cartShop = document.getElementById("cart-shop"),
  cartClose = document.getElementById("cart-close");

/*===============  ===============*/
eventListener();

// eventos
function eventListener() {
  // ----------------------------------------
  // mostar sidebar
  navToggle.addEventListener("click", show);
  // ----------------------------------------
  // ocultar sidebar
  navClose.addEventListener("click", hidden);
  // ----------------------------------------
  // ocultar sidebar al precionar enlace
  navLink.forEach((elem) => elem.addEventListener("click", hidden));
  // ----------------------------------------
  // mostrar ShowCard
  cartShop.addEventListener("click", () => {
    cart.classList.add("show-cart");
  });
  // ----------------------------------------
  // cerrar ShowCard
  cartClose.addEventListener("click", () => {
    cart.classList.remove("show-cart");
  });
  // ----------------------------------------
  // Scroll in Header
  window.addEventListener("scroll", scrollHeader);
  // ----------------------------------------
  // Scroll in ViewPort
  window.addEventListener("scroll", scrollActive);
  // ----------------------------------------
  // Scroll in ViewPort
  window.addEventListener("scroll", scrollUp);
}

// mostar sidebar
function show() {
  navMenu.classList.add("show-menu");
}
// ocultar sidebar
function hidden() {
  navMenu.classList.remove("show-menu");
}
// scrollHeader (mayor a 50vh)
function scrollHeader() {
  this.scrollY >= 50
    ? header.classList.add("scroll-header")
    : header.classList.remove("scroll-header");
}

// slider
let swiper = new Swiper(".testimonial-swiper", {
  spaceBetween: 30,
  loop: "true",

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
  spaceBetween: 24,
  loop: "true",
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
  },
});

function scrollActive() {
  const scrollY = window.pageYOffset; //la distancia recorrida en el eje Y

  sections.forEach((elem) => {
    const sectionHeight = elem.offsetHeight, //la altura de un elelento
      sectionTop = elem.offsetTop - 58, // de la parte superior
      sectionId = elem.getAttribute("id"); //debuelve el nombre del atributo

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 350) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
