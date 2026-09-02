

let navHeader = document.querySelector("#siteNavHeader");

window.addEventListener("scroll", function() {
  if (window.scrollY > 30) {
    navHeader.classList.add("is-scrolled");
  } else {
    navHeader.classList.remove("is-scrolled");
  }
});
