(() => {
  'use strict';

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector('.site-header');
  function updateHeaderScrolled() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', updateHeaderScrolled, { passive: true });
  updateHeaderScrolled();

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById('navToggle');
  function setMenuOpen(open) {
    header.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
  navToggle.addEventListener('click', () => setMenuOpen(!header.classList.contains('menu-open')));
  document.getElementById('siteNav').addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('menu-open')) {
      setMenuOpen(false);
      navToggle.focus();
    }
  });

  /* ---------- Hero carousel ---------- */
  const slides = [
    { title: 'Vitral decorativo, hall de acceso', meta: 'Emplomado · Proyecto corporativo' },
    { title: 'Vitral Banco de Venezuela', meta: 'Valencia, Edo. Carabobo' },
    { title: 'Vitral religioso instalado', meta: 'Figurativo · Centro religioso' },
    { title: 'Vitral Frontal IV', meta: 'Abstracto · Residencial' },
    { title: 'Montaje en taller', meta: 'Emplomado pieza por pieza' }
  ];
  const CAROUSEL_INTERVAL = 6000;

  const slideEls = document.querySelectorAll('.hero-slide');
  const slideTitleEl = document.getElementById('slideTitle');
  const slideMetaEl = document.getElementById('slideMeta');
  const slideCounterEl = document.getElementById('slideCounter');
  const dotsEl = document.getElementById('slideDots');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  let current = 0;
  let timer = null;

  function renderSlide() {
    slideEls.forEach((el, i) => el.classList.toggle('active', i === current));
    slideTitleEl.textContent = slides[current].title;
    slideMetaEl.textContent = slides[current].meta;
    slideCounterEl.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(n) {
    current = (n + slides.length) % slides.length;
    renderSlide();
    restartTimer();
  }

  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), CAROUSEL_INTERVAL);
  }

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Ver imagen ' + (i + 1));
    dot.innerHTML = '<span></span>';
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  renderSlide();
  restartTimer();

  /* ---------- Galería ---------- */
  const vitrales = [
    ['Altagracia', 'altagracia', 1],
    ['Alto Prado', 'alto-prado', 2],
    ['Ángel Miguel', 'angel-miguel', 3],
    ['Atilio', 'atilio', 6],
    ['Barinas', 'barinas', 2],
    ['Buque Escuela', 'buque-escuela', 1],
    ['Calas de Hogar', 'calas-de-hogar', 3],
    ['CANTV', 'cantv', 6],
    ['Centro Médico', 'centro-medico', 2],
    ['Charallave', 'charallave', 1],
    ['Comandancia GNB', 'comandancia-gnb', 6],
    ['Corazón de Jesús', 'corazon-de-jesus', 1],
    ['Corazón de María', 'corazon-de-maria', 1],
    ['El Ángel de San Diego', 'el-angel-de-san-diego', 3],
    ['Galeón', 'galeon', 1],
    ['Guadalupana', 'guadalupana', 1],
    ['Guataparo', 'guataparo', 5],
    ['La Campiña', 'la-campina', 1],
    ['La Castellana', 'la-castellana', 2],
    ['La Lagunita', 'la-lagunita', 2],
    ['La Trinidad', 'la-trinidad', 1],
    ['Laboratorio', 'laboratorio', 3],
    ['Laboratorio de Captación Polar', 'lab-captacion-polar', 1],
    ['Monocromático', 'monocromatico', 1],
    ['Oripoto', 'oripoto', 4],
    ['Pecera Marina', 'pecera-marina', 2],
    ['Retrato', 'retrato', 2],
    ['Serpentinas al Aire', 'serpentinas-al-aire', 4],
    ['Simetría Blanca', 'simetria-blanca', 1],
    ['Simetría de Luz', 'simetria-de-luz', 4],
    ['Venados', 'venados', 5],
    ['Villa Olímpica', 'villa-olimpica', 5],
    ['Virgen de Loreto', 'virgen-de-loreto', 3]
  ];

  const parabanes = [
    ['Parabán Fondo Marino', 'paraban-fondo-marino', 1],
    ['Parabán Nenúfares', 'paraban-nenufares', 1],
    ['Parabán Tucanes', 'paraban-tucanes', 1]
  ];

  const piezas = [
    ['Bandeja navideña Flor', 'pieza-bandeja-flor', 1],
    ['Bandeja navideña Mamá', 'pieza-bandeja-mama', 1],
    ['Bolívar', 'pieza-bolivar', 1],
    ['Casco de vitral', 'pieza-casco', 2],
    ['Copa decorada', 'pieza-copa', 2],
    ['Cristo de vitral', 'pieza-cristo', 3],
    ['Jarrón con ángel', 'pieza-jarron-angel', 1],
    ['Mariposa', 'pieza-mariposa', 1],
    ['Nacimiento', 'pieza-nacimiento', 2],
    ['Sagrada Familia', 'pieza-sagrada-familia', 1]
  ];

  const lamparas = [
    ['Farol de estrellas', 'farol-estrellas', 1],
    ['Lámpara Brasil', 'lampara-brasil', 4],
    ['Lámpara Coca-Cola', 'lampara-coca-cola', 2],
    ['Lámpara de escamas azules', 'lampara-escamas-azules', 2],
    ['Lámpara de flores', 'lampara-flores', 2],
    ['Lámpara de frutas', 'lampara-frutas', 2],
    ['Lámpara de frutas ámbar', 'lampara-frutas-ambar', 2],
    ['Lámpara de mesa blanca', 'lampara-mesa-blanca', 1],
    ['Lámpara de mesa con base de hierro', 'lampara-mesa-hierro', 1],
    ['Lámpara de rombos', 'lampara-rombos', 1],
    ['Lámpara de uvas y tulipanes', 'lampara-uvas-tulipanes', 1]
  ];

  const inCategory = cat => ([title, slug, count]) => ({
    title,
    cat,
    photos: Array.from({ length: count }, (_, i) => {
      const file = `${slug}-${String(i + 1).padStart(2, '0')}.jpg`;
      return { full: `img/galeria/${file}`, thumb: `img/galeria/thumbs/${file}` };
    })
  });

  const single = (title, cat, ...srcs) => ({ title, cat, photos: srcs.map(src => ({ full: src, thumb: src })) });

  const items = [
    ...vitrales.map(inCategory('Galería')),
    ...parabanes.map(inCategory('Parabanes')),
    ...piezas.map(inCategory('Piezas Artísticas')),
    single('Torres de vidrio', 'Piezas Artísticas', 'assets/piezas-artisticas.jpeg'),
    ...lamparas.map(inCategory('Lámparas')),
    single('Banco de Venezuela, Valencia', 'Proyectos', 'assets/banco-venezuela.jpeg'),
    single('Vitral de círculos, hall', 'Proyectos', 'assets/circulos-frontal.jpeg', 'assets/circulos-angulo.jpeg'),
    single('Integración con el espacio', 'Proyectos', 'assets/lobby.jpeg'),
    single('Vitral figurativo', 'Proyectos', 'assets/religioso.jpeg'),
    single('Frontal IV, ventana abatible', 'Proyectos', 'assets/ondas.jpeg'),
    single('Composición geométrica', 'Proyectos', 'assets/mondrian.jpeg'),
    single('Vitral mezzanina', 'Proyectos', 'assets/mezzanina.jpeg')
  ];
  const categories = ['Galería', 'Piezas Artísticas', 'Exposiciones', 'Parabanes', 'Proyectos', 'Restauraciones', 'Lámparas']
    .filter(c => items.some(it => it.cat === c));

  const filtersEl = document.getElementById('galeriaFilters');
  const gridEl = document.getElementById('galeriaGrid');
  let activeCat = categories[0];
  let filtered = [];

  function renderGallery() {
    filtered = items.filter(it => it.cat === activeCat);
    gridEl.innerHTML = filtered.map((it, i) => `
      <button type="button" class="gallery-item" data-index="${i}" aria-label="Ver fotos: ${it.title}">
        <div class="gallery-img" style="background-image:url('${it.photos[0].thumb}')"></div>
        ${it.photos.length > 1 ? `<span class="gallery-count">${it.photos.length} fotos</span>` : ''}
        <div class="gallery-caption">
          <p class="gallery-title">${it.title}</p>
        </div>
      </button>
    `).join('');
  }

  gridEl.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-item');
    if (card) openLightbox(filtered[Number(card.dataset.index)]);
  });

  /* ---------- Lightbox ---------- */
  const lightboxEl = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxClose = document.getElementById('lightboxClose');
  let lbItem = null;
  let lbIndex = 0;
  let lbReturnFocus = null;

  function showPhoto() {
    const total = lbItem.photos.length;
    lightboxImg.src = lbItem.photos[lbIndex].full;
    lightboxImg.alt = `${lbItem.title} — foto ${lbIndex + 1} de ${total}`;
    lightboxTitle.textContent = lbItem.title;
    lightboxCounter.textContent = total > 1 ? `${lbIndex + 1} / ${total}` : '';
    lightboxPrev.hidden = lightboxNext.hidden = total < 2;
  }

  function openLightbox(item) {
    lbItem = item;
    lbIndex = 0;
    lbReturnFocus = document.activeElement;
    showPhoto();
    lightboxEl.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightboxEl.hidden = true;
    lightboxImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (lbReturnFocus) lbReturnFocus.focus();
  }

  function step(delta) {
    lbIndex = (lbIndex + delta + lbItem.photos.length) % lbItem.photos.length;
    showPhoto();
  }

  lightboxPrev.addEventListener('click', () => step(-1));
  lightboxNext.addEventListener('click', () => step(1));
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxEl.addEventListener('click', (e) => { if (e.target === lightboxEl) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (lightboxEl.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft' && lbItem.photos.length > 1) step(-1);
    else if (e.key === 'ArrowRight' && lbItem.photos.length > 1) step(1);
  });

  function renderFilters() {
    filtersEl.innerHTML = categories.map(c =>
      `<button type="button" class="filter${c === activeCat ? ' active' : ''}" data-cat="${c}">${c}</button>`
    ).join('');
    filtersEl.querySelectorAll('.filter').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCat = btn.dataset.cat;
        renderFilters();
        renderGallery();
      });
    });
  }

  renderFilters();
  renderGallery();

  /* ---------- FAQ ---------- */
  const faqData = [
    { q: '¿Se requieren dimensiones para presupuestar un vitral?', a: 'Sí, se requiere saber las dimensiones del área, sitio y ubicación.' },
    { q: '¿Se requiere un prediseño para presupuestar un vitral?', a: 'No necesariamente. Con una idea podemos cotizar desarrollando un prediseño.' },
    { q: '¿Atienden a domicilio?', a: 'Sí, nos trasladamos al sitio y evaluamos todas las condiciones.' },
    { q: '¿Atienden a nivel nacional?', a: 'Sí, atendemos a nivel nacional.' },
    { q: '¿Elaboran todo tipo de vitral?', a: 'Sí, fabricamos todo tipo de vitrales.' }
  ];

  const faqListEl = document.getElementById('faqList');
  faqListEl.innerHTML = faqData.map((f, i) => `
    <div class="faq-item" data-index="${i}">
      <button type="button" class="faq-q" aria-expanded="false">
        <span>${f.q}</span><span class="faq-q-icon">+</span>
      </button>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>
  `).join('');

  faqListEl.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      faqListEl.querySelectorAll('.faq-item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Formulario de contacto ---------- */
  const form = document.getElementById('cotizarForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = (data.get('nombre') || '').toString().trim();
    const contacto = (data.get('contacto') || '').toString().trim();
    const tipo = (data.get('tipo') || '').toString().trim();
    const ubicacion = (data.get('ubicacion') || '').toString().trim();
    const idea = (data.get('idea') || '').toString().trim();

    const body = [
      `Nombre: ${nombre}`,
      `Correo / WhatsApp: ${contacto}`,
      `Tipo de proyecto: ${tipo}`,
      `Ubicación y dimensiones: ${ubicacion || '—'}`,
      '',
      'Idea del proyecto:',
      idea || '—'
    ].join('\n');

    const mailto = `mailto:vitralesperafan@yahoo.com?subject=${encodeURIComponent('Solicitud de cotización — ' + nombre)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
})();
