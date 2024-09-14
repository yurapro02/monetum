

// Получение даты и времени
function updateDate() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString('ru-RU', {day:'numeric', month: 'long'});
    const day = now.toLocaleDateString('ru-RU', {weekday: 'long'});

    const formatted = `${date}, ${day}`;

    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = formatted;

}

setInterval(updateDate, 1000);
updateDate();



// Получение погоды
const defaultCity = 'Краснодар';
function getWeather() {
    const city = localStorage.getItem('city') || defaultCity;
    localStorage.setItem('city', city);


    const apiKey = 'b4221c31150cad88ea9ff8a2a61a3d3e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const temp = data.main.temp;
            const description = data.weather[0].description;
            document.getElementById('weather-info').innerHTML = `${city} <span class="temp">${temp}</span>°C, ${description}`;
        })
        .catch(() => {
            document.getElementById('weather-info').textContent = 'Город не найден';
        });
}


// Смена фона
const images = {
    night: 'images/01.jpg',
    morning: 'images/02.jpg',
    afternoon: 'images/03.jpg',
    evening: 'images/04.jpg'
};

function updateBackground(){
    const hour = new Date().getHours();
    let background;


    if (hour >= 0 && hour < 6) {
        background = images.night;
        document.body.style.color = 'white'
    } else if (hour >= 6 && hour < 12) {
        background = images.morning;
        document.body.style.color = 'wheat'
    } else if (hour >= 12 && hour < 18) {
        background = images.afternoon;
        document.body.style.color = 'black'
    } else {
        background = images.evening;
        document.body.style.color = 'wheat'
    }

    document.body.style.backgroundImage = `url(${background})`;
}

setInterval(updateBackground, 3600000);
updateBackground();


function eventHandler(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Нельзя делать пусто');
        return;
    }

    const taskInfo = document.getElementById('task-div');
    taskInfo.style.display = 'grid';

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const input = document.createElement('input');
    input.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = taskText;

    const button = document.createElement('button');
    button.className = 'delete-btn';
    button.textContent = '✖';
    button.onclick = () => taskItem.remove();

    // Обработчик для чекбокса
    input.addEventListener('change', () => {
        if (input.checked) {
            span.style.textDecoration = 'line-through';
            alert('Отличная работа');
        }
    });

    taskItem.appendChild(input);
    taskItem.appendChild(span);
    taskItem.appendChild(button);
    taskInfo.appendChild(taskItem);
}


document.addEventListener('DOMContentLoaded', () => {
    const deleteSuccessButton = document.querySelector('.delete-success');
    const taskDiv = document.getElementById('task-div');

    deleteSuccessButton.addEventListener('click', () => {
        const checkboxes = taskDiv.querySelectorAll('.task-item input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkbox.closest('.task-item').remove();
            }
        });
    });
});


window.onload = function() {
    getWeather();
};

