import * as fs from 'fs';
import * as assert from 'assert';
import {ConvertYaml} from '../tools/generator';
import {GenerateMessage, FrameNotice, LoginRsp, TypedWebSocketMessageHandle} from '../src/protots.yaml'

describe('protots', function() {
    it('json to protocol', function() {
        assert.equal(ConvertYaml('./src/protots.yaml'), fs.readFileSync('./src/protots.yaml.ts').toString());
    })

    it('message', function() {
        let frameNotice = new FrameNotice;
        let message = GenerateMessage(frameNotice.buffer);
        assert.ok(message instanceof FrameNotice);
        assert.equal(frameNotice.buffer, message.buffer);
    })
});