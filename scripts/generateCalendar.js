const fs = require('fs');
const path = require('path');
const pify = require('pify');
const ical = require('ical-generator');
const readEvents = require('./helpers/readEvents');

const PATH_EVENTS = path.resolve(__dirname, '../events');
const PATH_CALENDAR = path.resolve(__dirname, '../dist/calendar.ics');

const writeFile = pify(fs.writeFile);

function prepareEvent(event) {
    return {
        uid: event.uid,
        start: event.dateStart,
        end: event.dateEnd,
        summary: event.name,
        location: event.city,
        url: event.link,
        description: event.link ? event.link : '',
        floating: true
    };
}

function generateCalendar(events) {
    const cal = ical({
        domain: 'http://web-standards-ru.github.io/calendar',
        prodId: {
            company: 'web-standards',
            product: 'calendar',
            language: 'RU'
        },
        events: events
    });

    return writeFile(PATH_CALENDAR, cal);
}

readEvents(PATH_EVENTS).
    then(events => events.map(prepareEvent)).
    then(generateCalendar).
    catch(err => {
        console.log('error: ', err);
        process.exit(1);
    });
