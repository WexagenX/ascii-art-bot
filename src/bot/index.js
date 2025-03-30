const TelegramBot = require('node-telegram-bot-api');
const { setupHandlers } = require('./handlers');

function initializeBot(token) {
  const bot = new TelegramBot(token, { polling: true });

  bot.on('polling_error', (error) => {
    console.error('Polling ошибка:', error.message);
  });

  setupHandlers(bot);

  console.log('Бот успешно инициализирован с polling');

  return bot;
}

module.exports = { initializeBot };
