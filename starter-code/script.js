'use strict';

// because there are many nav componentes in each page, and because we change the intire page with the nav instead of changing the contetn and leaving the nav (which i will do anothher time) we endup having to select multiple nav elements and applying the same thing to them all to stay consistent

// ******************************************
//                NAVIGATION
// ******************************************
// Get the navigation elements
const allNav = document.querySelectorAll('.nav');
const allBtn = document.querySelectorAll('.nav__open');

const toggleAllNav = (state = 'toggle') => {
  if (state === 'toggle') allNav.forEach(nav => nav.classList.toggle('active'));
  if (state === 'add') allNav.forEach(nav => nav.classList.add('active'));
  if (state === 'remove') allNav.forEach(nav => nav.classList.remove('active'));
};
const toggleAllNavBtn = (state = 'toggle') => {
  if (state === 'toggle') allBtn.forEach(nav => nav.classList.toggle('close'));
  if (state === 'add') allBtn.forEach(nav => nav.classList.add('close'));
  if (state === 'remove') allBtn.forEach(nav => nav.classList.remove('close'));
};

// add event listeners to each nav button
allBtn?.forEach(btn => {
  // get all the nav links, and if one of them is clicked
  btn?.addEventListener('click', e => {
    // toggle the 'active' class on the nav to open or close it
    toggleAllNav();
    // toggle the 'close' class to change the burger menu icon
    toggleAllNavBtn();
  });
});

// close nav when it is open and the outside of it is clicked
document.querySelector('body').addEventListener('click', e => {
  let navActive = false;
  // check if the nav is active
  allNav.forEach(nav => {
    nav.classList.contains('active') ? (navActive = true) : (navActive = false);
  });
  // if the nav or nav open button are clicked and nav is open
  if (e.target.closest('.nav')) return;
  if (e.target.closest('.nav__open')) return;
  if (!navActive) return;

  // then:
  // close the nav
  toggleAllNav();
  // change the nav button
  toggleAllNavBtn();
});

// Get the page nav links
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
  toggleAllNav('remove');
  toggleAllNavBtn('remove');
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
    transitionAnimation(nextPage);
    // remove 'link__active' from all links
    allNavLinks.forEach(btn => btn.classList.remove('link__active'));
    // add the 'link__active' class to the active link to show it's active
    activeLink.forEach(activeLink => activeLink.classList.add('link__active'));
  });
});

// ******************************************
//          PLANET CAROUSEL SLIDER
// ******************************************

// get controls
const allPlanetCtrl = document.querySelectorAll('.planet__link');
const allPlanetImages = document.querySelectorAll('.planet__image');
const allPlanetDescriptions = document.querySelectorAll('.planet__description');
const allPlanetInformation = document.querySelectorAll('.planet__info');
const allPlanetLinks = document.querySelectorAll('.planet__link');

document.querySelector('.planet__image--active').style.display = 'inline-block';
document.querySelector('.planet__description--active').style.display =
  'inline-block';
document.querySelector('.planet__info--active').style.display = 'flex';

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
    console.log(document.querySelector(`.${getClass}`));

    // show the appropriate:

    const displayPlanet = (elements, section) => {
      console.log(elements);
      elements.forEach(el => {
        el.classList.add('planet__fadeout');
        setTimeout(() => {
          // remove the active class
          el.classList.remove(`planet__${section}--active`);
          el.classList.remove('planet__fadeout');
          document
            .querySelector(`.planet__${section}--${getClass}`)
            .classList.add(`planet__${section}--active`);
          if (section === 'info') el.style.display = 'flex';
          else el.style.display = 'inline-block';
        }, 450);
      });
    };
    // 1- IMAGES
    displayPlanet(allPlanetImages, 'image');
    // 2- DESCRIPTIONS
    displayPlanet(allPlanetDescriptions, 'description');
    // 3- INFORMATION
    displayPlanet(allPlanetInformation, 'info');
  });
});

// ******************************************
//          CREW CAROUSEL SLIDER
// ******************************************

const crewDots = document.querySelectorAll('.crew__dot');
const crewImages = document.querySelectorAll('.crew__image');
const crewDescriptions = document.querySelectorAll('.crew__description');

