(function ($) {

  "use strict";

  // Initialize AOS animation
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out',
  });

  // init Isotope
  var initIsotope = function () {

    $('.grid').each(function () {

      // $('.grid').imagesLoaded( function() {
      // images have loaded
      var $buttonGroup = $('.button-group');
      var lastFilter = sessionStorage.getItem('portfolioFilter');
      var $checked = $buttonGroup.find('.is-checked');
      var filterValue = lastFilter || ($checked.attr('data-filter') || '.photography');

      // ensure the correct button reflects the active filter
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      var $btnMatch = $buttonGroup.find('[data-filter="' + filterValue + '"]');
      if ($btnMatch.length) { $btnMatch.addClass('is-checked'); }

      var $grid = $('.grid').isotope({
        itemSelector: '.portfolio-item',
        // layoutMode: 'fitRows',
        filter: filterValue
      });

      // Toggle portfolio photography slider based on current filter
      (function updatePhotoSliderDisplay(currentFilter){
        const slider = document.getElementById('photoSlider');
        if (!slider) return;
        const show = (currentFilter === '.photography');
        slider.style.display = show ? '' : 'none';
        if (show && typeof window.initPortfolioPhotoSwiper === 'function') {
          window.initPortfolioPhotoSwiper();
        }
      })(filterValue);

      // bind filter button click
      $('.button-group').on('click', 'a', function (e) {
        e.preventDefault();
        filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        try { sessionStorage.setItem('portfolioFilter', filterValue); } catch (e) {}
        // update slider visibility on filter change
        const slider = document.getElementById('photoSlider');
        if (slider) {
          const show = (filterValue === '.photography');
          slider.style.display = show ? '' : 'none';
          if (show && typeof window.initPortfolioPhotoSwiper === 'function') {
            window.initPortfolioPhotoSwiper();
            if (window.portfolioPhotoSwiper && typeof window.tunePortfolioPhotoSwiper === 'function') {
              window.tunePortfolioPhotoSwiper(window.portfolioPhotoSwiper);
            }
          }
        }
      });

      // change is-checked class on buttons
      $('.button-group').each(function (i, buttonGroup) {
        $buttonGroup.on('click', 'a', function () {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $(this).addClass('is-checked');
        });
      });
      // });

    });
  }

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  // window load
  $(window).load(function () {
    $(".preloader").fadeOut("slow");
    initIsotope();
  })

  $(document).ready(function () {
    initChocolat();

    // Initialize Testimonials Swiper
    const servicesSwiper = new Swiper('.servicesSwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });

    // Testimonials Swiper removed (section no longer present)

    // Initialize Works Swiper
    const worksSwiper = new Swiper('.worksSwiper', {
      slidesPerView: 4,
      spaceBetween: 20,
      loop: true,
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: false,
      // },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });

    // Articles Swiper removed (section no longer present)

    // Initialize Logos Swiper
    const logosSwiper = new Swiper('.logosSwiper', {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 50,
        }
      }
    });

  });

  // Enhanced Menu Toggle Functionality with Animations
  document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-toggle-btn');
    const closeBtn = document.getElementById('closeMenuBtn');
    const fullscreenMenu = document.getElementById('fullscreenMenu');

    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        fullscreenMenu.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Trigger animation after display is set
        setTimeout(() => {
          fullscreenMenu.classList.add('active');
        }, 10);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        // Start closing animation
        fullscreenMenu.classList.remove('active');

        // Wait for animation to complete before hiding
        setTimeout(() => {
          fullscreenMenu.style.display = 'none';
          document.body.style.overflow = 'auto';
        }, 800); // Match this with your CSS transition duration
      });
    }

    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
      link.addEventListener('click', function () {
        fullscreenMenu.classList.remove('active');
        setTimeout(() => {
          fullscreenMenu.style.display = 'none';
          document.body.style.overflow = 'auto';
        }, 800);
    });

    // Sticky nav shrink on scroll
    (function stickyNav() {
      const navs = document.querySelectorAll('.site-nav');
      const onScroll = () => {
        const scrolled = window.scrollY > 10;
        navs.forEach(n => n.classList.toggle('nav-scrolled', scrolled));
      };
      window.addEventListener('scroll', onScroll);
      onScroll();
    })();

    // Lazy-load images by default (except if explicitly set)
    document.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
      // Add a subtle fade-in by default; opt-out with class="no-fade"
      if (!img.classList.contains('no-fade')) img.classList.add('lazy-fade');
    });

    // Progressive reveal for images when they load/enter viewport
    (function fadeInLazyImages(){
      const reveal = (img) => img.classList.add('lazy-fade-show');
      const onLoad = (e) => reveal(e.target);
      const io = ('IntersectionObserver' in window)
        ? new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target;
                io.unobserve(img);
                if (img.complete) reveal(img); else img.addEventListener('load', onLoad, { once: true });
              }
            });
          }, { rootMargin: '200px 0px' })
        : null;
      document.querySelectorAll('img.lazy-fade').forEach(img => {
        if (io) io.observe(img); else if (img.complete) reveal(img); else img.addEventListener('load', onLoad, { once: true });
      });
    })();

    // Lazy background helper: set background-image from data-bg when visible
    (function lazyBackgrounds(){
      if (!('IntersectionObserver' in window)) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            io.unobserve(el);
            const url = el.getAttribute('data-bg');
            if (url) {
              el.style.backgroundImage = 'url("' + url.replace(/"/g, '\\"') + '")';
              el.classList.add('bg-loaded');
              el.removeAttribute('data-bg');
            }
          }
        });
      }, { rootMargin: '240px 0px' });
      document.querySelectorAll('[data-bg]').forEach(el => {
        el.style.opacity = '0.01';
        io.observe(el);
      });
    })();

    // Animate page title letters (for elements with data-animate-title)
    (function animateTitles() {
      const nodes = document.querySelectorAll('[data-animate-title]');
      nodes.forEach((node) => {
        const text = (node.textContent || '').trim();
        if (!text) return;
        // Avoid double-wrapping
        if (node.dataset.animated === 'true') return;
        node.dataset.animated = 'true';
        node.textContent = '';
        const spans = [];
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === ' ') {
            node.appendChild(document.createTextNode(' '));
            continue;
          }
          const s = document.createElement('span');
          s.className = 'title-letter';
          s.textContent = ch;
          node.appendChild(s);
          spans.push(s);
        }
        // Stagger highlight per letter
        // Allow per-element overrides via data attributes
        const perLetterDelay = parseInt(node.getAttribute('data-animate-delay')) || 260; // ms
        const highlightDuration = parseInt(node.getAttribute('data-animate-duration')) || 800; // ms
        spans.forEach((s, idx) => {
          setTimeout(() => {
            s.classList.add('highlight');
            setTimeout(() => s.classList.remove('highlight'), highlightDuration);
          }, idx * perLetterDelay);
        });
      });
    })();

    // Rotating tag (hero micro-headline), configurable via data-attributes
    (function rotatingTag() {
      const el = document.querySelector('.rotating-tag');
      if (!el) return;
      const wordsAttr = el.getAttribute('data-rotate') || '';
      const words = wordsAttr.split('|').map(w => w.trim()).filter(Boolean);
      if (!words.length) return;
      const interval = parseInt(el.getAttribute('data-rotate-interval')) || 2400;
      const span = el.querySelector('.tag-word');
      let i = 0;
      // ensure initial text matches first word
      if (span) span.textContent = words[0];
      setInterval(() => {
        if (!span) return;
        span.classList.add('swap-out');
        setTimeout(() => {
          i = (i + 1) % words.length;
          span.textContent = words[i];
          span.classList.remove('swap-out');
          span.classList.add('swap-in');
          setTimeout(() => span.classList.remove('swap-in'), 260);
        }, 260);
      }, interval);
    })();

    // Trigger accent underline animation for Welcome when visible
    (function accentWelcomeAnim() {
      const el = document.querySelector('.accent-welcome .accent-text');
      if (!el) return;
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              el.classList.add('animate');
              io.disconnect();
            }
          });
        }, { threshold: 0.6 });
        io.observe(el);
      } else {
        // Fallback: start after a short delay
        setTimeout(() => el.classList.add('animate'), 200);
      }
    })();

    // Back to top smooth scroll
    document.querySelectorAll('.back-to-top').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Project pages: move Back to Portfolio next to title and remove bottom one
    (function adjustProjectBackLinks() {
      const h1 = document.querySelector('main h1.display-5');
      if (!h1) return;

      // Remove any header back-to-portfolio anchors
      document.querySelectorAll('header a[href$="portfolio.html"]').forEach(a => a.remove());

      // Remove bottom back buttons inside main and pull controls to the right
      document.querySelectorAll('main a.btn.btn-back[href$="portfolio.html"]').forEach(a => {
        const sec = a.closest('section');
        a.remove();
        if (sec && sec.classList.contains('justify-content-between')) {
          sec.classList.remove('justify-content-between');
          sec.classList.add('justify-content-end');
        }
      });

      // Wrap the title and add Back to Portfolio button on the right
      if (!h1.closest('.d-flex')) {
        const row = document.createElement('div');
        row.className = 'd-flex justify-content-between align-items-center mb-2';
        const parent = h1.parentNode;
        parent.insertBefore(row, h1);
        row.appendChild(h1);
        const backBtn = document.createElement('a');
        backBtn.className = 'btn btn-back';
        // Works for projects/*/*/index.html depth
        backBtn.href = '../../../portfolio.html';
        backBtn.textContent = 'Back to Portfolio';
        row.appendChild(backBtn);
      } else {
        // If already flex, ensure a back button exists
        if (!h1.parentElement.querySelector('a.btn.btn-back')) {
          const backBtn = document.createElement('a');
          backBtn.className = 'btn btn-back';
          backBtn.href = '../../../portfolio.html';
          backBtn.textContent = 'Back to Portfolio';
          h1.parentElement.appendChild(backBtn);
        }
      }
    })();
  });

  });

})(jQuery);

