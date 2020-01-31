'use strict';

const fs = require('fs');
const path = require('path');
const pify = require('pify');
const ical = require('ical-generator');
const readEvents = require('./helpers/readEvents');

const PATH_EVENTS = path.resolve(__dirname, '../events');
const PATH_DIST = path.resolve(__dirname, '../dist');
const PATH_ICAL_CALENDAR = path.resolve(PATH_DIST, 'calendar.ics');
const PATH_JSON_CALENDAR = path.resolve(PATH_DIST, 'calendar.json');

if (!fs.existsSync(PATH_DIST)){
    fs.mkdirSync(PATH_DIST);
}

const writeFile = pify(fs.writeFile);

function prepareEvent(event) {
    const data = {
        uid: event.uid,
        start: event.dateStart,
        end: event.dateEnd,
        summary: event.name,
        location: event.city,
        description: event.link,
    };

    if (!event.withTime) {
        data.allDay = true;
    }

    return data;
}

function generateICalCalendar(events) {
    const cal = ical({
        description: 'Конференции, митапы и другие события по фронтенду.',
        domain: 'https://web-standards.ru/',
        name: 'Фронтенд',
        prodId: {
            company: 'web-standards',
            product: 'calendar',
            language: 'RU'
        },
        events: events
    });

    return writeFile(PATH_ICAL_CALENDAR, cal);
}

function generateJSONCalendar(events) {
    return writeFile(PATH_JSON_CALENDAR, JSON.stringify(events));
}

function dropEventWithoutDateStart(event) {
    return ('dateStart' in event);
}

readEvents(PATH_EVENTS)
    .then(events => events.filter(dropEventWithoutDateStart).map(prepareEvent))
    .then(data => Promise.all[generateICalCalendar(data), generateJSONCalendar(data)])
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
