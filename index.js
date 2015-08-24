module.exports = function virgilioCmdln(options) {
  var virgilio = this;
  var Promise = virgilio.Promise;
  var program = require('commander');

  var cmdln = virgilio.namespace$('cmdln');

  cmdln.cmdify = function(action, commandString) {
    var currentCommand = program.command(commandString);
    return new CommandChain(currentCommand, action);
  };


  function CommandChain(command, action) {
    var _this = this;
    this.arg = function arg(arg, description, modifier) {
      command.option(arg, description, modifier);
      return _this;
    }

    this.handler = function handler(fn) {
      command.action(function() {
        var options = this.opts();
        fn.call(action.namespace$, options);
        return _this;
      });
    }
  };

  virgilio.extend$('_createAction$', function _createAction$(name, fn) {
    var action = _createAction$.super$.call(this, name, fn);
    action.cmdify = cmdln.cmdify.bind(action.namespace$, action);
    return action;
  });

  cmdln.defineAction$('run', function(description) {
    if (description) {
        program.description(description);
    }
    program.on('*', program.help);
    if (process.argv.length < 3) {
      return program.help();
    }
    program.parse(process.argv);
  });
};
