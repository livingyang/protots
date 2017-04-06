"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Invalid"] = -1] = "Invalid";
    MessageType[MessageType["LoginRsp"] = 0] = "LoginRsp";
    MessageType[MessageType["FrameNotice"] = 1] = "FrameNotice";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var Message = (function () {
    function Message() {
    }
    Object.defineProperty(Message, "Id", {
        get: function () { return MessageType.Invalid; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "Id", {
        get: function () { return MessageType.Invalid; },
        enumerable: true,
        configurable: true
    });
    return Message;
}());
exports.Message = Message;
// ------------ Message Generator
exports.MessageMap = {};
function GenerateMessage(buffer) {
    if (buffer != null && exports.MessageMap[buffer[0]] != null) {
        var message = new exports.MessageMap[buffer[0]];
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
exports.GenerateMessage = GenerateMessage;
var MessageDispatcher = (function () {
    function MessageDispatcher() {
        this.eventInvokerMap = {};
    }
    MessageDispatcher.prototype.emit = function (message) {
        if (message != null) {
            for (var _i = 0, _a = this.getInvokerList(message.Id); _i < _a.length; _i++) {
                var invoker = _a[_i];
                if (invoker != null && invoker[0] != null) {
                    invoker[0].call(invoker[1], message);
                }
            }
        }
    };
    MessageDispatcher.prototype.getInvokerList = function (event) {
        return this.eventInvokerMap[event] || [];
    };
    MessageDispatcher.prototype.on = function (event, handler, observer) {
        if (handler == null) {
            return;
        }
        var invokerList = this.eventInvokerMap[event];
        if (invokerList == null) {
            invokerList = this.eventInvokerMap[event] = [];
        }
        for (var i = invokerList.length - 1; i >= 0; --i) {
            if (invokerList[i] == null) {
                invokerList[i] = [handler, observer];
                return;
            }
        }
        invokerList.push([handler, observer]);
    };
    MessageDispatcher.prototype.off = function (event, handler, observer) {
        var invokerList = this.eventInvokerMap[event];
        if (invokerList != null) {
            for (var i = invokerList.length - 1; i >= 0; --i) {
                if (invokerList[i] != null
                    && invokerList[i][0] === handler
                    && invokerList[i][1] === observer) {
                    invokerList[i] = null;
                    return;
                }
            }
        }
    };
    return MessageDispatcher;
}());
exports.MessageDispatcher = MessageDispatcher;
exports.DefaultMessageDispatcher = new MessageDispatcher();
var LoginRsp = (function (_super) {
    __extends(LoginRsp, _super);
    function LoginRsp() {
        var _this = _super.apply(this, arguments) || this;
        _this.buffer = [MessageType.LoginRsp];
        return _this;
    }
    Object.defineProperty(LoginRsp, "Id", {
        get: function () { return MessageType.LoginRsp; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginRsp.prototype, "Id", {
        get: function () { return MessageType.LoginRsp; },
        enumerable: true,
        configurable: true
    });
    LoginRsp.on = function (handle, observer) {
        if (observer === void 0) { observer = null; }
        exports.DefaultMessageDispatcher.on(MessageType.LoginRsp, handle, observer);
    };
    LoginRsp.off = function (handle, observer) {
        if (observer === void 0) { observer = null; }
        exports.DefaultMessageDispatcher.off(MessageType.LoginRsp, handle, observer);
    };
    return LoginRsp;
}(Message));
exports.LoginRsp = LoginRsp;
exports.MessageMap[MessageType.LoginRsp] = LoginRsp;
var FrameNotice = (function (_super) {
    __extends(FrameNotice, _super);
    function FrameNotice() {
        var _this = _super.apply(this, arguments) || this;
        _this.buffer = [MessageType.FrameNotice, 0];
        return _this;
    }
    Object.defineProperty(FrameNotice, "Id", {
        get: function () { return MessageType.FrameNotice; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameNotice.prototype, "Id", {
        get: function () { return MessageType.FrameNotice; },
        enumerable: true,
        configurable: true
    });
    FrameNotice.on = function (handle, observer) {
        if (observer === void 0) { observer = null; }
        exports.DefaultMessageDispatcher.on(MessageType.FrameNotice, handle, observer);
    };
    FrameNotice.off = function (handle, observer) {
        if (observer === void 0) { observer = null; }
        exports.DefaultMessageDispatcher.off(MessageType.FrameNotice, handle, observer);
    };
    Object.defineProperty(FrameNotice.prototype, "ms", {
        get: function () {
            return this.buffer[1];
        },
        set: function (ms) {
            this.buffer[1] = ms;
        },
        enumerable: true,
        configurable: true
    });
    return FrameNotice;
}(Message));
exports.FrameNotice = FrameNotice;
exports.MessageMap[MessageType.FrameNotice] = FrameNotice;
