'use strict';

const fs = require('fs');
const path = require('path');
const pify = require('pify');
const yaml = require('js-yaml');
const moment = require('moment-timezone');
const getTimezone = require('./getTimezone');
const toNumberOrUndefined = require('./toNumberOrUndefined');

const readDir = pify(fs.readdir);
const readFile = pify(fs.readFile);

const DATE_REGEX = /(\d{1,2})\.(\d{1,2})\.(\d{4})(?:-(\d{1,2})\.(\d{1,2})\.(\d{4}))?/;
const TIME_REGEX = /(\d\d?):(\d\d)-(\d\d?):(\d\d)/;
const MILLISECONDS_IN_MINUTE = 60 * 1000;
const ESCAPED_NUMBER_SIGNS_REGEXP = /\\#/g;

/**
 * Parse date and time fields, using city to specify timezone.
 *
 * @param {string} dateStr Event date field value.
 * @param {string} timeStr Event time field value.
 * @param {string} city Event city field value.
 * @returns {Promise<{dateStart?: Date, dateEnd?: Date, withTime: boolean}>}
 */
function parseDate(dateStr, timeStr, city) {
    const dateParts = DATE_REGEX.exec(dateStr);
    /** @type {{dateStart?: Date, dateEnd?: Date, withTime: boolean}} */
    let result = {
        withTime: false,
    };

    if (!dateParts) {
        return Promise.resolve(result);
    }

    const dateInterval = !!dateParts[4];
    const [
        ,
        dayStart,
        monthStart,
        yearStart,
        dayEnd = dayStart,
        monthEnd = monthStart,
        yearEnd = yearStart
    ] = dateParts.map(toNumberOrUndefined);

    result = {
        dateStart: new Date(Date.UTC(yearStart, monthStart - 1, dayStart)),
        dateEnd: new Date(Date.UTC(yearEnd, monthEnd - 1, dayEnd + 1)),
        withTime: false,
    };

    if (dateInterval || !timeStr) {
        return Promise.resolve(result);
    }

    const timeParts = TIME_REGEX.exec(timeStr);

    if (!timeParts) {
        return Promise.resolve(result);
    }

    const createTimezoneDates = (timezoneName) => {
        const [
            ,
            hoursFrom,
            minutesFrom,
            hoursTo,
            minutesTo
        ] = timeParts.map(toNumberOrUndefined);
        const timestampStart = Date.UTC(yearStart, monthStart - 1, dayStart, hoursFrom, minutesFrom);
        const timestampEnd = Date.UTC(yearEnd, monthEnd - 1, dayEnd, hoursTo, minutesTo);
        const timezone = moment.tz.zone(timezoneName);

        result = {
            dateStart: new Date(timestampStart + timezone.parse(timestampStart) * MILLISECONDS_IN_MINUTE),
            dateEnd: new Date(timestampEnd + timezone.parse(timestampEnd) * MILLISECONDS_IN_MINUTE),
            withTime: true,
        };

        return result;
    };

    const onTimezoneError = (error) => {
        console.error(error);
        return result;
    };

    return getTimezone(city)
        .then(createTimezoneDates)
        .catch(onTimezoneError);
}

/**
 * Parse event data.
 *
 * @param {string} content Event file content.
 */
function parseEvent(content) {
    const data = unescapeYamlNumberSign(yaml.safeLoad(content));
    const assignData = (dateData) => Object.assign(
        data,
        dateData
    );

    return parseDate(data.date, data.time, data.city)
        .then(assignData);
}

/**
 * Read event data from file.
 *
 * @param {string} fullPath Path to event file.
 */
function readEvent(fullPath) {
    const uid = path.basename(fullPath, '.yml');
    const assignUid = (data) => Object.assign(
        data,
        { uid }
    );

    return readFile(fullPath, 'utf-8')
        .then(parseEvent)
        .then(assignUid);
}

/**
 * Read events from directory.
 *
 * @param {string} folder Directory with event files.
 */
function readEvents(folder) {
    return readDir(folder)
        .then(files => Promise.all(
            files.map(file => readEvent(path.resolve(folder, file)))
        ));
}

/**
 * Unescape Number Sign (`#`) in YAML values.
 *
 * @param {{[key: string]: any}} yamlData Parsed YAML data.
 * @returns {{[key: string]: any}}
 */
function unescapeYamlNumberSign(yamlData) {
    for (const [key, value] of Object.entries(yamlData)) {
        if (typeof value === 'string') {
            yamlData[key] = value.replace(ESCAPED_NUMBER_SIGNS_REGEXP, '#');
        }
    }

    return yamlData;
}

module.exports = readEvents;
