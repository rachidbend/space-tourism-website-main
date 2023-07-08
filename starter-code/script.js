const allNav = document.querySelectorAll('.nav');
const allBtn = document.querySelectorAll('.nav__open');

allBtn?.forEach(btn => {
  btn?.addEventListener('click', e => {
    allNav.forEach(nav => nav.classList.toggle('active'));
    allBtn.forEach(btn => btn.classList.toggle('close'));
  });
});

// 1- get the elements selectors for the nav links
const homePageLink = document.querySelector('.link--home');
const destinationPageLink = document.querySelector('.link--destination');
const crewPageLink = document.querySelector('.link--crew');
const technologyPageLink = document.querySelector('.link--technology');

const linkBtn = document.querySelectorAll('.nav__link');
// 2- when a link is cicked, the designated page for it should be shown
// get all the links and add an eventListener to all of them
linkBtn.forEach(link => {
  link.addEventListener('click', e => {
    // get each btn or link
    const btnclicked = e.target;
    document
      .querySelectorAll('.nav__link')
      .forEach(btn => btn.classList.remove('link__active'));

    document
      .querySelectorAll(`.${btnclicked.classList[1]}`)
      .forEach(activeLink => activeLink.classList.add('link__active'));
    // get which btn is clicked
    const linkClicked = btnclicked.classList[1].split('--')[1];

    // get all pages
    const allPages = document.querySelectorAll('.page');
    // then get the page to be showed next
    const nextPage = document.querySelector(`.page--${linkClicked}`);
    // hide all pages
    allPages.forEach(page => page.classList.add('hide'));
    // show only the page requested
    nextPage.classList.remove('hide');
  });
});
// 3- and the other pages should be hidden
