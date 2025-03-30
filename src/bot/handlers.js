const { botToken } = require('../config');
const { getUserSettings, updateUserSettings } = require('./settingsStore');
const { getStartKeyboard, getSettingsKeyboard, getHelpMessage } = require('./ui');
const { imageToAscii, asciiToImage } = require('../utils/asciiConverter');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Храним пути к последним файлам на chatId
const lastFiles = {};

// функции кнопок
function setupHandlers(bot) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Привет! Отправь мне изображение — я превращу его в ASCII.`, getStartKeyboard());
  });

  bot.onText(/^\/settings$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Настройки ASCII:', getSettingsKeyboard());
  });

  bot.onText(/^\/help$/, (msg) => {
    const help = getHelpMessage();
    bot.sendMessage(msg.chat.id, help.text, help.options);
  });

bot.onText(/^\/charset (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const input = match[1];
  const uniqueChars = [...new Set(input.split(''))].join('');

  if (uniqueChars.length < 2) {
    return bot.sendMessage(chatId, 'Укажи минимум 2 уникальных символа.');
  }

  updateUserSettings(chatId, { charset: uniqueChars });

  bot.sendMessage(chatId, `Новый набор символов установлен:\n\`${uniqueChars}\``, {
    parse_mode: 'Markdown',
  });
});


  bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === 'open_settings') {
      return bot.sendMessage(chatId, 'Настройки ASCII:', getSettingsKeyboard());
    }

    if (data === 'open_help') {
      const help = getHelpMessage();
      return bot.sendMessage(chatId, help.text, help.options);
    }

    if (data === 'show_jpg' && lastFiles[chatId]?.jpg) {
      return bot.sendPhoto(chatId, fs.createReadStream(lastFiles[chatId].jpg));
    }

    if (data.startsWith('width_')) {
      const width = parseInt(data.split('_')[1], 10);
      const limitedWidth = Math.min(width, 70);
      updateUserSettings(chatId, { maxWidth: limitedWidth });
      return bot.sendMessage(chatId, `Установлена ширина: ${limitedWidth}`);
    }

    if (data.startsWith('charset_')) {
      let charset = '@%#*+=-:. ';
      if (data === 'charset_light') charset = ' .:-=+*#%@';
      if (data === 'charset_dense') charset = '@#&$%8XO*+:. ';
      updateUserSettings(chatId, { charset });
      return bot.sendMessage(chatId, 'Обновлён набор символов.');
    }

    bot.answerCallbackQuery(query.id);
  });

  // Обработка фото
  bot.on('photo', async (msg) => {
    const chatId = msg.chat.id;
    const photo = msg.photo[msg.photo.length - 1];

    try {
      const file = await bot.getFile(photo.file_id);
      const fileUrl = `https://api.telegram.org/file/bot${botToken}/${file.file_path}`;
      const response = await fetch(fileUrl);
      const buffer = await response.buffer();

      const tmpDir = path.join(__dirname, '..', 'tmp');
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

      const imagePath = path.join(tmpDir, `input-${chatId}.jpg`);
      const txtPath = path.join(tmpDir, `ascii-${chatId}.txt`);
      const jpgPath = path.join(tmpDir, `ascii-${chatId}.jpg`);

      fs.writeFileSync(imagePath, buffer);

      const { maxWidth, charset } = getUserSettings(chatId);
      const ascii = await imageToAscii(imagePath, maxWidth, charset);
      fs.writeFileSync(txtPath, ascii);
      await asciiToImage(ascii, jpgPath);

      // сохраняем пути к файлам
      lastFiles[chatId] = { txt: txtPath, jpg: jpgPath };

      await bot.sendDocument(chatId, txtPath, {
        reply_markup: {
          inline_keyboard: [[{ text: 'Показать как картинку', callback_data: 'show_jpg' }]],
        },
      });

    } catch (error) {
      console.error('Ошибка при обработке изображения:', error);
      bot.sendMessage(chatId, 'Произошла ошибка при обработке изображения.');
    }
  });
}

module.exports = { setupHandlers };
