// Верхний слайдер

import trips from '../../database/trips.js';
const tripsSliderInner = document.querySelector('.trips-slider-inner');
const tripsSliderLine = document.querySelector('.trips-slider-line');
const radios = document.querySelectorAll('.radio')

for (let trip of trips) {
    let slide__rating = ""
    let vector = '<img src="./img/index/Vector-rating.svg" alt="Векторный ромб" loading="lazy">'
    let vectorWhite = '<img src="./img/index/Vector-rating-white.svg" alt="Векторный ромб" loading="lazy">'
    if (+trip[5] >= 4.5) {
        slide__rating = vectorWhite.repeat(5)
    } else if (+trip[5] >= 3.5) {
        slide__rating = vector + vectorWhite.repeat(4)
    } else if (+trip[5] >= 2.5) {
        slide__rating = vector.repeat(2) + vectorWhite.repeat(3)
    } else if (+trip[5] >= 1.5) {
        slide__rating = vector.repeat(3) + vectorWhite.repeat(2)
    } else if (+trip[5] >= 0.5) {
        slide__rating = vector.repeat(4) + vectorWhite
    } else {
        slide__rating = vector.repeat(5)
    }
    let slide__button = trip[6] ? `<a class="trips-slide__button" href="${trip[6]}">customise</a>` : '';
    let code = `
        <div class="trips-slide ${trip[0]}">
            <div class="trips-slide__img">
                <picture>
                    <source srcset="./img/${trip[1]}@760w.webp, ./img/${trip[1]}@1520w.webp 2x" type="image/webp" alt="${trip[3]}" loading="lazy">
                    <source srcset="./img/${trip[1]}@760w.jpg, ./img/${trip[1]}@1520w.jpg 2x" type="image/jpg" alt="${trip[3]}" loading="lazy">
                    <img src="./img/${trip[1]}@760w.jpg" type="image/jpg" alt="${trip[3]}" loading="lazy">
                </picture>
            </div>
            <div class="trips-slide-inner">
                <div class="trips-slide__text">
                    <p>${trip[2]}</p>
                    <p>${trip[3]}</p>
                </div>
                <div class="trips-slide__price">
                    <p>FROM</p>
                    <p>${trip[4]}</p>
                </div>
                <div class="trips-slide__rating">
                    <p>${trip[5]}</p>
                    ${slide__rating}
                </div>
                ${slide__button}
            </div>
        </div>`
    tripsSliderLine.insertAdjacentHTML("beforeend", code)
}

const tripsSlides = document.querySelectorAll('.trips-slide')

const tripsSliderInnerWeight = () => {
    return tripsSliderInner.offsetWidth
}
const tripsSlideWeight = (selector) => {
    return document.querySelector(`.${checked}`).offsetWidth
}

let countSlide = tripsSliderLine.querySelectorAll('.trips-slide').length;

const setTripsSliderWidth = selector => {
    countSlide = tripsSliderLine.querySelectorAll(selector).length;
    if (tripsSliderInnerWeight() < 910) {
        let slideWidth = 88;
        let paddingSliderLine = 6;
        tripsSliderLine.style.width = (slideWidth * countSlide + 2 * paddingSliderLine) + 'vw';
    } else if (tripsSliderInnerWeight() < 1440) {
        let slideWidth = 26.388;
        let paddingSliderLine = 10.417;
        tripsSliderLine.style.width = (slideWidth * countSlide + 2 * paddingSliderLine) + 'vw';
    } else {
        let slideWidth = 380;
        let paddingSliderLine = 150;
        tripsSliderLine.style.width = (slideWidth * countSlide + 2 * paddingSliderLine) + 'px';
    }
}
setTripsSliderWidth('.trips-slide')

let tripsIndex = 1;
let checked = 'trips-slide'
document.querySelector('.choice-radio').addEventListener('click', function(){
    for (let radio of radios) {
		if (radio.checked) {
			checked = radio.value;
		}
	}
    for (let slide of tripsSlides) {
        if (slide.classList[0] == checked || slide.classList[1] == checked) {
            slide.style.display = 'grid'
        } else {
            slide.style.display = 'none'
        }
	}
    setTripsSliderWidth(`.${checked}`)
    tripsSliderLine.style.left = 0 + 'px';
    tripsIndex = 1;
});

document.querySelector('.trips-slider-next').addEventListener('click', function(){
    tripsIndex++
    if (tripsSliderInnerWeight() < 910) {
        if (tripsIndex > countSlide) {tripsIndex = 1} 
    } else if (countSlide < 4) {
        tripsIndex = 1
    } else {
        if (tripsIndex > countSlide - 2) {tripsIndex = 1} 
    }
    tripsSliderLine.style.left = -((tripsIndex-1)*tripsSlideWeight(checked)) + 'px';
});

document.querySelector('.trips-slider-back').addEventListener('click', function(){
    tripsIndex--
    if (tripsSliderInnerWeight() < 910) {
        if (tripsIndex <= 0) {tripsIndex = countSlide} 
    } else if (countSlide < 4) {
        tripsIndex = 1
    } else {
        if (tripsIndex <= 0) {tripsIndex = countSlide - 2}
    }
    tripsSliderLine.style.left = -((tripsIndex-1)*tripsSlideWeight(checked)) + 'px';
});


// Средний слайдер
const bodyInner = document.querySelector('.body-inner');
const packagesSliderLine = document.querySelector('.packages-slider-line');
const packagesSlide = document.querySelector('.packages-slide')
const packagesCountSlide = 5;

const packagesSlideWeight = () => {
    return packagesSlide.offsetWidth
}

let packagesIndex = 1;
document.querySelector('.packages-slider-next').addEventListener('click', function(){
    packagesIndex++
    if (packagesIndex > packagesCountSlide) {packagesIndex = 1} 
    packagesSliderLine.style.left = -((packagesIndex-1)*packagesSlideWeight()) + 'px';
});

document.querySelector('.packages-slider-back').addEventListener('click', function(){
    packagesIndex--
    if (packagesIndex <= 0) {packagesIndex = packagesCountSlide} 
    packagesSliderLine.style.left = -((packagesIndex-1)*packagesSlideWeight()) + 'px';
});


// resize
document.addEventListener("DOMContentLoaded", function(event)
    {window.onresize = function() {
        if (bodyInner.offsetWidth >= 910) {packagesSliderLine.style.left = 0 + 'px'; packagesIndex = 1}

        setTripsSliderWidth(`.${checked}`);
        if (tripsSliderInnerWeight() >= 910 && tripsIndex > countSlide - 2) {
            tripsIndex = countSlide - 2
        }
        tripsSliderLine.style.left = -((tripsIndex-1)*tripsSlideWeight(checked)) + 'px';
};});