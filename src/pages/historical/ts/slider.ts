const slides: NodeListOf<Element> = document.querySelectorAll('.slider__item');
const sliderPrevBtn: HTMLElement | null = document.getElementById('sliderPrevBtn');
const sliderNextBtn: HTMLElement | null = document.getElementById('sliderNextBtn');

let isEnabled: boolean = true;
let currentSlideIndex = 0;
const slidesCount = slides.length;

type CurrentIndexType = (val: number) => void;

const calcCurrentIndex: CurrentIndexType = (val): void => {
  currentSlideIndex = (val + slidesCount) % slidesCount;
};

function hideItem(direction: 'to-left' | 'to-right'): void {
  isEnabled = false;
  slides[currentSlideIndex]?.classList.add(direction);

  slides[currentSlideIndex]?.addEventListener('animationend', (e) => {
    const target = e.target as HTMLElement;

    target?.classList.remove(direction, 'active');
  });
}

function showItem(direction: 'from-left' | 'from-right'): void {
  console.log(direction)
  slides[currentSlideIndex]?.classList.add(direction, 'next');

  slides[currentSlideIndex]?.addEventListener('animationend', (e) => {
    const target = e.target as HTMLElement;

    target?.classList.remove(direction, 'next');
    target?.classList.add('active');
    isEnabled = true;
  });
}

function handleNextClick(): void {
  hideItem('to-left');
  calcCurrentIndex(currentSlideIndex + 1);
  showItem('from-right');
}

function handlePrevClick(): void {
  hideItem('to-right');
  calcCurrentIndex(currentSlideIndex - 1);
  showItem('from-left');
}

sliderNextBtn?.addEventListener('click', () => {
  if (isEnabled) handleNextClick();
});

sliderPrevBtn?.addEventListener('click', () => {
  if (isEnabled) handlePrevClick();
});
