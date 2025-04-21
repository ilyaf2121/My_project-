// Получение ссылок на элементы в HTML
const lotoNumbersDiv = document.getElementById('lotoNumbers');
const strongNumberDiv = document.getElementById('strongNumber');
const generateBtn = document.getElementById('generateBtn');

// Функция для генерации случайного числа в диапазоне от min до max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для генерации набора уникальных чисел в заданном диапазоне
function generateUniqueNumbers(count, max) {
    const numbers = new Set(); // Использование Set гарантирует уникальность
    while (numbers.size < count) {
        numbers.add(getRandomNumber(1, max));
    }
    return Array.from(numbers).sort((a, b) => a - b); // Преобразование в массив и сортировка
}

// Основная функция для проведения розыгрыша Лото
function generateLotoDraw() {
    // Генерация 6 чисел от 1 до 37
    const mainNumbers = generateUniqueNumbers(6, 37);

    // Генерация одного сильного числа от 1 до 7
    const strongNumber = getRandomNumber(1, 7);

    // Отображение чисел на странице
    displayNumbers(mainNumbers, strongNumber);
}

// Функция для отображения чисел в HTML
function displayNumbers(mainNumbers, strongNumber) {
    // Очистка старых чисел перед отображением новых (на всякий случай)
    lotoNumbersDiv.innerHTML = '';
    // strongNumberDiv.textContent = strongNumber; // Отображение сильного числа (обновляем существующий)

    // Создание и добавление кругов для основных чисел
    mainNumbers.forEach(number => {
        const numberCircle = document.createElement('div');
        numberCircle.classList.add('number-circle');
        numberCircle.textContent = number;
        lotoNumbersDiv.appendChild(numberCircle);
    });

     // Убедиться, что круг для сильного числа существует и содержит число
     // (существующий HTML-код уже создает его, просто обновляем текст)
     // Эту строку можно изменить, если структура HTML меняется
     const existingStrongCircle = document.getElementById('strongNumber');
     if(existingStrongCircle) {
         existingStrongCircle.textContent = strongNumber;
     } else {
          // Создание элемента, если он не существует - менее вероятно с текущим HTML
         const strongCircle = document.createElement('div');
         strongCircle.classList.add('number-circle', 'strong');
         strongCircle.id = 'strongNumber'; // Убедиться, что у него есть ID для будущих ссылок
         strongCircle.textContent = strongNumber;
         // Нужно найти, куда его добавить на странице, например, в strong-number-container
         const strongContainer = document.querySelector('.strong-number-container');
         if (strongContainer) {
             // Очистить старое содержимое при необходимости
             strongContainer.innerHTML = '<span>Сильное число:</span>'; // Добавляет надпись заново
             strongContainer.appendChild(strongCircle);
         }
     }
}


// Добавление слушателя событий на кнопку "Новый розыгрыш"
generateBtn.addEventListener('click', generateLotoDraw);

// Создание первоначального розыгрыша при загрузке страницы
generateLotoDraw();
