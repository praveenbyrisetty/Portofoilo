/* ============================================================
   PORTFOLIO INTERACTIONS
   Praveen Kumar Byrisetty — SOC Analyst Portfolio
   ============================================================ */

(function () {
  'use strict';

  // ── Theme Toggle ───────────────────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function getStoredTheme() {
    return localStorage.getItem('portfolio-theme') || 'dark';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }

  // Initialize theme
  setTheme(getStoredTheme());

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  // ── Navigation Scroll Effect ───────────────────────────────
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ── Active Nav Link Highlighting ───────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[data-nav]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('data-nav') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ── Mobile Menu ────────────────────────────────────────────
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('[data-mobile-nav]');

  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ── Scroll Reveal (Intersection Observer) ──────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ── Hero Counter Animation ─────────────────────────────────
  const statNumbers = document.querySelectorAll('.hero__stat-number[data-count]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1500;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = current + '+';

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => counterObserver.observe(el));

  // ── Skill Bar Animation ────────────────────────────────────
  const skillFills = document.querySelectorAll('.skill-item__fill[data-width]');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          entry.target.style.width = width + '%';
          entry.target.classList.add('animated');
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillFills.forEach((el) => skillObserver.observe(el));

  // ── Case Study Toggle ──────────────────────────────────────
  const caseStudyToggles = document.querySelectorAll('[data-toggle-case]');

  caseStudyToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-toggle-case');
      const caseStudy = document.getElementById(targetId);

      if (!caseStudy) return;

      const isOpen = caseStudy.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);

      // Update button text
      const svg = btn.querySelector('svg');
      if (isOpen) {
        btn.childNodes[0].textContent = 'Close Case Study ';
        if (svg) svg.style.transform = 'rotate(90deg)';
      } else {
        btn.childNodes[0].textContent = 'View Case Study ';
        if (svg) svg.style.transform = 'rotate(0deg)';
      }
    });
  });

  // ── Smooth Scroll for Anchor Links ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Keyboard Navigation Support ────────────────────────────
  document.addEventListener('keydown', (e) => {
    // Escape closes mobile menu
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      mobileToggle.focus();
    }
  });

  // ── Prefers Reduced Motion ─────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    // Instantly show all reveal elements
    revealElements.forEach((el) => {
      el.classList.add('visible');
      el.style.transition = 'none';
    });

    // Instantly fill skill bars
    skillFills.forEach((el) => {
      el.style.transition = 'none';
      el.style.width = el.getAttribute('data-width') + '%';
    });
  }

  // ── Console Easter Egg ─────────────────────────────────────
  console.log(
    '%c🛡️ Praveen Kumar Byrisetty — SOC Analyst Portfolio',
    'font-size: 16px; font-weight: bold; color: #2DD4BF;'
  );
  console.log(
    '%cIf you\'re inspecting this, we probably think alike. Let\'s connect!',
    'font-size: 12px; color: #A1A1AA;'
  );
})();
