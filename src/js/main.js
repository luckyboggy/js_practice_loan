import Slider from './modules/slider/slider.js';
import SliderMain from './modules/slider/sliderMain.js';
import SliderMini from './modules/slider/sliderMini.js';
import VideoPlayer from './modules/playVideo.js';
import Difference from './modules/difference.js';
import Form from './modules/forms.js';

window.addEventListener('DOMContentLoaded', () => {
    const sliderMain = new SliderMain({ container: '.page', btns: '.next' });
    sliderMain.render();

    const modulePageSlider = new SliderMain({container: '.moduleapp', btns:'.next'});
    modulePageSlider.render();

    const showUpSlider = new SliderMini({
        container: '.showup__content-slider',
        next: '.showup__next',
        prev: '.showup__prev',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new SliderMini({
        container: '.modules__content-slider',
        next: '.modules__info-btns .slick-prev',
        prev: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new SliderMini({
        container: '.feed__slider',
        next: '.feed__slider .slick-prev',
        prev: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();

    new Form('.form').init();

    const videoPlayer = new VideoPlayer('.showup .play', '.overlay');
    videoPlayer.init();

}); 