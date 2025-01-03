// navbar toggle
const navBtn = document.querySelector("#navbtn");
const navBar = document.querySelector("#navbar");
navBtn.addEventListener("click", (e) => {
  console.log("clicked", e.target);
  navBar.classList.toggle("invisible");
});


// scrolling text animation

const scrollingText = document.querySelector("#scrollingText");

let scrollSpeed = 50;
let scrollAmount = 2;

function startScrolling() {
  const containerWidth =  scrollingText.parentElement.offsetWidth;
  const textWidth = scrollingText.offsetWidth;


  let position = containerWidth;

  function scrollStep(){
    position -= scrollAmount

    if(position < -textWidth){
      position = containerWidth
    }
    scrollingText.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(scrollStep)
  }
  scrollStep()
  
}

  document.addEventListener("DOMContentLoaded", startScrolling);
