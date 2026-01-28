(function () {
  'use strict';

  var HERO_SHRINK_AT = 80;

  // —— Cursor ——
  var cursor = document.getElementById('cursor');
  var cx = 0, cy = 0, tx = 0, ty = 0;
  var useCursor = !('ontouchstart' in window);

  if (cursor && useCursor) {
    document.addEventListener('mousemove', function (e) {
      tx = e.clientX;
      ty = e.clientY;
      cursor.classList.remove('cursor--hidden');
    });
    document.addEventListener('mouseenter', function () { cursor.classList.remove('cursor--hidden'); });
    document.addEventListener('mouseleave', function () { cursor.classList.add('cursor--hidden'); });
    [].slice.call(document.querySelectorAll('a, button')).forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('cursor--hover'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('cursor--hover'); });
    });
    function tick() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      requestAnimationFrame(tick);
    }
    tick();
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  // —— Hero shrink on scroll ——
  var hero = document.getElementById('home');
  if (hero) {
    function onScroll() {
      hero.classList.toggle('is-shrunk', (window.scrollY || window.pageYOffset) > HERO_SHRINK_AT);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // —— Nav toggle (mobile) ——
  var t = document.querySelector('.nav-toggle');
  var m = document.querySelector('.nav-menu');
  if (t && m) {
    t.addEventListener('click', function () {
      m.classList.toggle('active');
    });
    [].slice.call(m.querySelectorAll('a')).forEach(function (a) {
      a.addEventListener('click', function () { m.classList.remove('active'); });
    });
  }

  // —— Smooth scroll # ——
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      var el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // —— Counter for stats ——
  var stats = document.querySelectorAll('.stat-number[data-target]');
  var done = {};
  function count(el, to, d) {
    var n = 0;
    var step = to / (d / 16);
    var t = setInterval(function () {
      n += step;
      if (n >= to) { el.textContent = to + '+'; clearInterval(t); }
      else { el.textContent = Math.floor(n) + '+'; }
    }, 16);
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !done[e.target]) {
        done[e.target] = true;
        var to = parseInt(e.target.getAttribute('data-target'), 10);
        if (to) count(e.target, to, 1800);
      }
    });
  }, { threshold: 0.3 });
  stats.forEach(function (s) { obs.observe(s); });
})();
