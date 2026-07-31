// ===== Studio Noir — Main JS =====
(function () {
  'use strict';

  // ===== Portfolio Data =====
  const portfolioData = [
    { id: 1, title: 'The Vow', category: 'wedding', catLabel: 'Wedding', variant: 'a', aspect: 'tall' },
    { id: 2, title: 'Golden Hour Bride', category: 'wedding', catLabel: 'Wedding', variant: 'b', aspect: 'normal' },
    { id: 3, title: 'Silhouette in Veil', category: 'wedding', catLabel: 'Wedding', variant: 'c', aspect: 'tall' },
    { id: 4, title: 'The Muse', category: 'portrait', catLabel: 'Portrait', variant: 'd', aspect: 'tall' },
    { id: 5, title: 'Quiet Strength', category: 'portrait', catLabel: 'Portrait', variant: 'e', aspect: 'normal' },
    { id: 6, title: 'The Author', category: 'portrait', catLabel: 'Portrait', variant: 'f', aspect: 'tall' },
    { id: 7, title: 'Aesop Campaign', category: 'commercial', catLabel: 'Commercial', variant: 'g', aspect: 'wide' },
    { id: 8, title: 'Bottle & Light', category: 'commercial', catLabel: 'Commercial', variant: 'h', aspect: 'normal' },
    { id: 9, title: 'Hermès Edit', category: 'commercial', catLabel: 'Commercial', variant: 'i', aspect: 'tall' },
    { id: 10, title: 'Iceland Black Sand', category: 'landscape', catLabel: 'Landscape', variant: 'j', aspect: 'wide' },
    { id: 11, title: 'Patagonia Dawn', category: 'landscape', catLabel: 'Landscape', variant: 'k', aspect: 'normal' },
    { id: 12, title: 'Norwegian Fjord', category: 'landscape', catLabel: 'Landscape', variant: 'l', aspect: 'tall' },
  ];

  // SVG generator for placeholder art
  function generateArt(variant, w = 400, h = 500) {
    const palettes = {
      a: { bg: '#1a1510', accent: '#d4a85a', sub: '#3a2a15' },
      b: { bg: '#1a1a1e', accent: '#c9a86a', sub: '#2e2a35' },
      c: { bg: '#121212', accent: '#d4a85a', sub: '#1a1a1a' },
      d: { bg: '#181410', accent: '#e0b866', sub: '#2a2018' },
      e: { bg: '#101012', accent: '#c4a058', sub: '#1c1c20' },
      f: { bg: '#151218', accent: '#d4a85a', sub: '#222028' },
      g: { bg: '#1e1a14', accent: '#d4a85a', sub: '#382e1e' },
      h: { bg: '#161616', accent: '#caa860', sub: '#262626' },
      i: { bg: '#1a1612', accent: '#d4a85a', sub: '#2e2418' },
      j: { bg: '#0e0e10', accent: '#b8a070', sub: '#1a1a1e' },
      k: { bg: '#141210', accent: '#d4a85a', sub: '#241e16' },
      l: { bg: '#0a0e12', accent: '#a8a0c0', sub: '#121620' },
    };
    const p = palettes[variant] || palettes.a;
    const shapes = [];

    // Background
    shapes.push(`<rect width="${w}" height="${h}" fill="${p.bg}"/>`);

    // Grain overlay
    shapes.push(`<rect width="${w}" height="${h}" fill="${p.sub}" opacity="0.3"/>`);

    // Decorative elements based on variant
    const cx = w / 2, cy = h / 2;

    if (['a', 'c', 'f', 'i'].includes(variant)) {
      // Wedding / portrait — vertical lines, soft circles
      shapes.push(`<circle cx="${cx}" cy="${cy - 40}" r="${h * 0.18}" fill="none" stroke="${p.accent}" stroke-width="1" opacity="0.3"/>`);
      shapes.push(`<circle cx="${cx}" cy="${cy - 40}" r="${h * 0.12}" fill="none" stroke="${p.accent}" stroke-width="0.5" opacity="0.2"/>`);
      shapes.push(`<line x1="${w * 0.2}" y1="0" x2="${w * 0.2}" y2="${h}" stroke="${p.accent}" stroke-width="0.5" opacity="0.1"/>`);
      shapes.push(`<line x1="${w * 0.8}" y1="0" x2="${w * 0.8}" y2="${h}" stroke="${p.accent}" stroke-width="0.5" opacity="0.1"/>`);
      // Arch shape
      shapes.push(`<path d="M ${w*0.25} ${h*0.85} L ${w*0.25} ${h*0.35} Q ${w*0.25} ${h*0.15} ${w*0.5} ${h*0.15} Q ${w*0.75} ${h*0.15} ${w*0.75} ${h*0.35} L ${w*0.75} ${h*0.85}" fill="none" stroke="${p.accent}" stroke-width="1" opacity="0.25"/>`);
    } else if (['b', 'e', 'h', 'k'].includes(variant)) {
      // Horizontal lines, rectangles
      shapes.push(`<rect x="${w*0.15}" y="${h*0.2}" width="${w*0.7}" height="${h*0.5}" fill="none" stroke="${p.accent}" stroke-width="1" opacity="0.2"/>`);
      shapes.push(`<line x1="0" y1="${h*0.5}" x2="${w}" y2="${h*0.5}" stroke="${p.accent}" stroke-width="0.5" opacity="0.1"/>`);
      shapes.push(`<rect x="${w*0.3}" y="${h*0.3}" width="${w*0.4}" height="${h*0.3}" fill="${p.sub}" opacity="0.5"/>`);
      shapes.push(`<circle cx="${cx}" cy="${h*0.45}" r="${w*0.08}" fill="${p.accent}" opacity="0.15"/>`);
    } else if (['d', 'g', 'j', 'l'].includes(variant)) {
      // Diagonal / landscape feel
      shapes.push(`<path d="M 0 ${h*0.6} L ${w*0.3} ${h*0.45} L ${w*0.5} ${h*0.5} L ${w*0.7} ${h*0.35} L ${w} ${h*0.4}" fill="none" stroke="${p.accent}" stroke-width="1" opacity="0.2"/>`);
      shapes.push(`<path d="M 0 ${h*0.7} L ${w*0.35} ${h*0.55} L ${w*0.6} ${h*0.6} L ${w} ${h*0.5}" fill="${p.sub}" opacity="0.3"/>`);
      shapes.push(`<circle cx="${w*0.75}" cy="${h*0.25}" r="${w*0.06}" fill="${p.accent}" opacity="0.12"/>`);
      shapes.push(`<line x1="${w*0.1}" y1="${h}" x2="${w*0.4}" y2="0" stroke="${p.accent}" stroke-width="0.5" opacity="0.08"/>`);
    }

    // Vignette
    shapes.push(`<rect width="${w}" height="${h}" fill="url(#vig-${variant})"/>`);
    // Grain
    shapes.push(`<rect width="${w}" height="${h}" fill="${p.accent}" opacity="0.01"/>`);

    // Gradient defs
    const defs = `<defs><radialGradient id="vig-${variant}" cx="50%" cy="50%" r="70%"><stop offset="50%" stop-color="${p.bg}" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.7"/></radialGradient></defs>`;

    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${defs}${shapes.join('')}</svg>`;
  }

  // ===== Render Portfolio Items =====
  function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    portfolioData.forEach((item, idx) => {
      const el = document.createElement('div');
      const aspectClass = item.aspect === 'tall' ? 'portfolio-item-tall' : item.aspect === 'wide' ? 'portfolio-item-wide' : '';
      el.className = `portfolio-item reveal ${aspectClass}`;
      el.setAttribute('data-category', item.category);
      el.setAttribute('data-index', idx);
      el.innerHTML = `
        <div class="portfolio-art">${generateArt(item.variant)}</div>
        <span class="portfolio-item-num">${String(idx + 1).padStart(2, '0')} / ${String(portfolioData.length).padStart(2, '0')}</span>
        <div class="portfolio-overlay">
          <p class="portfolio-overlay-title">${item.title}</p>
          <p class="portfolio-overlay-cat">${item.catLabel}</p>
        </div>
      `;
      el.addEventListener('click', () => openLightbox(idx));
      grid.appendChild(el);
    });

    // Re-observe new items
    observeReveals();
  }

  // ===== Filter Portfolio =====
  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        items.forEach(item => {
          const cat = item.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            item.classList.remove('hidden');
            item.style.display = '';
            requestAnimationFrame(() => {
              item.classList.remove('fade-out');
            });
          } else {
            item.classList.add('fade-out');
            setTimeout(() => {
              item.classList.add('hidden');
            }, 400);
          }
        });
      });
    });
  }

  // ===== Lightbox =====
  let currentLightboxIndex = 0;
  let lightboxOpen = false;

  function openLightbox(index) {
    currentLightboxIndex = index;
    lightboxOpen = true;
    updateLightbox();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOpen = false;
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = portfolioData[currentLightboxIndex];
    const img = document.getElementById('lightboxImage');
    const title = document.getElementById('lightboxTitle');
    const cat = document.getElementById('lightboxCategory');
    const counter = document.getElementById('lightboxCounter');

    const w = item.aspect === 'wide' ? 800 : 500;
    const h = item.aspect === 'wide' ? 500 : item.aspect === 'tall' ? 650 : 550;

    img.innerHTML = generateArt(item.variant, w, h);
    title.textContent = item.title;
    cat.textContent = item.catLabel;
    counter.textContent = `${String(currentLightboxIndex + 1).padStart(2, '0')} — ${String(portfolioData.length).padStart(2, '0')}`;
  }

  function navLightbox(dir) {
    currentLightboxIndex = (currentLightboxIndex + dir + portfolioData.length) % portfolioData.length;
    updateLightbox();
  }

  function initLightbox() {
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => navLightbox(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => navLightbox(1));
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') closeLightbox();
    });
  }

  // ===== Typing Effect =====
  function initTyping() {
    const taglineEl = document.getElementById('typedTagline');
    if (!taglineEl) return;

    const phrases = [
      'We capture the silence between moments.',
      'Editorial photography for the timeless.',
      'Where shadow becomes memory.',
      'Luxury, photographed quietly.'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
      const phrase = phrases[phraseIdx];

      if (isDeleting) {
        charIdx--;
        taglineEl.textContent = phrase.substring(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 30);
      } else {
        charIdx++;
        taglineEl.textContent = phrase.substring(0, charIdx);
        if (charIdx === phrase.length) {
          setTimeout(() => { isDeleting = true; type(); }, 3000);
          return;
        }
        setTimeout(type, 55);
      }
    }

    setTimeout(type, 1500);
  }

  // ===== Scroll Reveal =====
  let revealObserver;

  function observeReveals() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    }
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      revealObserver.observe(el);
    });
  }

  // ===== Active Nav Highlight =====
  function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === id);
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-20% 0px -40% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  // ===== Count-up Stats =====
  function initCountUp() {
    const stats = document.querySelectorAll('.about-stat-num');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          let current = 0;
          const step = Math.ceil(target / 60);
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = current + (target >= 25 ? '+' : '');
          }, 25);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(s => observer.observe(s));
  }

  // ===== Custom Cursor =====
  function initCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const hoverSelectors = 'a, button, .portfolio-item, .filter-btn, input, select, textarea, .testimonial-dot';
    document.querySelectorAll(hoverSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    // Re-bind for dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll(hoverSelectors).forEach(el => {
        if (!el._cursorBound) {
          el.addEventListener('mouseenter', () => ring.classList.add('hover'));
          el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
          el._cursorBound = true;
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ===== Mobile Nav =====
  function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const closeBtn = document.getElementById('mobileNavClose');
    const links = document.querySelectorAll('.mobile-link');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    function close() {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    links.forEach(link => link.addEventListener('click', close));
  }

  // ===== Testimonials Slider =====
  function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    if (!testimonials.length) return;

    let current = 0;
    let autoTimer;

    // Create dots
    testimonials.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dot');

    function goTo(idx) {
      testimonials[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = idx;
      testimonials[current].classList.add('active');
      dots[current].classList.add('active');
      resetAuto();
    }

    function next() { goTo((current + 1) % testimonials.length); }
    function prev() { goTo((current - 1 + testimonials.length) % testimonials.length); }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(next, 6000);
    }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    resetAuto();
  }

  // ===== Contact Form =====
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const note = document.getElementById('formNote');
    if (!form) return;

    // Floating label for select & date
    const select = document.getElementById('serviceType');
    const date = document.getElementById('date');

    if (select) {
      select.addEventListener('change', () => {
        if (select.value) select.classList.add('has-value');
        else select.classList.remove('has-value');
      });
    }

    if (date) {
      date.addEventListener('change', () => {
        if (date.value) date.classList.add('has-value');
        else date.classList.remove('has-value');
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      note.textContent = `Thank you, ${name}. Your message is being prepared...`;

      // Build mailto
      const email = document.getElementById('email').value;
      const serviceType = document.getElementById('serviceType').value;
      const dateVal = document.getElementById('date').value;
      const message = document.getElementById('message').value;

      const subject = `Inquiry: ${serviceType} — ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nService: ${serviceType}\nPreferred Date: ${dateVal}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:hello@studionoir.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        note.textContent = `Thank you, ${name}. Your email client should open shortly.`;
        form.reset();
        if (select) select.classList.remove('has-value');
        if (date) date.classList.remove('has-value');
      }, 800);
    });
  }

  // ===== Smooth Scroll =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = window.innerWidth <= 1024 ? -60 : 0;
          const y = target.getBoundingClientRect().top + window.pageYOffset + offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  }

  // ===== Keyboard Nav for Lightbox =====
  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    });
  }

  // ===== Init All =====
  function init() {
    renderPortfolio();
    initFilters();
    initLightbox();
    initTyping();
    observeReveals();
    initNavHighlight();
    initCountUp();
    initCursor();
    initMobileNav();
    initTestimonials();
    initContactForm();
    initSmoothScroll();
    initKeyboard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();