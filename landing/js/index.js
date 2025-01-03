// navbar toggle
const navBtn = document.querySelector("#navbtn");
const navBar = document.querySelector("#navbar");
navBtn.addEventListener("click", (e) => {
  console.log("clicked", e.target);
  navBar.classList.toggle("invisible");
});
