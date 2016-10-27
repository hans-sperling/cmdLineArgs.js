
var cla = require('../src/cmdLineArgs.js'),
    a   = null,
    b   = null,
    c   = null;

cla.handle({
    caseSensitive  : false,
    prefix         : '-',
    validArguments : [{
        arguments : 'a',
        callback  : setA
    }, {
        arguments : ['b', 'beta'],
        callback  : setB
    }, {
        arguments : ['C'],
        callback  : setC
    }]
});


// ------------------------------------------------------------------------------------------------- Methods / Callbacks

function setA(value, values) {
    console.log(value, values);
    if (!value) { return; }

    a = value;
}

function setB(value, values) {
    if (!value) { return; }

    b = value;
}

function setC(value, values) {
    c = true;
}

// ----------------------------------------------------------------------------------------------------- Result / Output
console.log("Result:\n");
console.log('a:', a);
console.log('b:', b);
console.log('c:', c);
