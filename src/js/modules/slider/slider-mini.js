import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(page, next, prev, activeClass, titleClass, arrowClass) {
        super(page, next, prev, activeClass, titleClass, arrowClass);
    }

    slideSwitchController(where) {
        if(where == 'next') {
            this.page.appendChild(this.slides[0]);
        }
        if(where == 'prev') {
            this.page.insertBefore(this.slides[this.slides.length-1], this.slides[0]);
        }
        this.activateController(0);
    }

    activateController(i) {
        [...this.slides].forEach(slide => {
            slide.classList.remove(this.activeClass);
        });
        this.slides[i].classList.add(this.activeClass);
        let active = this.slides[i];

        [...active.parentElement.children].forEach(slide => {
            if(slide.querySelector(this.titleClass)){
                slide.querySelector(this.titleClass).style.opacity = 0.4;
            }
            if(slide.querySelector(this.arrowClass)){
                slide.querySelector(this.arrowClass).style.opacity = 0;
            }
        });
        if(active.querySelector(this.titleClass)) {
            active.querySelector(this.titleClass).style.opacity = 1;
        }
        if(active.querySelector(this.arrowClass)){
            active.querySelector(this.arrowClass).style.opacity = 0.4;
        }
    }


    bindSlick() {
        this.next.addEventListener('click', () => {
            this.slideSwitchController('next');

        });

        this.prev.addEventListener('click', () => {
            this.slideSwitchController('prev');
        });
    }

    bindAuto() {
        this.page.addEventListener('mouseover', () => {
            clearTimeout(this.autoSlideInt);
        });
        this.page.addEventListener('mouseout',  () => {
            this.autoSlide();
        });

        this.next.addEventListener('mouseover', () =>{
            clearTimeout(this.autoSlideInt);
        });
        this.prev.addEventListener('mouseover', () =>{
            clearTimeout(this.autoSlideInt);
        });

        this.next.addEventListener('mouseout', () =>{
            this.autoSlide();
        });
        this.prev.addEventListener('mouseout', () =>{
            this.autoSlide();
        });
    }

    autoSlide() {
        this.autoSlideInt = setTimeout(() => {
            this.slideSwitchController('next');
            this.autoSlide();
        }, 5000);
        
    }

    

    render(auto) {
        try {
            this.page.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow:hidden;
            align-items: flex-start;
            `;
        
            document.querySelector('.feed-slick-prev').style.cssText = `
            z-index: 12;
            position: absolute;
            bottom: 240px;
            left: 700px;
            width: 43px;
            height: 43px;
            margin-left: 34px;
            border: 2px solid #eaeaea;
            border-radius: 100%;
            background-color: transparent;
            cursor: pointer;
            margin-right: 12px;
            `;

            document.querySelector('.feed-slick-next').style.cssText = `
            z-index: 12;
            position: absolute;
            bottom: 240px;
            left: 755px;
            width: 43px;
            height: 43px;
            margin-left: 34px;
            border: 2px solid #eaeaea;
            border-radius: 100%;
            background-color: transparent;
            cursor: pointer;
            `;

            this.activateController(0);
            this.bindSlick();
            if(auto) {
                this.bindAuto();
                this.autoSlide();
            }
        } catch (error) {}
    }
}