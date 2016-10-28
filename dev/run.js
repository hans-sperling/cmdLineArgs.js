
var cla         = require('../src/cmdLineArgs.js'),
    username    = '',
    password    = '',
    isExtensive = false,
    isQuiet     = false,
    port        = 8080;

cla.handle({
    caseSensitive  : false,
    prefix         : '-',
    validArguments : [{
        arguments : ['a', 'account'],
        callback  : setAccountData
    }, {
        arguments : ['e', 'extensive'],
        callback  : setExtensiveMode
    }, {
        arguments : ['p', 'port'],
        callback  : setPort
    }, {
        arguments : 'q',
        callback  : setQuietMode
    }]
});

// ------------------------------------------------------------------------------------------------------------- Methods


function setAccountData(value, remainingArguments) {
    username = value;
    password = otherArgs[0];
}

function setExtensiveMode(value, remainingArguments) {
    isExtensive = true;
}

function setPort(argumentPort, remainingArguments) {
    port = argumentPort;
}

function setQuietMode(value, remainingArguments) {
    isQuiet = true;
}

// ----------------------------------------------------------------------------------------------------- Result / Output

console.log("Result:\n");
console.log('username   :', username);
console.log('password   :', password);
console.log('isExtensive:', isExtensive);
console.log('isQuiet    :', isQuiet);
console.log('port       :', port);
