import { GuildMember } from 'discord.js';
import { Button } from '../types/Button';
import { checkButtonId } from '../util/buttons';
import { approve, deny } from '../util/approval';

const gradeRoles = JSON.parse(process.env.GRADE_ROLES!);

export default {
	async execute(interaction) {
		const buttonMatch = checkButtonId(interaction.customId);
		if (buttonMatch('approve:')) {
			const [, userId, name, grade] = interaction.customId.split(':');
			interaction.update(
				approve(
					`${interaction.user.username} (${interaction.user.id})`,
					name,
					userId,
					grade
				)
			);
			const intGrade = parseInt(grade);
			const roleId =
				gradeRoles[
					intGrade === 6 ? 'six' : intGrade === 7 ? 'seven' : 'eight'
				];
			(
				await interaction.guild!.members.fetch(
					await interaction.client.users.fetch(userId)
				)
			).roles.add([roleId, process.env.MEMBER_ROLE!]);
		} else if (buttonMatch('deny:')) {
			const [, userId, name, grade] = interaction.customId.split(':');
			interaction.update(
				deny(
					`${interaction.user.username} (${interaction.user.id})`,
					name,
					userId,
					grade
				)
			);
		}
	},
} as Button;
