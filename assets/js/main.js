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
      slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
      clearInterval(slideInterval);
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        currentSlide = index;
        showSlide(currentSlide);
        stopSlideshow();
        startSlideshow();
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

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Handle dropdown on mobile
    const dropdownToggle = menu.querySelector('.nav-link-dropdown');
    const dropdown = menu.querySelector('.nav-dropdown');
    
    if (dropdownToggle && dropdown) {
      dropdownToggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
          const arrow = dropdownToggle.querySelector('.dropdown-arrow');
          if (arrow) {
            arrow.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
          }
        }
      });
    }

    const navLinks = menu.querySelectorAll('.nav-link:not(.nav-link-dropdown), .nav-dropdown-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        if (dropdown) {
          dropdown.classList.remove('active');
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

      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
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
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length === 0 || sections.length === 0) return;

    function updateActiveNav() {
      const scrollPos = window.pageYOffset + 150; // Offset for better detection

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
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

  // Form Handling
  function initForm() {
    const forms = document.querySelectorAll('#contact-form, #modal-form');
    
    forms.forEach(form => {
      if (!form) return;

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (!data.name || !data.phone) {
          alert('Please fill in all required fields');
          return;
        }

        alert('Thank you! We will contact you within 24-48 hours.\n\nNote: Replace the form action with your endpoint (Formspree/Netlify/custom API).');
        
        form.reset();
        
        const modal = document.getElementById('form-modal');
        if (modal && modal.classList.contains('active')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
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
