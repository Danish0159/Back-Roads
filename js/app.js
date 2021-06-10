'use strict';

//Variables
const tabs = document.querySelectorAll(".services__tab");
const tabContainer = document.querySelector(".services__tab-container");
const tabscontent = document.querySelectorAll(".services__content");


/////////////////////////
//Modal




/////////////////////////
// TAB Component
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