const showActiveCrew = index => {
  // show appropriate image
  crewImages.forEach((img, imgIndex) => {
    img.classList.add('crew__fadout');
    setTimeout(() => {
      img.style.display = 'none';
      img.classList.remove('crew__fadout');
      imgIndex === index ? (crewImages[index].style.display = 'block') : '';
      img.classList.add('crew__fadout');
      setTimeout(() => {
        img.classList.remove('crew__fadout');
      }, 160);
    }, 250);
  });

  // show appropriate description
  crewDescriptions.forEach((desc, descIndex) => {
    desc.classList.add('crew__fadout');
    setTimeout(() => {
      desc.style.display = 'none';
      desc.classList.remove('crew__fadout');
      descIndex === index
        ? (crewDescriptions[index].style.display = 'block')
        : '';
      desc.classList.add('crew__fadout');

      setTimeout(() => {
        desc.classList.remove('crew__fadout');
      }, 20);
    }, 400);
  });
};

crewDots.forEach((dot, index) => {
  const isActive = dot.classList.contains('crew__dot--active');
  if (isActive) {
    showActiveCrew(index);
  }
});

crewDots.forEach((dot, index) => {
  dot.addEventListener('click', e => {
    let target;
    if (e.target.tagName === 'DIV') {
      target = e.target;
    } else if (e.target.tagName === 'SPAN') {
      target = e.target.parentElement;
    }
    crewDots.forEach(dot => dot.classList.remove('crew__dot--active'));
    target.classList.add('crew__dot--active');
    showActiveCrew(index);
  });
});

// ******************************************
//         TECHNOLOGY CAROUSEL SLIDER
// ******************************************

// elements and controls
const allTechnologyImages = document.querySelectorAll('.technology__image');
const allTechnologyDescriptions = document.querySelectorAll(
  '.technology__description'
);
const technologyControls = document.querySelectorAll('.technology__dot');

// set inicial position for images
allTechnologyImages.forEach((img, index) => {
  img.style.transform = `translateX(${index * 100}%)`;
});
// figure out where each image should be depending on which is requested
const moveImage = targetImageIndex => {
  const translatePercentage = targetImageIndex * -100;
  allTechnologyImages.forEach((img, index) => {
    img.style.transform = `translateX(${translatePercentage + index * 100}%)`;
    // ex: if requested images has index 2, then
    // translatePercentage = 2 * -100, which is -200
    // so the translateX for index = 2 is: -200 + 2 * 100 which is 0;
    // and the translateX for index = 1 is: -200 + 1 * 100 which is -100;
    // so the translateX for index = 3 is: -200 + 3 * 100 which is 100;
    // hope it explains it
  });
};
// show appropriate description with fade-out and fade-in animations
const showDescription = ctrlIndex => {
  allTechnologyDescriptions.forEach((desc, descIndex) => {
    // start the fadeout
    desc.classList.add('technology__fadeout');
    // make sure the opacity becomes 0
    desc.style.opacity = '0';

    setTimeout(() => {
      // after 280ms hide all the descriptions then
      desc.classList.add('desc__hide');
      // when the requested description is found
      if (ctrlIndex === descIndex) {
        setTimeout(() => {
          // we wait a little then we remove the hide and the fadeout
          desc.classList.remove('desc__hide');
          desc.classList.remove('technology__fadeout');
          // we make sure its displayed as a block with 0 opacity so that the animation would work
          desc.style.display === 'block';
          setTimeout(() => {
            // then we change the opacity to 1 to start the fadein animation
            desc.style.opacity = '1';
          }, 50);
        }, 50);
      }
    }, 280);
  });
};

technologyControls.forEach((ctrl, ctrlIndex) => {
  ctrl.addEventListener('click', e => {
    e.preventDefault();

    // get the index requested and :
    // change the images acording to it
    moveImage(ctrlIndex);
    // change active control dot
    technologyControls.forEach((dot, i) => {
      i === ctrlIndex
        ? dot.classList.add('technology__dot--active')
        : dot.classList.remove('technology__dot--active');
    });
    showDescription(ctrlIndex);
  });
});
