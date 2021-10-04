import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(buttons) {
        super(buttons);
    }
    
    showSlide(n) {
        if(n > this.slides.length) {
            this.slideIndex = 1;
        }
        if(n <= 0) {
            this.slideIndex = this.slides.length;
        }
        if(n === 3) {
            try {
                this.teacher.style.display = 'none';
                this.teacher.classList.remove('fadeInUp');
                setTimeout(() => {
                    // this.teacher.style.display = 'block';
                    // this.teacher.classList.add('animated','fadeInUp');
                }, 3000);
            } catch(e){}
        }

        [...this.slides].forEach(slide => {
            slide.style.display = 'none';
        });
        this.slides[this.slideIndex-1].style.display = 'block';
    }
    
    plusSlide() {
        this.slideIndex++;
        this.showSlide(this.slideIndex);
    }

    minusSlide() {
        this.slideIndex--;
        this.showSlide(this.slideIndex);
    }

    render() {
        // console.log(this.page, this.slides);
        try {
            try {
                this.teacher = document.querySelector('.hanson');
            } catch(e) {}
    
            this.showSlide(this.slideIndex);
            this.btns.forEach(button => {
                button.addEventListener('click', () => {
                    if (button.classList.contains('next')) {
                        this.plusSlide();
                    }
                    if(button.classList.contains('prev')) {
                        this.minusSlide();
                    }
                });
    
                button.parentNode.previousElementSibling.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.slideIndex = 1;
                    this.showSlide(this.slideIndex);
                });
            });
        } catch (error) {}
    }
}