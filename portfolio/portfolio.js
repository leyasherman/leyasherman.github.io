'use strict';
const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('nav-menu');
function closeMenu() {
  menu.classList.remove('active');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menu.classList.toggle('active', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
const toolbar = document.querySelector('.project-toolbar');
const filterButtons = [...toolbar.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card')];
const count = document.getElementById('project-count');
toolbar.hidden = false;
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  cards.forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.hidden = !show;
    if (show) visible++;
  });
  count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
}));
