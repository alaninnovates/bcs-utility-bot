"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaStorage = void 0;
var discord_js_1 = require("discord.js");
var MetaStorage = /** @class */ (function () {
    function MetaStorage() {
        this._commands = new discord_js_1.Collection();
        this._buttons = [];
    }
    Object.defineProperty(MetaStorage, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new MetaStorage();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    MetaStorage.clear = function () {
        this._instance = new MetaStorage();
    };
    Object.defineProperty(MetaStorage.prototype, "commands", {
        get: function () {
            return this._commands;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MetaStorage.prototype, "buttons", {
        get: function () {
            return this._buttons;
        },
        enumerable: false,
        configurable: true
    });
    MetaStorage.prototype.addCommand = function (command) {
        // console.log(command);
        this._commands.set(command.data.name, command);
    };
    MetaStorage.prototype.findCommand = function (query) {
        return this._commands.get(query);
    };
    MetaStorage.prototype.addButton = function (button) {
        this._buttons.push(button);
    };
    return MetaStorage;
}());
exports.MetaStorage = MetaStorage;
