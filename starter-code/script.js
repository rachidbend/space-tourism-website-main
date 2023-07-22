'use strict';

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

// planet carousel

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
          el.style.display = 'inline-block';
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

// ********************
// CREW CAROUSEL SLIDER
// ********************

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

// **************************
// TECHNOLOGY CAROUSEL SLIDER
// **************************

// elements and controls
const allTechnologyImages = document.querySelectorAll('.technology__image');
const allTechnologyDescriptions = document.querySelectorAll(
  '.technology__description'
);
const technologyControls = document.querySelectorAll('.technology__dot');
allTechnologyImages[0].style.transform = 'translateX(0%)';
allTechnologyImages[1].style.transform = 'translateX(100%)';
allTechnologyImages[2].style.transform = 'translateX(200%)';

technologyControls.forEach((ctrl, ctrlIndex) => {
  ctrl.addEventListener('click', e => {
    let currActive = 0;
    technologyControls.forEach((inneCrtrl, innerCtrlIndex) => {
      inneCrtrl.classList.contains('technology__dot--active')
        ? (currActive = innerCtrlIndex)
        : '';
    });
    // console.log(currActive, ctrlIndex);
    // change active control dot
    technologyControls.forEach((dot, i) => {
      i === ctrlIndex
        ? dot.classList.add('technology__dot--active')
        : dot.classList.remove('technology__dot--active');
    });

    // couldn't figure out a better way of animating the images
    if (ctrlIndex === 0) {
      allTechnologyImages[0].style.transform = 'translateX(0%)';
      allTechnologyImages[1].style.transform = 'translateX(100%)';
      allTechnologyImages[2].style.transform = 'translateX(200%)';
    }

    if (ctrlIndex === 1) {
      allTechnologyImages[0].style.transform = 'translateX(-100%)';
      allTechnologyImages[1].style.transform = 'translateX(0%)';
      allTechnologyImages[2].style.transform = 'translateX(100%)';
    }
    if (ctrlIndex === 2) {
      allTechnologyImages[0].style.transform = 'translateX(-200%)';
      allTechnologyImages[1].style.transform = 'translateX(-100%)';
      allTechnologyImages[2].style.transform = 'translateX(0%)';
    }
    allTechnologyDescriptions.forEach((desc, descIndex) => {
      // start the fadeout
      desc.classList.add('technology__fadeout');
      // make usre the opacity becomes 0
      desc.style.opacity = '0';

      setTimeout(() => {
        // after 200ms hide all the descriptions then
        desc.classList.add('desc__hide');
        // get the requested description is found
        if (ctrlIndex === descIndex) {
          setTimeout(() => {
            // we wait a little then we remove the hide and the fadeout
            desc.classList.remove('desc__hide');
            desc.classList.remove('technology__fadeout');
            // we make sure its displayed as a block with 0 opacity so that the animation would work
            desc.style.display === 'block';
            // we make sure the animation is applied
            desc.style.transition = '280ms ease-in-out';
            setTimeout(() => {
              // then we change the opacity to 1 to start the fadein animation
              desc.style.opacity = '1';
            }, 50);
          }, 50);
        }
      }, 280);
    });
  });
});
