const chartPrevBtn: HTMLElement | null = document.getElementById('chartPrevBtn');
const chartNextBtn: HTMLElement | null = document.getElementById('chartNextBtn');
const chart: HTMLElement | null = document.getElementById('chart');
const chartItems: NodeListOf<HTMLElement> = document.querySelectorAll('.chart__item');

let currentDeg = 0;

function handleChartNextBtnClick() {
  currentDeg += 60;
  if (chart) chart.style.transform = `translate(-50%, -50%) rotate(${currentDeg}deg)`;
  if (chartItems) {
    chartItems.forEach((el: HTMLElement) => {
      el.style.transform = `translate(-50%, -50%) rotate(${currentDeg * -1}deg)`;
    });
  }
}

function handleChartPrevBtnClick() {
  currentDeg -= 60;
  if (chart) chart.style.transform = `translate(-50%, -50%) rotate(${currentDeg}deg)`;

  if (chartItems) {
    chartItems.forEach((el: HTMLElement) => {
      el.style.transform = `translate(-50%, -50%) rotate(${currentDeg * -1}deg)`;
    });
  }
}

chartPrevBtn?.addEventListener('click', () => {
  handleChartNextBtnClick();
});

chartNextBtn?.addEventListener('click', () => {
  handleChartPrevBtnClick();
});
