export default class CheckText {
    constructor({selector=null} = {}) {
        this.inputs = document.querySelectorAll(selector);
    }

    render() {
        this.inputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9@.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }
}