const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".navbar ul");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
