export enum MessageType {
    Invalid = -1,
    LoginRsp,
    FrameNotice,
}

export type Buffer = any[] // Buffer: [MessageType, any...]
export class Message {
    buffer: Buffer;
    static get Id() { return MessageType.Invalid; }
    get Id() { return MessageType.Invalid; }
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
            throw "GenerateMessage faild, buffer: " + JSON.stringify(buffer);
        }
    }
    
    return null;
}

type Invoker = [Function, any]; // [handler, observer]
type InvokerList = Invoker[];

export class MessageDispatcher {
    eventInvokerMap: {[id: number]: InvokerList} = {};

    emit(message: Message) {
        if (message != null) {
            for (let invoker of this.getInvokerList(message.Id)) {
                if (invoker != null && invoker[0] != null) {
                    invoker[0].call(invoker[1], message);
                }
            }
        }
    }

    getInvokerList(event: MessageType) {
        return this.eventInvokerMap[event] || [];
    }

    on(event: MessageType, handler: Function, observer) {
        if (handler == null) {
            return;
        }

        let invokerList = this.eventInvokerMap[event];
        if (invokerList == null) {
            invokerList = this.eventInvokerMap[event] = [];
        }

        for (let i = invokerList.length - 1; i >= 0; --i) {
            if (invokerList[i] == null) {
                invokerList[i] = [handler, observer];
                return;
            }
        }
        
        invokerList.push([handler, observer]);
    }

    off(event: MessageType, handler: Function, observer) {
        let invokerList: InvokerList = this.eventInvokerMap[event];
        if (invokerList != null) {
            for (let i = invokerList.length - 1; i >= 0; --i) {
                if (invokerList[i] != null
                && invokerList[i][0] === handler
                && invokerList[i][1] === observer) {
                    invokerList[i] = null;
                    return;
                }
            }
        }
    }
}

export var DefaultMessageDispatcher = new MessageDispatcher();

export class LoginRsp extends Message {
    buffer: [MessageType] = [MessageType.LoginRsp];
    static get Id() { return MessageType.LoginRsp; }
    get Id() { return MessageType.LoginRsp; }

    static on(handle: (m: LoginRsp) => void, observer = null) {
        DefaultMessageDispatcher.on(MessageType.LoginRsp, handle, observer);
    }
    static off(handle: (m: LoginRsp) => void, observer = null) {
        DefaultMessageDispatcher.off(MessageType.LoginRsp, handle, observer);
    }
}
MessageMap[MessageType.LoginRsp] = LoginRsp;

export class FrameNotice extends Message {
    buffer: [MessageType, number] = [MessageType.FrameNotice, 0];
    static get Id() { return MessageType.FrameNotice; }
    get Id() { return MessageType.FrameNotice; }

    static on(handle: (m: FrameNotice) => void, observer = null) {
        DefaultMessageDispatcher.on(MessageType.FrameNotice, handle, observer);
    }

    static off(handle: (m: FrameNotice) => void, observer = null) {
        DefaultMessageDispatcher.off(MessageType.FrameNotice, handle, observer);
    }
    get ms() {
        return this.buffer[1];
    }
    set ms(ms: number) {
        this.buffer[1] = ms;
    }
}
MessageMap[MessageType.FrameNotice] = FrameNotice;
