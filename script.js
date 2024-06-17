'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');


const btnScrollTo = document.querySelector('.btn--scroll-to'); //use dot(.) when selecting a class
const section1 = document.querySelector('#section--1'); // use hash(#) when selecting an id
const nav = document.querySelector('.nav')

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab')
const tabsConatianer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')


///////////////////////////////////////
// Modal window


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

///////////////////////////////////
// Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Old way of scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////
// Page Navigation
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();

//     const id = this.getAttribute('href')

//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

//  Event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();

  // Matching strategy
  if(e.target.classList.contains('.nav__link')) {
    console.log('LINK');
  }
  const id = e.target.getAttribute('href')
  document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  })


// Event delegation
tabsConatianer.addEventListener('click', function(e){
  const clicked = e.target.closet('.operation__tab')

// Guard clause
if(!clicked) return
// Remove tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))

  // Active tab
  clicked.classList.add('operations__tab--active')
 // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// Menu fase animation
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this
    })
    logo.style.opacity = this
  }
}

//  passing an "argument" into handles
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function(e){
//   console.log(window.scrollY);

//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })

// Sticky navigation: Intersection Observer API
// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// }

// const observer = new IntersectionObserver()
// observer.observe(section1)

const headerSticky = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries){
  const [entry] = entries

  if(!entry.isintersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threhold: 0,
  rootMargin: `-${navHeight}px`,
})
headerObserver.observe(headerSticky)

// Revealing Element scrolling
// Reveal section
// const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer){
  const [entry] = entries
  if(!entry.isintersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15,
})
allSections.forEach(function(section){
  sectionObserver.observe(section)
  // section.classList.add('section--hidden')
})

// Lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]')

const loadImg = function(entries, observer){
  const [entry] = entries

  if(!entry.isintersecting) return

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)

}

const imgObserver = new IntersectionObserver(loading,{
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTarget.forEach(img => imgObserver.observe(img))

// Building a Slider Component
// Slider
const sliders = function(){
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn__left')
const btnRight = document.querySelector('.slider__btn__right')
const dotContainer = document.querySelector('.dots')

let curSlide = 0
const maxSlide = slides.length

// const slider = document.querySelector('.slider')
// slider.style.transform = 'scale(0.5) translateX(-800px)'
// slider.style.overflow = 'visible'


// Functions
const createDots = function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}
createDots()

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}

activateDot(0)

const goToSlide = function(slide){
  slides.forEach((s,i) => (s.style.transform) = `translateX(${100 * (i - slide)}%)`)
}

goToSlide(0)

// Next slide
const nextSlide = function() {
if(curSlide === maxSlide - 1){
  curSlide = 0
} else {
  curSlide++
}

  goToSlide(curSlide)
  activateDot(curSlide)
}

const prevSlide = function(){
  if(curSlide === 0){
    curSlide = maxSlide - 1
  } else{
  curSlide--
}

  goToSlide(curSlide)
  activateDot(curSlide)
}

const init = function(){
  goToSlide()
  createDots()

  activateDot()
}


// Event Handlers
btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowLeft') prevSlide()
  e.key === 'ArrowRight' && nextSlide()
})

dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset
    goToSlide(slide)
    activateDot(slide)
  }
})
}
slider()


////////////////////////////////
////////////////////////////////
// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// creating and inserting elements
// .insertAdjacent HTML
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

// Delete elements
document.querySelector(
  '.btn--close-cookie'.addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);
  })
);

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Atrributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist');

logo.getAttribute('src');

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.className.add();
logo.className.remove();
logo.className.toggle();
logo.classList.contains();

// Don't use
// logo.className = 'jonas';


// const h1 = document.querySelector('h1'); // write an element directly when selecting an element

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

// Rgb(255,255,255)
const randomInt = (min,max) = math.floor(math.random() * (max-min+1) * min)
const randomColor = () => `rgb(${randomInt(0, 255)}),${randomInt(0, 255)},${randomInt(0, 255)}`

document.querySelector('.nav__link').addEventListener('click', function(e){
  this.style.backgroundColor= randomColor()
  console.log('LINK', e.target, e.currentTarget);
  // Stop propagation
  // e.stopPropagation()
})

document.querySelector('.nav__links').addEventListener('click', function(e){
  this.style.backgroundColor= randomColor()
  console.log('CONTAINER', e.target, e.currentTarget);
})

document.querySelector('.nav').addEventListener('click', function(e){
  this.style.backgroundColor= randomColor()
  console.log('NAV', e.target, e.currentTarget);
})


const h1 = document.querySelector('h1')

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children); // only for direct children
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'orangered'

// Going upwards parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closet('.header').style.background = 'var(--gradient-secondary)'
h1.closet(h1).style.background = 'var(--gradient-primary)'

//  Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.parentsElement.children);

[...h1.parentElement.children].forEach(function(el){
  if(el !== h1) el.style.transform = 'scale(0.5)'
})

document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML Parsed and DOM tree built!');
})

window.addEventListener('load', function(e){
  console.log('Page is fully loaded', e);
})

// window.addEventListener('beforeunload', function(e){
// e.preventDefault())
// console.log(e);
// e.returnValue = 'message'
// })