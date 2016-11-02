# cmdLineArgs.js

Simple handling of command line arguments in node.js


## Initialize / Usage

cla.handle ( _{Array}_ **validArguments** [, _{Object}_ **options**] );

```javascript
// Load command-line-arguments script
var cla = require('./cmdLineArgs.js');

// List of arguments you want to listen for
var validArguments = [{
    arguments : 'a',
    callback  : function(){}
}];

// Optional settings
var options = {
    caseSensitive : false,
    prefix        : '-'
};

// Run it
cla.handle(validArguments, options);
```


## Method(s)

### handle(config);

- Argument(s): `object` **config** - Configuration of the command line argument handler
- Return: `void`


## Configuration

- **validArguments** `array` _List of objects with all valid arguments filled with objects_
  - **arguments** `array|string` _Argument sting or Array of arguments like aliases_
  - **callback** `function` _Callback function, will be called if argument has been found_
- **options** `object` _Optional object to change default settings_ 
  - **caseSensitive** `boolean` _Triggers if arguments should be found if they are not in the right case; default is false; optional_
  - **prefix** `string` _Character or string before an argument; default is '-'; optional_

## Example

- In javascript

```javascript
var cla = require('./cmdLineArgs.js');
    
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

var options = {
    caseSensitive  : false,             // Optional parameter to listen only to case sensitive arguments 
    prefix         : '-'                // Optional parameter to change the prefixing char/string of arguments
};

// Run it
cla.handle(validArguments, options);


// Callbacks and outputs
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
```

- On console

```
$ node ./dev/run.js -p 8080 -e -q -account "John Doe" "password123"

       |          | |                                             |
       |          | +------ Arguments for your application ------ +
       |          |
       |          +----------------+
       |                           |
       +- Your application script -+
```
