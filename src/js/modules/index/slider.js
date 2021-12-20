import trips from '../../database/trips.js';
const sliderInner = document.querySelector('.slider-inner');
const sliderLine = document.querySelector('.slider-line');
const radios = document.querySelectorAll('.radio')

for (let trip of trips) {
    let slide__rating = ""
    let vector = '<img src="./img/index/Vector-rating.svg" alt="Векторный ромб" loading="lazy">'
    let vectorWhite = '<img src="./img/index/Vector-rating-white.svg" alt="Векторный ромб" loading="lazy">'
    if (+trip[5] >= 4.5) {
        slide__rating = `									
        <div class="slide__rating">
        <p>${trip[5]}</p>
        ${vectorWhite + vectorWhite + vectorWhite + vectorWhite + vectorWhite}
        </div>`
    } else if (+trip[5] >= 3.5) {
        slide__rating = `									
        <div class="slide__rating">
        <p>${trip[5]}</p>
        ${vector + vectorWhite + vectorWhite + vectorWhite + vectorWhite}
        </div>`
    } else if (+trip[5] >= 2.5) {
        slide__rating = `									
        <div class="slide__rating">
        <p>${trip[5]}</p>
        ${vector + vector + vectorWhite + vectorWhite + vectorWhite}
        </div>`
    } else if (+trip[5] >= 1.5) {
        slide__rating = `									
        <div class="slide__rating">
        <p>${trip[5]}</p>
        ${vector + vector + vector + vectorWhite + vectorWhite}
        </div>`
    } else if (+trip[5] >= 0.5) {
        slide__rating = `									
        <div class="slide__rating">
        <p>${trip[5]}</p>
        ${vector + vector + vector + vector + vectorWhite}
        </div>`
    } else {
        slide__rating = `									
        <div class="slide__rating">
        <p>${trip[5]}</p>
        ${vector + vector + vector + vector + vector}
        </div>`
    }
    let slide__button = trip[6] ? `<a class="slide__button" href="${trip[6]}">customise</a>` : ''
    let slide__inner = `
        <div class="slide-inner">
            <div class="slide__text">
                <p>${trip[2]}</p>
                <p>${trip[3]}</p>
            </div>
            <div class="slide__price">
                <p>FROM</p>
                <p>${trip[4]}</p>
            </div>
            ${slide__rating}
            ${slide__button}
        </div>`
    let code = `
        <div class="slide ${trip[0]}">
            <picture class="slide__img">
                <source srcset="./img/${trip[1]}@760w.webp, ./img/${trip[1]}@1520w.webp 2x" type="image/webp" alt="${trip[3]}" loading="lazy">
                <source srcset="./img/${trip[1]}@760w.jpg, ./img/${trip[1]}@1520w.jpg 2x" type="image/jpg" alt="${trip[3]}" loading="lazy">
                <img class="slide__img" src="./img/${trip[1]}@760w.jpg" type="image/jpg" alt="${trip[3]}" loading="lazy"></picture>
            ${slide__inner}
        </div>`
    sliderLine.insertAdjacentHTML("beforeend", code)
}

const slides = document.querySelectorAll('.slide')

const sliderInnerWeight = () => {
    return sliderInner.offsetWidth
}
const slideWeight = (selector) => {
    return document.querySelector(`.${checked}`).offsetWidth
}

let countSlide = sliderLine.querySelectorAll('.slide').length;

const setSliderWidth = selector => {
    if (sliderInnerWeight() < 910) {
        let slideWidth = 88;
        let paddingSliderLine = 6;
        countSlide = sliderLine.querySelectorAll(selector).length;
        sliderLine.style.width = (slideWidth * countSlide + 2 * paddingSliderLine) + 'vw';
    } else if (sliderInnerWeight() < 1440) {
        let slideWidth = 26.388;
        let paddingSliderLine = 10.417;
        countSlide = sliderLine.querySelectorAll(selector).length;
        sliderLine.style.width = (slideWidth * countSlide + 2 * paddingSliderLine) + 'vw';
    } else {
        let slideWidth = 380;
        let paddingSliderLine = 150;
        countSlide = sliderLine.querySelectorAll(selector).length;
        sliderLine.style.width = (slideWidth * countSlide + 2 * paddingSliderLine) + 'px';
    }
}
setSliderWidth('.slide')

let index = 1;
let checked = 'slide'
document.querySelector('.choice-radio').addEventListener('click', function(){
    for (let radio of radios) {
		if (radio.checked) {
			checked = radio.value;
		}
	}
    for (let slide of slides) {
        if (slide.classList[0] == checked || slide.classList[1] == checked) {
            slide.style.display = 'grid'
        } else {
            slide.style.display = 'none'
        }
	}
    setSliderWidth(`.${checked}`)
    sliderLine.style.left = 0 + 'px';
    index = 1;
});

document.querySelector('.slider-next').addEventListener('click', function(){
    index++
    if (sliderInnerWeight() < 910) {
        if (index > countSlide) {index = 1} 
    } else if (countSlide < 4) {
        index = 1
    } else {
        if (index > countSlide - 2) {index = 1} 
    }
    sliderLine.style.left = -((index-1)*(slideWeight(checked))) + 'px';
});

document.querySelector('.slider-back').addEventListener('click', function(){
    index--
    if (sliderInnerWeight() < 910) {
        if (index <= 0) {index = countSlide} 
    } else if (countSlide < 4) {
        index = 1
    } else {
        if (index <= 0) {index = countSlide - 2}
    }
    sliderLine.style.left = -((index-1)*slideWeight(checked)) + 'px';
});
document.addEventListener("DOMContentLoaded", function(event)
{window.onresize = function() {
    setSliderWidth(`.${checked}`);
    if (sliderInnerWeight() >= 910 && index > countSlide - 2) {
        index = countSlide - 2
    }
    sliderLine.style.left = -((index-1)*slideWeight(checked)) + 'px';
};});