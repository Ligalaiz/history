const slides: NodeListOf<Element> = document.querySelectorAll('.slider__item');
const sliderPrevBtn: HTMLElement | null = document.getElementById('sliderPrevBtn');
const sliderNextBtn: HTMLElement | null = document.getElementById('sliderNextBtn');

let currentSlideIndex = 0;
const slidesCount = slides.length;

type CurrentIndextype = (val: number) => number;

const calcCurrentIndex: CurrentIndextype = (val) => val % slidesCount;

function directionTo(direction: 'to-left' | 'to-right'): void {
  slides[currentSlideIndex]?.classList.add(direction);

  slides[currentSlideIndex]?.addEventListener('Animation', (): void => {
    slides[currentSlideIndex]?.classList.remove(direction, 'active');
  });
}

function directionFrom(direction: 'from-left' | 'from-right'): void {
  slides[currentSlideIndex]?.classList.add(direction);

  slides[currentSlideIndex]?.addEventListener('Animation', (): void => {
    slides[currentSlideIndex]?.classList.remove(direction);
    slides[currentSlideIndex]?.classList.add('active');
  });
}

function handleNextClick(): void {
  directionTo('to-left');
  currentSlideIndex = calcCurrentIndex(currentSlideIndex + 1);
  directionFrom('from-left');
}

function handlePrevClick(): void {
  directionTo('to-right');
  currentSlideIndex = calcCurrentIndex(currentSlideIndex - 1);
  directionFrom('from-right');
}

sliderNextBtn?.addEventListener('click', handleNextClick);
sliderPrevBtn?.addEventListener('click', handlePrevClick);
