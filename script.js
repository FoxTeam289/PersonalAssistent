// Профиль пользователя
document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const interests = document.getElementById('interests').value;

    const userProfile = { name, age, interests };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    alert('Профиль сохранен!');
});

// Загрузка профиля пользователя при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (storedProfile) {
        document.getElementById('name').value = storedProfile.name;
        document.getElementById('age').value = storedProfile.age;
        document.getElementById('interests').value = storedProfile.interests;
    }

    // Загрузка истории настроений при загрузке страницы
    const storedMoods = JSON.parse(localStorage.getItem('moodHistory')) || [];
    const moodHistory = document.getElementById('moodHistory');
    storedMoods.forEach(moodData => {
        addMoodToHistory(moodData, false);
    });

    // Установка напоминаний
    setDailyReminder();
});

// Сохранение настроения в локальном хранилище
document.getElementById('moodForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const mood = document.getElementById('mood').value;
    const activityLevel = document.getElementById('activity-level').value;
    const sleepQuality = document.getElementById('sleep-quality').value;
    const stressLevel = document.getElementById('stress-level').value;
    const moodData = {
        mood,
        activityLevel,
        sleepQuality,
        stressLevel,
        timestamp: new Date().toLocaleString()
    };
    addMoodToHistory(moodData);
    provideRecommendations(moodData);

    let storedMoods = JSON.parse(localStorage.getItem('moodHistory')) || [];
    storedMoods.push(moodData);
    localStorage.setItem('moodHistory', JSON.stringify(storedMoods));
});

function addMoodToHistory(moodData, save = true) {
    const moodHistory = document.getElementById('moodHistory');
    const moodEntry = document.createElement('div');
    moodEntry.textContent = `Настроение: ${moodData.mood}, Активность: ${moodData.activityLevel}, Сон: ${moodData.sleepQuality}, Стресс: ${moodData.stressLevel} - ${moodData.timestamp}`;
    moodHistory.appendChild(moodEntry);

    if (save) {
        let storedMoods = JSON.parse(localStorage.getItem('moodHistory')) || [];
        storedMoods.push(moodData);
        localStorage.setItem('moodHistory', JSON.stringify(storedMoods));
    }
}

function provideRecommendations(moodData) {
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = '';

    let exerciseRecommendation = '';
    let resourceLink = '';
    switch(moodData.mood) {
        case 'happy':
            exerciseRecommendation = 'Продолжайте делать то, что приносит вам радость! Попробуйте поделиться своим счастьем с другими.';
            resourceLink = '<a href="https://www.example.com/happy-tips" target="_blank">Счастливые советы</a>';
            break;
        case 'sad':
            exerciseRecommendation = 'Попробуйте заняться йогой или медитацией, чтобы поднять настроение. Прогулка на свежем воздухе также может помочь.';
            resourceLink = '<a href="https://www.example.com/sad-tips" target="_blank">Советы для грустных</a>';
            break;
        case 'stressed':
            exerciseRecommendation = 'Попробуйте дыхательные упражнения или медитацию. Физические упражнения, такие как бег, также могут снизить уровень стресса.';
            resourceLink = '<a href="https://www.example.com/stress-tips" target="_blank">Советы для снижения стресса</a>';
            break;
        case 'calm':
            exerciseRecommendation = 'Отлично! Попробуйте поддерживать это состояние с помощью регулярной медитации или занятий, которые вам нравятся.';
            resourceLink = '<a href="https://www.example.com/calm-tips" target="_blank">Советы для спокойствия</a>';
            break;
        default:
            exerciseRecommendation = 'Попробуйте что-нибудь расслабляющее, например, чтение книги или прослушивание музыки.';
            resourceLink = '<a href="https://www.example.com/general-tips" target="_blank">Общие советы</a>';
    }

    const recommendationEntry = document.createElement('div');
    recommendationEntry.innerHTML = `${exerciseRecommendation} ${resourceLink}`;
    recommendations.appendChild(recommendationEntry);
}

// Установка ежедневного напоминания
function setDailyReminder() {
    const reminderTime = new Date();
    reminderTime.setHours(20, 0, 0); // Установить на 20:00

    const now = new Date();
    let timeToReminder = reminderTime - now;
    if (timeToReminder < 0) {
        timeToReminder += 24 * 60 * 60 * 1000; // Добавить один день
    }

    setTimeout(function() {
        alert('Не забудьте заполнить форму настроения и выполнить рекомендованные упражнения!');
        setDailyReminder(); // Установить следующее напоминание
    }, timeToReminder);
}

