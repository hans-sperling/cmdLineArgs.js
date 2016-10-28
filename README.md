# cmdLineArgs.js

Simple handling of command line arguments in node.js


## Initialize / Usage

```javascript
    // Load command-line-arguments script
    var cla = require('./cmdLineArgs.js');

    // Run it with your own configuration
    cla.handle({ /* configuration */ });
```


## Method(s)

### handle(config);

- Argument(s): `object` **config** - Configuration of the command line argument handler
- Return: `void`


## Configuration

- **caseSensitive** `boolean` _Triggers if arguments should be found if they are not in the right case; default is false; optional_
- **prefix** `string` _Character or string before an argument; default is '-'; optional_
- **validArguments** `array` _List of objects with all valid arguments filled with objects_
  - **arguments** `array|string` _Argument sting or Array of arguments like aliases_
  - **callback** `function` _Callback function, will be called if argument has been found_


## Example

- In javascript
```javascript
    var cla     = require('./cmdLineArgs.js'),
    
    username    = '',
    password    = '',
    isExtensive = false,
    isQuiet     = false,
    port        = 8080;
    
    
    
    cla.handle({
        caseSensitive  : false,             // Optional parameter
        prefix         : '-',               // Optional parameter
        validArguments : [{                 // Necessary list of listening command line arguments
            arguments : ['a', 'account'],   // - If argument a or account are found cmdLineArgs will callback
            callback  : setAccountData      //   given function setAccountData(value, remainingArguments)
        }, {                                //
            arguments : ['e', 'extensive'], // - If argument e or extensive are found cmdLineArgs will callback
            callback  : setExtensiveMode    //   given function setExtensiveMode(value, remainingArguments)
        }, {                                //
            arguments : ['p', 'port'],      // - If argument p or port are found cmdLineArgs will callback
            callback  : setPort             //   given function setPort(value, remainingArguments)
        }, {                                //
            arguments : 'q',                // - If argument q are found cmdLineArgs will callback
            callback  : setQuietMode        //   given function setQuietMode(value, remainingArguments)
        }]                                  //
    });
    
    
    
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
