const menu = document.getElementById('menu');
const navbar = document.getElementById('navbar');

// Open and close the mobile navigation menu.
menu.addEventListener('click', function () {
  const isOpen = navbar.classList.toggle('active');
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menu.textContent = isOpen ? '×' : '☰';
});

// Close the menu after a navigation link is selected.
navbar.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navbar.classList.remove('active');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    menu.textContent = '☰';
  });
});

// Reveal sections as they enter the screen; show them immediately if motion is reduced.
const revealElements = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach(element => element.classList.add('show'));
} else {
  const observer = new IntersectionObserver(function (entries, currentObserver) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => observer.observe(element));
}

document.getElementById('year').textContent = new Date().getFullYear();
