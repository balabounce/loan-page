
export default class VideoPlayer {
    constructor(openTriggers, closeTriggers, modal ) {
        this.openButtons = document.querySelectorAll(openTriggers);
        this.overlay = document.querySelector(modal); 
        this.closeButtons = document.querySelectorAll(closeTriggers);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    } 

    onPlayerStateChange(state) {
        if (state.data === 0) {
        this.openButtons.forEach(button => {
            if(button.querySelector('.closed') && this.activePlayer.nextElementSibling == button.parentElement){
                let tagClosedElem = button.querySelector('.closed');
                tagClosedElem.classList.remove('closed');
                let playerElement = button.parentElement;
                playerElement.style.opacity = 1;
                playerElement.style.webkitFilter  = 'none';
                button.innerHTML = this.buttonHTML;
                this.bindOpen();
            }
        });
        }
    }

    bindOpen() {
        this.openButtons.forEach(button => {
            if(!button.querySelector('.closed')){
                button.addEventListener('click', () => {
                    if (!this.player) {
                        this.path = button.getAttribute('data-url');
                        this.YTPlayer(this.path);
                    } else {
                        this.overlay.style.display = 'flex';
                        if (this.path !== button.getAttribute('data-url')) {
                            this.path = button.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});
                        }
                    }    
                    this.activePlayer = button.parentElement;
                    this.buttonHTML = button.innerHTML;
                    // this.onPlayerStateChange();
                });
            }
        });
    }

    bindClose() {
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                try {
                    this.overlay.style.display = 'none';
                    this.player.stopVideo();   
                } catch (error) {}
            });
        });
    }

    YTPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: url,
            events: {
                "onStateChange": this.onPlayerStateChange
            }
        });
        this.overlay.style.display = 'flex';
    }

    init() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        tag.classList.add('YTscript');
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        this.bindClose();
        this.bindOpen();
    }

}