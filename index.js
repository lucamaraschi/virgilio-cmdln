module.exports = function virgilioCmdln(options) {
  var virgilio = this;
  var dashdash = require('dashdash');

  var cmdln = virgilio.namespace$('cmdln');

  var commandChainMap = {};

  cmdln.cmdify = function(action, commandstring) {
    var commandString = commandstring || action.name;
    var commandChain = new CommandChain(commandString, action);
    commandChainMap[commandString] = commandChain;
    return commandChain;
  }

  virgilio.extend$('_createAction$', function _createAction$(name, fn) {
    var action = _createAction$.super$.call(this, name, fn);
    action.cmdify = cmdln.cmdify.bind(action.namespace$, action);
  });

  cmdln.main = function main() {
    var argv = process.argv;
    //search for the command or show help
    if (argv.length < 3) {
      // show the program help

    }

    // search for the related action in the namespace
    var command = argv[2];
    var commandChain = this._lookupForCommandChain(command);
    commandChain.execute.apply(this, argv.slice(3, argv.length));
  };

  cmdln._lookupForCommandChain = function _lookupForCommandChain(commandString) {
    return commandChainMap[commandString]; // return commandNotFoundError
  };

  function CommandChain(commandstring, action) {
    var self = this;
    this.commandOptions = [];

    this.arg = function arg(names, help, type) {
      self.commandOptions.push({
        names: names,
        help: help,
        type: type
      });

      return self;
    }

    this.handler = function handler(fn) {
      self.command = function(args) {
        fn.call(action.namespace$, args);
      }
      return self;
    }

    this.execute = function execute() {
      //parse argv with dashdash parse using options
      var args = dashdash.createParser({options: self.commandOptions})
        .parse(arguments);
      return self.command(args);
    }
  };
};
