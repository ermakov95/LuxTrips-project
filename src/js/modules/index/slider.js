const sliderInner = document.querySelector('.slider-inner');
const sliderLine = document.querySelector('.slider-line');
const slide = document.querySelector('.slide')
const slides = document.querySelectorAll('.slide')
const radios = document.querySelectorAll('.radio')

const sliderInnerWeight = () => {
    return sliderInner.offsetWidth
}
const slideWeight = () => {
    return slide.offsetWidth
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
    for (let slid of slides) {
        if (slid.classList[0] == checked || slid.classList[1] == checked) {
            slid.style.display = 'grid'
        } else {
            slid.style.display = 'none'
        }
	}
    setSliderWidth(`.${checked}`)
    sliderLine.style.left = 0 + 'px';
    index = 1;
});

document.querySelector('.slider-next').addEventListener('click', function(){
    index++
    if (slideWeight() > sliderInnerWeight() / 2) {
        if (index > countSlide) {index = 1} 
    } else {
        if (index > countSlide - 2) {index = 1} 
    }
    sliderLine.style.left = -((index-1)*(slideWeight())) + 'px';
});

document.querySelector('.slider-back').addEventListener('click', function(){
    index--
    if (slideWeight() > sliderInnerWeight() / 2) {
        if (index <= 0) {index = countSlide} 
    } else {
        if (index <= 0) {index = countSlide - 2} 
    }
    sliderLine.style.left = -((index-1)*slideWeight()) + 'px';
});
document.addEventListener("DOMContentLoaded", function(event)
{window.onresize = function() {
    setSliderWidth(`.${checked}`);
};});