'use strict';

const NodeGeocoder = require('node-geocoder');
const geoTz = require('geo-tz');
const Mutex = require('mutex-js');
const fs = require('fs');
const path = require('path');
const pify = require('pify');

/**
 * Path to file with timezones cache.
 * @type {string}
 */
const PATH_TIMEZONES_CACHE = path.resolve(__dirname, '../cache/timezones.json');

/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 */
const writeFile = pify(fs.writeFile);

/**
 * Cached results for timezones requested by address string.
 * @type {{[key: string]: string}}
 */
const timezonesCache = require(PATH_TIMEZONES_CACHE);

/**
 * Geocoder common options.
 */
const options = {
    // We can use OSM without any API key, but with some restrictions.
    provider: 'openstreetmap',
    // It may help, I think.
    language: 'RU-ru',
    // Contact email if there some problem in service usage.
    email: 'wst@web-standards.ru',
};

/**
 * Geocoder instance.
 */
const geocoder = NodeGeocoder(options);
/**
 * Mutex instance to force only one parallel request.
 */
const mutex = new Mutex();
/**
 * Last GEOCoder API request timestamp.
 */
let lastRequestTimestamp = 0;

/**
 * Force pause between API requests.
 *
 * @param {number} milliseconds Value of pause between requests.
 * @returns {Promise<void>}
 */
function doRequestsPause(milliseconds)
{
    const timestamp = Date.now();
    const delta = timestamp - lastRequestTimestamp;

    lastRequestTimestamp = timestamp;

    if (delta >= milliseconds) {
        return Promise.resolve();
    }

    return new Promise(
        (resolve) => setTimeout(
            () => {
                resolve();
            },
            milliseconds - delta
        )
    );
}

/**
 * Gets timezone name for address string using geocoder.
 * Limited to for single parallel request.
 *
 * @param {string} address Address string.
 * @returns {Promise<string>}
 */
function getTimezone(address) {
    if (timezonesCache.hasOwnProperty(address)) {
        return Promise.resolve( timezonesCache[address] );
    }

    return mutex.lock(
        () => getTimezoneUnlimited(address)
    );
}

/**
 * Gets timezone name for address string using geocoder.
 *
 * @param {string} address Address string.
 * @returns {Promise<string>}
 */
function getTimezoneUnlimited(address) {
    const getFromCacheOrDoRequest = () => {
        // Cache can be changed.
        if (timezonesCache.hasOwnProperty(address)) {
            return timezonesCache[address];
        }

        return geocoder.geocode(address)
            .then(prepareGeoData)
            .then(findTimezone);
    };

    // We should wait at last one second, as required in OSM Nominatim usage
    // policy.
    return doRequestsPause(1000)
        .then(getFromCacheOrDoRequest)
        .then((timezone) => addToCache(address, timezone));
}

/**
 * Gets first latitude and longitude from geocoder results.
 *
 * @param {Object[]} data Geocoder result.
 * @returns {{latitude: number, longitude: number}}
 * @throws {Error} Can’t find location of the city.
 */
function prepareGeoData(data) {
    if (!data || (data.length === 0)) {
        throw new Error( 'Can’t find location of the city.' );
    }

    const { latitude, longitude } = data[0];

    return { latitude, longitude };
}

/**
 * Returns timezone name found at geo coordinates.
 *
 * @param {{latitude: number, longitude: number}} data Geo coordinates.
 * @returns {string}
 * @throws {Error} Can’t find timezone of the location.
 */
function findTimezone(data) {
    const timezones = geoTz(data.latitude, data.longitude);

    if (timezones.length === 0) {
        throw new Error( 'Can’t find timezone of the location.' );
    }

    return timezones[0];
}

/**
 * Add timezone searching result to cache.
 *
 * @param {string} address Address string.
 * @param {string} timezone Timezone name.
 */
function addToCache(address, timezone) {
    timezonesCache[address] = timezone;

    return writeFile(
        PATH_TIMEZONES_CACHE,
        JSON.stringify(timezonesCache, null, 4)
    )
        .then(() => timezone);
}

module.exports = getTimezone;
