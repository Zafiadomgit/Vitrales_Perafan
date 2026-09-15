(() => {
  'use strict';

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector('.site-header');
  function updateHeaderScrolled() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', updateHeaderScrolled, { passive: true });
  updateHeaderScrolled();

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
  const items = [
    { src: 'assets/circulos-frontal.jpeg', title: 'Vitral de círculos, hall', cat: 'Proyectos' },
    { src: 'assets/banco-venezuela.jpeg', title: 'Banco de Venezuela, Valencia', cat: 'Proyectos' },
    { src: 'assets/religioso.jpeg', title: 'Vitral figurativo instalado', cat: 'Religiosos' },
    { src: 'assets/taller.jpeg', title: 'Armado y emplomado en taller', cat: 'Religiosos' },
    { src: 'assets/ondas.jpeg', title: 'Frontal IV, ventana abatible', cat: 'Residenciales' },
    { src: 'assets/mondrian.jpeg', title: 'Composición geométrica', cat: 'Decorativos' },
    { src: 'assets/mezzanina.jpeg', title: 'Vitral mezzanina', cat: 'Decorativos' },
    { src: 'assets/circulos-angulo.jpeg', title: 'Vitral de círculos, vista lateral', cat: 'Proyectos' },
    { src: 'assets/piezas-artisticas.jpeg', title: 'Piezas artísticas en vidrio', cat: 'Piezas artísticas' },
    { src: 'assets/lobby.jpeg', title: 'Integración con el espacio', cat: 'Proyectos' }
  ];
  const categories = ['Todos', 'Religiosos', 'Decorativos', 'Residenciales', 'Piezas artísticas', 'Proyectos'];

  const filtersEl = document.getElementById('galeriaFilters');
  const gridEl = document.getElementById('galeriaGrid');
  let activeCat = 'Todos';

  function renderGallery() {
    const filtered = items.filter(it => activeCat === 'Todos' || it.cat === activeCat);
    gridEl.innerHTML = filtered.map(it => `
      <figure class="gallery-item">
        <div class="gallery-img" style="background-image:url('${it.src}')"></div>
        <figcaption>
          <p class="gallery-title">${it.title}</p>
          <p class="gallery-cat">${it.cat}</p>
        </figcaption>
      </figure>
    `).join('');
  }

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
