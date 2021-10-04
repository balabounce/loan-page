export default class Mask {
    constructor({selector=null} = {}) {
        this.inputs = document.querySelectorAll(selector);
    }

    setCursorPosition (pos, elem)  {
        elem.focus();

        if(elem.setSelectionRange) {
            elem.setSelectionRange(pos,pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    createMask(event) {
        let matrix = '+1 (___) ___-____',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.input.value.replace(/\D/g, '');

        if (def.length >= val.length) {
            val = def;
        }

        this.input.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ?val.charAt(i++) : i >= val.length ? '' : a;
        });
        if (event.type === 'blur') {
            if (this.input.value.length == 2) {
                this.input.value = '';
            } 
        } else {
            this.setCursorPosition(this.input.value.length, this.input);
        }
    }

    render() {
        this.inputs.forEach(input => {
            this.input = input;
            this.input.addEventListener('input', () => {
                this.createMask({type:'input'});
            });
            this.input.addEventListener('focus', () => {
                this.createMask({type:'focus'});
            });
            this.input.addEventListener('blur', () => {
                this.createMask({type:'blur'});
            });
        });
    }
}