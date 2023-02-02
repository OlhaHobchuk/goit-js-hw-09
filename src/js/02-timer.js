import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
timerField: document.querySelector(".timer"),
field: document.querySelectorAll(".field"),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  datePicker: document.querySelector('#datetime-picker'),
};
console.log(refs.field)
let choosedDate = null;
let currentTime = null;

refs.startButton.disabled = true;
refs.startButton.addEventListener('click', onStartTimerButtonClick);
refs.timerField.style.display = "flex";
refs.timerField.style.columnGap = "30px";
refs.timerField.style.fontSize = "30px";
console.log(refs.timerField)

// for (let i = 0; i < refs.field.length; i += 1) {
//   refs.field[i].style.display = "flex";
//   refs.field[i].style.flexDirection = "column";
//   refs.field[i].style.alignItems = "center";

// }

refs.field.forEach((element) => {
  element.style.display = "flex";
  element.style.flexDirection = "column";
  element.style.alignItems = "center";
})


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        choosedDate = selectedDates[0];
      if (selectedDates[0] < options.defaultDate) {
          Notiflix.Notify.warning("Please choose a date in the future");
      } else if (selectedDates[0] > options.defaultDate) {
        refs.startButton.disabled = false;
        refs.datePicker.disabled = true; 
      }
  },
};

flatpickr('#datetime-picker', options);

function onStartTimerButtonClick(event) {
    
   const timerId = setInterval(() => {
        currentTime = Date.now();
        let timeLeft = choosedDate - currentTime;
        const { days, hours, minutes, seconds } = convertMs(timeLeft)
       console.log(`${days}::${hours}::${minutes}::${seconds}`);
       
       refs.days.textContent = `${addLeadingZero(days)}`;
        refs.hours.textContent = `${addLeadingZero(hours)}`;
        refs.minutes.textContent = `${addLeadingZero(minutes)}`;
       refs.seconds.textContent = `${addLeadingZero(seconds)}`;
       
       if (timeLeft < 1000 || timeLeft < 0) {
            clearInterval(timerId);
          }

        
}, 1000)
   
}

 
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };

}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}