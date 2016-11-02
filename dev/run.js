// ------------------------------------------------------------------------------------------------------------- Include

var cla = require('../src/cmdLineArgs.js');

// --------------------------------------------------------------------------------------------- Arguments to listen for

var validArguments = [
    {
        arguments : ['a', 'account'],   // - If argument a or account are found cmdLineArgs will callback
        callback  : setAccountData      //   given function setAccountData(value, remainingArguments)
    }, {                                //
        arguments : ['E', 'Extensive'], // - If argument e or extensive are found cmdLineArgs will callback
        callback  : setExtensiveMode    //   given function setExtensiveMode(value, remainingArguments)
    }, {                                //
        arguments : ['p', 'port'],      // - If argument p or port are found cmdLineArgs will callback
        callback  : setPort             //   given function setPort(value, remainingArguments)
    }, {                                //
        arguments : 'q',                // - If argument q are found cmdLineArgs will callback
        callback  : setQuietMode        //   given function setQuietMode(value, remainingArguments)
    }
];

// --------------------------------------------------------------------------------------------------- Optional settings

var options = {
    caseSensitive  : false, // Optional parameter to listen only to case sensitive arguments
    prefix         : '-'    // Optional parameter to change the prefixing char/string of arguments
};

// -------------------------------------------------------------------------------------------------------- Run / Handle

cla.handle(validArguments, options);

// ------------------------------------------------------------------------------------------------- Callbacks / Outputs

function setAccountData(value, remainingArguments) {
    console.log('Username: ' + value);
    console.log('Password: ' + remainingArguments[0]);
}

function setExtensiveMode(port, remainingArguments) {
    console.log('isExtensiveMode: true');
}

function setPort(value, remainingArguments) {
    console.log('Port: ' + value);
}

function setQuietMode(value, remainingArguments) {
    console.log('isQuietMode: true');
}
