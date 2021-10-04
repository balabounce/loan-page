export default class Diff {
    constructor({container=null, button=null} = {}) {
        this.page = document.querySelector(container);
        this.button = document.querySelector(button);
        this.count = 0;
    }

    clear() {
        [...this.page.children].forEach(card => {
            if(card != this.page.firstElementChild && card != this.page.lastElementChild) {
                card.style.display = 'none';
            }
            card.classList.add('animated', 'fadeIn');
        });
    }

    bindAdd(n) {
        this.button.addEventListener('click', () => {
            this.count++;
            for(let i = 0; i <([...this.page.children].length) ; i++) {
                if(this.page.children[i].style.display == 'none') {
                    this.page.children[i].style.display = 'flex';
                    break;
                } 
            }
            if(this.count == n) {
                this.page.lastElementChild.classList.remove('fadeIn');
                this.page.lastElementChild.classList.add('fadeOut');
                setTimeout(() => {
                    this.page.lastElementChild.style.display = 'none';
                }, 1000);
            }
        });
    }

    render(n) {
        try {
            this.clear();
            this.bindAdd(n);
        } catch (error) {}
    }
}