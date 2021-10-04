export default class Form {
    constructor({formSelector=null, inputsSelector=null, uploadSelector=null, maskSelector=null} = {}) {
        this.forms = document.querySelectorAll(formSelector);
        this.inputs = document.querySelectorAll(inputsSelector);
        this.uploads = document.querySelectorAll(uploadSelector);
        this.mask = document.querySelector(maskSelector);
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
        };
    
        this.path = {
            question: 'assets/question.php'
        };
  
    }

    async postData (url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    }
    
    clearInputs () {
        this.inputs.forEach(item => {
            item.value = '';
        });
    }

    uploadListener() {
        this.uploads.forEach(item => {
            item.addEventListener('input', () => {
                console.log(item.files[0]);
                let dots;
                const arr = item.files[0].name.split('.');
    
                arr[0].length > 6 ? dots = "..." : dots = '.';
                const name = arr[0].substring(0, 6) + dots + arr[1];
                item.previousElementSibling.textContent = name;
            });
        });
    }

    formListener() {
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
    
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.parentNode.appendChild(statusMessage);
    
                item.classList.add('animated', 'fadeOutUp');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
    
                let statusImg = document.createElement('img');
                statusImg.setAttribute('src', this.message.spinner);
                statusImg.classList.add('animated', 'fadeInUp');
                statusMessage.appendChild(statusImg);
    
                let textMessage = document.createElement('div');
                textMessage.textContent = this.message.loading;
                statusMessage.appendChild(textMessage);
    
                const formData = new FormData(item);
                let api = this.path.question;
    
                this.postData(api, formData)
                    .then(res => {
                        console.log(res);
                        statusImg.setAttribute('src', this.message.ok);
                        textMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusImg.setAttribute('src', this.message.fail);
                        textMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                            item.style.display = 'block';
                            item.classList.remove('fadeOutUp');
                            item.classList.add('fadeInUp');
                        }, 5000);
                    });
            });
        });
    }

    init() {
        this.formListener();
        this.uploadListener();
    }
}