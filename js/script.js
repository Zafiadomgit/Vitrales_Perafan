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
    { title: 'Cristo, Camino, Verdad y Vida', meta: 'Proyecto · Diseño digital' },
    { title: 'Virgen con el Niño', meta: 'Proyecto · Diseño digital' },
    { title: 'San Pablo', meta: 'Proyecto · Diseño digital' },
    { title: 'Industria y energía', meta: 'Proyecto · Diseño a mano' },
    { title: 'Historia y justicia', meta: 'Proyecto · Diseño a mano' }
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

  const proyectos = [
    ['Cristo, Camino, Verdad y Vida', 'proyecto-cristo', 1],
    ['Virgen con el Niño', 'proyecto-virgen-nino', 1],
    ['San Pablo', 'proyecto-san-pablo', 1],
    ['Industria y energía', 'proyecto-industria', 1],
    ['Historia y justicia', 'proyecto-historia', 1]
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
    ...proyectos.map(inCategory('Proyectos')),
    single('Banco de Venezuela, Valencia', 'Obras instaladas', 'assets/banco-venezuela.jpeg'),
    single('Vitral de círculos, hall', 'Obras instaladas', 'assets/circulos-frontal.jpeg', 'assets/circulos-angulo.jpeg'),
    single('Integración con el espacio', 'Obras instaladas', 'assets/lobby.jpeg'),
    single('Vitral figurativo', 'Obras instaladas', 'assets/religioso.jpeg'),
    single('Frontal IV, ventana abatible', 'Obras instaladas', 'assets/ondas.jpeg'),
    single('Composición geométrica', 'Obras instaladas', 'assets/mondrian.jpeg'),
    single('Vitral mezzanina', 'Obras instaladas', 'assets/mezzanina.jpeg')
  ];
  const categories = ['Galería', 'Piezas Artísticas', 'Exposiciones', 'Parabanes', 'Proyectos', 'Obras instaladas', 'Restauraciones', 'Lámparas']
    .filter(c => items.some(it => it.cat === c));

  const covers = {
    'Galería': { label: 'Vitrales', img: 'img/galeria/thumbs/barinas-01.jpg' },
    'Piezas Artísticas': { label: 'Piezas Artísticas', img: 'img/galeria/thumbs/pieza-casco-01.jpg' },
    'Exposiciones': { label: 'Exposiciones', img: '' },
    'Parabanes': { label: 'Parabanes', img: 'img/galeria/thumbs/paraban-fondo-marino-01.jpg' },
    'Proyectos': { label: 'Proyectos', img: 'img/galeria/thumbs/proyecto-cristo-01.jpg' },
    'Obras instaladas': { label: 'Obras instaladas', img: 'assets/circulos-frontal.jpeg' },
    'Restauraciones': { label: 'Restauraciones', img: '' },
    'Lámparas': { label: 'Lámparas', img: 'img/galeria/thumbs/lampara-brasil-01.jpg' }
  };

  const coversEl = document.getElementById('galeriaCovers');
  const detailEl = document.getElementById('galeriaDetail');
  const detailTitleEl = document.getElementById('galeriaDetailTitle');
  const backBtn = document.getElementById('galeriaBack');
  const galeriaSection = document.getElementById('galeria');
  const gridEl = document.getElementById('galeriaGrid');
  let activeCat = categories[0];
  let filtered = [];

  const cardHTML = (it, i) => `
    <button type="button" class="gallery-item" data-index="${i}" aria-label="Ver fotos: ${it.title}">
      <div class="gallery-img" style="background-image:url('${it.photos[0].thumb}')"></div>
      ${it.photos.length > 1 ? `<span class="gallery-count">${it.photos.length} fotos</span>` : ''}
      <div class="gallery-caption">
        <p class="gallery-title">${it.title}</p>
      </div>
    </button>
  `;

  function renderGallery() {
    filtered = items.filter(it => it.cat === activeCat);
    gridEl.innerHTML = filtered.map(cardHTML).join('');
  }

  gridEl.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-item');
    if (card) openLightbox(filtered[Number(card.dataset.index)]);
  });

  /* ---------- Exposiciones ---------- */
  const fromGaleria = file => ({ full: `img/galeria/${file}`, thumb: `img/galeria/thumbs/${file}` });
  const expoItems = [
    ['Certificado Fusiones Lumínicas', 'expo-certificado-fusiones-01.jpg'],
    ['Certificado de autenticidad', 'expo-certificado-autenticidad-01.jpg'],
    ['Lámparas Brasil en exposición', 'lampara-brasil-04.jpg'],
    ['Lámpara Coca-Cola', 'lampara-coca-cola-02.jpg'],
    ['Vitral Corazón de Jesús', 'corazon-de-jesus-01.jpg'],
    ['Lámpara Mundo Lunar', 'expo-mundo-lunar-01.jpg']
  ].map(([title, file]) => ({ title, photos: [fromGaleria(file)] }));

  const expoGridEl = document.getElementById('expoGrid');
  expoGridEl.innerHTML = expoItems.map(cardHTML).join('');
  expoGridEl.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-item');
    if (card) openLightbox(expoItems[Number(card.dataset.index)]);
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

  coversEl.innerHTML = categories.map(c => {
    const n = items.filter(it => it.cat === c).length;
    return `
      <button type="button" class="galeria-cover" data-cat="${c}">
        <span class="galeria-cover-img" style="background-image:url('${covers[c].img}')"></span>
        <span class="galeria-cover-text">
          <span class="galeria-cover-name">${covers[c].label}</span>
          <span class="galeria-cover-count">${n} ${n === 1 ? 'obra' : 'obras'}</span>
        </span>
      </button>`;
  }).join('');

  function showCategory(cat) {
    activeCat = cat;
    renderGallery();
    detailTitleEl.textContent = covers[cat].label;
    coversEl.hidden = true;
    detailEl.hidden = false;
    galeriaSection.scrollIntoView({ block: 'start' });
    backBtn.focus({ preventScroll: true });
  }

  function showCovers() {
    detailEl.hidden = true;
    coversEl.hidden = false;
    galeriaSection.scrollIntoView({ block: 'start' });
    coversEl.querySelector(`[data-cat="${activeCat}"]`).focus({ preventScroll: true });
  }

  coversEl.addEventListener('click', (e) => {
    const cover = e.target.closest('.galeria-cover');
    if (cover) showCategory(cover.dataset.cat);
  });
  backBtn.addEventListener('click', showCovers);

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
  const FORM_ENDPOINT = '/api/cotizar';
  const form = document.getElementById('cotizarForm');
  const submitBtn = form.querySelector('.btn-submit');
  const statusEl = document.getElementById('formStatus');

  function showStatus(message, isError) {
    statusEl.hidden = false;
    statusEl.classList.toggle('is-error', isError);
    statusEl.innerHTML = message;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const field = name => (data.get(name) || '').toString().trim();
    const nombre = field('nombre');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';
    statusEl.hidden = true;

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nombre,
          contacto: field('contacto'),
          tipo: field('tipo'),
          ubicacion: field('ubicacion'),
          idea: field('idea'),
          _honey: field('_honey')
        })
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) throw new Error(result.error || res.status);
      form.reset();
      showStatus('¡Gracias! Recibimos tu solicitud y te responderemos pronto.', false);
    } catch (err) {
      showStatus('No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por <a href="https://wa.me/584141367355" target="_blank" rel="noopener">WhatsApp</a>.', true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar solicitud';
    }
  });
})();
