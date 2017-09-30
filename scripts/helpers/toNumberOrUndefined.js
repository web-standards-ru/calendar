/**
 * Convert string value to number or undefined, when it can't be converted.
 *
 * @param {string | undefined} value Original value.
 * @returns {number | undefined}
 */
function toNumberOrUndefined(value) {
    const result = Number(value);

    return (isNaN(result) ? undefined : result);
}

module.exports = toNumberOrUndefined;
