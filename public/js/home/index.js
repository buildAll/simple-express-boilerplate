require('css/home/index.css');
require('css/common/index.css');

const $ = require('jquery');

const showMenu = () => {
    $('.mask').show();
    $('.menu').show().animate({
        width: '200px',
    }, 500);
}

const hideMenu = () => {
    $('.menu').animate({
        width: '0',
    }, 500, ()=> {
        $('.mask').hide();
    }).hide('slow');
}

$('.menu-icon').on('click', showMenu);
$('.mask').on('click', hideMenu);

const Swiper = require('plugin/swiper');

const mySwiper = new Swiper ('.slider.product .swiper-container', {
    slideToClickedSlide: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 'auto',
    spaceBetween: 30,
    grabCursor: true,
    paginationClickable: true
});
