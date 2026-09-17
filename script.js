/* ============================================
   SCRIPT.JS v2.0 - Lógica del portfolio
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
  var btnPrev = document.getElementById('arrowPrev');
  var btnNext = document.getElementById('arrowNext');
  var labelPrev = document.getElementById('labelPrev');
  var labelNext = document.getElementById('labelNext');
  var allPages = document.querySelectorAll('.page');
  var currentPage = 0;
  var totalPages = allPages.length;

  var pageNames = [];
  allPages.forEach(function (page) {
    pageNames.push(page.getAttribute('data-page-name') || '');
  });

  function updateArrowLabels() {
    var prevIndex = (currentPage - 1 + totalPages) % totalPages;
    var nextIndex = (currentPage + 1) % totalPages;
    if (labelPrev) labelPrev.textContent = pageNames[prevIndex];
    if (labelNext) labelNext.textContent = pageNames[nextIndex];
  }

  function goToPage(index) {
    if (index < 0) index = totalPages - 1;
    if (index >= totalPages) index = 0;

    currentPage = index;

    if (pagesTrack) {
      pagesTrack.style.transform = 'translateX(-' + (currentPage * 100) + '%)';
    }

    updateArrowLabels();

    if (topbarLinks) {
      var topLinks = topbarLinks.querySelectorAll('a[data-page]');
      topLinks.forEach(function (link) {
        var page = parseInt(link.getAttribute('data-page'), 10);
        link.classList.toggle('active', page === currentPage);
      });
    }
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      goToPage(currentPage - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', function () {
      goToPage(currentPage + 1);
    });
  }

  /* --------------------------------------------
     3. ENLACES DEL HEADER
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
        if (topbarLinks) topbarLinks.classList.remove('open');
        if (navToggle) {
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    var allLinks = topbarLinks.querySelectorAll('a');
    allLinks.forEach(function (link) {
      if (!link.hasAttribute('data-page')) {
        link.addEventListener('click', function () {
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
     4. SELECTOR DE IDIOMA (simulado)
     -------------------------------------------- */
  var langSpans = document.querySelectorAll('.lang-selector span');
  langSpans.forEach(function (span) {
    span.addEventListener('click', function () {
      langSpans.forEach(function (s) { s.classList.remove('active'); });
      span.classList.add('active');
    });
  });

  /* --------------------------------------------
     5. NAVEGACIÓN CON TECLADO
     -------------------------------------------- */
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
    if (e.key === 'ArrowRight') goToPage(currentPage + 1);
  });

  /* --------------------------------------------
     6. INICIALIZAR
     -------------------------------------------- */
  goToPage(0);

});