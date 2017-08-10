# Календарь событий по фронтенду

Конференции, встречи и другие события по фронтенду во всём мире в одном календаре. Собирается силами сообщества.

Адрес календаря: [web-standards.ru/calendar.ics](https://web-standards.ru/calendar.ics)

## Добавление события

1. Создайте в папке [events](https://github.com/web-standards-ru/calendar/tree/master/events) файл `yyyy-mm-dd-name.yml`. Название события укажите латиницей, строчными буквами.
2. Отправьте пулреквест и будьте готовы, что мы что-нибудь поправим и уточним для единообразия.

Файл можно создать прямо на Гитхабе: _Creat new file_ над списком и дальше в пулреквест.

## Формат файла

```yml
name: event
date: dd.mm.yyyy[-dd.mm.yyyy]
city: city, country
link: url
```

- Если конференция длится два дня, то укажите диапазон.
- Названия городов и стран указывайте кириллицей.

---
[Авторы](https://github.com/web-standards-ru/calendar/graphs/contributors), редакторы [Вадим Макеев](https://github.com/pepelsbey) и [Евгений Жлобо](https://github.com/ezhlobo). Распространяется по лицензии [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.ru).
