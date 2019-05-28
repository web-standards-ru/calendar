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

function generateCalendar(events) {
    const cal = ical({
        domain: 'https://web-standards.ru/',
        prodId: {
            company: 'web-standards',
            product: 'calendar',
            language: 'RU'
        },
        events: events
    });

    return Promise.all([
        writeFile(PATH_ICAL_CALENDAR, cal),
        writeFile(PATH_JSON_CALENDAR, JSON.stringify(events)),
    ]);
}

function dropEventWithoutDateStart(event) {
    return ('dateStart' in event);
}

readEvents(PATH_EVENTS)
    .then(events => events.filter(dropEventWithoutDateStart).map(prepareEvent))
    .then(generateCalendar)
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
