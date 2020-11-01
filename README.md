# Balance-Telegram-TestBot

## Инструкция как запустить

1. Склонируйте репозиторий
```sh
git clone https://github.com/Hamalkari/Balance-Telegram-TestBot.git
```
2. Перейдите в созданную директорию и установите все необходимые пакеты
```sh
cd Balance-Telegram-TestBot/

npm install
```
3. В файле **.env.example** необходимо изменить: 
 - **MONGO_URI** - URI строка подключения к MongoDb
 - **BOT_TOKEN** - Телеграм токен для бота
4. Переменуйте файл **.env.example** в **.env**
5. Запустить сервер
```sh
npm start
```
