/* BELLA VITA — JS */
document.addEventListener('DOMContentLoaded', () => {
  // Nav scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => { toggle.classList.toggle('active'); links.classList.toggle('active'); });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { toggle.classList.remove('active'); links.classList.remove('active'); }));
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    reveals.forEach(el => obs.observe(el));
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Menu filter
  const menuBtns = document.querySelectorAll('#menuFilters button');
  const menuCats = document.querySelectorAll('.menu-category');
  menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      menuCats.forEach(c => { c.classList.remove('active'); if (c.dataset.cat === cat) c.classList.add('active'); });
    });
  });

  // Gallery lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const label = item.querySelector('.gallery-label');
      if (label) lightboxContent.textContent = label.textContent;
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });

  // Reservation form
  const form = document.getElementById('reservationForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) { valid = false; input.style.borderColor = '#ef4444'; }
        else { input.style.borderColor = ''; }
      });
      if (valid) {
        const success = form.closest('.reservation-form').querySelector('.form-success');
        if (success) { success.classList.add('show'); form.reset(); setTimeout(() => success.classList.remove('show'), 6000); }
      }
    });
  }
});