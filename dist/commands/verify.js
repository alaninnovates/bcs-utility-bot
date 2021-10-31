"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var builders_1 = require("@discordjs/builders");
var VERIFICATION_CHANNEL = '891118763049627708';
exports.default = {
    data: new builders_1.SlashCommandBuilder()
        .setName('verify')
        .setDescription('Prove you are a student of BCS')
        .addStringOption(function (option) {
        return option
            .setName('name')
            .setDescription('Your real name')
            .setRequired(true);
    })
        .addNumberOption(function (option) {
        return option
            .setName('grade')
            .setDescription('Your grade level')
            .setRequired(true);
    }),
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var name, grade, msg, userConfirmation, verificationChannel, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        name = interaction.options.getString('name', true);
                        grade = interaction.options.getInteger('grade', true);
                        return [4 /*yield*/, interaction.deferReply({ ephemeral: true })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, interaction.editReply({
                                embeds: [
                                    new discord_js_1.MessageEmbed()
                                        .setTitle('Confirm your info')
                                        .setDescription('Please confirm that this information is correct.')
                                        .addField('Name', name)
                                        .addField('Grade', grade.toString()),
                                ],
                                components: [
                                    new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                                        .setCustomId('yes')
                                        .setLabel('Yes')
                                        .setStyle('SUCCESS'), new discord_js_1.MessageButton()
                                        .setCustomId("no")
                                        .setLabel('No')
                                        .setStyle('DANGER')),
                                ],
                            })];
                    case 2:
                        msg = (_b.sent());
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, , 10]);
                        return [4 /*yield*/, msg.awaitMessageComponent({
                                filter: function (i) {
                                    return i.isButton() &&
                                        (i.customId === 'yes' || i.customId === 'no') &&
                                        i.user.id === interaction.user.id;
                                },
                                componentType: 'BUTTON',
                                time: 10000,
                            })];
                    case 4:
                        userConfirmation = _b.sent();
                        if (!userConfirmation.isButton()) return [3 /*break*/, 8];
                        if (!(userConfirmation.customId === 'yes')) return [3 /*break*/, 7];
                        interaction.editReply({
                            embeds: [
                                new discord_js_1.MessageEmbed()
                                    .setTitle('Done!')
                                    .setDescription('You will be put into an approval queue for verification. Once verified, you will have access to the server. In the meanwhile, read the rules!')
                                    .setColor('GREEN'),
                            ],
                            components: [],
                        });
                        _a = interaction.client.channels.cache.get(VERIFICATION_CHANNEL);
                        if (_a) return [3 /*break*/, 6];
                        return [4 /*yield*/, interaction.client.channels.fetch(VERIFICATION_CHANNEL)];
                    case 5:
                        _a = (_b.sent());
                        _b.label = 6;
                    case 6:
                        verificationChannel = (_a);
                        verificationChannel.send({
                            embeds: [
                                new discord_js_1.MessageEmbed()
                                    .setTitle('Awaiting approval')
                                    .setDescription('A new student wants to join!')
                                    .addField('Name', name)
                                    .addField('Grade', grade.toString())
                                    .setColor('BLUE'),
                            ],
                            components: [
                                new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                                    .setCustomId("approve:" + interaction.user.id + ":" + name + ":" + grade)
                                    .setLabel('Approve')
                                    .setStyle('SUCCESS'), new discord_js_1.MessageButton()
                                    .setCustomId("deny:" + interaction.user.id + ":" + name + ":" + grade)
                                    .setLabel('Deny')
                                    .setStyle('DANGER')),
                            ],
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        if (userConfirmation.customId === 'no') {
                            return [2 /*return*/, interaction.editReply({
                                    embeds: [
                                        new discord_js_1.MessageEmbed()
                                            .setTitle('Oops!')
                                            .setDescription('You denied your information, you may now try again.')
                                            .setColor('RED'),
                                    ],
                                    components: [],
                                })];
                        }
                        _b.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [2 /*return*/, interaction.editReply({
                                embeds: [
                                    new discord_js_1.MessageEmbed()
                                        .setTitle('Time ran out!')
                                        .setDescription('Please respond within 10 seconds next time!')
                                        .setColor('RED'),
                                ],
                                components: [],
                            })];
                    case 10: return [2 /*return*/];
                }
            });
        });
    },
};
