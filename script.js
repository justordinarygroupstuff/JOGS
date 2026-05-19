/* ─── GESTIONE MENU HAMBURGER ────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

function closeMenu() {
  if (hamburger && mobileMenu) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
}

/* ─── ANIMAZIONI DI COMPARSA (REVEAL - VIA DI MEZZO) ─────── */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.15,      /* Richiede che una piccola porzione sia visibile (equilibrio perfetto) */
    rootMargin: "0px"     /* Niente anticipo cieco fuori dallo schermo */
  });

  revealEls.forEach(el => observer.observe(el));
}

/* ─── EVIDENZIAZIONE LINK ATTIVO NEL MENU ────────────────── */
const sections = document.querySelectorAll('section[id], div[id="hero"]');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length > 0 && navLinks.length > 0) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--red-bright)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));
}

/* ─── POP-UP INFO CONCERTI (MODALE) ──────────────────────── */
const openButtons = document.querySelectorAll('.open-modal-trigger');
const modalOverlay = document.getElementById('infoModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Funzione pulita per aprire il pop-up
function openModal(e) {
  e.preventDefault(); // Impedisce al PC e al telefono di saltare in cima alla pagina
  if (modalOverlay) {
    modalOverlay.classList.add('active');
  }
}

// Collega l'evento click
if (openButtons.length > 0 && modalOverlay) {
  openButtons.forEach(button => {
    // Gestisce nativamente sia i computer che gli smartphone moderni
    button.addEventListener('click', openModal);
  });
}

// Chiudi il pop-up premendo il tasto "Close"
if (closeModalBtn && modalOverlay) {
  closeModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalOverlay.classList.remove('active');
  });
}

// Chiudi il pop-up anche cliccando FUORI dal box (sullo sfondo scuro)
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}