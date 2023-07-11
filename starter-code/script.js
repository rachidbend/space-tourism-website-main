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

// this code is meant to close the nav if the outside of the nav is clicked
// //  if the nav is open
// const bodyEl = document.querySelector('.body');
// bodyEl.addEventListener('click', e => {
//   const targetEl = e.target;
//   console.log(targetEl);
//   if (targetEl.classList[0] === 'nav') {
//     console.log('nav is clicked');
//   }
//   console.log(targetEl.classList.contains('nav'));
// });
// // and you click anywhere other than the nav,
// // the nav closes

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

// planet carousel

// get controls
const allPlanetCtrl = document.querySelectorAll('.planet__link');
const allPlanetImages = document.querySelectorAll('.planet__images');
const allPlanetDescriptions = document.querySelectorAll(
  '.palnet__description '
);
const allPlanetInformation = document.querySelectorAll('.planet__info');

const allPlanetLinks = document.querySelectorAll('.planet__link');

allPlanetCtrl.forEach(ctrl => {
  ctrl.addEventListener('click', e => {
    e.preventDefault();
    //  when a ctrl is clicked,
    const targetEl = e.target;
    // figure out wich control it is
    const getClass = targetEl.classList[1];

    allPlanetLinks.forEach(link => {
      link.classList.remove('planet--active');
    });
    document.querySelector(`.${getClass}`).classList.add('planet--active');
    // show the appropriate:
    // 1- IMAGES
    // remove the active class
    allPlanetImages.forEach(img => {
      img.classList.add('planet__fadeout');
      setTimeout(() => {
        img.classList.remove('planet__images--active');
        img.classList.remove('planet__fadeout');
        document
          .querySelector(`.planet__image--${getClass}`)
          .classList.add('planet__images--active');
      }, 400);
    });
    // and put it on the appropriate image
    // document
    //   .querySelector(`.planet__image--${getClass}`)
    //   .classList.add('planet__images--active');

    // 2- DESCRIPTIONS
    allPlanetDescriptions.forEach(desc => {
      desc.classList.add('planet__fadeout');
      setTimeout(() => {
        desc.classList.remove('palnet__description--active');
        desc.classList.remove('planet__fadeout');
        document
          .querySelector(`.palnet__description--${getClass}`)
          .classList.add('palnet__description--active');
      }, 400);
    });

    // 3- INFORMATION
    allPlanetInformation.forEach(info => {
      info.classList.add('planet__fadeout');
      setTimeout(() => {
        info.classList.remove('planet__info--active');
        info.classList.remove('planet__fadeout');
        document
          .querySelector(`.planet__info--${getClass}`)
          .classList.add('planet__info--active');
      }, 400);
    });
  });
});
