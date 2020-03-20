# Календарь событий по фронтенду

[![Build Status](https://travis-ci.org/web-standards-ru/calendar.svg?branch=master)](https://travis-ci.org/web-standards-ru/calendar)

Конференции, митапы и другие события по фронтенду в одном календаре.

Адрес календаря:

- iCal: [web-standards.ru/calendar.ics](https://web-standards.ru/calendar.ics) для подписки в календарях.
- JSON: [web-standards.ru/calendar.json](https://web-standards.ru/calendar.json) для удобной работы с данными.

Правки, замечания и идеи по развитию календаря — [в ишьях](https://github.com/web-standards-ru/calendar/issues).

## Как подписаться

- [Инструкция для macOS](https://support.apple.com/ru-ru/HT202361)
- [Инструкция для Google Calendar](https://support.google.com/calendar/answer/37100)
- [Инструкция для Яндекс.Календаря](https://yandex.ru/support/calendar/common/create.html?lang=ru#subscribe)
- [Инструкция для Outlook](https://support.office.com/ru-ru/article/%D0%98%D0%BC%D0%BF%D0%BE%D1%80%D1%82-%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D1%8F-%D0%B8%D0%BB%D0%B8-%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B0-%D0%BD%D0%B0-%D0%BD%D0%B5%D0%B3%D0%BE-%D0%B2-Outlook-com-%D0%B8%D0%BB%D0%B8-Outlook-%D0%B2-%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82%D0%B5-cff1429c-5af6-41ec-a5b4-74f2c278e98c?omkt=ru-RU&ui=ru-RU&rs=ru-RU&ad=RU)

Также можно подписаться на [канал в Телеграме](https://t.me/webstandards_events).

## Добавление события

1. Создайте в папке [events](https://github.com/web-standards-ru/calendar/tree/master/events) файл `yyyy-mm-dd-event-name.yml`.
2. Отправьте пулреквест, открытый к правкам (галочка _allow edits from maintainers_).

- Файл можно создать прямо на Гитхабе: [create new file](https://github.com/web-standards-ru/calendar/new/master/events) и дальше в пулреквест.
- Название файла укажите латиницей, строчными и с дефисами вместо пробелов.
- Если событие длится больше одного дня, в названии файла укажите первый.

## Формат файла

```yml
name: event
date: dd.mm.yyyy
time: hh:mm-hh:mm
city: city
link: url
online: true
```

- Многодневное событие? Добавьте дату завершения через дефис `dd.mm.yyyy-dd.mm.yyyy`.
- Короткое событие на несколько часов? Укажите время начала и конца, даже примерное: `time: hh:mm-hh:mm`.
- Заканчиваете в полночь? Укажите время `23:59`, чтобы не перейти на следующий день.
- Проводится онлайн? Добавьте `online: true`, это добавит подпись «онлайн» в название.
- Всегда добавляйте город (кириллицей), это помогает с часовым поясом события.
- Названия или ссылки с `#` указывайте в кавычках `'Событие #1'`.
- Не добавляйте в название события то, что уже есть в других полях: год, месяц, город.

## Сборка событий

- `npm run generate` для сборки
- `npm start` для сборки (как шорткат)

---
[Авторы](https://github.com/web-standards-ru/calendar/graphs/contributors), редакторы [Вадим Макеев](https://github.com/pepelsbey), [Юрий Савин](https://github.com/baitun), разработка [Дмитрий Семиградский](https://github.com/Semigradsky) и [Андрей Волынкин](https://github.com/Avol-V). Распространяется по лицензии [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.ru).
