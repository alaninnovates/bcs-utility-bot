"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleButton = void 0;
var MetaStorage_1 = require("./MetaStorage");
var handleButton = function (interaction) {
    MetaStorage_1.MetaStorage.instance.buttons.forEach(function (button) {
        button.execute(interaction);
    });
};
exports.handleButton = handleButton;
