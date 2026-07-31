/* ============================================================
   CloudSync — Landing Page Interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- NAV: scroll shadow + mobile toggle ---------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.querySelector('.nav__links');

  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 8) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.classList.toggle('open');
      if (navLinks) navLinks.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close mobile menu on link click
    if (navLinks) {
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          navLinks.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* ---------- SCROLL REVEAL (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // small stagger for grouped siblings
          var idx = 0;
          var el = entry.target;
          // compute index among reveal siblings within same parent
          if (el.parentElement) {
            var sibs = el.parentElement.querySelectorAll(':scope > .reveal');
            if (sibs.length > 1) {
              for (var i = 0; i < sibs.length; i++) {
                if (sibs[i] === el) { idx = i; break; }
              }
            }
          }
          el.style.transitionDelay = (idx * 70) + 'ms';
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- PRICING TOGGLE (monthly / annual) ---------- */
  var btnMonthly = document.getElementById('toggleMonthly');
  var btnAnnual = document.getElementById('toggleAnnual');
  var amounts = document.querySelectorAll('.plan__amount');

  function setBilling(annual) {
    btnMonthly.classList.toggle('is-active', !annual);
    btnAnnual.classList.toggle('is-active', annual);
    btnMonthly.setAttribute('aria-selected', annual ? 'false' : 'true');
    btnAnnual.setAttribute('aria-selected', annual ? 'true' : 'false');
    amounts.forEach(function (el) {
      var val = annual ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
      if (val === null) return;
      // animate the number
      var from = parseFloat(el.textContent.replace(/[^0-9.]/g, '')) || 0;
      var to = parseFloat(val);
      if (from === to) { el.textContent = to; return; }
      var dur = 380, start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        var cur = Math.round(from + (to - from) * eased);
        el.textContent = cur;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = to;
      }
      requestAnimationFrame(tick);
    });
  }

  if (btnMonthly && btnAnnual) {
    btnMonthly.addEventListener('click', function () { setBilling(false); });
    btnAnnual.addEventListener('click', function () { setBilling(true); });
  }

  /* ---------- FAQ ACCORDION ---------- */
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq__q');
    var ans = item.querySelector('.faq__a');
    if (!btn || !ans) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // close all
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          var ob = other.querySelector('.faq__q');
          var oa = other.querySelector('.faq__a');
          if (ob) ob.setAttribute('aria-expanded', 'false');
          if (oa) oa.style.maxHeight = null;
        }
      });
      // toggle this one
      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        ans.style.maxHeight = null;
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
  // Recalc open FAQ max-height on resize
  window.addEventListener('resize', function () {
    faqItems.forEach(function (item) {
      if (item.classList.contains('open')) {
        var ans = item.querySelector('.faq__a');
        if (ans) { ans.style.maxHeight = 'none'; var h = ans.scrollHeight; ans.style.maxHeight = h + 'px'; }
      }
    });
  }, { passive: true });

  /* ---------- SMOOTH SCROLL for anchor links ---------- */
  // Native CSS handles this, but add JS fallback for older browsers + offset offset
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var navH = nav ? nav.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------- FOOTER YEAR ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- CTA FORM (demo only) ---------- */
  var ctaForm = document.querySelector('.cta__form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = ctaForm.querySelector('input[type="email"]');
      var btn = ctaForm.querySelector('button[type="submit"]');
      if (input && btn) {
        var original = btn.textContent;
        btn.textContent = '✓ Check your inbox';
        btn.style.background = '#16a34a';
        input.value = '';
        setTimeout(function () { btn.textContent = original; btn.style.background = ''; }, 2500);
      }
    });
  }

})();