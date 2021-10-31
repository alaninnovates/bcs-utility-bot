import { MessageEmbed } from 'discord.js';

export const approve = (
	user: string,
	name: string,
	userId: string,
	grade: string
) => {
	return {
		embeds: [
			new MessageEmbed()
				.setTitle('Approved!')
				.setDescription(
					'This student has been approved access to the server.'
				)
				.addField('Name', name)
				.addField('Grade', grade)
				.addField('Student user id', userId)
				.addField('Approved by', user)
				.setColor('GREEN'),
		],
		components: [],
	};
};

export const deny = (
	user: string,
	name: string,
	userId: string,
	grade: string
) => {
	return {
		embeds: [
			new MessageEmbed()
				.setTitle('Denied!')
				.setDescription(
					'This student has been denied access to the server.'
				)
				.addField('Name', name)
				.addField('Grade', grade)
				.addField('Student user id', userId)
				.addField('Denied by', user)
				.setColor('RED'),
		],
		components: [],
	};
};
