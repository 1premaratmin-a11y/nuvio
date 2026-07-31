/* IRON PULSE — JS */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => { toggle.classList.toggle('active'); links.classList.toggle('active'); });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { toggle.classList.remove('active'); links.classList.remove('active'); }));
  }
  const reveals = document.querySelectorAll('.reveal');
  if (reveales.length) { const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('visible'); obs.unobserve(x.target); } }), { threshold: 0.1 }); reveals.forEach(el => obs.observe(el)); }
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); } }));
});