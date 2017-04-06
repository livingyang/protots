"use strict";
var protots_yaml_1 = require("../src/protots.yaml");
describe('protots', function () {
    // it('handlebars', function() {
    //     // console.log(handlebars);
    //     // console.log(fs.readdirSync('./'));
    //     console.log(handlebars.compile(fs.readFileSync('./src/ts.handlebars').toString())({}));
    // });
    it('handlebars 1', function () {
        var f = new protots_yaml_1.FrameNotice();
        function f1(m) {
            console.log('f1');
            console.log(m);
        }
        protots_yaml_1.FrameNotice.on(f1);
        function f2(m) {
            console.log('f2');
            console.log(m);
        }
        protots_yaml_1.FrameNotice.on(f2);
        console.log('emit1');
        protots_yaml_1.DefaultMessageDispatcher.emit(f);
        protots_yaml_1.FrameNotice.off(f1);
        console.log('emit2');
        protots_yaml_1.DefaultMessageDispatcher.emit(f);
        protots_yaml_1.FrameNotice.off(f1);
        console.log('emit3');
        protots_yaml_1.DefaultMessageDispatcher.emit(f);
        protots_yaml_1.FrameNotice.off(f2);
        console.log('emit4');
        protots_yaml_1.DefaultMessageDispatcher.emit(f);
    });
    // it('json to protocol', function() {
    //     assert.equal(ConvertYaml('./src/protots.yaml'), fs.readFileSync('./src/protots.yaml.ts').toString());
    // })
    // it('message', function() {
    //     let frameNotice = new FrameNotice;
    //     let message = GenerateMessage(frameNotice.buffer);
    //     assert.ok(message instanceof FrameNotice);
    //     assert.equal(frameNotice.buffer, message.buffer);
    // })
});
