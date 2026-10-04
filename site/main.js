// The Inn at Sunrise Point · 2023 vision demo
// window.SP exposes controls so a recording script can drive the page deterministically.
(function () {
  const params = new URLSearchParams(location.search);
  const demo = params.has('demo') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SP = (window.SP = {});

  // hero slideshow
  const slides = [...document.querySelectorAll('.hero .slide')];
  const dots = [...document.querySelectorAll('.hero .dots button')];
  const cap = document.querySelector('.hero .caption');
  let cur = 0, timer = null;
  SP.goToSlide = function (i) {
    if (!slides.length) return;
    cur = ((i % slides.length) + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === cur));
    dots.forEach((d, k) => { d.classList.toggle('active', k === cur); d.setAttribute('aria-current', k === cur ? 'true' : 'false'); });
    if (cap) cap.textContent = slides[cur].dataset.caption || '';
  };
  SP.pause = () => { clearInterval(timer); timer = null; };
  SP.play = () => { SP.pause(); timer = setInterval(() => SP.goToSlide(cur + 1), 6000); };
  if (slides.length) {
    dots.forEach((d, k) => d.addEventListener('click', () => { SP.goToSlide(k); if (!demo) SP.play(); }));
    SP.goToSlide(0);
    if (!demo) SP.play();
  }

  // room filters (accommodations)
  const filterBtns = [...document.querySelectorAll('.filters button')];
  SP.filterRooms = function (group) {
    filterBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.group === group)));
    let n = 0;
    document.querySelectorAll('.rooms-list .room-card').forEach((c) => {
      const show = group === 'all' || c.dataset.group === group;
      c.hidden = !show; if (show) n++;
    });
    const count = document.getElementById('room-count');
    if (count) count.textContent = n + (n === 1 ? ' room' : ' rooms');
  };
  filterBtns.forEach((b) => b.addEventListener('click', () => SP.filterRooms(b.dataset.group)));

  // gallery lightbox
  const figs = [...document.querySelectorAll('.masonry figure')];
  const lb = document.querySelector('.lightbox');
  if (lb) {
    const img = lb.querySelector('img'), txt = lb.querySelector('p');
    SP.openLightbox = function (i) {
      const f = figs[i]; if (!f) return;
      const src = f.querySelector('img');
      img.src = src.src; img.alt = src.alt; txt.textContent = f.querySelector('figcaption').textContent;
      lb.hidden = false; lb.querySelector('.close').focus();
    };
    SP.closeLightbox = () => { lb.hidden = true; };
    figs.forEach((f, i) => {
      f.tabIndex = 0;
      f.addEventListener('click', () => SP.openLightbox(i));
      f.addEventListener('keydown', (e) => { if (e.key === 'Enter') SP.openLightbox(i); });
    });
    lb.querySelector('.close').addEventListener('click', SP.closeLightbox);
    lb.addEventListener('click', (e) => { if (e.target === lb) SP.closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') SP.closeLightbox(); });
  }

  // forms are demo-only
  document.querySelectorAll('form').forEach((f) => f.addEventListener('submit', (e) => e.preventDefault()));
})();
