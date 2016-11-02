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
     * Checks if the type of the given parameter is an object.
     *
     * @param  {*} value
     * @return {boolean}
     */
    function isObject(value) {
        return Object.prototype.toString.call(value) == "[object Object]";
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
     * @param    {Array}        argumentList              - List of all valid arguments filled with objects
     * @property {String|Array} argumentList[0].arguments - Argument sting or Array of arguments like aliases
     * @property {Function}     argumentList[0].callback  - Callback function, will be called if argument has been found
     * @param    {Object}       options                   - Optional object to change default settings
     */
    function handle(argumentList, options) {
        var opt = {
                caseSensitive  : false,
                prefix         : '-'
            },
            arguments          = process.argv,
            remainingArguments = arguments.slice(),
            amount             = arguments.length,
            argumentsIndex     = 0,
            argument,
            validArgumentsIndex, validArgument,
            aliasList, aliasListIndex, aliasListItem;

        options      = isObject(options) ? options : {};
        argumentList = isArray(argumentList) ? argumentList : [];
        opt          = deepMerge(opt, options);


        for (; argumentsIndex < amount; argumentsIndex++) {
            argument = arguments[argumentsIndex];
            remainingArguments.shift();

            if (!opt.caseSensitive) {
                argument = argument.toLowerCase();
            }

            for (validArgumentsIndex in argumentList) {
                if (!argumentList.hasOwnProperty(validArgumentsIndex)) { continue; }

                validArgument = argumentList[validArgumentsIndex];

                if (isString(validArgument.arguments)) {
                    if (argument === (opt.prefix + validArgument.arguments)) {

                        // Check if next argument is a value for the current argument or just an other argument
                        if (!!(arguments[argumentsIndex + 1]) && arguments[argumentsIndex + 1][0] !== opt.prefix) {
                            remainingArguments.shift();
                            validArgument.callback(arguments[++argumentsIndex], remainingArguments);
                        }
                        else {
                            validArgument.callback();
                        }
                    }
                }
                else if (isArray(validArgument.arguments)) {
                    aliasList = validArgument.arguments;

                    for (aliasListIndex in aliasList) {
                        if (!aliasList.hasOwnProperty(aliasListIndex)) { continue; }

                        aliasListItem = aliasList[aliasListIndex];

                        if (!opt.caseSensitive) {
                            aliasListItem = aliasListItem.toLocaleLowerCase();
                        }

                        if (argument === (opt.prefix + aliasListItem)) {
                            if (!!(arguments[argumentsIndex + 1]) && arguments[argumentsIndex + 1][0] !== opt.prefix) {
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
