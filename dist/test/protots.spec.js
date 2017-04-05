"use strict";
var fs = require("fs");
var assert = require("assert");
var generator_1 = require("../tools/generator");
var protots_yaml_1 = require("../src/protots.yaml");
describe('protots', function () {
    it('json to protocol', function () {
        assert.equal(generator_1.ConvertYaml('./src/protots.yaml'), fs.readFileSync('./src/protots.yaml.ts').toString());
    });
    it('message', function () {
        var frameNotice = new protots_yaml_1.FrameNotice;
        var message = protots_yaml_1.GenerateMessage(frameNotice.buffer);
        assert.ok(message instanceof protots_yaml_1.FrameNotice);
        assert.equal(frameNotice.buffer, message.buffer);
    });
});
