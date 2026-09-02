
const locationName = "MUMBAI, INDIA";
const timezone = "Asia/Kolkata";


function textAnimation() {
    const elements = document.querySelectorAll(".animate");

    const observer = new IntersectionObserver(function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    elements.forEach(function(element) {
        observer.observe(element);
    });
}


function imageAnimation() {
    const images = document.querySelectorAll(".slideImage .image-card");

    const observer = new IntersectionObserver(function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    images.forEach(function(image) {
        observer.observe(image);
    });
}


function cursorEffect() {

    const cursor = document.getElementById("cursor");
    const videoCursor = document.getElementById("videocursor");
    const hero = document.getElementById("hero");

    if (!cursor || !videoCursor) {
        return;
    }

    if (window.innerWidth < 768) {
        cursor.style.display = "none";
        videoCursor.style.display = "none";
        return;
    }

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    let videoX = 0;
    let videoY = 0;

    window.addEventListener("mousemove", function(event) {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (hero) {

            const heroBox = hero.getBoundingClientRect();

            if (
                mouseX >= heroBox.left &&
                mouseX <= heroBox.right &&
                mouseY >= heroBox.top &&
                mouseY <= heroBox.bottom
            ) {

                videoCursor.classList.remove("video-cursor-hidden");
                videoCursor.classList.add("video-cursor-active");

                cursor.style.opacity = "0";

            } else {

                videoCursor.classList.remove("video-cursor-active");
                videoCursor.classList.add("video-cursor-hidden");

                cursor.style.opacity = "1";

            }
        }

    });


    function moveCursor() {

        cursorX += (mouseX - cursorX) * 0.16;
        cursorY += (mouseY - cursorY) * 0.16;

        cursor.style.transform =
            "translate3d(" +
            (cursorX - 25) +
            "px, " +
            (cursorY - 25) +
            "px, 0)";


        videoX += (mouseX + 30 - videoX) * 0.12;
        videoY += (mouseY + 30 - videoY) * 0.12;

        videoCursor.style.transform =
            "translate3d(" +
            videoX +
            "px, " +
            videoY +
            "px, 0)";


        requestAnimationFrame(moveCursor);
    }

    moveCursor();


    const buttons = document.querySelectorAll(
        "a, button, input, textarea, select, .service-item"
    );

    buttons.forEach(function(element) {

        element.addEventListener("mouseenter", function() {
            document.body.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", function() {
            document.body.classList.remove("cursor-hover");
        });

    });
}


function liveClock() {

    const time = document.getElementById("liveClockTime");
    const location = document.getElementById("liveClockLocation");

    if (location) {
        location.textContent = locationName;
    }

    function updateTime() {

        if (!time) {
            return;
        }

        const now = new Date();

        const clock = new Intl.DateTimeFormat("en-GB", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });

        time.textContent = clock.format(now);
    }

    updateTime();

    setInterval(updateTime, 1000);
}


function contactForm() {

    const form = document.getElementById("contactFormElement");
    const success = document.getElementById("contactSuccessPanel");
    const reset = document.getElementById("resetContactBtn");
    const submit = document.getElementById("startProjectBtn");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("userNameInput");
        const email = document.getElementById("userEmailInput");
        const message = document.getElementById("userMessageInput");

        let valid = true;


        if (name.value.trim() === "") {
            name.parentElement.classList.add("has-error");
            valid = false;
        } else {
            name.parentElement.classList.remove("has-error");
        }


        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            email.value.trim() === "" ||
            !emailPattern.test(email.value.trim())
        ) {
            email.parentElement.classList.add("has-error");
            valid = false;
        } else {
            email.parentElement.classList.remove("has-error");
        }


        if (message.value.trim() === "") {
            message.parentElement.classList.add("has-error");
            valid = false;
        } else {
            message.parentElement.classList.remove("has-error");
        }


        if (valid) {

            submit.disabled = true;
            submit.innerHTML = "TRANSMITTING...";


            setTimeout(function() {

                form.style.display = "none";

                if (success) {
                    success.classList.add("is-visible");
                }

                submit.disabled = false;
                submit.innerHTML = "START A PROJECT ↗";

            }, 550);
        }

    });


    if (reset) {

        reset.addEventListener("click", function() {

            form.reset();

            form.style.display = "flex";

            if (success) {
                success.classList.remove("is-visible");
            }

        });

    }
}


document.addEventListener("DOMContentLoaded", function() {

    textAnimation();

    imageAnimation();

    cursorEffect();

    liveClock();

    contactForm();

});
