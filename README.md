# ASCII Art Telegram Bot by Wexagen

Бот для Telegram, который преобразует изображения в ASCII-арт и отправляет результат пользователю в виде `.txt` или `.jpg`. Поддерживает пользовательские настройки ширины, набора символов и формат вывода.

---

## Возможности

- Преобразует фото в ASCII-арт
- Отправка результата в виде `.txt` или `.jpg`
- Настройка ширины ASCII-арта 
- Выбор пресетов символов или собственных символов через `/charset`
- Интерактивные inline-кнопки
- Поддержка русского языка
- Сохраняет пользовательские настройки в `settings.json`

---

## Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/your-username/ascii-art-bot.git
cd ascii-art-bot

2. Установите зависимости:
``` bash
npm install

3. Создайте файл .env в корне проекта и добавьте свой токен:

```bash
nano .env
```ini
BOT_TOKEN=ваш_токен_бота

4. Запустите бота:
```bash
npm start

Использование

*Отправка изображения
Просто отправьте боту изображение.
В ответ вы получите ASCII-арт в виде .txt.
Также появится кнопка "Показать как картинку" — она отправит .jpg с ASCII.
*Настройки
/settings — выбор ширины (40–70 символов) и символов
/charset ░▒▓█ — задать свой набор символов
/help — инструкция

*Примеры команд
/settings
/charset ░▒▓█

Структура проекта

```bash
ascii-art-bot/
├── src/
│   ├── index.js              # Точка входа
│   ├── config.js             # Загрузка .env
│   ├── bot/
│   │   ├── index.js          # Инициализация бота
│   │   ├── handlers.js       # Команды и логика
│   │   ├── ui.js             # Клавиатуры и тексты
│   │   ├── settingsStore.js  # Хранение настроек
│   ├── utils/
│   │   └── asciiConverter.js # Генерация ASCII и изображений
│   └── tmp/                  # Временные файлы
├── settings.json             # Пользовательские настройки 
├── .env
├── .gitignore
├── package.json
└── README.md


Зависимости

node-telegram-bot-api
jimp@0.16.1 — для работы с изображениями ***!!! Версии старше вызывают ошибки. Настоятельно рекомендую использовать только 0.16.1
canvas — генерация JPG из ASCII
node-fetch — загрузка изображений с Telegram


Рекомендации

Для мобильных устройств оптимальная ширина: 60–70 символов
Используйте простые символы (@#*+=-:) для лучшей читаемости


