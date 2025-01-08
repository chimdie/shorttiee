const navBtn = document.querySelector("#navbtn");
const navBar = document.querySelector("#navbar");
navBtn.addEventListener("click", (e) => {
  console.log("clicked", e.target);
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