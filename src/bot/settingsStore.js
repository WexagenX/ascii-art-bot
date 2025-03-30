const fs = require('fs');
const path = require('path');

const settingsPath = path.join(__dirname, 'settings.json');
let userSettings = {};

// Загружаем настройки при запуске
function loadSettings() {
  if (fs.existsSync(settingsPath)) {
    try {
      const data = fs.readFileSync(settingsPath, 'utf8');
      userSettings = JSON.parse(data);
      console.log('Настройки пользователей загружены из файла.');
    } catch (error) {
      console.error('Не удалось загрузить настройки:', error.message);
    }
  }
}

// Сохраняем настройки
function saveSettings() {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(userSettings, null, 2));
  } catch (error) {
    console.error('⚠️ Не удалось сохранить настройки:', error.message);
  }
}

// Получить настройки по chatId
function getUserSettings(chatId) {
  if (!userSettings[chatId]) {
    userSettings[chatId] = {
      maxWidth: 60, // по умолчанию — оптимально для мобильного
      charset: '@%#*+=-:. ',
    };
    saveSettings();
  }
  return userSettings[chatId];
}

// Обновить настройки
function updateUserSettings(chatId, newSettings) {
  userSettings[chatId] = {
    ...getUserSettings(chatId),
    ...newSettings,
  };
  saveSettings();
}

module.exports = {
  loadSettings,
  getUserSettings,
  updateUserSettings,
};
