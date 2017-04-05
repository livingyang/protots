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
        console.log(f);
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
