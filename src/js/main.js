import MainSlider from "./modules/slider/slider-main";
import VideoPlayer from './modules/playVideo';
import MiniSlider from "./modules/slider/slider-mini";
import Diff from "./modules/difference";
import Form from "./modules/forms";
import Mask from "./modules/mask";
import CheckText from "./modules/checkTextInputs";
import Accord from "./modules/accordeon";
import FileDownload from "./modules/download";
window.addEventListener('DOMContentLoaded', () => {
    const mainSlider = new MainSlider({container:'.page', buttons:'.next'});
    mainSlider.render();

    const moduleSlides = new MainSlider({container:'.moduleapp', buttons:'.next, .prev'});
    moduleSlides.render();


    const showUp = new MiniSlider({
        container:'.showup__content-slider', 
        next:'.showup__next', 
        prev: '.showup__prev',
        activeClass: 'card-active',
        titleClass: '.card__title',
        arrowClass: '.card__controls-arrow'     
    });
    showUp.render();

    const modules = new MiniSlider({
    container:'.modules__content-slider', 
    next:'.slick-next', 
    prev: '.slick-prev',
    activeClass: 'card-active',
    titleClass: '.card__title',
    arrowClass: '.card__controls-arrow' 
    });
    modules.render(1);
    

    const feed = new MiniSlider({
        container:'.feed__slider', 
        next:'.feed-slick-next', 
        prev: '.feed-slick-prev',
        activeClass: 'feed__item-active',
        titleClass: '.card__title',
        arrowClass: '.card__controls-arrow' 
        });
    feed.render();

    const educAgo = new Diff({
        container:'.officerold',
        button: '.officerold .officer__card-item .card__click .plus__content'
    });
    const educNow = new Diff({
        container:'.officernew',
        button: '.officernew .officer__card-item .card__click .plus__content'
    });
    educAgo.render(3);
    educNow.render(3);

    new Form({
        formSelector: 'form',
        inputsSelector: 'input'
    }).init();

    const phoneMask = new Mask({
        selector: '[name="phone"]'
    });
    phoneMask.render();

    new CheckText({
        selector: '[name="email"]'
    }).render();

    const player = new VideoPlayer('.showup .play', '.video .close', '.overlay'); 
    player.init();
    const modulePlayer = new VideoPlayer('.module__video-item .play', '.video .close', '.overlay');
    modulePlayer.init();

    new Accord('.module__info-show .plus', 'msg').render();
    new FileDownload('.download', '../Loan.pdf').render();
});