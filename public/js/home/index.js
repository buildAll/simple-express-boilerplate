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

// var Swiper = require('plugin/swiper');
//
//
// var mySwiper = new Swiper ('.swiper-container', {
//     slideToClickedSlide: true,
//     autoplay: 2000,
//     loop: false,
//     pagination: '.swiper-pagination',
//     paginationClickable: true
// });
