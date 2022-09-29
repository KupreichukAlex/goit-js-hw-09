// - задана функція рандомного вибору кольорів
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

// - знаходимо кнопки в документі
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyStyle = document.querySelector('body')

// - задаємо початкове положення таймера
let timerId = null;

// - додаємо слухачі на кліки по кнопках
btnStart.addEventListener('click', onBtnClickStart);
btnStop.addEventListener('click', onBtnClickStop);

// - запускаємо інтервал зміни кольору при кліку на кнопку
// - змінюємо колір фону за допомогою виклику функції рандомного вибору кольорів
// - деактивуємо кнопку запуску після кліку на неї активуємо кнопку стоп
function onBtnClickStart(){
    timerId = setInterval(() => {
        const onChangeBgColor = getRandomHexColor();
        bodyStyle.style.backgroundColor = onChangeBgColor;
        }, 1000);
        btnStart.disabled = true;   
        btnStop.disabled = false;  
}

// - перевіряємо чи запущений таймер
// - і при кліку на кнопку стоп - виводимо в консоль останнє значення кольору
// - робимо кнопку старт знову активною а кнопку стоп навпаки
function onBtnClickStop(){
    if (timerId !== null) {
        clearInterval(timerId);
        btnStart.disabled = false;
        btnStop.disabled = true;
        console.log(`Після ${timerId} зупинки таймеру колір фону: ${bodyStyle.style.backgroundColor}`)
    }
}

