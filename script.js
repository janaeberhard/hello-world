const AUTO_DELAY = 6000;

const slides = Array.from(document.querySelectorAll('.slide'));
const timelineContainer = document.querySelector('.timeline');
const controlButtons = Array.from(document.querySelectorAll('.control'));

let currentIndex = 0;
let autoTimer = null;

const timelineButtons = slides.map((slide, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('role', 'tab');
  button.setAttribute('aria-label', `Show slide ${index + 1}`);
  button.dataset.index = String(index);
  button.setAttribute('aria-selected', 'false');

  const progress = document.createElement('span');
  progress.className = 'progress';
  button.appendChild(progress);

  button.addEventListener('click', () => {
    if (currentIndex === index) return;
    activateSlide(index);
  });

  timelineContainer?.appendChild(button);
  return button;
});

function resetProgress(button) {
  const progress = button.querySelector('.progress');
  if (!progress) return;
  progress.style.transition = 'none';
  progress.style.width = '0%';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progress.style.transition = `width ${AUTO_DELAY}ms linear`;
      progress.style.width = '100%';
    });
  });
}

function clearProgress(button) {
  const progress = button.querySelector('.progress');
  if (!progress) return;
  progress.style.transition = 'none';
  progress.style.width = '0%';
}

function activateSlide(nextIndex) {
  const previousSlide = slides[currentIndex];
  const nextSlide = slides[nextIndex];
  if (!nextSlide || previousSlide === nextSlide) return;

  previousSlide.classList.remove('active');
  nextSlide.classList.add('active');

  timelineButtons[currentIndex]?.setAttribute('aria-selected', 'false');
  clearProgress(timelineButtons[currentIndex]);

  timelineButtons[nextIndex]?.setAttribute('aria-selected', 'true');
  resetProgress(timelineButtons[nextIndex]);

  currentIndex = nextIndex;
  restartAutoPlay();
}

function showNext() {
  const nextIndex = (currentIndex + 1) % slides.length;
  activateSlide(nextIndex);
}

function showPrevious() {
  const previousIndex = (currentIndex - 1 + slides.length) % slides.length;
  activateSlide(previousIndex);
}

function restartAutoPlay() {
  if (autoTimer) {
    clearTimeout(autoTimer);
  }
  autoTimer = setTimeout(showNext, AUTO_DELAY);
}

controlButtons.forEach((button) => {
  const direction = button.dataset.direction;
  if (direction === 'next') {
    button.addEventListener('click', showNext);
  } else if (direction === 'prev') {
    button.addEventListener('click', showPrevious);
  }
});

if (slides.length > 0) {
  slides[0].classList.add('active');
  timelineButtons[0]?.setAttribute('aria-selected', 'true');
  resetProgress(timelineButtons[0]);
  restartAutoPlay();
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (autoTimer) {
      clearTimeout(autoTimer);
      autoTimer = null;
    }
  } else {
    restartAutoPlay();
  }
});
