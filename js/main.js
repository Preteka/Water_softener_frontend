/**
 * AquaPure - Home Water Softener & Filtration
 * Main JavaScript (Vanilla ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Toggle (Light / Dark Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const mobileThemeIcon = document.getElementById('mobileThemeIcon');
  const themeText = document.getElementById('themeText');

  const getSavedTheme = () => {
    return localStorage.getItem('aquapure_theme') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      const sunSvg = `
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      `;
      if (themeIcon) themeIcon.innerHTML = sunSvg;
      if (mobileThemeIcon) mobileThemeIcon.innerHTML = sunSvg;
      if (themeText) themeText.textContent = 'Light Mode';
    } else {
      document.documentElement.removeAttribute('data-theme');
      const moonSvg = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
      if (themeIcon) themeIcon.innerHTML = moonSvg;
      if (mobileThemeIcon) mobileThemeIcon.innerHTML = moonSvg;
      if (themeText) themeText.textContent = 'Dark Mode';
    }
    localStorage.setItem('aquapure_theme', theme);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  applyTheme(getSavedTheme());

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

  // --------------------------------------------------------------------------
  // 2. Direction Toggle (LTR / RTL)
  // --------------------------------------------------------------------------
  const dirToggleBtn = document.getElementById('dirToggleBtn');
  const mobileDirToggleBtn = document.getElementById('mobileDirToggleBtn');
  const dirLabel = document.getElementById('dirLabel');
  const mobileDirLabel = document.getElementById('mobileDirLabel');

  const getSavedDir = () => {
    return localStorage.getItem('aquapure_dir') || 'ltr';
  };

  const applyDir = (dir) => {
    document.documentElement.setAttribute('dir', dir);
    const nextText = dir === 'rtl' ? 'LTR' : 'RTL';
    if (dirLabel) dirLabel.textContent = nextText;
    if (mobileDirLabel) mobileDirLabel.textContent = `Switch to ${nextText}`;
    localStorage.setItem('aquapure_dir', dir);
  };

  const toggleDir = () => {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    applyDir(currentDir === 'ltr' ? 'rtl' : 'ltr');
  };

  applyDir(getSavedDir());

  if (dirToggleBtn) dirToggleBtn.addEventListener('click', toggleDir);
  if (mobileDirToggleBtn) mobileDirToggleBtn.addEventListener('click', toggleDir);

  // --------------------------------------------------------------------------
  // 3. Hero Slider Functionality (Reference UI Match)
  // --------------------------------------------------------------------------
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator-bar');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  let currentSlide = 0;
  let sliderInterval = null;

  const showSlide = (index) => {
    if (!slides.length) return;
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });
    indicators.forEach((ind, idx) => {
      ind.classList.toggle('active', idx === index);
    });
    currentSlide = index;
  };

  const nextSlide = () => {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  };

  const prevSlide = () => {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  };

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  indicators.forEach((bar, idx) => {
    bar.addEventListener('click', () => {
      showSlide(idx);
    });
  });

  // Auto slide rotation (every 7 seconds)
  const startSliderAuto = () => {
    sliderInterval = setInterval(nextSlide, 7000);
  };

  const stopSliderAuto = () => {
    if (sliderInterval) clearInterval(sliderInterval);
  };

  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopSliderAuto);
    heroSlider.addEventListener('mouseleave', startSliderAuto);
  }
  startSliderAuto();

  // Video Autoplay Initialization
  const heroVideo = document.querySelector('.hero-video-bg');
  if (heroVideo) {
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay handled
      });
    }
  }

  // --------------------------------------------------------------------------
  // 4. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-link');

  const openMobileNav = () => {
    if (hamburgerBtn) {
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    if (mobileNavDrawer) mobileNavDrawer.classList.add('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    if (mobileNavDrawer) mobileNavDrawer.classList.remove('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 5. Sticky Header Scroll Effect
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------------------------------------------------------------------------
  // 6. Interactive Modal for "Book a Free Water Test"
  // --------------------------------------------------------------------------
  const testModal = document.getElementById('testBookingModal');
  const openModalBtns = document.querySelectorAll('.trigger-water-test');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');

  const openModal = (e) => {
    if (e) e.preventDefault();
    if (testModal) {
      testModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (bookingForm) bookingForm.style.display = 'block';
      if (bookingSuccess) bookingSuccess.style.display = 'none';
    }
  };

  const closeModal = () => {
    if (testModal) {
      testModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (testModal) {
    testModal.addEventListener('click', (e) => {
      if (e.target === testModal) closeModal();
    });
  }

  // --------------------------------------------------------------------------
  // 7. Radial Water Solutions Infographic Hover Effects
  // --------------------------------------------------------------------------
  const radialNodes = document.querySelectorAll('.radial-node');
  const centralDrop = document.getElementById('centralWaterDrop');

  radialNodes.forEach(node => {
    const lineId = node.getAttribute('data-target-line');
    const targetLine = lineId ? document.getElementById(lineId) : null;

    node.addEventListener('mouseenter', () => {
      if (targetLine) targetLine.classList.add('active');
      if (centralDrop) centralDrop.style.filter = 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.9))';
    });

    node.addEventListener('mouseleave', () => {
      if (targetLine) targetLine.classList.remove('active');
      if (centralDrop) centralDrop.style.filter = '';
    });
  });

  // --------------------------------------------------------------------------
  // 8. Premium Water Droplet – Animated Liquid Wave (Why Choose Us)
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const wave1El = document.getElementById('wdropWave1');
    const wave2El = document.getElementById('wdropWave2');

    if (wave1El && wave2El) {
      // Base Y positions for the two wave surfaces
      const WAVE1_BASE_Y = 320;
      const WAVE2_BASE_Y = 335;

      // Amplitude of the sine-driven wave shape oscillation (px)
      const AMP = 14;
      // Speed of horizontal wave travel (radians per ms)
      const SPEED1 = 0.00055;
      const SPEED2 = 0.00038;
      // Slow liquid level rise / fall: ±12px over ~8s
      const LEVEL_AMP = 12;
      const LEVEL_SPEED = 0.000125;

      let lastTime = null;
      let phase1 = 0;
      let phase2 = Math.PI * 0.6;

      /**
       * Build a horizontal sinusoidal wave path filling downward.
       * @param {number} baseY    - vertical centre of the wave
       * @param {number} phase    - current phase offset
       * @param {number} amp      - wave amplitude
       * @param {number} levelOff - slow level adjustment (+ = lower liquid)
       */
      const buildWavePath = (baseY, phase, amp, levelOff) => {
        const y0 = baseY + levelOff;
        // Sample quadratic bezier control points across width 0-500
        const pts = [];
        const steps = 6;
        const stepW = 560 / steps;

        for (let i = 0; i <= steps; i++) {
          const x = -30 + i * stepW;
          const y = y0 + Math.sin(phase + i * 1.15) * amp;
          pts.push({ x, y });
        }

        // Build path using quadratic curves through midpoints
        let d = `M ${pts[0].x},${pts[0].y}`;
        for (let i = 0; i < pts.length - 1; i++) {
          const mid = { x: (pts[i].x + pts[i + 1].x) / 2, y: (pts[i].y + pts[i + 1].y) / 2 };
          d += ` Q ${pts[i].x},${pts[i].y} ${mid.x},${mid.y}`;
        }
        d += ` L ${pts[pts.length - 1].x},${pts[pts.length - 1].y}`;
        d += ` L 530,680 L -30,680 Z`;
        return d;
      };

      const animateWaves = (timestamp) => {
        if (!lastTime) lastTime = timestamp;
        const delta = timestamp - lastTime;
        lastTime = timestamp;

        phase1 += SPEED1 * delta;
        phase2 += SPEED2 * delta;

        // Slow liquid-level oscillation (sin over time)
        const elapsed = timestamp * LEVEL_SPEED;
        const levelOffset = Math.sin(elapsed) * LEVEL_AMP;

        wave1El.setAttribute('d', buildWavePath(WAVE1_BASE_Y, phase1, AMP, levelOffset));
        wave2El.setAttribute('d', buildWavePath(WAVE2_BASE_Y, phase2, AMP * 0.8, levelOffset + 4));

        requestAnimationFrame(animateWaves);
      };

      requestAnimationFrame(animateWaves);
    }
  }

  // --------------------------------------------------------------------------
  // 9. Booking Form Submission Handling
  // --------------------------------------------------------------------------
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      bookingForm.style.display = 'none';
      if (bookingSuccess) {
        bookingSuccess.style.display = 'block';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. Animated Statistics Counters
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-num-value[data-target]');
  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          const duration = 1800;
          const startTime = performance.now();

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * target);

            el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
            }
          };

          requestAnimationFrame(updateCount);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(stat => statsObserver.observe(stat));
  }

  // --------------------------------------------------------------------------
  // 11. Water Quality Bars Scroll Animation
  // --------------------------------------------------------------------------
  const qualityFills = document.querySelectorAll('.metric-bar-fill[data-percent], .quality-fill[data-percent]');
  if (qualityFills.length > 0 && 'IntersectionObserver' in window) {
    const barObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percent = bar.getAttribute('data-percent') || '0';
          bar.style.width = `${percent}%`;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    qualityFills.forEach(bar => barObserver.observe(bar));
  }

  // --------------------------------------------------------------------------
  // 12. Process Stacked Cards Scroll Reveal Animation
  // --------------------------------------------------------------------------
  const procCards = document.querySelectorAll('.proc-card');
  if (procCards.length > 0 && 'IntersectionObserver' in window) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      const procObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      procCards.forEach((card, idx) => {
        card.style.transitionDelay = `${idx * 0.12}s`;
        procObserver.observe(card);
      });
    } else {
      procCards.forEach(card => card.classList.add('in-view'));
    }
  }

  // --------------------------------------------------------------------------
  // 13. Execution Standard Feature Blocks Reveal Animation
  // --------------------------------------------------------------------------
  const execBlocks = document.querySelectorAll('.exec-feature-block');
  if (execBlocks.length > 0 && 'IntersectionObserver' in window) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      const execObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      execBlocks.forEach((block, idx) => {
        block.style.transitionDelay = `${idx * 0.1}s`;
        execObserver.observe(block);
      });
    } else {
      execBlocks.forEach(b => b.classList.add('in-view'));
    }
  }

  // --------------------------------------------------------------------------
  // 14. Profile Dropdown Menu (Auth-aware)
  // --------------------------------------------------------------------------
  const profileMenuBtn = document.getElementById('profileMenuBtn');
  const profileDropdownPanel = document.getElementById('profileDropdownPanel');
  const profileDropdownWrapper = document.getElementById('profileDropdownWrapper');

  if (profileMenuBtn && profileDropdownPanel) {
    // Build dropdown content based on auth state
    const buildProfileDropdown = () => {
      const user = (typeof AquaPureAuth !== 'undefined') ? AquaPureAuth.getUser() : null;

      if (user) {
        // Logged-in state
        const initials = user.name
          ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
          : 'AP';

        profileDropdownPanel.innerHTML = `
          <div class="dropdown-user-header">
            <div class="dropdown-user-avatar" aria-hidden="true">${initials}</div>
            <div class="dropdown-user-info">
              <div class="dropdown-user-name">${user.name || 'AquaPure Member'}</div>
              <div class="dropdown-user-email">${user.email || ''}</div>
            </div>
          </div>
          <a href="pricing.html" class="profile-dropdown-item" role="menuitem">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            My Bookings
          </a>
          <a href="contact.html" class="profile-dropdown-item" role="menuitem">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.22 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Support
          </a>
          <div class="profile-dropdown-divider"></div>
          <button class="profile-dropdown-item logout-item" id="profileLogoutBtn" role="menuitem">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign Out
          </button>
        `;

        // Logout handler
        const logoutBtn = document.getElementById('profileLogoutBtn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', () => {
            if (typeof AquaPureAuth !== 'undefined') {
              AquaPureAuth.logout();
            }
          });
        }

      } else {
        // Guest state
        profileDropdownPanel.innerHTML = `
          <a href="login.html?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}" class="profile-dropdown-item" role="menuitem">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            Sign In
          </a>
          <a href="signup.html" class="profile-dropdown-item" role="menuitem">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>
            Create Account
          </a>
          <div class="profile-dropdown-divider"></div>
          <a href="pricing.html" class="profile-dropdown-item" role="menuitem">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Book a Service
          </a>
        `;
      }
    };

    // Toggle dropdown open/closed
    const openProfileDropdown = () => {
      buildProfileDropdown();
      profileDropdownPanel.classList.add('active');
      profileMenuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeProfileDropdown = () => {
      profileDropdownPanel.classList.remove('active');
      profileMenuBtn.setAttribute('aria-expanded', 'false');
    };

    profileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = profileDropdownPanel.classList.contains('active');
      if (isOpen) {
        closeProfileDropdown();
      } else {
        openProfileDropdown();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (profileDropdownWrapper && !profileDropdownWrapper.contains(e.target)) {
        closeProfileDropdown();
      }
    });

    // Close on Escape key (already handled in Escape handler, but reinforce)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && profileDropdownPanel.classList.contains('active')) {
        closeProfileDropdown();
        profileMenuBtn.focus();
      }
    });

    // Close when a menu item is clicked
    profileDropdownPanel.addEventListener('click', (e) => {
      if (e.target.closest('.profile-dropdown-item')) {
        setTimeout(closeProfileDropdown, 150);
      }
    });
  }
});



