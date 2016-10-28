module.exports = (function cmdLineArgs() {
    // ------------------------------------------------------------------------------------------------ Methods / Helper

    /**
     * Checks if the type of the given parameter is an array.
     *
     * @param  {*} value
     * @return {boolean}
     */
    function isArray(value) {
        return Object.prototype.toString.call(value) == "[object Array]";
    }


    /**
     * Checks if the type of the given parameter is a string.
     *
     * @param  {*} value
     * @return {boolean}
     */
    function isString(value) {
        return Object.prototype.toString.call(value) == "[object String]";
    }


    /**
     * Deep merges of two given objects.
     *
     * @param   {Object} objSlave
     * @param   {Object} objMaster
     * @returns {Object}
     *
     * @link https://github.com/KyleAMathews/deepmerge
     */
    function deepMerge(objSlave, objMaster) {
        var array  = Array.isArray(objMaster);
        var result = array && [] || {};

        if (array) {
            objSlave = objSlave || [];
            result    = result.concat(objSlave);
            objMaster.forEach(function(e, i) {
                if (typeof result[i] === 'undefined') {
                    result[i] = e;
                }
                else if (typeof e === 'object') {
                    result[i] = deepMerge(objSlave[i], e);
                }
                else {
                    if (objSlave.indexOf(e) === -1) {
                        result.push(e);
                    }
                }
            });
        }
        else {
            if (objSlave && typeof objSlave === 'object') {
                Object.keys(objSlave).forEach(function (key) {
                    result[key] = objSlave[key];
                })
            }
            Object.keys(objMaster).forEach(function (key) {
                if (typeof objMaster[key] !== 'object' || !objMaster[key]) {
                    result[key] = objMaster[key];
                }
                else {
                    if (!objSlave[key]) {
                        result[key] = objMaster[key];
                    }
                    else {
                        result[key] = deepMerge(objSlave[key], objMaster[key]);
                    }
                }
            });
        }

        return result;
    }

    // ------------------------------------------------------------------------------------------------ Methods / Public

    /**
     * Handles the given arguments of the command line.
     *
     * @param    {Object}       config
     * @property {Boolean}      config.caseSensitive - Should arguments be found if they are not in the right case; default is 'false'.
     * @property {String}       config.prefix - Character or string before an argument; default is '-'.
     * @property {Array}        config.validArguments - List of all valid arguments filled with objects
     * @property {Object}       config.validArguments
     * @property {String|Array} config.validArguments[0].arguments - Argument sting or Array of arguments like aliases
     * @property {Function}     config.validArguments[0].callback - Callback function, will be called if argument has been found
     */
    function handle(config) {
        var cfg = {
                caseSensitive  : false,
                prefix         : '-',
                validArguments : []
            },
            arguments          = process.argv,
            remainingArguments = arguments.slice(),
            amount             = arguments.length,
            argumentsIndex     = 0,
            argument,
            validArguments, validArgumentsIndex, validArgument,
            argumentList, argumentListIndex, argumentListItem;

        cfg            = deepMerge(cfg, config);
        validArguments = cfg.validArguments;

        for (; argumentsIndex < amount; argumentsIndex++) {
            argument = arguments[argumentsIndex];
            remainingArguments.shift();

            if (!cfg.caseSensitive) {
                argument = argument.toLowerCase();
            }

            for (validArgumentsIndex in validArguments) {
                if (!validArguments.hasOwnProperty(validArgumentsIndex)) { continue; }

                validArgument = validArguments[validArgumentsIndex];

                if (isString(validArgument.arguments)) {
                    if (argument === (cfg.prefix + validArgument.arguments)) {

                        // Check if next argument is a value for the current argument or just an other argument
                        if (!!(arguments[argumentsIndex + 1]) && arguments[argumentsIndex + 1][0] !== cfg.prefix) {
                            remainingArguments.shift();
                            validArgument.callback(arguments[++argumentsIndex], remainingArguments);
                        }
                        else {
                            validArgument.callback();
                        }
                    }
                }
                else if (isArray(validArgument.arguments)) {
                    argumentList = validArgument.arguments;

                    for (argumentListIndex in argumentList) {
                        if (!argumentList.hasOwnProperty(argumentListIndex)) { continue; }

                        argumentListItem = argumentList[argumentListIndex];

                        if (!cfg.caseSensitive) {
                            argumentListItem = argumentListItem.toLocaleLowerCase();
                        }

                        if (argument === (cfg.prefix + argumentListItem)) {
                            if (!!(arguments[argumentsIndex + 1]) && arguments[argumentsIndex + 1][0] !== cfg.prefix) {
                                remainingArguments.shift();
                                validArgument.callback(arguments[++argumentsIndex], remainingArguments);
                            }
                            else {
                                validArgument.callback();
                            }
                        }
                    }
                }
            }
        }
    }

    // ---------------------------------------------------------------------------------------------------------- Return
    return {
        handle : handle
    };
})();
