// Визуальные элементы Telegram-интерфейса (inline-кнопки и тексты для сообщений)

function getStartKeyboard() {
    return {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Настройки', callback_data: 'open_settings' },
            { text: 'Помощь', callback_data: 'open_help' },
          ],
        ],
      },
    };
  }
  
  function getSettingsKeyboard() {
    return {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Ширина: 40', callback_data: 'width_40' },
            { text: '60', callback_data: 'width_60' },
            { text: '70', callback_data: 'width_70' },
          ],
          [
            { text: 'Символы: Стандарт', callback_data: 'charset_default' },
            { text: 'Светлые', callback_data: 'charset_light' },
            { text: 'Плотные', callback_data: 'charset_dense' },
          ],
        ],
      },
    };
  }
  
  function getHelpMessage() {
    return {
      text: `
  <b>Инструкция:</b>
  
  1. Отправьте изображение — получите ASCII-арт в виде .txt
  
  2. Можно настроить:
  • /settings — ширина и стиль
  • /charset "символы" — задать свои (пример: <code>/charset ░▒▓█</code>)
  • /start — перезапуск
      `,
      options: { parse_mode: 'HTML' },
    };
  }
  
  
  module.exports = {
    getStartKeyboard,
    getSettingsKeyboard,
    getHelpMessage,
  };
  