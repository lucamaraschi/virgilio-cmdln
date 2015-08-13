#!NODE
virgilio.loadModule$(virgilio-cmd);
var customAction = virgilio.namespace.action.cmdify();

customAction
    .arg('-f, --force')
    .addHandler(function (options) {
    })
    .addHandler(function(args) {
      this.execute(arg1, arg2, arg3);
    });


#1
var customAction = virgilio.namespace.action.cmdify('dosomething');

#2
customAction.arg('-f', '--force')


# Future...
virgilio.cmdln(() => {
  customAction.
    arg()
    .addHandler()
});

        <!-- const ctx = {
    name: 'Kong',
    version: '0.1.0',
    commands: []
};

virgilio.cmdln.Kong = new virgilio.cmdln.Cmdln(ctx);

virgilio.fooNamespace.actionName.cmdify(program_context_configuration)

virgilio.cmdln.Kong.help = function() {
    return 'HELP ME!!!!';
}



virgilio.cmdln.run();
#node
virgilio.cmdln.run({
    commands:
});

virgilio.namespace.action.cmdify()


 -->
