"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buttons_1 = require("../util/buttons");
var approval_1 = require("../util/approval");
var gradeRoles = JSON.parse(process.env.GRADE_ROLES);
exports.default = {
    execute: function (interaction) {
        var buttonMatch = (0, buttons_1.checkButtonId)(interaction.customId);
        if (buttonMatch('approve:')) {
            var _a = interaction.customId.split(':'), userId = _a[1], name_1 = _a[2], grade = _a[3];
            interaction.update((0, approval_1.approve)(interaction.user.username + " (" + interaction.user.id + ")", name_1, userId, grade));
            var intGrade = parseInt(grade);
            var roleId = gradeRoles[intGrade === 6 ? 'six' : intGrade === 7 ? 'seven' : 'eight'];
            interaction.member.roles.add([
                roleId,
                process.env.MEMBER_ROLE,
            ]);
        }
        else if (buttonMatch('deny:')) {
            var _b = interaction.customId.split(':'), userId = _b[1], name_2 = _b[2], grade = _b[3];
            interaction.update((0, approval_1.deny)(interaction.user.username + " (" + interaction.user.id + ")", name_2, userId, grade));
        }
    },
};
