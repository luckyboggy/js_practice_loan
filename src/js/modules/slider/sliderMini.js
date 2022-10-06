import Slider from './slider';

export default class SliderMini extends Slider {
    constructor(conteiner, next, prev, activeClass, animate, autoplay) {
        super(conteiner, next, prev, activeClass, animate, autoplay);
    }

    decorazeSlide() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }


        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls').style.opacity = '1';
        }
    }

    nextSlide() {
        // Перемещение кнопок в конец
        if (this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]); // Первый слайд
            this.container.appendChild(this.slides[1]); // Кнопка
            this.container.appendChild(this.slides[2]); // Кнопка
            this.decorazeSlide();
        } else if (this.slides[1].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]); // Первый слайд
            this.container.appendChild(this.slides[1]); // Кнопка
            this.decorazeSlide();
        } else {
            // Переносит первый элемент псевдамассива в конец контейнера
            this.container.appendChild(this.slides[0]);
            this.decorazeSlide();
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    let activeSlide = this.slides[i];
                    // Переносит последний элемент псевдомассива перед первым элементом
                    this.container.insertBefore(activeSlide, this.slides[0]);
                    this.decorazeSlide();
                    break;
                }
            }
        });
    }


    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-item: flex-start;
        `;

            this.bindTriggers();
            this.decorazeSlide();

            let autoSlide = setInterval(() => {
                this.nextSlide();
            }, 5000);

            if (this.autoplay) {
                autoSlide;
            }

            this.slides[0].parentNode.addEventListener('mouseover', () => {
                clearInterval(autoSlide);
                console.log('h')
            });
        } catch (error) {

        }

    }
}