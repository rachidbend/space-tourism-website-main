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
// 3- and the other pages should be hidden
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
    const linkClicked = btnclicked.classList[1]?.split('--')[1];

    // get all pages
    const allPages = document.querySelectorAll('.page');
    // then get the page to be showed next
    const nextPage = document.querySelector(`.page--${linkClicked}`);

    setTimeout(() => {
      // start the animation for the transition
      document.querySelector('.body').classList.add('animate_content');
      // wait a bit then start the transition to fadin the content
      setTimeout(() => {
        document.querySelector('.body').classList.add('fadein');
        // hide all pages
        allPages.forEach(page => page.classList.add('hide'));
        // show only the page requested
        nextPage.classList.remove('hide');
        // after fade in remove the animation
        document.querySelector('.body').classList.remove('animate_content');
        // wait a bit, then remove the fade in class to be ready for next transition
        setTimeout(() => {
          document.querySelector('.body').classList.remove('fadein');
          // close the nav at the end
          allNav.forEach(nav => nav.classList.toggle('active'));
          allBtn.forEach(btn => btn.classList.toggle('close'));
        }, 1500);
      }, 1500);
    }, 100);
  });
});

// setTimeout(() => {
//   // start the animation for the transition
//   document.querySelector('.body').classList.add('animate_content');
//   // wait a bit then start the transition to fadin the content
//   setTimeout(() => {
//     document.querySelector('.body').classList.add('fadein');
//     // after fade in remove the animation
//     document.querySelector('.body').classList.remove('animate_content');
//     // wait a bit, then remove the fade in class to be ready for next transition
//     setTimeout(() => {
//       document.querySelector('.body').classList.remove('fadein');
//     }, 2000);
//   }, 2000);
// }, 2000);
