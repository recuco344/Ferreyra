/* =============================================
   FERREYRA — main.js
   ============================================= */

// NAV — toggle mobile
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

const nav = document.querySelector('.nav');

navToggle?.addEventListener('click', () => {
  nav.classList.toggle('nav-is-open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav-is-open');
  });
});

// NAV — scroll style
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.style.background = '';
});

// SCROLL REVEAL
const revealTargets = [
  '.section-header',
  '.gallery-card',
  '.project-card',
  '.blog-post',
  '.person-card',
];

function setupReveal() {
  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

setupReveal();

// PERFILES
const viajeTodos   = [{ nombre: 'Córdoba 2023', fecha: 'Jul 2023' }, { nombre: 'Arenas Verdes 2024', fecha: 'Ene 2024' }];
const viajeArenas  = [{ nombre: 'Arenas Verdes 2024', fecha: 'Ene 2024' }];
const viajeCordoba = [{ nombre: 'Córdoba 2023', fecha: 'Jul 2023' }];

const personas = {
  'Yago':  { foto: 'yago foto.png',   desc: 'Descripción próximamente.', extra: [], viajes: viajeTodos },
  'Seba':  { foto: 'seba foto.jpg',   desc: 'Descripción próximamente.', extra: [], viajes: viajeTodos },
  'Cami':  { foto: 'cami foto.jpg',   desc: 'Descripción próximamente.', extra: [], viajes: viajeTodos },
  'Feli':  { foto: 'feli foto.jpeg',  desc: 'Descripción próximamente.', extra: [], pos: 'left center', viajes: viajeTodos },
  'Vicen': { foto: 'vicen foto.jpeg', desc: 'Descripción próximamente.', extra: [], pos: '30% center', viajes: viajeTodos },
  'Toto':  { foto: 'toto foto.jpeg',  desc: 'Descripción próximamente.', extra: [], viajes: viajeArenas },
  'Juan':  { foto: 'juan foto.jpeg',  desc: 'Descripción próximamente.', extra: [], viajes: viajeArenas },
  'Yatel': { foto: 'yatel foto.png', desc: 'Del Bolsón.', extra: [], viajes: viajeCordoba, sinGaleria: true },
  'Ciro':  { foto: 'ciro foto.png', desc: 'De Mendoza.', extra: [], viajes: viajeArenas, sinGaleria: true },
};

const profileOverlay    = document.getElementById('profileOverlay');
const profileViajesList = document.getElementById('profileViajesList');
const profileBack     = document.getElementById('profileBack');
const profilePhoto    = document.getElementById('profilePhoto');
const profileName     = document.getElementById('profileName');
const profileDesc     = document.getElementById('profileDesc');
const otrosPerfiles = ['Yatel', 'Ciro'];

function abrirPerfil(name) {
  const data = personas[name];
  if (!data) return;

  if (data.foto) {
    profilePhoto.src = data.foto;
    profilePhoto.style.objectPosition = data.pos || 'center';
    profilePhoto.style.objectFit = data.fit || 'cover';
    profilePhoto.style.display = '';
  } else {
    profilePhoto.src = '';
    profilePhoto.style.display = 'none';
  }
  profilePhoto.alt = name;
  profileName.textContent = name;
  profileDesc.textContent = data.desc;

  profileViajesList.innerHTML = data.viajes.map(v =>
    `<div class="profile-viaje-item">
      <span class="profile-viaje-nombre">${v.nombre}</span>
      <span class="profile-viaje-fecha">${v.fecha}</span>
    </div>`
  ).join('');

  verMasBtn.style.display = data.sinGaleria ? 'none' : '';

  currentPerson = name;
  profileOverlay.classList.add('open');
  profileOverlay.scrollTop = 0;
}

document.querySelectorAll('.person-card[data-name]').forEach(card => {
  card.addEventListener('click', () => abrirPerfil(card.dataset.name));
});

// GALERÍA DE VIAJES
const viajesData = {
  'cordoba-2023': {
    titulo: 'Córdoba 2023',
    fotos: ['cuarzo foto 1.jpg', 'puesto ferreyra foto.jpg', '23-1.jpg', '23-2.jpg', '23-4.jpg', '23-5.jpg', '23-6.jpg', '23-7.jpg', '23-8.jpg']
  },
  'arenas-2024': {
    titulo: 'Arenas Verdes 2024',
    fotos: ['24-1.jpg', '24-2.jpg', '24-3.jpg', '24-4.jpg', '24-5.jpg', '24-6.jpg', '24-7.jpg', '24-8.jpg', '24-9.jpg']
  }
};

const galeriaOverlay = document.getElementById('galeriaOverlay');
const galeriaTitulo  = document.getElementById('galeriaTitulo');
const galeriaGrid    = document.getElementById('galeriaGrid');
const galeriaBack    = document.getElementById('galeriaBack');
const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightboxImg');
const lightboxClose  = document.getElementById('lightboxClose');

document.querySelectorAll('.viaje-card').forEach(card => {
  card.addEventListener('click', () => {
    const viaje = viajesData[card.dataset.viaje];
    galeriaTitulo.textContent = viaje.titulo;
    galeriaGrid.innerHTML = '';

    if (viaje.fotos.length === 0) {
      galeriaGrid.innerHTML = '<p class="galeria-vacia">Fotos próximamente.</p>';
    } else {
      viaje.fotos.forEach(src => {
        const div = document.createElement('div');
        div.className = 'galeria-foto';
        const esVideo = src.endsWith('.mp4') || src.endsWith('.mov');
        if (esVideo) {
          div.innerHTML = `<video src="${src}" controls></video>`;
        } else {
          div.innerHTML = `<img src="${src}" alt="${viaje.titulo}" />`;
          div.addEventListener('click', () => {
            lightboxImg.src = src;
            lightbox.classList.add('open');
          });
        }
        galeriaGrid.appendChild(div);
      });
    }

    galeriaOverlay.classList.add('open');
    galeriaOverlay.scrollTop = 0;
  });
});

galeriaBack.addEventListener('click', () => galeriaOverlay.classList.remove('open'));
lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });

