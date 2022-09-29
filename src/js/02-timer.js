import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button'); // кнопка запуску таймеру
const currentDate = Date.now(); // поточна дата
let initDate = null; // вибрана дата
let timer = null;

const daysVal = document.querySelector('span[data-days]'); // значення днів
const hoursVal = document.querySelector('span[data-hours]'); // значення годин
const minutesVal = document.querySelector('span[data-minutes]'); // значення хвилин
const secondsVal = document.querySelector('span[data-seconds]'); // значення секунд

startBtn.addEventListener('click', onBtnStart); // кнопка запуску
startBtn.disabled = true; // кнопка  запуску не активна за замовчуванням

// задаємо налаштування календаря
const options = {
  enableTime: true, // Включает сборщик времени
  time_24hr: true, // Отображает указатель времени в 24-часовом режиме без выбора AM / PM, если он включен.
  defaultDate: new Date(), // Устанавливает начальную выбранную дату (даты).
  minuteIncrement: 1, // Регулирует шаг ввода минут (включая прокрутку)

  onClose(selectedDates) {
    // Функция, срабатывает каждый раз при закрытии календаря.
    initDate = selectedDates[0]; // вибрана дата користувачем = початковому значенню масива вибраних дат
    if (initDate > currentDate) {
      startBtn.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future'); // якщо дата в минулому, висвічується оповіщення
      // window.alert("Please choose a date in the future")
    }
  },
};

// ініціюємо календар flatpicker
const calendarFp = flatpickr('#datetime-picker', options);

// умова активації кнопки запуску таймеру
function onBtnStart() {
  timer = setInterval(() => {
    const currentDate = Date.now();
    let resultDays = initDate - currentDate; // рахуємо, скільки часу між датою яка вибрана та поточною
    daysVal.textContent = convertMs(resultDays).days; // виводимо кількість днів
    hoursVal.textContent = convertMs(resultDays).hours; // виводимо кількість годин
    minutesVal.textContent = convertMs(resultDays).minutes; // виводимо кількість хвилин
    secondsVal.textContent = convertMs(resultDays).seconds; // виводимо кількість секунд
    startBtn.disabled = true; // після запуску робить кнопку не активною
    calendarFp.input.setAttribute('disabled', 'disabled');

    // перевіряємо чи значення таймеру < 1 секунди, якщо так - зупиняємо таймер, очищуємо інтервал
    // виводимо повідомлення про завершення роботи таймеру.
    if (resultDays < 1000) {
      clearInterval(timer);
      calendarFp.input.removeAttribute('disabled');
      Notify.success('Timer is finish!');
    }
  }, 1000);
}

// створюємо функцію, яка отримує число і якщо число складається з одного символу, додає перед ним 0
// результат Math.floor() обертаємо в цю функцію
function pad(value) {
  return String(value).padStart(2, '0');

  // 0 -> 00
  // 1 -> 01
}

// функція конвертації секунд в хвилини, години, дні
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}