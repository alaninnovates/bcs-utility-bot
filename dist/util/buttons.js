"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkButtonId = void 0;
var checkButtonId = function (buttonId) {
    return function (prefix) {
        return new RegExp(prefix + "([^s]+)").exec(buttonId);
    };
};
exports.checkButtonId = checkButtonId;
