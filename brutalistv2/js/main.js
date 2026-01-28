(function () {
  'use strict';

  var HERO_SHRINK_AT = 120;
  var CURSOR_EASE = 0.12;

  // ——— Custom cursor ———
  var cursor = document.getElementById('cursor');
  var cursorX = 0, cursorY = 0;
  var targetX = 0, targetY = 0;
  var useCursor = !('ontouchstart' in window);

  if (cursor && useCursor) {
    document.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      cursor.classList.remove('cursor--hidden');
    });

    document.addEventListener('mouseenter', function () { cursor.classList.remove('cursor--hidden'); });
    document.addEventListener('mouseleave', function () { cursor.classList.add('cursor--hidden'); });

    [].slice.call(document.querySelectorAll('a, button, [role="button"]')).forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('cursor--hover'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('cursor--hover'); });
    });

    function tickCursor() {
      cursorX += (targetX - cursorX) * CURSOR_EASE;
      cursorY += (targetY - cursorY) * CURSOR_EASE;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(tickCursor);
    }
    tickCursor();
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  // ——— Cross-hatch canvas ———
  var hatch = document.getElementById('hatch');
  var hatchCtx = null;
  var hatchDpr = 1;
  var hatchSpacing = 14;
  var hatchTilt = Math.PI / 4;

  if (hatch) {
    hatchCtx = hatch.getContext('2d');
    hatchDpr = Math.min(window.devicePixelRatio || 1, 2);
  }

  var hatchW = 0, hatchH = 0;

  function resizeHatch() {
    if (!hatch) return;
    var w = hatch.offsetWidth;
    var h = hatch.offsetHeight;
    hatchW = w;
    hatchH = h;
    hatch.width = w * hatchDpr;
    hatch.height = h * hatchDpr;
    hatchCtx.setTransform(1, 0, 0, 1, 0, 0);
    hatchCtx.scale(hatchDpr, hatchDpr);
    drawHatch(window.scrollY || 0);
  }

  function drawHatch(scrollY) {
    if (!hatch || !hatchCtx || !hatchW || !hatchH) return;

    hatchCtx.clearRect(0, 0, hatchW, hatchH);
    hatchCtx.strokeStyle = 'rgba(26,26,26,0.08)';
    hatchCtx.lineWidth = 0.6;

    var w = hatchW, h = hatchH;
    var offset = ((scrollY || 0) % (hatchSpacing * 4)) * 0.02;
    var step = hatchSpacing / Math.cos(hatchTilt);

    // \
    for (var i = -h; i <= w + h; i += step) {
      hatchCtx.beginPath();
      hatchCtx.moveTo(i - h + offset, -10);
      hatchCtx.lineTo(i + h + offset, h + 10);
      hatchCtx.stroke();
    }
    // /
    for (var j = -h; j <= w + h; j += step) {
      hatchCtx.beginPath();
      hatchCtx.moveTo(j + h - offset, -10);
      hatchCtx.lineTo(j - h - offset, h + 10);
      hatchCtx.stroke();
    }
  }

  if (hatch) {
    window.addEventListener('resize', resizeHatch);
    resizeHatch();
  }

  // ——— Hero: shrink on scroll (follows as fixed bar) + hatch redraw ———
  var hero = document.getElementById('hero');
  var wasShrunk = false;
  if (hero) {
    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      var shrunk = y > HERO_SHRINK_AT;
      if (shrunk !== wasShrunk) {
        wasShrunk = shrunk;
        if (hatch) resizeHatch();
      }
      hero.classList.toggle('is-shrunk', shrunk);
      drawHatch(y);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ——— Smooth scroll for # links ———
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      var el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
