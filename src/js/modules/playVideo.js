export default class VideoPlayer {
    constructor(triggers, popup) {
        this.btns = document.querySelectorAll(triggers);
        this.popup = document.querySelector(popup);
        this.close = this.popup.querySelector('.close');
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (document.querySelector('iframe#frame')) {
                    this.popup.style.display = 'flex';
                } else {
                    const path = btn.getAttribute('data-url');
                    this.createPlayer(path);
                }

            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.popup.style.display = 'none';
            this.player.pauseVideo();
            console.log('Huinya')
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`
        });
        this.popup.style.display = 'flex';
    }

    init() {
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


        this.bindTriggers();
        this.bindCloseBtn();

    }
}