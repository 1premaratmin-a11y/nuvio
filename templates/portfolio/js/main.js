/* PORTFOLIO TEMPLATE — JS */
document.addEventListener('DOMContentLoaded', () => {
  // Typing effect
  const phrases = ['a designer.', 'a developer.', 'a creator.', 'a problem solver.'];
  const typed = document.getElementById('typed');
  if (typed) {
    let pi = 0, ci = 0, deleting = false;
    function type() {
      const phrase = phrases[pi];
      typed.textContent = phrase.substring(0, ci);
      if (!deleting && ci < phrase.length) { ci++; setTimeout(type, 80); }
      else if (deleting && ci > 0) { ci--; setTimeout(type, 40); }
      else { if (!deleting) { deleting = true; setTimeout(type, 1500); } else { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 200); } }
    }
    type();
  }

  // Mobile sidebar
  const mtoggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');
  if (mtoggle && sidebar) {
    mtoggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', () => sidebar.classList.remove('open')));
  }

  // Active nav
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
    navLinks.forEach(a => { a.classList.remove('active'); if (a.getAttribute('href') === '#' + cur) a.classList.add('active'); });
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    reveals.forEach(el => obs.observe(el));
  }

  // Portfolio filter
  const filterBtns = document.querySelectorAll('#filters button');
  const items = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(item => {
        if (f === 'all' || item.dataset.cat === f) item.style.display = '';
        else item.style.display = 'none';
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const cat = item.querySelector('.cat').textContent;
      const title = item.querySelector('h4').textContent;
      const desc = item.querySelector('p').textContent;
      document.getElementById('lbCat').textContent = cat;
      document.getElementById('lbTitle').textContent = title;
      document.getElementById('lbDesc').textContent = desc;
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });

  // Custom cursor
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  } else if (cursor) { cursor.style.display = 'none'; }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});