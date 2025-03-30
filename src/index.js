const { initializeBot } = require('./bot');
const config = require('./config');

const token = config.botToken;

async function startBot() {
  try {
    if (!token) {
      throw new Error('Токен не найден, возможно ошибка в .env.');
    }

    console.log('Бот запускается...');
    await initializeBot(token);
    console.log('Бот готов к работе!');
  } catch (error) {
    console.error('Ошибка при запуске бота:', error.message);
    process.exit(1);
  }
}

startBot();
