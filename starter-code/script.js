const nav = document.querySelector('.nav');
const btn = document.querySelector('.nav__open');

btn.addEventListener('click', e => {
  nav.classList.toggle('active');
});
