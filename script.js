/* ============================================
   SCRIPT.JS v1.6 - Lógica del portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------------------------
     1. MENÚ HAMBURGUESA (MÓVIL)
     -------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var topbarLinks = document.getElementById('topbarLinks');

  if (navToggle && topbarLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = topbarLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* --------------------------------------------
     2. CARRUSEL DE PANELES
     -------------------------------------------- */
  var pagesTrack = document.getElementById('pagesTrack');
  var pagesDots = document.querySelectorAll('#pagesDots .dot');
  var btnPrev = document.getElementById('btnPrev');
  var btnNext = document.getElementById('btnNext');
  var currentPage = 0;
  var totalPages = pagesDots.length;

  /**
   * Navega a una página específica del carrusel.
   * @param {number} index - Índice de la página (0 a totalPages-1).
   */
  function goToPage(index) {
    // Asegurar que el índice esté dentro del rango (loop infinito)
    if (index < 0) index = totalPages - 1;
    if (index >= totalPages) index = 0;

    currentPage = index;

    // Mover el track
    if (pagesTrack) {
      pagesTrack.style.transform = 'translateX(-' + (currentPage * 100) + '%)';
    }

    // Actualizar dots
    pagesDots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentPage);
    });

    // Actualizar enlaces del topbar que tengan data-page
    if (topbarLinks) {
      var topLinks = topbarLinks.querySelectorAll('a[data-page]');
      topLinks.forEach(function (link) {
        var page = parseInt(link.getAttribute('data-page'), 10);
        link.classList.toggle('active', page === currentPage);
      });
    }
  }

  /* --- Flecha anterior --- */
  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      goToPage(currentPage - 1);
    });
  }

  /* --- Flecha siguiente --- */
  if (btnNext) {
    btnNext.addEventListener('click', function () {
      goToPage(currentPage + 1);
    });
  }

  /* --- Clic directo en los dots --- */
  pagesDots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
      goToPage(index);
    });
  });

  /* --------------------------------------------
     3. ENLACES DEL HEADER CON data-page
     -------------------------------------------- */
  if (topbarLinks) {
    var topLinks = topbarLinks.querySelectorAll('a[data-page]');

    topLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var page = parseInt(link.getAttribute('data-page'), 10);
        if (!isNaN(page)) {
          goToPage(page);
        }

        // Cerrar menú móvil si está abierto
        if (topbarLinks) topbarLinks.classList.remove('open');
        if (navToggle) {
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* --------------------------------------------
     4. ENLACES SIN data-page (ej: "Contacto")
     -------------------------------------------- */
  if (topbarLinks) {
    var allLinks = topbarLinks.querySelectorAll('a');
    allLinks.forEach(function (link) {
      // Si NO tiene data-page, es un enlace de scroll normal
      if (!link.hasAttribute('data-page')) {
        link.addEventListener('click', function () {
          // Cerrar menú móvil si está abierto
          if (topbarLinks) topbarLinks.classList.remove('open');
          if (navToggle) {
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  }

  /* --------------------------------------------
     5. SELECTOR DE IDIOMA (simulado)
     -------------------------------------------- */
  var langSpans = document.querySelectorAll('.lang-selector span');
  langSpans.forEach(function (span) {
    span.addEventListener('click', function () {
      langSpans.forEach(function (s) { s.classList.remove('active'); });
      span.classList.add('active');
      // Aquí podrías añadir la lógica real de cambio de idioma
    });
  });

  /* --------------------------------------------
     6. NAVEGACIÓN CON TECLADO (opcional)
     -------------------------------------------- */
  document.addEventListener('keydown', function (e) {
    // Evitar que las flechas muevan el carrusel si el foco está en un input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
    if (e.key === 'ArrowRight') goToPage(currentPage + 1);
  });

  /* --------------------------------------------
     7. INICIALIZAR
     -------------------------------------------- */
  goToPage(0);

});