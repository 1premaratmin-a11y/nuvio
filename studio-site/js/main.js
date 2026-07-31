/* ============================================
   NUVIO v2 — Ultimate Studio Site JS
   Animations: scroll reveal, magnetic buttons,
   custom cursor, number counters, text scramble,
   scroll progress, nav scroll, smooth scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollProgress();
  initScrollReveal();
  initSmoothScroll();
  initCustomCursor();
  initMagneticButtons();
  initNumberCounters();
  initTextScramble();
  initFormValidation();
  initMarquee();
});

/* ===== NAV — scroll state + mobile toggle ===== */
function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
  if (toggle && links) {
    toggle.addEventListener('click', () => { toggle.classList.toggle('active'); links.classList.toggle('active'); });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { toggle.classList.remove('active'); links.classList.remove('active'); }));
  }
}

/* ===== SCROLL PROGRESS BAR ===== */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / h * 100) + '%';
  });
}

/* ===== SCROLL REVEAL — IntersectionObserver with stagger ===== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(el => obs.observe(el));
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ===== CUSTOM CURSOR ===== */
function initCustomCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const dot = document.querySelector('.cursor-dot');
  if (!dot) return;
  let x = 0, y = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  function animate() {
    x += (tx - x) * 0.2; y += (ty - y) * 0.2;
    dot.style.left = x + 'px'; dot.style.top = y + 'px';
    requestAnimationFrame(animate);
  }
  animate();
  document.querySelectorAll('a, button, .portfolio-card, .service-card, input, textarea, select').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('hover'));
    el.addEventListener('mouseleave', () => dot.classList.remove('hover'));
  });
}

/* ===== MAGNETIC BUTTONS ===== */
function initMagneticButtons() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.btn-primary, .btn-lg').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.15;
      const dy = (e.clientY - cy) * 0.15;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ===== NUMBER COUNTERS ===== */
function initNumberCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1500;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const val = Math.floor(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

/* ===== TEXT SCRAMBLE ===== */
function initTextScramble() {
  const els = document.querySelectorAll('.scramble');
  if (!els.length) return;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const original = el.dataset.text || el.textContent;
      let frame = 0;
      const totalFrames = 40;
      function scramble() {
        let result = '';
        for (let i = 0; i < original.length; i++) {
          if (i < (frame / totalFrames) * original.length) result += original[i];
          else result += chars[Math.floor(Math.random() * chars.length)];
        }
        el.textContent = result;
        frame++;
        if (frame <= totalFrames) requestAnimationFrame(scramble);
        else el.textContent = original;
      }
      requestAnimationFrame(scramble);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => { el.dataset.text = el.textContent; obs.observe(el); });
}

/* ===== CONTACT FORM ===== */
function initFormValidation() {
  const form = document.querySelector('.contact-form form, #contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(input => {
      const group = input.closest('.form-group');
      if (!group) return;
      group.classList.remove('error');
      if (!input.value.trim()) { group.classList.add('error'); valid = false; }
      if (input.type === 'email' && input.value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) { group.classList.add('error'); valid = false; }
      }
    });
    if (valid) {
      const name = form.querySelector('#name, [name="name"]')?.value || '';
      const email = form.querySelector('#email, [name="email"]')?.value || '';
      const company = form.querySelector('#company, [name="company"]')?.value || 'N/A';
      const tier = form.querySelector('#tier, [name="tier"]')?.value || 'N/A';
      const message = form.querySelector('#message, [name="message"]')?.value || '';
      const subject = encodeURIComponent(`New Nuvio Inquiry — ${name} (${tier})`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\nBudget: ${tier}\n\nMessage:\n${message}`);
      window.location.href = `mailto:1premaratmin@gmail.com?subject=${subject}&body=${body}`;
      const success = form.closest('.contact-form')?.querySelector('.form-success') || document.querySelector('.form-success');
      if (success) { success.classList.add('show'); form.reset(); setTimeout(() => success.classList.remove('show'), 6000); }
    }
  });
}

/* ===== MARQUEE — duplicate items for seamless loop ===== */
function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  track.innerHTML += track.innerHTML;
}