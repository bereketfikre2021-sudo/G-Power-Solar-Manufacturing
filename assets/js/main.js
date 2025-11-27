// G-Power Solar Manufacturing - Modern JavaScript

(function() {
  'use strict';

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initHeroSlideshow();
    initTypingAnimation();
    initMobileMenu();
    initModal();
    initFAQ();
    initProgressBar();
    initActiveNav();
    initForm();
    initScrollAnimations();
    initCounterAnimation();
    initTestimonialCarousel();
    initMVVCarousel();
    initCookieConsent();
    initExitIntent();
    initBreadcrumbs();
    initProductTabs();
    setYear();
  });

  // Typing Animation
  function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    const speed = 100; // Typing speed in milliseconds
    let index = 0;

    // Clear the text initially
    heroTitle.textContent = '';
    
    // Add cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    heroTitle.appendChild(cursor);

    function type() {
      if (index < text.length) {
        // Insert character before cursor
        const textNode = document.createTextNode(text.charAt(index));
        heroTitle.insertBefore(textNode, cursor);
        index++;
        setTimeout(type, speed);
      } else {
        // Animation complete - remove cursor after a delay
        setTimeout(() => {
          cursor.style.opacity = '0';
          setTimeout(() => {
            cursor.remove();
          }, 500);
        }, 1000);
      }
    }

    // Start typing animation after a short delay
    setTimeout(type, 500);
  }

  // Hero Slideshow
  function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length === 0) return;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        indicator.setAttribute('aria-selected', i === index ? 'true' : 'false');
        indicator.setAttribute('tabindex', i === index ? '0' : '-1');
      });

      if (slides[index]) {
        slides[index].classList.add('active');
      }
      if (indicators[index]) {
        indicators[index].classList.add('active');
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function startSlideshow() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        currentSlide = index;
        showSlide(currentSlide);
        stopSlideshow();
        startSlideshow();
      });

      // Keyboard support
      indicator.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          currentSlide = index;
          showSlide(currentSlide);
          stopSlideshow();
          startSlideshow();
        }
      });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopSlideshow);
      heroSection.addEventListener('mouseleave', startSlideshow);
    }

    startSlideshow();
  }

  // Mobile Menu
  function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    if (!menu) return;

    // Only add toggle functionality if toggle exists (hidden on mobile with normal menu)
    if (toggle) {
      toggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
      });
    }

    // Handle dropdown on mobile and desktop
    const dropdownToggle = menu.querySelector('.nav-link-dropdown');
    const dropdown = menu.querySelector('.nav-dropdown');
    
    if (dropdownToggle && dropdown) {
      dropdownToggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
          dropdownToggle.setAttribute('aria-expanded', dropdown.classList.contains('active'));
          const arrow = dropdownToggle.querySelector('.dropdown-arrow');
          if (arrow) {
            arrow.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
          }
        }
      });

      // Handle hover on desktop
      if (window.innerWidth > 768) {
        dropdownToggle.addEventListener('mouseenter', function() {
          dropdown.classList.add('active');
        });
        
        const navItem = dropdownToggle.closest('.nav-item-dropdown');
        if (navItem) {
          navItem.addEventListener('mouseleave', function() {
            dropdown.classList.remove('active');
          });
        }
      }
    }

    // Close menu when clicking nav links (only if toggle exists)
    const navLinks = menu.querySelectorAll('.nav-link:not(.nav-link-dropdown), .nav-dropdown-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (toggle) {
          menu.classList.remove('active');
          toggle.classList.remove('active');
        }
        if (dropdown) {
          dropdown.classList.remove('active');
          if (dropdownToggle) {
            dropdownToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }

  // Modal
  function initModal() {
    const modal = document.getElementById('form-modal');
    const openBtn = document.getElementById('open-form');
    const closeBtn = document.getElementById('close-form');

    if (!modal) return;

    function openModal() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (openBtn) {
      openBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // FAQ Accordion
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      // Handle click
      question.addEventListener('click', function() {
        toggleFAQ(item, question);
      });

      // Handle keyboard (Enter and Space)
      question.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFAQ(item, question);
        }
      });
    });

    function toggleFAQ(item, question) {
      const isActive = item.classList.contains('active');
      const answerId = question.getAttribute('aria-controls');
      const answer = answerId ? document.getElementById(answerId) : null;
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherQuestion = otherItem.querySelector('.faq-question');
          const otherAnswerId = otherQuestion?.getAttribute('aria-controls');
          const otherAnswer = otherAnswerId ? document.getElementById(otherAnswerId) : null;
          if (otherQuestion) {
            otherQuestion.setAttribute('aria-expanded', 'false');
          }
          if (otherAnswer) {
            otherAnswer.setAttribute('aria-hidden', 'true');
          }
        }
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        if (answer) {
          answer.setAttribute('aria-hidden', 'false');
        }
      } else {
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
        if (answer) {
          answer.setAttribute('aria-hidden', 'true');
        }
      }
    }
  }

  // Reading Progress Bar
  function initProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    function updateProgress() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = (scrollTop / scrollableHeight) * 100;
      
      progressBar.style.width = Math.min(progress, 100) + '%';
    }

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  // Active Navigation Indicator
  function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    const sections = document.querySelectorAll('section[id]');

    if ((navLinks.length === 0 && bottomNavItems.length === 0) || sections.length === 0) return;

    function updateActiveNav() {
      const scrollPos = window.pageYOffset + 150; // Offset for better detection

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          // Update top nav links
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
          
          // Update bottom nav items
          bottomNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + sectionId) {
              item.classList.add('active');
            }
          });
        }
      });

      // Handle home section (when at top)
      if (window.pageYOffset < 100) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
          }
        });
        
        bottomNavItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === '#home') {
            item.classList.add('active');
          }
        });
      }
    }

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();
  }

  // Counter Animation
  function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length === 0) return;

    let hasAnimated = false;

    function animateCounter(element) {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target;
        }
      };

      updateCounter();
    }

    // Use Intersection Observer to trigger animation when stats come into view
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statNumbers.forEach(stat => {
            animateCounter(stat);
          });
          observer.disconnect();
        }
      });
    }, observerOptions);

    // Observe the hero stats container
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
      observer.observe(heroStats);
    } else {
      // Fallback: animate immediately if hero stats are visible
      statNumbers.forEach(stat => {
        animateCounter(stat);
      });
    }
  }

  // Form Handling with Formspree Integration
  function initForm() {
    const forms = document.querySelectorAll('#contact-form, #modal-form');
    
    forms.forEach(form => {
      if (!form) return;

      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton ? submitButton.textContent : 'Send Request';
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validation
        if (!data.name || !data.phone) {
          showMessage('error', 'Please fill in all required fields (Name and Phone)', form);
          return;
        }

        // Phone validation (Ethiopian format: +251XXXXXXXXX or 0XXXXXXXXX or 09XXXXXXXX)
        const phoneRegex = /^(\+251|0|251)?[79]\d{8}$/;
        const cleanPhone = data.phone.replace(/[\s-]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
          showMessage('error', 'Please enter a valid Ethiopian phone number (e.g., +251 911 276 877)', form);
          return;
        }

        // Show loading state
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';
          submitButton.style.opacity = '0.7';
        }

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            showMessage('success', 'Thank you! We will contact you within 24-48 hours.', form);
            form.reset();
            
            // Close modal if open
            const modal = document.getElementById('form-modal');
            if (modal && modal.classList.contains('active')) {
              setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
              }, 2000);
            }
          } else {
            const errorData = await response.json();
            showMessage('error', errorData.error || 'Something went wrong. Please try again.', form);
          }
        } catch (error) {
          showMessage('error', 'Network error. Please check your connection and try again.', form);
        } finally {
          // Reset button state
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            submitButton.style.opacity = '1';
          }
        }
      });
    });
  }

  // Show styled message (success or error)
  function showMessage(type, message, form) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.setAttribute('role', 'alert');
    messageEl.setAttribute('aria-live', 'polite');
    
    // Add icon
    const icon = document.createElement('span');
    icon.className = 'form-message-icon';
    if (type === 'success') {
      icon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
    } else {
      icon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    }
    
    // Add text
    const text = document.createElement('span');
    text.className = 'form-message-text';
    text.textContent = message;
    
    messageEl.appendChild(icon);
    messageEl.appendChild(text);
    
    // Insert before submit button
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      form.insertBefore(messageEl, submitButton);
    } else {
      form.appendChild(messageEl);
    }

    // Auto-remove after 5 seconds for success, 7 seconds for error
    const removeDelay = type === 'success' ? 5000 : 7000;
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          if (messageEl.parentNode) {
            messageEl.remove();
          }
        }, 300);
      }
    }, removeDelay);

    // Scroll to message if needed
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Scroll Animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .solution-card, .service-item, .faq-item');
    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
  }

  // Testimonial Carousel for Mobile
  function initTestimonialCarousel() {
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialsScroll = document.querySelector('.testimonials-scroll');
    if (!testimonialsTrack || !testimonialsScroll) return;

    let slideInterval = null;

    function isMobile() {
      return window.innerWidth <= 768;
    }

    function initCarousel() {
      // Clear any existing interval
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }

      if (!isMobile()) {
        // Reset to default behavior on desktop
        testimonialsTrack.style.transform = '';
        testimonialsTrack.style.transition = '';
        return;
      }

      // Get only the first set of unique testimonial cards (not duplicates)
      const allCards = testimonialsTrack.querySelectorAll('.testimonial-card');
      const uniqueCards = Array.from(allCards).slice(0, 4); // First 4 are unique
      
      if (uniqueCards.length === 0) return;

      let currentIndex = 0;

      function slideToNext() {
        // Get the first card to calculate width
        const firstCard = uniqueCards[0];
        if (!firstCard) return;
        
        // Calculate card width including gap
        const cardWidth = firstCard.offsetWidth;
        const gap = 16; // 1rem gap in pixels
        const totalWidth = cardWidth + gap;
        
        currentIndex = (currentIndex + 1) % uniqueCards.length;
        const translateX = -currentIndex * totalWidth;
        testimonialsTrack.style.transform = `translateX(${translateX}px)`;
      }

      // Initialize position
      testimonialsTrack.style.transform = 'translateX(0)';
      testimonialsTrack.style.transition = 'transform 0.6s ease-in-out';

      // Start auto-slide with 3 seconds duration
      slideInterval = setInterval(slideToNext, 3000);

      // Reinitialize on resize
      let resizeTimeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          initCarousel();
        }, 250);
      };

      window.addEventListener('resize', handleResize);
    }

    // Initialize carousel
    initCarousel();
  }

  // Mission, Vision, Values Carousel
  function initMVVCarousel() {
    const slides = document.querySelectorAll('.mvv-slide');
    const indicators = document.querySelectorAll('.mvv-indicator');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length === 0) return;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));

      if (slides[index]) {
        slides[index].classList.add('active');
      }
      if (indicators[index]) {
        indicators[index].classList.add('active');
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function startSlideshow() {
      slideInterval = setInterval(nextSlide, 4000); // 4 seconds per slide
    }

    function stopSlideshow() {
      clearInterval(slideInterval);
    }

    // Indicator click handlers
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        currentSlide = index;
        showSlide(currentSlide);
        stopSlideshow();
        startSlideshow();
      });
    });

    // Pause on hover
    const carouselWrapper = document.querySelector('.mvv-carousel-wrapper');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', stopSlideshow);
      carouselWrapper.addEventListener('mouseleave', startSlideshow);
    }

    startSlideshow();
  }

  // Set Year
  function setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // Cookie Consent
  function initCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptAllBtn = document.getElementById('cookie-accept-all');
    const acceptNecessaryBtn = document.getElementById('cookie-accept-necessary');

    if (!cookieConsent) return;

    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    if (cookieChoice) {
      cookieConsent.setAttribute('aria-hidden', 'true');
      cookieConsent.classList.remove('show');
      return;
    }

    // Show cookie consent after a short delay
    setTimeout(() => {
      cookieConsent.setAttribute('aria-hidden', 'false');
      cookieConsent.classList.add('show');
    }, 1000);

    function acceptCookies(allCookies = false) {
      localStorage.setItem('cookieConsent', allCookies ? 'all' : 'necessary');
      localStorage.setItem('cookieConsentDate', new Date().toISOString());
      cookieConsent.setAttribute('aria-hidden', 'true');
      cookieConsent.classList.remove('show');
      
      // Enable analytics if all cookies accepted
      if (allCookies && typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
      }
    }

    if (acceptAllBtn) {
      acceptAllBtn.addEventListener('click', () => acceptCookies(true));
    }

    if (acceptNecessaryBtn) {
      acceptNecessaryBtn.addEventListener('click', () => acceptCookies(false));
    }
  }

  // Exit Intent Popup
  function initExitIntent() {
    const exitPopup = document.getElementById('exit-intent-popup');
    const closeBtn = document.getElementById('exit-intent-close');
    const dismissBtn = document.getElementById('exit-intent-dismiss');
    const openFormBtn = document.getElementById('open-form-exit');

    if (!exitPopup) return;

    // Check if user has seen or dismissed popup (using localStorage - persists across sessions)
    // Show only once ever, or optionally after 30 days
    const dismissedData = localStorage.getItem('exitIntentDismissed');
    if (dismissedData) {
      const dismissed = JSON.parse(dismissedData);
      const now = Date.now();
      // Optional: Show again after 30 days (uncomment if needed)
      // const daysSinceDismissed = (now - dismissed.timestamp) / (1000 * 60 * 60 * 24);
      // if (daysSinceDismissed < 30) return;
      // For "show only once ever", just return if dismissed exists
      return;
    }

    let mouseLeft = false;

    // Track mouse movement
    document.addEventListener('mouseout', function(e) {
      if (!e.toElement && !e.relatedTarget && e.clientY < 10) {
        mouseLeft = true;
      }
    });

    // Show popup when user tries to leave (only once ever)
    document.addEventListener('mouseleave', function(e) {
      if (e.clientY <= 0 && mouseLeft) {
        // Mark as shown immediately to prevent showing again
        localStorage.setItem('exitIntentDismissed', JSON.stringify({
          dismissed: true,
          timestamp: Date.now(),
          shown: true
        }));
        
        exitPopup.setAttribute('aria-hidden', 'false');
        exitPopup.classList.add('show');
        document.body.style.overflow = 'hidden';
        mouseLeft = false;
      }
    });

    function closePopup(remember = true) {
      exitPopup.setAttribute('aria-hidden', 'true');
      exitPopup.classList.remove('show');
      document.body.style.overflow = '';
      
      // Remember dismissal permanently (or for 30 days if you uncomment the check above)
      if (remember) {
        localStorage.setItem('exitIntentDismissed', JSON.stringify({
          dismissed: true,
          timestamp: Date.now()
        }));
      }
    }

    // Track if popup was shown (even if not dismissed)
    let popupShown = false;

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closePopup(true);
      });
    }

    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        closePopup(true);
      });
    }

    if (openFormBtn) {
      openFormBtn.addEventListener('click', () => {
        closePopup(true);
        const openForm = document.getElementById('open-form');
        if (openForm) openForm.click();
      });
    }

    // Close on background click
    exitPopup.addEventListener('click', function(e) {
      if (e.target === exitPopup) {
        closePopup(true);
      }
    });

  }

  // Breadcrumbs
  function initBreadcrumbs() {
    const breadcrumbList = document.querySelector('.breadcrumb-list');
    if (!breadcrumbList) return;

    // Get current section from URL hash or scroll position
    function updateBreadcrumbs() {
      const hash = window.location.hash;
      const sections = [
        { id: 'home', name: 'Home' },
        { id: 'about', name: 'About' },
        { id: 'solutions', name: 'Solutions' },
        { id: 'products', name: 'Products' },
        { id: 'services', name: 'Services' },
        { id: 'contact', name: 'Contact' }
      ];

      let currentSection = 'home';
      if (hash) {
        currentSection = hash.replace('#', '');
      } else {
        // Detect current section from scroll position
        const scrollPos = window.pageYOffset + 150;
        sections.forEach(section => {
          const element = document.getElementById(section.id);
          if (element) {
            const top = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              currentSection = section.id;
            }
          }
        });
      }

      // Update breadcrumbs
      breadcrumbList.innerHTML = '<li class="breadcrumb-item"><a href="#home">Home</a></li>';
      
      const current = sections.find(s => s.id === currentSection);
      if (current && current.id !== 'home') {
        breadcrumbList.innerHTML += `<li class="breadcrumb-item">${current.name}</li>`;
      }
    }

    // Update on scroll and hash change
    window.addEventListener('scroll', updateBreadcrumbs);
    window.addEventListener('hashchange', updateBreadcrumbs);
    updateBreadcrumbs();
  }

  // Enhanced Form Validation
  function enhanceFormValidation() {
    const forms = document.querySelectorAll('#contact-form, #modal-form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', function() {
          validateField(input);
        });

        input.addEventListener('input', function() {
          if (input.classList.contains('error')) {
            validateField(input);
          }
        });

        // Phone number formatting
        if (input.type === 'tel' || input.name === 'phone') {
          input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('251')) {
              value = '+' + value;
            } else if (value.startsWith('0')) {
              value = '+251' + value.substring(1);
            } else if (value && !value.startsWith('+')) {
              value = '+251' + value;
            }
            e.target.value = value;
          });
        }
      });
    });
  }

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if ((field.type === 'tel' || field.name === 'phone') && value) {
      const phoneRegex = /^(\+251|0|251)?[79]\d{8}$/;
      const cleanPhone = value.replace(/[\s-]/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        isValid = false;
        errorMessage = 'Please enter a valid Ethiopian phone number';
      }
    }

    // Show error
    if (!isValid) {
      field.classList.add('error');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = errorMessage;
      field.parentElement.appendChild(errorDiv);
    }

    return isValid;
  }

  // Initialize enhanced validation
  enhanceFormValidation();

  // Product Tabs
  function initProductTabs() {
    const tabs = document.querySelectorAll('.product-tab');
    const panels = document.querySelectorAll('.product-tab-panel');

    if (tabs.length === 0 || panels.length === 0) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and panels
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        
        panels.forEach(p => {
          p.classList.remove('active');
        });

        // Add active class to clicked tab
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        // Show corresponding panel
        const targetPanel = document.getElementById(`tab-${targetTab}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }

        // Track tab change in analytics (if GA is loaded)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'product_tab_click', {
            'event_category': 'engagement',
            'event_label': targetTab
          });
        }
      });

      // Keyboard support
      tab.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
        
        // Arrow key navigation
        const currentIndex = Array.from(tabs).indexOf(this);
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const nextIndex = e.key === 'ArrowRight' 
            ? (currentIndex + 1) % tabs.length
            : (currentIndex - 1 + tabs.length) % tabs.length;
          tabs[nextIndex].focus();
          tabs[nextIndex].click();
        }
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

})();
