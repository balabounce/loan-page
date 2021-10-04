export default class FileDownload {
    constructor(button, fileURL) {
        this.buttons = document.querySelectorAll(button);
        this.fileURL = fileURL; 
    }
    

    render() {
        this.buttons.forEach((button, count) => {
            count++;
            button.setAttribute('data-number-page', count);
        });

        this.buttons = document.querySelectorAll('div[data-number-page]');

        this.buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                this.activePage =  document.getElementById(button.getAttribute('data-number-page'));
                event.stopPropagation();
                button.style.color = 'black';
                let link = document.createElement('a');
                link.setAttribute('href', this.fileURL);
                link.setAttribute('download', 'download');
                link.click();
                link.remove();
            });
            button.addEventListener('mouseover', () => {
                button.style.cursor = 'pointer';
                button.style.color = 'blue';
            });
            button.addEventListener('mouseout', () => {
                button.style.color = 'black';
            });
        });
    }
}