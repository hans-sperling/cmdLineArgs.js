
var cla         = require('../src/cmdLineArgs.js'),
    isExtensive = false,
    isQuiet     = false,
    port        = 8080;

cla.handle({
    caseSensitive  : false,
    prefix         : '-',
    validArguments : [{
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

function setExtensiveMode() {
    isExtensive = true;
}

function setPort(argumentPort) {
    port = argumentPort;
}

function setQuietMode() {
    isQuiet = true;
}

// ----------------------------------------------------------------------------------------------------- Result / Output

console.log("Result:\n");
console.log('isExtensive:', isExtensive);
console.log('isQuiet    :', isQuiet    );
console.log('port       :', port       );
