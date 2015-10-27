var cleanObject = require('./cleanObject');
var _           = require('lodash');

/**
 * @param {Object} object
 * @param {Object} config
 * @param {Object} [originalObject]
 *
 * @returns {object}
 */
module.exports = function(object, config, originalObject) {
    originalObject = originalObject || object;

    return cleanObject(object, config, [], originalObject);
};