const extrasOverlay = document.getElementById('extrasOverlay');
document.getElementById('extrasCard').addEventListener('click', () => {
  extrasOverlay.classList.add('open');
  extrasOverlay.scrollTop = 0;
});
document.getElementById('extrasBack').addEventListener('click', () => {
  extrasOverlay.classList.remove('open');
});

profileBack.addEventListener('click', () => profileOverlay.classList.remove('open'));

// GALERÍA
const photoGallery     = document.getElementById('photoGallery');
const galleryBack      = document.getElementById('galleryBack');
const galleryTitle     = document.getElementById('galleryTitle');
const photoGalleryGrid = document.getElementById('photoGalleryGrid');
const verMasBtn        = document.getElementById('verMasBtn');

let currentPerson = '';

verMasBtn.addEventListener('click', () => {
  const data = personas[currentPerson];
  galleryTitle.textContent = 'Fotos de ' + currentPerson;
  photoGalleryGrid.innerHTML = '';

  const total = data.extra.length > 0 ? data.extra.length : 6;
  for (let i = 0; i < total; i++) {
    const frame = document.createElement('div');
    frame.className = 'photo-frame';
    if (data.extra[i]) {
      const img = document.createElement('img');
      img.src = data.extra[i];
      img.alt = currentPerson;
      frame.appendChild(img);
    } else {
      frame.innerHTML = '<span>◈</span><p>Foto próximamente</p>';
    }
    photoGalleryGrid.appendChild(frame);
  }

  photoGallery.classList.add('open');
  photoGallery.scrollTop = 0;
});

galleryBack.addEventListener('click', () => photoGallery.classList.remove('open'));

// BADGE — text circular
(function() {
  const badge = document.querySelector('.badge-ring span');
  if (!badge) return;
  const text = badge.textContent.trim();
  badge.textContent = '';

  const chars = text.split('');
  const total = chars.length;
  const angleStep = 360 / total;

  chars.forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    const angle = i * angleStep - 90;
    const rad = (angle * Math.PI) / 180;
    const r = 42; // radio en px
    const x = 50 + r * Math.cos(rad);
    const y = 50 + r * Math.sin(rad);
    span.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      transform: translate(-50%, -50%) rotate(${angle + 90}deg);
      font-family: 'Space Mono', monospace;
      font-size: 0.52rem;
      letter-spacing: 0;
      color: #E8400A;
    `;
    badge.parentElement.appendChild(span);
  });
  badge.remove();
})();

// ACTIVE NAV LINK por sección
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function onScroll() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 80) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--orange)'
      : '';
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
