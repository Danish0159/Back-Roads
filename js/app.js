'use strict';
///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});




/////////////////////////
// TAB Component
const tabs = document.querySelectorAll(".services__tab");
const tabContainer = document.querySelector(".services__tab-container");
const tabscontent = document.querySelectorAll(".services__content");

//We Can add for loop to buttons but if there are
//100 tabs the the speed will become very Slow.
tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.services__tab');
  // Guard clause
  if (!clicked) return;
  // Remove active classes for tabs and content.
  tabs.forEach(t => t.classList.remove('services__tab--active'));
  tabscontent.forEach(c => c.classList.remove('services__content--active'));
  // Activate tab
  clicked.classList.add('services__tab--active');
  // Activate content area
  document
    .querySelector(`.services__content--${clicked.dataset.tab}`)
    .classList.add('services__content--active');
});

/////////////////////////
// Sticky Navigation (Not efficinet Method.)
// const Section1 = document.querySelector(".services");
// const navParent = document.querySelector(".parent")

// const DesiredLine = Section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > DesiredLine.top) {
//     navParent.classList.add('sticky');
//   }
//   else {
//     navParent.classList.remove('sticky');
//   }
// })

/////////////////////////
/////////////////////////
// InterSection API
// Observer CallBack function 
// const obsCallback = function (entries, observer) {
// entries.forEach(entry => console.log(entry));
// }
// const obsOptions = {
// Means the complete viewport
// The observer will observer relative to complete viewport
// root: null,
//When the section1 is intersecting(Showing) 10%(0.1) in the viewport.
// threshold: 0.1
// }
// const observer = new IntersectionObserver(obsCallback, obsOptions);
//THe observer will observer the section1 
// observer.observe(Section1);


/////////////////////////
/////////////////////////
// Sticky Navigation Using InterSection API (Efficient Method.)
const Section1 = document.querySelector(".services");
const navParent = document.querySelector(".parent")
const header = document.querySelector('.header');
// Call Back Function of header Observer.
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) { navParent.classList.add('sticky'); }
  else { navParent.classList.remove('sticky'); }
};
// Header Observer
const headerObserver = new IntersectionObserver(stickyNav, {
  // ViewPort
  root: null,
  // When header don't show on viewPort call to stickyNav, here the stickyNav is a call Back function.
  threshold: 0,
});
// Observer will observe header. 
headerObserver.observe(header);

/////////////////////////
///////////////////////////
// Reveal Sections animation Using InterSection API using 
const Allsection = document.querySelectorAll(".section");

// Reveal Section Animation Using InterSection API
const SectionReveaL = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('hidden-Sections');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(SectionReveaL, {
  root: null,
  // Section will only revealed when it is 15% visible.
  threshold: 0.15,
})

// Observe All the sections using sectionObserver.
Allsection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('hidden-Sections');
})


/////////////////////////
///////////////////////////
// Lazy Loading Images Using InterSection API using 

// Select The image that has this data-src attribute.
const imgTargets = document.querySelector('img[data-src');

const showImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  // Replace src 
  entry.target.src = entry.target.dataset.src;
  // After loading remove the lazy-img class.
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(showImg, {
  root: null,
  threshold: 0,
  rootMargin: '+200px',
})

imgObserver.observe(imgTargets);


///////////////////////////
// Gallery Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

// Next slide.
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};


// Previous slide.
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

//Event Listners for NExt and previous slides.
btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);



