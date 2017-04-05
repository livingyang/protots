"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MessageId;
(function (MessageId) {
    MessageId[MessageId["Invalid"] = -1] = "Invalid";
    MessageId[MessageId["LoginRsp"] = 0] = "LoginRsp";
    MessageId[MessageId["FrameNotice"] = 1] = "FrameNotice";
    MessageId[MessageId["UserDataNotice"] = 2] = "UserDataNotice";
    MessageId[MessageId["MatchingSuccessRsp"] = 3] = "MatchingSuccessRsp";
    MessageId[MessageId["GetWalletReq"] = 4] = "GetWalletReq";
    MessageId[MessageId["TestObjectReq"] = 5] = "TestObjectReq";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
var Message = (function () {
    function Message() {
    }
    Message.prototype.getId = function () {
        return MessageId.Invalid;
    };
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
            console.log("GenerateMessage faild, buffer: " + JSON.stringify(buffer));
            return new Message();
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
            for (var _i = 0, _a = this.getInvokerList(message.getId()); _i < _a.length; _i++) {
                var invoker = _a[_i];
                invoker.handler.call(invoker.target, message);
            }
        }
    };
    MessageDispatcher.prototype.getInvokerList = function (event) {
        return this.eventInvokerMap[event] || [];
    };
    MessageDispatcher.prototype.on = function (event, target, handler) {
        if (handler === void 0) { handler = target[event]; }
        if (handler == null) {
            throw "Client.on event: " + event + ", handle is null";
        }
        if (this.eventInvokerMap[event] == null) {
            this.eventInvokerMap[event] = [];
        }
        if (target != null) {
            this.eventInvokerMap[event].push({ target: target, handler: handler });
        }
    };
    MessageDispatcher.prototype.off = function (event, target, handler) {
        if (handler === void 0) { handler = target[event]; }
        if (this.eventInvokerMap[event] != null) {
            this.eventInvokerMap[event] = this.eventInvokerMap[event].filter(function (v, i, a) {
                return (target !== v.target || handler !== v.handler);
            });
        }
    };
    return MessageDispatcher;
}());
exports.MessageDispatcher = MessageDispatcher;
exports.defaultMessageDispatcher = new MessageDispatcher();
var LoginRsp = (function (_super) {
    __extends(LoginRsp, _super);
    function LoginRsp() {
        var _this = _super.apply(this, arguments) || this;
        _this.buffer = [MessageId.LoginRsp];
        return _this;
    }
    LoginRsp.on = function (observer, handle) {
        exports.defaultMessageDispatcher.on(MessageId.LoginRsp, observer, handle);
    };
    LoginRsp.off = function (observer, handle) {
        exports.defaultMessageDispatcher.off(MessageId.LoginRsp, observer, handle);
    };
    return LoginRsp;
}(Message));
exports.LoginRsp = LoginRsp;
exports.MessageMap[MessageId.LoginRsp] = LoginRsp;
var FrameNotice = (function (_super) {
    __extends(FrameNotice, _super);
    function FrameNotice() {
        var _this = _super.apply(this, arguments) || this;
        _this.buffer = [MessageId.FrameNotice, 0];
        return _this;
    }
    FrameNotice.on = function (observer, handle) {
        exports.defaultMessageDispatcher.on(MessageId.FrameNotice, observer, handle);
    };
    FrameNotice.off = function (observer, handle) {
        exports.defaultMessageDispatcher.off(MessageId.FrameNotice, observer, handle);
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
exports.MessageMap[MessageId.FrameNotice] = FrameNotice;
