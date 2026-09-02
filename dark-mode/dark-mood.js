

let darkButtons = document.querySelectorAll(".dark-mode-toggle, #darkModeBtn");
let darkLabels = document.querySelectorAll(".dark-mode-label, #darkModeLabel");


let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  darkLabels.forEach(function(label) {
    label.textContent = "LIGHT MODE";
  });
} else {
  document.documentElement.setAttribute("data-theme", "light");
  darkLabels.forEach(function(label) {
    label.textContent = "DARK MODE";
  });
}


darkButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    let currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      darkLabels.forEach(function(label) {
        label.textContent = "DARK MODE";
      });
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      darkLabels.forEach(function(label) {
        label.textContent = "LIGHT MODE";
      });
    }
  });
});
