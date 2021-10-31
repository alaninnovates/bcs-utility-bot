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
var buttons_1 = require("../util/buttons");
var approval_1 = require("../util/approval");
var gradeRoles = JSON.parse(process.env.GRADE_ROLES);
exports.default = {
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var buttonMatch, _a, userId, name_1, grade, intGrade, roleId, _b, _c, _d, userId, name_2, grade;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        buttonMatch = (0, buttons_1.checkButtonId)(interaction.customId);
                        if (!buttonMatch('approve:')) return [3 /*break*/, 3];
                        _a = interaction.customId.split(':'), userId = _a[1], name_1 = _a[2], grade = _a[3];
                        interaction.update((0, approval_1.approve)(interaction.user.username + " (" + interaction.user.id + ")", name_1, userId, grade));
                        intGrade = parseInt(grade);
                        roleId = gradeRoles[intGrade === 6 ? 'six' : intGrade === 7 ? 'seven' : 'eight'];
                        _c = (_b = interaction.guild.members).fetch;
                        return [4 /*yield*/, interaction.client.users.fetch(userId)];
                    case 1: return [4 /*yield*/, _c.apply(_b, [_e.sent()])];
                    case 2:
                        (_e.sent()).roles.add([roleId, process.env.MEMBER_ROLE]);
                        return [3 /*break*/, 4];
                    case 3:
                        if (buttonMatch('deny:')) {
                            _d = interaction.customId.split(':'), userId = _d[1], name_2 = _d[2], grade = _d[3];
                            interaction.update((0, approval_1.deny)(interaction.user.username + " (" + interaction.user.id + ")", name_2, userId, grade));
                        }
                        _e.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
};
