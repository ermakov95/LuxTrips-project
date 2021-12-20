const parallax = document.querySelector('.parallax');
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle__button');

parallax.classList.remove('nav-opened');
parallax.classList.add('nav-closed')

nav.classList.remove('nav_nojs');
nav.classList.remove('nav_opened');
nav.classList.add('nav_closed')

navToggle.addEventListener('click', function() {
    if (nav.classList.contains('nav_closed')) {
        parallax.classList.remove('nav-closed');
        parallax.classList.add('nav-opened');
        nav.classList.remove('nav_closed');
        nav.classList.add('nav_opened');
    } else {
        parallax.classList.remove('nav-opened');
        parallax.classList.add('nav-closed')
        nav.classList.remove('nav_opened');
        nav.classList.add('nav_closed')
    }
})