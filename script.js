let textObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

let textElements = document.querySelectorAll(".animate");

textElements.forEach(function(text) {
  textObserver.observe(text);
});


let imageObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

let imageCards = document.querySelectorAll(".slideImage .image-card");

imageCards.forEach(function(card) {
  imageObserver.observe(card);
});


let normalCursor = document.querySelector("#cursor");
let videoCursor = document.querySelector("#videocursor");
let hero = document.querySelector("#hero");

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

let videoX = 0;
let videoY = 0;


document.addEventListener("mousemove", function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (hero) {
    let rect = hero.getBoundingClientRect();

    if (
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    ) {
      videoCursor.classList.remove("video-cursor-hidden");
      videoCursor.classList.add("video-cursor-active");
      normalCursor.style.opacity = "0";
    } else {
      videoCursor.classList.remove("video-cursor-active");
      videoCursor.classList.add("video-cursor-hidden");
      normalCursor.style.opacity = "1";
    }
  }
});


function moveCursors() {
  cursorX = cursorX + (mouseX - cursorX) * 0.16;
  cursorY = cursorY + (mouseY - cursorY) * 0.16;

  normalCursor.style.transform =
    "translate3d(" +
    (cursorX - 25) +
    "px, " +
    (cursorY - 25) +
    "px, 0)";


  videoX = videoX + ((mouseX + 30) - videoX) * 0.12;
  videoY = videoY + ((mouseY + 30) - videoY) * 0.12;

  videoCursor.style.transform =
    "translate3d(" +
    videoX +
    "px, " +
    videoY +
    "px, 0)";

  requestAnimationFrame(moveCursors);
}

moveCursors();


let links = document.querySelectorAll(
  "a, button, input, textarea, select, .service-item"
);

links.forEach(function(link) {

  link.addEventListener("mouseenter", function() {
    document.body.classList.add("cursor-hover");
  });

  link.addEventListener("mouseleave", function() {
    document.body.classList.remove("cursor-hover");
  });

});


let clockTime = document.querySelector("#liveClockTime");
let clockLocation = document.querySelector("#liveClockLocation");

if (clockLocation) {
  clockLocation.textContent = "MUMBAI, INDIA";
}


function updateClock() {

  if (clockTime) {

    let now = new Date();

    let timeString = now.toLocaleTimeString("en-GB", {
      timeZone: "Asia/Kolkata"
    });

    clockTime.textContent = timeString;
  }

}

updateClock();

setInterval(updateClock, 1000);


let form = document.querySelector("#contactFormElement");
let successMessage = document.querySelector("#contactSuccessPanel");
let resetButton = document.querySelector("#resetContactBtn");


if (form) {

  form.addEventListener("submit", function(event) {

    event.preventDefault();

    let nameInput = document.querySelector("#userNameInput");
    let emailInput = document.querySelector("#userEmailInput");
    let messageInput = document.querySelector("#userMessageInput");

    let valid = true;


    if (nameInput.value.trim() === "") {

      nameInput.parentElement.classList.add("has-error");
      valid = false;

    } else {

      nameInput.parentElement.classList.remove("has-error");

    }


    if (
      emailInput.value.trim() === "" ||
      !emailInput.value.includes("@")
    ) {

      emailInput.parentElement.classList.add("has-error");
      valid = false;

    } else {

      emailInput.parentElement.classList.remove("has-error");

    }


    if (messageInput.value.trim() === "") {

      messageInput.parentElement.classList.add("has-error");
      valid = false;

    } else {

      messageInput.parentElement.classList.remove("has-error");

    }


    if (valid) {

      form.style.display = "none";
      successMessage.classList.add("is-visible");

    }

  });

}


if (resetButton) {

  resetButton.addEventListener("click", function() {

    form.reset();

    form.style.display = "flex";

    successMessage.classList.remove("is-visible");

  });

}
