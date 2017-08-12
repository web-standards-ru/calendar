const fs = require('fs');
const path = require('path');
const pify = require('pify');
const yaml = require('js-yaml');

const readDir = pify(fs.readdir);
const readFile = pify(fs.readFile);

const DATE_REGEX = /(\d{1,2})\.(\d{1,2})\.(\d{4})-?(\d{1,2})?\.?(\d{1,2})?\.?(\d{4})?/;
const ONE_HOUR = 60*60*1000;
const MOSCOW_TIMEZONE_OFFSET = ONE_HOUR * 3;

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
    return {
        dateStart: new Date(Date.UTC(yearStart, monthStart-1, dayStart) - MOSCOW_TIMEZONE_OFFSET),
        dateEnd: new Date(Date.UTC(yearEnd, monthEnd-1, dayEnd, 23, 59) - MOSCOW_TIMEZONE_OFFSET)
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