// Smooth, constant-motion tuning for the portfolio slider
window.tunePortfolioPhotoSwiper = function(sw) {
  if (!sw) return;
  if (!sw.params.autoplay) sw.params.autoplay = {};
  sw.params.autoplay.delay = 0; // continuous motion
  sw.params.autoplay.disableOnInteraction = false;
  sw.params.autoplay.pauseOnMouseEnter = false;
  sw.params.speed = 14000; // slower, smoother
  sw.params.loop = true;
  sw.params.loopedSlides = 5;
  sw.params.loopAdditionalSlides = Math.max(sw.params.loopAdditionalSlides || 0, 5);
  if (sw.autoplay && typeof sw.autoplay.stop === 'function') sw.autoplay.stop();
  if (typeof sw.update === 'function') sw.update();
  if (typeof sw.loopFix === 'function') sw.loopFix();
  if (sw.autoplay && typeof sw.autoplay.start === 'function') sw.autoplay.start();
};

// Define initializer for Portfolio Photography Swiper (reusable on filter toggle)
window.initPortfolioPhotoSwiper = function() {
  if (window.portfolioPhotoSwiper) return; // already initialized
  const el = document.querySelector('.portfolioPhotoSwiper');
  if (!el) return;
  const swiper = new Swiper('.portfolioPhotoSwiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    loopedSlides: 5,
    loopAdditionalSlides: 5,
    watchSlidesProgress: true,
    preloadImages: true,
    updateOnImagesReady: true,
    autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false },
    speed: 14000,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      300: { slidesPerView: 1, spaceBetween: 12 },
      768: { slidesPerView: 2, spaceBetween: 16 },
      1200: { slidesPerView: 3, spaceBetween: 20 },
    },
  });
  if (typeof Chocolat === 'function') {
    Chocolat(document.querySelectorAll('#photoSlider .image-link'), { imageSize: 'contain', loop: true });
  }
  window.portfolioPhotoSwiper = swiper;
  // enforce smooth autoplay
  window.tunePortfolioPhotoSwiper(swiper);
};

