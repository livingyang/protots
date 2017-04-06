import * as fs from 'fs';
import * as assert from 'assert';
import * as handlebars from 'handlebars';

import {ConvertYaml} from '../tools/generator';
import {GenerateMessage, FrameNotice, LoginRsp, DefaultMessageDispatcher} from '../src/protots.yaml'

describe('protots', function() {

    // it('handlebars', function() {
    //     // console.log(handlebars);
    //     // console.log(fs.readdirSync('./'));
        
    //     console.log(handlebars.compile(fs.readFileSync('./src/ts.handlebars').toString())({}));
    // });

    it('handlebars 1', function() {
        let f = new FrameNotice();
        
        function f1(m) {
            console.log('f1');
            console.log(m);
        }
        FrameNotice.on(f1);

        function f2(m) {
            console.log('f2');
            console.log(m);
        }
        FrameNotice.on(f2)

        console.log('emit1');
        DefaultMessageDispatcher.emit(f);

        FrameNotice.off(f1);
        console.log('emit2');
        DefaultMessageDispatcher.emit(f);

        FrameNotice.off(f1);
        console.log('emit3');
        DefaultMessageDispatcher.emit(f);

        FrameNotice.off(f2);
        console.log('emit4');
        DefaultMessageDispatcher.emit(f);
        
    })

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