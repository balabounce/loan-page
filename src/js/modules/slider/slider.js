export default class Slider {
    constructor({container=null, buttons=null, next=null, prev=null, activeClass=null, titleClass=null, arrowClass=null} = {}) {
        this.page = document.querySelector(container);

        try {
            this.slides = this.page.children;
        } catch (error) {}
        this.btns = document.querySelectorAll(buttons);
        this.slideIndex = 1;

        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.activeClass = activeClass;
        this.titleClass = titleClass;
        this.arrowClass = arrowClass;
     
    }
} 