# cmdLineArgs.js

Simple handling of command line arguments in node.js


## Initialize / Usage

- In code:
```javascript
    var cla = require('./cmdLineArgs.js');

    cla.handle({...});
```

- On console:
```
    $ node ./dev/run.js -p 8080 -e -q
```

## Method(s)

### handle(config);

- Argument(s): `object` **config** - Configuration of the command line argument handler
- Return: `void`


## Configuration

- **caseSensitive** `boolean` _Triggers if arguments should be found if they are not in the right case; default is false_
- **prefix** `string` _Character or string before an argument; default is '-'_
- **validArguments** `array` _List of objects with all valid arguments filled with objects_
  - **arguments** `array|string` _Argument sting or Array of arguments like aliases_
  - **callback** `function` _Callback function, will be called if argument has been found_


## Example

```javascript
    var cla     = require('./cmdLineArgs.js'),
    
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
    
    
    
    function setExtensiveMode() {
        isExtensive = true;
    }
    
    function setPort(argumentPort) {
        port = argumentPort;
    }
    
    function setQuietMode() {
        isQuiet = true;
    }
```
