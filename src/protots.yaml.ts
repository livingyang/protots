export enum MessageId {
    Invalid = -1,
    LoginRsp,
    FrameNotice,
    UserDataNotice,
    MatchingSuccessRsp,
    GetWalletReq,
    TestObjectReq,
}

export type Buffer = any[]; // Buffer[0] == MessageId
export class Message {
    buffer: Buffer;
    getId(): number {
        return MessageId.Invalid;
    }
}

interface MessageClass {
    new(): Message;
}

// ------------ Message Generator

export let MessageMap: {[id: number]: MessageClass} = {};
export function GenerateMessage(buffer: Buffer) {
    if (buffer != null && MessageMap[buffer[0]] != null) {
        let message = new MessageMap[buffer[0]];
        if (message.buffer.length === buffer.length) {
            message.buffer = buffer;
            return message;
        }
        else {
            console.log("GenerateMessage faild, buffer: " + JSON.stringify(buffer));
            return new Message();
        }
    }
    
    return null;
}

// ------------- WebSocket Message Handle

interface Invoker {
    target;
    handler: Function;
}

export class MessageDispatcher {
    eventInvokerMap: {[id: number]: Invoker[]} = {};

    emit(message: Message) {
        if (message != null) {
            for (let invoker of this.getInvokerList(message.getId())) {
                invoker.handler.call(invoker.target, message);
            }
        }
    }

    getInvokerList(event: number) {
        return this.eventInvokerMap[event] || [];
    }

    on(event: number | string, target, handler: Function = target[event]) {
        if (handler == null) {
            throw `Client.on event: ${event}, handle is null`;
        }
        if (this.eventInvokerMap[event] == null) {
            this.eventInvokerMap[event] = [];
        }

        if (target != null) {
            this.eventInvokerMap[event].push({ target: target, handler: handler });
        }
    }

    off(event: number | string, target, handler: Function = target[event]) {
        if (this.eventInvokerMap[event] != null) {
            this.eventInvokerMap[event] = this.eventInvokerMap[event].filter((v, i, a) => {
                return (target !== v.target || handler !== v.handler);
            });
        }
    }
}

export var defaultMessageDispatcher = new MessageDispatcher();

export class LoginRsp extends Message {
    buffer: [MessageId] = [MessageId.LoginRsp];
    static on(observer, handle: (m: LoginRsp) => void) {
        defaultMessageDispatcher.on(MessageId.LoginRsp, observer, handle);
    }
    static off(observer, handle: (m: LoginRsp) => void) {
        defaultMessageDispatcher.off(MessageId.LoginRsp, observer, handle);
    }
}
MessageMap[MessageId.LoginRsp] = LoginRsp;

export class FrameNotice extends Message {
    buffer: [MessageId, number] = [MessageId.FrameNotice, 0];
    static on(observer, handle: (m: FrameNotice) => void) {
        defaultMessageDispatcher.on(MessageId.FrameNotice, observer, handle);
    }

    static off(observer, handle: (m: FrameNotice) => void) {
        defaultMessageDispatcher.off(MessageId.FrameNotice, observer, handle);
    }
    get ms() {
        return this.buffer[1];
    }
    set ms(ms: number) {
        this.buffer[1] = ms;
    }
}
MessageMap[MessageId.FrameNotice] = FrameNotice;
