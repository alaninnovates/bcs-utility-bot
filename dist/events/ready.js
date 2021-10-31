"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReadyListner = /** @class */ (function () {
    function ReadyListner(client) {
        this.client = client;
        this.once = true;
        this.name = 'ready';
    }
    ReadyListner.prototype.exec = function () {
        console.log("Logged in as " + this.client.user.username);
    };
    return ReadyListner;
}());
exports.default = ReadyListner;
