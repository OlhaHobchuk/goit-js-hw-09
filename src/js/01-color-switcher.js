function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

const buttonStart = document.querySelector("button[data-start]")
const buttonStop = document.querySelector("button[data-stop]")
const bodyEl = document.querySelector('body');

buttonStart.addEventListener('click', onButtonStartClick);
buttonStop.addEventListener('click', onButtonStopClick);

function onButtonStartClick(event) {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
        buttonStart.disabled = true;
    }, 1000)
}

function onButtonStopClick(event) {
    clearInterval(timerId);
    buttonStart.disabled = false;
 }