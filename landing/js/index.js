const navBtn = document.querySelector("#navbtn");
const navBar = document.querySelector("#navbar");
navBtn.addEventListener("click", (e) => {
  navBar.classList.toggle("invisible");
});

const scrollingText = document.querySelector("#scrollingText");

let scrollSpeed = 50;
let scrollAmount = 2;

function startScrolling() {
  const containerWidth = scrollingText.parentElement.offsetWidth;
  const textWidth = scrollingText.offsetWidth;

  let position = containerWidth;

  function scrollStep() {
    position -= scrollAmount;

    if (position < -textWidth) {
      position = containerWidth;
    }
    scrollingText.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(scrollStep);
  }
  scrollStep();
}

document.addEventListener("DOMContentLoaded", startScrolling);

const carousel = document.querySelector("#testimonial-carousel");
let scrollPosition = 0;

function autoplayCarousel() {
  const cardWidth = carousel.children[0].offsetWidth + 16;
  const maxScrollPosition = carousel.scrollWidth - carousel.clientWidth;

  scrollPosition += cardWidth;

  if (scrollPosition > maxScrollPosition) {
    scrollPosition = 0;
  }

  carousel.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
}

setInterval(autoplayCarousel, 3000);

document.querySelector("#currentYear").textContent = new Date().getFullYear();

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");
  const content = item.querySelector(".accordion-content");
  const icon = item.querySelector(".icon");

  header.addEventListener("click", () => {
    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        const otherContent = otherItem.querySelector(".accordion-content");
        const otherIcon = otherItem.querySelector(".icon");
        otherContent.classList.add("hidden");
        otherIcon.src = "./public/plus.svg";
      }
    });

    if (content.classList.contains("hidden")) {
      content.classList.remove("hidden");
      icon.src = "./public/minus.svg";
    } else {
      content.classList.add("hidden");
      icon.src = "./public/plus.svg";
    }
  });
});