var _ = require('lodash');

/**
 * @param {Object} object
 * @param {Object} config
 *
 * @returns {Object}
 */
module.exports = function clean(object, config) {
    var cleanedObject = {};
    var propertyValue;

    _.forOwn(config, function(propertyConfig, propertyName) {
        propertyValue = object[propertyName];

        if (propertyConfig === true || propertyConfig instanceof Function) {
            cleanedObject[propertyName] = propertyValue;
        } else if (propertyConfig instanceof Object) {
            if (propertyConfig.properties instanceof Object && propertyValue instanceof Object) {
                cleanedObject[propertyName] = clean(propertyValue, propertyConfig.properties);
            } else if (propertyConfig.items instanceof Object && propertyConfig.items.properties instanceof Object && propertyValue instanceof Array) {
                cleanedObject[propertyName] = propertyValue.map(function(item) {
                    if (item instanceof Object) {
                        return clean(item, propertyConfig.items.properties);
                    }
                    return item;
                });
            } else {
                cleanedObject[propertyName] = propertyValue;
            }
        }
    });

    return cleanedObject;
};