/**
 * BIHAR CAB — OFFICIAL JAVASCRIPT
 * Fast, lightweight, zero-dependency client logic
 * Verified Number: +91 94305 09122
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var WHATSAPP_NUMBER = '919430509122';

  // --- 1. STICKY HEADER SCROLL EFFECT ---
  var siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    var checkScroll = function () {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // --- 2. MOBILE MENU DRAWER ---
  var menuToggle = document.querySelector('.menu-toggle');
  var navMobileMenu = document.querySelector('.nav-mobile-menu');
  var navMobileOverlay = document.querySelector('.nav-mobile-overlay');

  if (menuToggle && navMobileMenu && navMobileOverlay) {
    var openMenu = function () {
      menuToggle.setAttribute('aria-expanded', 'true');
      navMobileMenu.classList.add('active');
      navMobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    var closeMenu = function () {
      menuToggle.setAttribute('aria-expanded', 'false');
      navMobileMenu.classList.remove('active');
      navMobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', function () {
      var isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navMobileOverlay.addEventListener('click', closeMenu);

    // Close when clicking mobile navigation links
    var mobileLinks = navMobileMenu.querySelectorAll('.nav-mobile-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // --- 3. QUICK ENQUIRY WIDGET (HOME PAGE) ---
  var enquiryForm = document.getElementById('bookingEnquiryForm');
  var tabButtons = document.querySelectorAll('.booking-tabs .tab-btn');
  var selectedTripType = 'Local Cab in Patna';

  if (tabButtons.length > 0) {
    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        selectedTripType = btn.getAttribute('data-trip-type') || btn.textContent.trim();

        // Update placeholder or labels dynamically if needed
        var dropInput = document.getElementById('enquiryDrop');
        if (dropInput) {
          if (selectedTripType.indexOf('Airport') !== -1) {
            dropInput.placeholder = 'e.g. Patna Airport / Patna Junction';
          } else if (selectedTripType.indexOf('Outstation') !== -1) {
            dropInput.placeholder = 'e.g. Gaya, Bodh Gaya, Rajgir, Muzaffarpur';
          } else {
            dropInput.placeholder = 'e.g. Kankarbagh, Boring Road, Bailey Road';
          }
        }
      });
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var pickupInput = document.getElementById('enquiryPickup');
      var dropInput = document.getElementById('enquiryDrop');
      var dateInput = document.getElementById('enquiryDate');
      var timeInput = document.getElementById('enquiryTime');
      var nameInput = document.getElementById('enquiryName');
      var phoneInput = document.getElementById('enquiryPhone');

      var isValid = true;

      // Validation
      var validateField = function (input, errorId, errorMsg) {
        var errorEl = document.getElementById(errorId);
        if (!input || !input.value.trim()) {
          if (input) input.classList.add('is-invalid');
          if (errorEl) errorEl.textContent = errorMsg;
          isValid = false;
        } else {
          if (input) input.classList.remove('is-invalid');
          if (errorEl) errorEl.textContent = '';
        }
      };

      validateField(pickupInput, 'pickupError', 'Please enter your pickup location');
      validateField(dropInput, 'dropError', 'Please enter your destination');
      validateField(dateInput, 'dateError', 'Please select a travel date');

      // Phone validation (optional field but if provided must look reasonable)
      if (phoneInput && phoneInput.value.trim()) {
        var phoneClean = phoneInput.value.trim().replace(/[^0-9]/g, '');
        if (phoneClean.length < 10) {
          phoneInput.classList.add('is-invalid');
          var phoneErr = document.getElementById('phoneError');
          if (phoneErr) phoneErr.textContent = 'Please enter a valid 10-digit mobile number';
          isValid = false;
        } else {
          phoneInput.classList.remove('is-invalid');
          var phoneErrOk = document.getElementById('phoneError');
          if (phoneErrOk) phoneErrOk.textContent = '';
        }
      }

      if (!isValid) {
        return;
      }

      var pickup = pickupInput ? pickupInput.value.trim() : '';
      var drop = dropInput ? dropInput.value.trim() : '';
      var travelDate = dateInput ? dateInput.value.trim() : '';
      var travelTime = timeInput && timeInput.value.trim() ? timeInput.value.trim() : 'As soon as possible / Flexible';
      var customerName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Customer';
      var customerPhone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : 'Not provided';

      // Build structured, clear WhatsApp message
      var lines = [
        'Hello Bihar Cab!',
        'I would like to enquire about a cab booking:',
        '',
        '• Service Type: ' + selectedTripType,
        '• Pickup Location: ' + pickup,
        '• Drop / Destination: ' + drop,
        '• Travel Date: ' + travelDate,
        '• Preferred Time: ' + travelTime,
        '• Customer Name: ' + customerName,
        '• Mobile Number: ' + customerPhone,
        '',
        'Please confirm vehicle availability and travel details. Thank you!'
      ];

      var messageText = lines.join('\n');
      var whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(messageText);

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // --- 4. CONTACT PAGE FORM (INSTANT FARE QUOTE ENQUIRY) ---
  var contactForm = document.getElementById('siteContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = document.getElementById('contactName');
      var routeInput = document.getElementById('contactRoute');
      var prefInput = document.getElementById('contactPref');

      var isValid = true;

      var checkReq = function (input, errorId, msg) {
        var errEl = document.getElementById(errorId);
        if (!input || !input.value.trim()) {
          if (input) input.classList.add('is-invalid');
          if (errEl) errEl.textContent = msg;
          isValid = false;
        } else {
          if (input) input.classList.remove('is-invalid');
          if (errEl) errEl.textContent = '';
        }
      };

      checkReq(nameInput, 'cNameError', 'Please enter your name');
      checkReq(routeInput, 'cRouteError', 'Please enter your pickup and drop route');

      if (!isValid) return;

      var name = nameInput.value.trim();
      var route = routeInput.value.trim();
      var pref = prefInput && prefInput.value.trim() ? prefInput.value.trim() : '';

      var lines = [
        'Hello Bihar Cab!',
        'I would like an instant fare quote from your website:',
        '',
        '• Name: ' + name,
        '• Pickup → Drop Route: ' + route
      ];

      if (pref) {
        lines.push('• Travel Date & Car Preference: ' + pref);
      }

      lines.push('');
      lines.push('Please share fare quote and availability.');

      var messageText = lines.join('\n');
      var whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(messageText);

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Set minimum date for booking input to today
  var dateFields = document.querySelectorAll('input[type="date"]');
  if (dateFields.length > 0) {
    var today = new Date().toISOString().split('T')[0];
    dateFields.forEach(function (field) {
      if (!field.getAttribute('min')) {
        field.setAttribute('min', today);
      }
    });
  }

  // --- 5. HERO CAROUSEL LOGIC ---
  var heroCarousel = document.getElementById('heroCarousel');
  if (heroCarousel) {
    var slides = heroCarousel.querySelectorAll('.hero-slide');
    var dots = heroCarousel.querySelectorAll('.hero-dot');
    var prevBtn = document.getElementById('heroPrevBtn');
    var nextBtn = document.getElementById('heroNextBtn');
    var currentSlide = 0;
    var totalSlides = slides.length;
    var timer = null;

    var showSlide = function (index) {
      if (index < 0) {
        index = totalSlides - 1;
      } else if (index >= totalSlides) {
        index = 0;
      }
      currentSlide = index;

      slides.forEach(function (slide, i) {
        if (i === currentSlide) {
          slide.classList.add('active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      dots.forEach(function (dot, i) {
        if (i === currentSlide) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    };

    var startTimer = function () {
      stopTimer();
      timer = setInterval(function () {
        showSlide(currentSlide + 1);
      }, 5000);
    };

    var stopTimer = function () {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        showSlide(currentSlide - 1);
        startTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        showSlide(currentSlide + 1);
        startTimer();
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var slideIdx = parseInt(dot.getAttribute('data-slide'), 10);
        showSlide(slideIdx);
        startTimer();
      });
    });

    heroCarousel.addEventListener('mouseenter', stopTimer);
    heroCarousel.addEventListener('mouseleave', startTimer);
    heroCarousel.addEventListener('touchstart', stopTimer, { passive: true });
    heroCarousel.addEventListener('touchend', startTimer, { passive: true });

    startTimer();
  }
});

