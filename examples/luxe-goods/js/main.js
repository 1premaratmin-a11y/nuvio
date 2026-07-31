/* ============================================
   LUXE GOODS — Main JS
   Modal, cart, scroll reveal, nav, interactions
   ============================================ */

(function () {
  'use strict';

  /* ===== Product Data ===== */
  const products = [
    {
      id: 1,
      name: 'Heritage Weekender',
      category: 'Leather Goods',
      price: '1,290',
      desc: 'Full-grain Tuscan leather weekender, hand-stitched and edge-painted by Florentine artisans. Solid brass hardware, cotton-twill lining, and a structured base that holds its shape for decades. Patinas beautifully with age.',
      gradient: 'linear-gradient(145deg, #6b4226, #3a2418, #5a3a1e)',
      badge: 'New'
    },
    {
      id: 2,
      name: 'Méridien Automatic 39',
      category: 'Timepieces',
      price: '3,450',
      desc: 'Swiss-made automatic movement housed in a 39mm brushed-steel case with sapphire crystal. Applied indices, sword hands, and a domed off-white dial. Water resistant to 100m. Includes a hand-stitched alligator strap.',
      gradient: 'linear-gradient(145deg, #4a4a4a, #1a1a1a, #2c2c2c)',
      badge: 'Signature'
    },
    {
      id: 3,
      name: 'Cashmere Travel Wrap',
      category: 'Accessories',
      price: '480',
      desc: 'Mongolian grade-A cashmere woven into an oversized travel wrap, finished with hand-knotted fringe. Featherweight yet substantial — designed to layer over anything, in any season.',
      gradient: 'linear-gradient(145deg, #8c7a5e, #5a4e3a, #d0c0a8)',
      badge: 'Limited'
    },
    {
      id: 4,
      name: 'Brass Library Lamp',
      category: 'Home',
      price: '920',
      desc: 'Solid brass reading lamp with a weighted Carrara marble base and dimmable LED module. Inspired by mid-century library design, it develops a warm patina over the years. Designed and assembled in our Brooklyn workshop.',
      gradient: 'linear-gradient(145deg, #b8763d, #8c5a2e, #d4a05a)',
      badge: ''
    },
    {
      id: 5,
      name: 'Ostrich Card Wallet',
      category: 'Leather Goods',
      price: '395',
      desc: 'Slim bifold wallet in genuine ostrich leg leather with eight card slots, a bill compartment, and a hand-painted edge. Compact, tactile, and built to wear in gracefully.',
      gradient: 'linear-gradient(145deg, #5a3a1e, #8c5a2e, #3a2418)',
      badge: ''
    },
    {
      id: 6,
      name: 'Santal & Oud Candle',
      category: 'Home',
      price: '145',
      desc: 'Hand-poured coconut-wax candle in a reusable glazed ceramic vessel, layered with santal, oud, and smoked vetiver. Burns clean for approximately 55 hours. Vessel is dishwasher-safe for repurposing.',
      gradient: 'linear-gradient(145deg, #6b4226, #b8763d, #3a2418)',
      badge: 'Bestseller'
    }
  ];

  const instaTiles = [
    'linear-gradient(135deg, #6b4226, #3a2418)',
    'linear-gradient(135deg, #b8763d, #5a3a1e)',
    'linear-gradient(135deg, #4a4a4a, #1a1a1a)',
    'linear-gradient(135deg, #8c7a5e, #5a4e3a)',
    'linear-gradient(135deg, #3a2418, #8c5a2e)',
    'linear-gradient(135deg, #d4a05a, #6b4226)',
    'linear-gradient(135deg, #2c2c2c, #4a4a4a)',
    'linear-gradient(135deg, #b8763d, #d4a05a)',
    'linear-gradient(135deg, #5a3a1e, #2a1810)',
    'linear-gradient(135deg, #8c5a2e, #3a2418)',
    'linear-gradient(135deg, #d0c0a8, #8c7a5e)',
    'linear-gradient(135deg, #1a1a1a, #383838)'
  ];

  let cartCount = 0;
  let currentProduct = null;

  /* ===== DOM References ===== */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const cartCountEl = document.getElementById('cartCount');
  const productGrid = document.getElementById('productGrid');
  const instaGrid = document.getElementById('instaGrid');
  const modal = document.getElementById('productModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const qtyInput = document.getElementById('qtyInput');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const modalAddBtn = document.getElementById('modalAddBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterMsg = document.getElementById('newsletterMsg');
  const cartBtn = document.getElementById('cartBtn');

  /* ===== Render Products ===== */
  function renderProducts() {
    productGrid.innerHTML = products.map(p => `
      <article class="product-card reveal" data-id="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}">
        <div class="product-card__thumb">
          ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
          <div class="product-card__thumb-inner" style="background: ${p.gradient};"></div>
        </div>
        <div class="product-card__info">
          <div>
            <h3 class="product-card__name">${p.name}</h3>
            <p class="product-card__cat">${p.category}</p>
          </div>
          <span class="product-card__price">$${p.price}</span>
        </div>
      </article>
    `).join('');
  }

  /* ===== Render Instagram Tiles ===== */
  function renderInsta() {
    instaGrid.innerHTML = instaTiles.map(bg => `
      <div class="insta-tile reveal" tabindex="0" aria-label="Instagram post">
        <div class="insta-tile__bg" style="background: ${bg};"></div>
      </div>
    `).join('');
  }

  /* ===== Nav Scroll Effect ===== */
  function handleNavScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  /* ===== Mobile Menu Toggle ===== */
  function toggleMenu() {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeMenu() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  /* ===== Smooth Scroll ===== */
  function handleAnchorClick(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      closeMenu();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  /* ===== Collection Card Click ===== */
  function handleCollectionClick(e) {
    const card = e.target.closest('.collection-card');
    if (!card) return;
    const href = card.getAttribute('data-href');
    if (href) {
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }

  /* ===== Product Modal ===== */
  function openModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    modalImg.style.background = currentProduct.gradient;
    modalCategory.textContent = currentProduct.category;
    modalTitle.textContent = currentProduct.name;
    modalPrice.textContent = '$' + currentProduct.price;
    modalDesc.textContent = currentProduct.desc;
    qtyInput.value = '1';
    modalAddBtn.textContent = 'Add to Cart';

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentProduct = null;
  }

  function handleProductClick(e) {
    const card = e.target.closest('.product-card');
    if (!card) return;
    const id = parseInt(card.getAttribute('data-id'), 10);
    if (id) openModal(id);
  }

  /* ===== Quantity Controls ===== */
  function adjustQty(delta) {
    let val = parseInt(qtyInput.value, 10) || 1;
    val = Math.max(1, Math.min(10, val + delta));
    qtyInput.value = val;
  }

  /* ===== Add to Cart ===== */
  function addToCart() {
    if (!currentProduct) return;
    const qty = parseInt(qtyInput.value, 10) || 1;
    cartCount += qty;
    updateCartCount();
    showToast(`${qty} × ${currentProduct.name} added to cart`);
    closeModal();
  }

  function updateCartCount() {
    cartCountEl.textContent = cartCount;
    cartCountEl.classList.add('bump');
    setTimeout(() => cartCountEl.classList.remove('bump'), 300);
  }

  /* ===== Toast ===== */
  let toastTimer = null;
  function showToast(msg) {
    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ===== Newsletter ===== */
  function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newsletterMsg.textContent = 'Please enter a valid email address.';
      newsletterMsg.style.color = '#d4955c';
      return;
    }
    newsletterMsg.textContent = 'Thank you — welcome to the inner circle.';
    newsletterMsg.style.color = '#d4955c';
    newsletterForm.reset();
  }

  /* ===== Cart Button ===== */
  function handleCartClick() {
    if (cartCount === 0) {
      showToast('Your cart is empty.');
    } else {
      showToast(`${cartCount} item${cartCount > 1 ? 's' : ''} in your cart.`);
    }
  }

  /* ===== Scroll Reveal (IntersectionObserver) ===== */
  let observer;
  function setupReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // Re-observe after dynamic content is rendered
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ===== Keyboard Support ===== */
  function handleKeyDown(e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
    // Enter / Space on product card or insta tile
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('product-card')) {
      e.preventDefault();
      const id = parseInt(e.target.getAttribute('data-id'), 10);
      if (id) openModal(id);
    }
  }

  /* ===== Init ===== */
  function init() {
    renderProducts();
    renderInsta();

    // Event delegation
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    navToggle.addEventListener('click', toggleMenu);
    document.addEventListener('click', handleAnchorClick);
    productGrid.addEventListener('click', handleProductClick);
    instaGrid.parentElement.addEventListener('click', handleCollectionClick);
    document.querySelector('.collections').addEventListener('click', handleCollectionClick);
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    modalAddBtn.addEventListener('click', addToCart);
    qtyMinus.addEventListener('click', () => adjustQty(-1));
    qtyPlus.addEventListener('click', () => adjustQty(1));
    qtyInput.addEventListener('input', () => {
      let v = parseInt(qtyInput.value, 10);
      if (isNaN(v) || v < 1) v = 1;
      if (v > 10) v = 10;
      qtyInput.value = v;
    });
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    cartBtn.addEventListener('click', handleCartClick);
    document.addEventListener('keydown', handleKeyDown);

    // Set up scroll reveal after DOM is populated
    requestAnimationFrame(setupReveal);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();