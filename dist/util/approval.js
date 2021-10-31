"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deny = exports.approve = void 0;
var discord_js_1 = require("discord.js");
var approve = function (user, name, userId, grade) {
    return {
        embeds: [
            new discord_js_1.MessageEmbed()
                .setTitle('Approved!')
                .setDescription('This student has been approved access to the server.')
                .addField('Name', name)
                .addField('Grade', grade)
                .addField('Student user id', userId)
                .addField('Approved by', user)
                .setColor('GREEN'),
        ],
        components: [],
    };
};
exports.approve = approve;
var deny = function (user, name, userId, grade) {
    return {
        embeds: [
            new discord_js_1.MessageEmbed()
                .setTitle('Denied!')
                .setDescription('This student has been denied access to the server.')
                .addField('Name', name)
                .addField('Grade', grade)
                .addField('Student user id', userId)
                .addField('Denied by', user)
                .setColor('RED'),
        ],
        components: [],
    };
};
exports.deny = deny;
