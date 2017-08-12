const fs = require('fs');
const path = require('path');
const pify = require('pify');
const yaml = require('js-yaml');
const moment = require('moment-timezone');

const readDir = pify(fs.readdir);
const readFile = pify(fs.readFile);

const DATE_REGEX = /(\d{1,2})\.(\d{1,2})\.(\d{4})-?(\d{1,2})?\.?(\d{1,2})?\.?(\d{4})?/;
const MILLISECONDS_IN_MINUTE = 60 * 1000;

const timezoneMoscow = moment.tz.zone('Europe/Moscow');

function parseDate(dateStr) {
    const [
        _,
        dayStart,
        monthStart,
        yearStart,
        dayEnd = dayStart,
        monthEnd = monthStart,
        yearEnd = yearStart
    ] = DATE_REGEX.exec(dateStr) || [];
    const timestampStart = Date.UTC(yearStart, monthStart-1, dayStart);
    const timestampEnd = Date.UTC(yearEnd, monthEnd-1, dayEnd, 23, 59);

    return {
        dateStart: new Date(timestampStart + timezoneMoscow.parse(timestampStart) * MILLISECONDS_IN_MINUTE),
        dateEnd: new Date(timestampEnd + timezoneMoscow.parse(timestampEnd) * MILLISECONDS_IN_MINUTE)
    };
}

function readEvent(fullPath) {
    const uid = path.basename(fullPath, '.yml');

    return readFile(fullPath, 'utf-8').
        then(content => {
            const data = yaml.safeLoad(content);
            return Object.assign(data, parseDate(data.date), { uid });
        });
}

module.exports = folder =>
    readDir(folder).
        then(files => Promise.all(
            files.map(file => readEvent(path.resolve(folder, file)))
        ));
