# Календарь событий по фронтенду

Конференции, встречи и другие события по фронтенду во всём мире в одном календаре.

Адрес календаря .ics: [web-standards.ru/calendar.ics](https://web-standards.ru/calendar.ics).

Адрес календаря UI: [Google Calendar](https://calendar.google.com/calendar/embed?src=dnM0czZrdjluZWFtb3RhNm9jZjYxZTgzZzZxYWN2NTVAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20).

Правки, замечания и идеи по развитию календаря — [в ишьях](https://github.com/web-standards-ru/calendar/issues).

## Как подписаться

- [Инструкция для macOS](https://support.apple.com/ru-ru/HT202361)
- [Инструкция для Google Calendar](https://support.google.com/calendar/answer/37100)

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
city: city, country
link: url
```

- Если событие длится больше одного дня, то укажите даты через дефис.
- Названия городов и стран записывайте кириллицей.

## Сборка событий

- `npm run generate` для сборки
- `npm run publish` для публикации
- `npm start` для сборки и публикации

---
[Авторы](https://github.com/web-standards-ru/calendar/graphs/contributors), редакторы [Вадим Макеев](https://github.com/pepelsbey) и [Евгений Жлобо](https://github.com/ezhlobo). Распространяется по лицензии [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.ru).
