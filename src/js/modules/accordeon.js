export default class Accord {
    constructor(buttonSelector, textSelector){
        this.buttons = document.querySelectorAll(buttonSelector);
        this.text = textSelector;
    }

    bindClick() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                let btnElem = button.parentElement;
                let msgElem =  btnElem.nextElementSibling ? btnElem.nextElementSibling : null;
                if(msgElem.classList.contains(this.text) && !msgElem.classList.contains('fadeIn')) {
                    msgElem.classList.remove('animated','fadeOut');
                    msgElem.style.display = 'block';
                    msgElem.classList.add('animated', 'fadeIn');
                    
                } else if(msgElem.classList.contains('fadeIn')) {
                        msgElem.classList.remove('fadeIn');
                        msgElem.classList.add('fadeOut');
                        setTimeout(() => {
                            msgElem.style.display = 'none';
                        }, 500);
                    }
            });
        });
    }

    render() {
        this.bindClick();
    }
}