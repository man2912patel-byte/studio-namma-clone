(function () {
  'use strict';



  const CLOCK_LOCATION = 'MUMBAI, INDIA';
  const CLOCK_TIMEZONE = 'Asia/Kolkata';

  
  function initTextRevealObserver() {
    const animateElements = document.querySelectorAll('.animate');

    if (!('IntersectionObserver' in window)) {
      animateElements.forEach((el) => el.classList.add('show'));
      return;
    }

    const textObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach((el) => textObserver.observe(el));
  }

  
  function initImageGridObserver() {
    const imageCards = document.querySelectorAll('.slideImage .image-card');

    if (!('IntersectionObserver' in window)) {
      imageCards.forEach((card) => card.classList.add('show'));
      return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    });

    imageCards.forEach((card) => imageObserver.observe(card));
  }

  function initUnifiedCursorSystem() {
    const normalCursor = document.getElementById('cursor');
    const videoCursor = document.getElementById('videocursor');
    const heroSection = document.getElementById('hero');

    if (!normalCursor || !videoCursor) return;

    if (window.innerWidth < 768 || window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
      normalCursor.style.display = 'none';
      videoCursor.style.display = 'none';
      return;
    }

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let curCurrentX = cursorX;
    let curCurrentY = cursorY;

    let videoTargetX = cursorX + 30;
    let videoTargetY = cursorY + 30;
    let videoCurrentX = videoTargetX;
    let videoCurrentY = videoTargetY;

    let isOverHero = false;

    window.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;

      videoTargetX = e.clientX + 30;
      videoTargetY = e.clientY + 30;

  
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom && e.clientX >= rect.left && e.clientX <= rect.right) {
          if (!isOverHero) {
            isOverHero = true;
            videoCursor.classList.remove('video-cursor-hidden');
            videoCursor.classList.add('video-cursor-active');
            normalCursor.style.opacity = '0';
          }
        } else {
          if (isOverHero) {
            isOverHero = false;
            videoCursor.classList.remove('video-cursor-active');
            videoCursor.classList.add('video-cursor-hidden');
            normalCursor.style.opacity = '1';
          }
        }
      }
    }, { passive: true });


    document.addEventListener('mouseleave', () => {
      videoCursor.classList.remove('video-cursor-active');
      videoCursor.classList.add('video-cursor-hidden');
      normalCursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      if (!isOverHero) {
        normalCursor.style.opacity = '1';
      }
    });

  
    window.addEventListener('scroll', () => {
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (cursorY < rect.top || cursorY > rect.bottom) {
          if (isOverHero) {
            isOverHero = false;
            videoCursor.classList.remove('video-cursor-active');
            videoCursor.classList.add('video-cursor-hidden');
            normalCursor.style.opacity = '1';
          }
        }
      }
    }, { passive: true });

   
    const clickables = document.querySelectorAll('a, button, input, textarea, select, .service-item');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    
    function renderCursors() {
    
      curCurrentX += (cursorX - curCurrentX) * 0.16;
      curCurrentY += (cursorY - curCurrentY) * 0.16;
      normalCursor.style.transform = `translate3d(${curCurrentX - 25}px, ${curCurrentY - 25}px, 0)`;

     
      videoCurrentX += (videoTargetX - videoCurrentX) * 0.12;
      videoCurrentY += (videoTargetY - videoCurrentY) * 0.12;
      videoCursor.style.transform = `translate3d(${videoCurrentX}px, ${videoCurrentY}px, 0)`;

      requestAnimationFrame(renderCursors);
    }

    requestAnimationFrame(renderCursors);
  }

  
  function initLiveClock() {
    const timeEl = document.getElementById('liveClockTime');
    const locEl = document.getElementById('liveClockLocation');

    if (locEl) locEl.textContent = CLOCK_LOCATION;

    function updateClock() {
      if (!timeEl) return;
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: CLOCK_TIMEZONE,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      timeEl.textContent = formatter.format(now);
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

 

 
  function initContactForm() {
    const form = document.getElementById('contactFormElement');
    const successPanel = document.getElementById('contactSuccessPanel');
    const resetBtn = document.getElementById('resetContactBtn');
    const submitBtn = document.getElementById('startProjectBtn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInp = document.getElementById('userNameInput');
      const emailInp = document.getElementById('userEmailInput');
      const msgInp = document.getElementById('userMessageInput');

      const nameGroup = nameInp?.closest('.form-input-group');
      const emailGroup = emailInp?.closest('.form-input-group, .form-field-group');
      const msgGroup = msgInp?.closest('.form-input-group');

      [nameGroup, emailGroup, msgGroup].forEach((g) => g?.classList.remove('has-error'));

      if (!nameInp?.value.trim()) {
        nameGroup?.classList.add('has-error');
        isValid = false;
      }

     
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInp?.value.trim() || !emailRegex.test(emailInp.value.trim())) {
        emailGroup?.classList.add('has-error');
        isValid = false;
      }

      
      if (!msgInp?.value.trim()) {
        msgGroup?.classList.add('has-error');
        isValid = false;
      }

      if (isValid) {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>TRANSMITTING...</span>';
        }

        setTimeout(() => {
          form.style.display = 'none';
          successPanel?.classList.add('is-visible');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>START A PROJECT</span><span>↗</span>';
          }
        }, 550);
      }
    });

    resetBtn?.addEventListener('click', () => {
      form.reset();
      form.style.display = 'flex';
      successPanel?.classList.remove('is-visible');
    });
  }


  document.addEventListener('DOMContentLoaded', () => {
    initTextRevealObserver();
    initImageGridObserver();
    initUnifiedCursorSystem();
    initLiveClock();
    initContactForm();
  });
})();
