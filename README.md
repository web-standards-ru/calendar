# Календарь событий по фронтенду

[![Build Status](https://travis-ci.org/web-standards-ru/calendar.svg?branch=master)](https://travis-ci.org/web-standards-ru/calendar)

Конференции, встречи и другие события по фронтенду во всём мире в одном календаре.

Адрес календаря: [web-standards.ru/calendar.ics](https://web-standards.ru/calendar.ics).

Правки, замечания и идеи по развитию календаря — [в ишьях](https://github.com/web-standards-ru/calendar/issues).

## Как подписаться

- [Инструкция для macOS](https://support.apple.com/ru-ru/HT202361)
- [Инструкция для Google Calendar](https://support.google.com/calendar/answer/37100)
- [Инструкция для Яндекс.Календаря](https://yandex.ru/support/calendar-new/sync/import.html)
- [Инструкция для Outlook](https://support.office.com/ru-ru/article/%D0%98%D0%BC%D0%BF%D0%BE%D1%80%D1%82-%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D1%8F-%D0%B8%D0%BB%D0%B8-%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B0-%D0%BD%D0%B0-%D0%BD%D0%B5%D0%B3%D0%BE-%D0%B2-Outlook-com-%D0%B8%D0%BB%D0%B8-Outlook-%D0%B2-%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82%D0%B5-cff1429c-5af6-41ec-a5b4-74f2c278e98c?omkt=ru-RU&ui=ru-RU&rs=ru-RU&ad=RU)

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
```

- Если событие многодневное, добавьте дату завершения через дефис `dd.mm.yyyy-dd.mm.yyyy`.
- Для коротких событий на несколько часов, укажите время начала и конца.
- Если событие заканчивается в полночь, укажите время 23:59.
- Если время окончания неизвестно, напишите примерное.
- Названия городов записывайте кириллицей.

## Сборка событий

- `npm run generate` для сборки
- `npm start` для сборки (как шорткат)

---
[Авторы](https://github.com/web-standards-ru/calendar/graphs/contributors), редактор [Вадим Макеев](https://github.com/pepelsbey), разработка [Дмитрий Семиградский](https://github.com/Semigradsky) и [Андрей Волынкин](https://github.com/Avol-V). Распространяется по лицензии [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.ru).
