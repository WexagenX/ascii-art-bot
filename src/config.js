require('dotenv').config();

if (!process.env.BOT_TOKEN) {
  throw new Error('Токен не найден, возможно ошибка в .env');
}

module.exports = {
  botToken: process.env.BOT_TOKEN,
};
