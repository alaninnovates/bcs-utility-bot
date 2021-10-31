"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var discord_js_1 = require("discord.js");
var dotenv_1 = require("dotenv");
var MetaStorage_1 = require("./lib/MetaStorage");
(0, dotenv_1.config)();
var client = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var eventFiles, _loop_1, _i, eventFiles_1, file, commandFiles, _a, commandFiles_1, file, command, buttonFiles, _b, buttonFiles_1, file, button;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                eventFiles = fs_1.default
                    .readdirSync('./dist/events')
                    .filter(function (file) { return file.endsWith('.js'); });
                _loop_1 = function (file) {
                    var event_1;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./events/" + file)); })];
                            case 1:
                                event_1 = new (_d.sent()).default(client);
                                //console.log(event);
                                if (event_1.once) {
                                    client.once(event_1.name, function () {
                                        var args = [];
                                        for (var _i = 0; _i < arguments.length; _i++) {
                                            args[_i] = arguments[_i];
                                        }
                                        return event_1.exec.apply(event_1, args);
                                    });
                                }
                                else {
                                    client.on(event_1.name, function () {
                                        var args = [];
                                        for (var _i = 0; _i < arguments.length; _i++) {
                                            args[_i] = arguments[_i];
                                        }
                                        return event_1.exec.apply(event_1, args);
                                    });
                                }
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, eventFiles_1 = eventFiles;
                _c.label = 1;
            case 1:
                if (!(_i < eventFiles_1.length)) return [3 /*break*/, 4];
                file = eventFiles_1[_i];
                return [5 /*yield**/, _loop_1(file)];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                commandFiles = fs_1.default
                    .readdirSync('./dist/commands')
                    .filter(function (file) { return file.endsWith('.js'); });
                _a = 0, commandFiles_1 = commandFiles;
                _c.label = 5;
            case 5:
                if (!(_a < commandFiles_1.length)) return [3 /*break*/, 8];
                file = commandFiles_1[_a];
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./commands/" + file)); })];
            case 6:
                command = (_c.sent()).default;
                MetaStorage_1.MetaStorage.instance.addCommand(command);
                _c.label = 7;
            case 7:
                _a++;
                return [3 /*break*/, 5];
            case 8:
                buttonFiles = fs_1.default
                    .readdirSync('./dist/buttons')
                    .filter(function (file) { return file.endsWith('.js'); });
                _b = 0, buttonFiles_1 = buttonFiles;
                _c.label = 9;
            case 9:
                if (!(_b < buttonFiles_1.length)) return [3 /*break*/, 12];
                file = buttonFiles_1[_b];
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./buttons/" + file)); })];
            case 10:
                button = (_c.sent()).default;
                MetaStorage_1.MetaStorage.instance.addButton(button);
                _c.label = 11;
            case 11:
                _b++;
                return [3 /*break*/, 9];
            case 12: return [2 /*return*/];
        }
    });
}); })();
client.login(process.env.DISCORD_TOKEN);
