"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSlash = void 0;
var MetaStorage_1 = require("./MetaStorage");
var handleSlash = function (interaction) {
    var command = MetaStorage_1.MetaStorage.instance.commands.get(interaction.commandName);
    if (!command)
        return;
    command.execute(interaction);
};
exports.handleSlash = handleSlash;