// Добавление сообщения в чат
document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const message = document.getElementById('message').value;
    if (message.trim() !== '') {
        const messages = document.getElementById('messages');
        const messageEntry = document.createElement('div');
        messageEntry.textContent = message;
        messages.appendChild(messageEntry);
        document.getElementById('message').value = '';
    }
});
function provideRecommendations(moodData) {
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = '';

    let exerciseRecommendation = '';
    let resourceLink = '';
    let additionalTips = '';

    switch(moodData.mood) {
        case 'happy':
            exerciseRecommendation = 'Продолжайте делать то, что приносит вам радость! Попробуйте поделиться своим счастьем с другими.';
            resourceLink = '<a href="https://vk.com/wall-121440172_108400" target="_blank">Счастливые советы</a>';
            additionalTips = 'Помните, что делая других счастливыми, вы также укрепляете свое собственное счастье.';
            break;
        case 'sad':
            exerciseRecommendation = 'Попробуйте заняться йогой или медитацией, чтобы поднять настроение. Прогулка на свежем воздухе также может помочь.';
            resourceLink = '<a href="https://www.mn.ru/smart/imej-100-druzej-uchenye-vyyasnili-kak-blizkoe-obshhenie-s-lyud-mi-vliyaet-na-uroven-schast-ya-uspevaemost-i-zarabotok" target="_blank">Советы для грустных</a>';
            additionalTips = 'Разговор с другом или близким человеком может помочь вам почувствовать себя лучше.';
            break;
        case 'stressed':
            exerciseRecommendation = 'Попробуйте дыхательные упражнения или медитацию. Физические упражнения, такие как бег, также могут снизить уровень стресса.';
            resourceLink = '<a href="https://journal.tinkoff.ru/list/planirovanie/" target="_blank">Советы для снижения стресса</a>';
            additionalTips = 'Попробуйте структурировать свой день и выделить время для отдыха и релаксации.';
            break;
        case 'calm':
            exerciseRecommendation = 'Отлично! Попробуйте поддерживать это состояние с помощью регулярной медитации или занятий, которые вам нравятся.';
            resourceLink = '<a href="https://netology.ru/blog/03-2022-self-help" target="_blank">Советы для спокойствия</a>';
            additionalTips = 'Продолжайте делать то, что помогает вам поддерживать это состояние. Возможно, это чтение книги или прослушивание музыки.';
            break;
        default:
            exerciseRecommendation = 'Попробуйте что-нибудь расслабляющее, например, чтение книги или прослушивание музыки.';
            resourceLink = '<a href="https://vk.com/@dayvinchik-sila-privychek-kak-malenkie-izmeneniya-mogut-privesti-k-bols" target="_blank">Общие советы</a>';
            additionalTips = 'Иногда небольшие изменения в рутине могут привести к значительным улучшениям в настроении.';
    }

    const recommendationEntry = document.createElement('div');
    recommendationEntry.innerHTML = `${exerciseRecommendation} ${resourceLink} <p>${additionalTips}</p>`;
    recommendations.appendChild(recommendationEntry);
}
// Дневник благодарностей
document.getElementById('gratitudeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const gratitude = document.getElementById('gratitude').value;
    const gratitudeData = {
        gratitude,
        timestamp: new Date().toLocaleString()
    };
    addGratitudeToHistory(gratitudeData);
});

function addGratitudeToHistory(gratitudeData, save = true) {
    const gratitudeHistory = document.getElementById('gratitudeHistory');
    const gratitudeEntry = document.createElement('div');
    gratitudeEntry.textContent = `${gratitudeData.gratitude} - ${gratitudeData.timestamp}`;
    gratitudeHistory.appendChild(gratitudeEntry);

    if (save) {
        let storedGratitudes = JSON.parse(localStorage.getItem('gratitudeHistory')) || [];
        storedGratitudes.push(gratitudeData);
        localStorage.setItem('gratitudeHistory', JSON.stringify(storedGratitudes));
    }
}

// Цели и достижения
document.getElementById('goalForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const goal = document.getElementById('goal').value;
    const goalData = {
        goal,
        timestamp: new Date().toLocaleString()
    };
    addGoalToList(goalData);
});

function addGoalToList(goalData, save = true) {
    const goalList = document.getElementById('goalList');
    const goalEntry = document.createElement('div');
    goalEntry.textContent = `Цель: ${goalData.goal} - ${goalData.timestamp}`;
    goalList.appendChild(goalEntry);

    if (save) {
        let storedGoals = JSON.parse(localStorage.getItem('goalList')) || [];
        storedGoals.push(goalData);
        localStorage.setItem('goalList', JSON.stringify(storedGoals));
    }
}

// Загрузка истории при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка истории благодарностей
    const storedGratitudes = JSON.parse(localStorage.getItem('gratitudeHistory')) || [];
    storedGratitudes.forEach(gratitudeData => {
        addGratitudeToHistory(gratitudeData, false);
    });

    // Загрузка списка целей
    const storedGoals = JSON.parse(localStorage.getItem('goalList')) || [];
    storedGoals.forEach(goalData => {
        addGoalToList(goalData, false);
    });
});