// Initialize on first load if slider is present and visible
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('photoSlider');
  const isVisible = slider && slider.style.display !== 'none';
  if (isVisible) window.initPortfolioPhotoSwiper();
});

// Restore portfolio grid and slider when returning via back/forward cache
window.restorePortfolioView = function() {
  const grid = $('.grid');
  if (!grid.length) return; // not on portfolio page
  const $buttonGroup = $('.button-group');
  const $checked = $buttonGroup.find('.is-checked');
  let storedFilter = null;
  try { storedFilter = sessionStorage.getItem('portfolioFilter'); } catch (e) {}
  const filterValue = storedFilter || ($checked.attr('data-filter') || '.photography');

  // Safety: clear any inline styles Isotope may have left behind
  try {
    document.querySelectorAll('.grid .portfolio-item').forEach(el => {
      ['position','left','top','transform','opacity','display'].forEach(p => el.style.removeProperty(p));
    });
    const gridEl = document.querySelector('.grid');
    if (gridEl) ['height'].forEach(p => gridEl.style.removeProperty(p));
  } catch (e) {}

  // Robust re-init: destroy, reload, filter, layout
  try { grid.isotope('destroy'); } catch (e) {}
  try {
    // sync button state
    const $buttonGroup = $('.button-group');
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    const $btnMatch = $buttonGroup.find('[data-filter="' + filterValue + '"]');
    if ($btnMatch.length) $btnMatch.addClass('is-checked');

    grid.isotope({ itemSelector: '.portfolio-item', filter: filterValue });
    grid.isotope('reloadItems');
    grid.isotope({ filter: filterValue });
    grid.isotope('arrange');
    grid.isotope('layout');
  } catch (e) {
    // Fallback: show everything if Isotope is unavailable
    document.querySelectorAll('.grid .portfolio-item').forEach(el => { el.style.display = ''; el.hidden = false; });
  }
  // Sync slider visibility + swiper
  const slider = document.getElementById('photoSlider');
  if (slider) {
    const show = (filterValue === '.photography');
    slider.style.display = show ? '' : 'none';
    if (show) {
      if (typeof window.initPortfolioPhotoSwiper === 'function') window.initPortfolioPhotoSwiper();
      if (window.portfolioPhotoSwiper && typeof window.tunePortfolioPhotoSwiper === 'function') {
        window.tunePortfolioPhotoSwiper(window.portfolioPhotoSwiper);
      }
    }
  }
  // If AOS left elements invisible (opacity:0), re-trigger
  try {
    if (window.AOS && typeof window.AOS.refreshHard === 'function') {
      window.AOS.refreshHard();
    }
  } catch (e) {}
  try {
    document.querySelectorAll('[data-aos]').forEach(el => {
      // Force visible state
      el.classList.add('aos-animate');
      el.style.removeProperty('opacity');
    });
  } catch (e) {}
  // Tiny reveal to smooth layout jump
  const addReveal = (el) => {
    if (!el) return;
    el.classList.add('portfolio-fade-reveal');
    el.addEventListener('animationend', () => el.classList.remove('portfolio-fade-reveal'), { once: true });
  };
  addReveal(grid.get(0));
  addReveal(slider);
}

window.addEventListener('pageshow', function() {
  // Rebuild layout when returning via back/forward navigation
  try { window.restorePortfolioView(); } catch (e) {}
});

// Also restore when tab becomes visible or window regains focus
document.addEventListener('visibilitychange', function () {
  if (!document.hidden) {
    try { window.restorePortfolioView(); } catch (e) {}
  }
});
window.addEventListener('focus', function () {
  try { window.restorePortfolioView(); } catch (e) {}
});
