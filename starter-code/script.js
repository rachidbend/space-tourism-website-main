// because there are many nav componentes in each page, and because we change the intire page with the nav instead of changing the contetn and leaving the nav (which i will do anothher time) we endup having to select multiple nav elements and applying the same thing to them all to stay consistent

// Get the navigation elements
const allNav = document.querySelectorAll('.nav');
const allBtn = document.querySelectorAll('.nav__open');

// add event listeners to each nav button
allBtn?.forEach(btn => {
  // get all the nav links, and if one of them is clicked
  btn?.addEventListener('click', e => {
    // toggle the 'active' class on the nav to open or close it
    allNav.forEach(nav => nav.classList.toggle('active'));
    // toggle the 'close' class to change the burger menu icon
    allBtn.forEach(btn => btn.classList.toggle('close'));
  });
});

// Get the page links
const homePageLink = document.querySelector('.link--home');
const destinationPageLink = document.querySelector('.link--destination');
const crewPageLink = document.querySelector('.link--crew');
const technologyPageLink = document.querySelector('.link--technology');
const linkBtn = document.querySelectorAll('.nav__link');

// get elemens
const allNavLinks = document.querySelectorAll('.nav__link');

// BODY TRANSITION EFFECT

// show the requested page
const showPage = nextPage => {
  const allPages = document.querySelectorAll('.page');
  // Hide all pages
  allPages.forEach(page => page.classList.add('hide'));
  // Show the requested page
  nextPage.classList.remove('hide');
};

const startTransition = () => {
  // immediatly start the animation for the transition
  document.querySelector('.body').classList.add('animate_content');
};

const fadeOutTransition = nextPage => {
  showPage(nextPage);
  // reverse the transition (fadein)
  document.querySelector('.body').classList.add('fadein');
  // remove the transition class to aviod bugs
  document.querySelector('.body').classList.remove('animate_content');
};

const endTransition = () => {
  // wait a bit, then remove the fade in class to be ready for next transition
  document.querySelector('.body').classList.remove('fadein');
  // close the nav at the end
  allNav.forEach(nav => nav.classList.remove('active'));
  allBtn.forEach(btn => btn.classList.remove('close'));
};

// this function deals with the animation and order of tasks
const transitionAnimation = nextPage => {
  // start transition
  setTimeout(() => {
    startTransition();
    // Wait for the transition to complete, then reverse tranistion and show requested page
    setTimeout(() => {
      fadeOutTransition(nextPage);
      // end transition
      setTimeout(() => {
        endTransition();
      }, 1500);
    }, 1500);
  }, 100);
};

// add event listeners to each link
linkBtn.forEach(link => {
  link.addEventListener('click', e => {
    const targetLink = e.target;
    const activeLink = document.querySelectorAll(`.${targetLink.classList[1]}`);
    // get which link is clicked to figure out which page should be shown next
    const linkClicked = targetLink.classList[1]?.split('--')[1];
    // get all pages
    // then get the page to be shown next
    const nextPage = document.querySelector(`.page--${linkClicked}`);

    // remove 'link__active' from all links
    allNavLinks.forEach(btn => btn.classList.remove('link__active'));
    // add the 'link__active' class to the active link to show it's active
    activeLink.forEach(activeLink => activeLink.classList.add('link__active'));

    transitionAnimation(nextPage);
  });
});
