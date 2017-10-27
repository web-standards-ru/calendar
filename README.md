# Календарь событий по фронтенду

[![Build Status](https://travis-ci.org/web-standards-ru/calendar.svg?branch=master)](https://travis-ci.org/web-standards-ru/calendar)

Конференции, встречи и другие события по фронтенду во всём мире в одном календаре.

Адрес календаря: [web-standards.ru/calendar.ics](https://web-standards.ru/calendar.ics).

Правки, замечания и идеи по развитию календаря — [в ишьях](https://github.com/web-standards-ru/calendar/issues).

## Как подписаться

- [Инструкция для macOS](https://support.apple.com/ru-ru/HT202361)
- [Инструкция для Google Calendar](https://support.google.com/calendar/answer/37100)
- [Инструкция для Яндекс.Календаря](https://yandex.ru/support/calendar-new/sync/import.html)

## Добавление события

1. Создайте в папке [events](https://github.com/web-standards-ru/calendar/tree/master/events) файл `yyyy-mm-dd-name.yml`.
2. Отправьте пулреквест и будьте готовы к правкам.

- Файл можно создать прямо на Гитхабе: [create new file](https://github.com/web-standards-ru/calendar/new/master/events) и дальше в пулреквест.
- Название события укажите латиницей, строчными буквами. Называйте конференции единообразно.
- Если событие длится больше одного дня, в названии файла укажите первый.

## Формат файла

```yml
name: event
date: dd.mm.yyyy[-dd.mm.yyyy]
time: hh:mm-hh:mm
city: city, country
link: url
```

- Если событие длится больше одного дня, то укажите даты через дефис.
- Для событий на день или на вечер можно указать время начала и конца.
- Названия городов и стран записывайте кириллицей.

## Сборка событий

- `npm run generate` для сборки
- `npm start` для сборки (как шорткат)

---
[Авторы](https://github.com/web-standards-ru/calendar/graphs/contributors), редактор [Вадим Макеев](https://github.com/pepelsbey), разработка [Дмитрий Семиградский](https://github.com/Semigradsky) и [Андрей Волынкин](https://github.com/Avol-V). Распространяется по лицензии [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.ru).
