import {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	Message,
	TextChannel,
	Interaction,
} from 'discord.js';
import { Command } from '../types/Command';
import {
	SlashCommandBuilder,
	SlashCommandNumberOption,
	SlashCommandStringOption,
} from '@discordjs/builders';

const VERIFICATION_CHANNEL = '891118763049627708';

export default {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Prove you are a student of BCS')
		.addStringOption((option: SlashCommandStringOption) =>
			option
				.setName('name')
				.setDescription('Your real name')
				.setRequired(true)
		)
		.addNumberOption((option: SlashCommandNumberOption) =>
			option
				.setName('grade')
				.setDescription('Your grade level')
				.setRequired(true)
		),
	async execute(interaction) {
		const name = interaction.options.getString('name', true);
		const grade = interaction.options.getInteger('grade', true);
		await interaction.deferReply({ ephemeral: true });
		const msg = (await interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setTitle('Confirm your info')
					.setDescription(
						'Please confirm that this information is correct.'
					)
					.addField('Name', name)
					.addField('Grade', grade.toString()),
			],
			components: [
				new MessageActionRow().addComponents(
					new MessageButton()
						.setCustomId('yes')
						.setLabel('Yes')
						.setStyle('SUCCESS'),
					new MessageButton()
						.setCustomId(`no`)
						.setLabel('No')
						.setStyle('DANGER')
				),
			],
		})) as Message;
		try {
			const userConfirmation = await msg.awaitMessageComponent({
				filter: (i: Interaction) =>
					i.isButton() &&
					(i.customId === 'yes' || i.customId === 'no') &&
					i.user.id === interaction.user.id,
				componentType: 'BUTTON',
				time: 10000,
			});
			if (userConfirmation.isButton()) {
				if (userConfirmation.customId === 'yes') {
					interaction.editReply({
						embeds: [
							new MessageEmbed()
								.setTitle('Done!')
								.setDescription(
									'You will be put into an approval queue for verification. Once verified, you will have access to the server. In the meanwhile, read the rules!'
								)
								.setColor('GREEN'),
						],
						components: [],
					});
					const verificationChannel =
						(interaction.client.channels.cache.get(
							VERIFICATION_CHANNEL
						) ||
							(await interaction.client.channels.fetch(
								VERIFICATION_CHANNEL
							))) as TextChannel;
					verificationChannel.send({
						embeds: [
							new MessageEmbed()
								.setTitle('Awaiting approval')
								.setDescription('A new student wants to join!')
								.addField('Name', name)
								.addField('Grade', grade.toString())
								.setColor('BLUE'),
						],
						components: [
							new MessageActionRow().addComponents(
								new MessageButton()
									.setCustomId(
										`approve:${interaction.user.id}:${name}:${grade}`
									)
									.setLabel('Approve')
									.setStyle('SUCCESS'),
								new MessageButton()
									.setCustomId(
										`deny:${interaction.user.id}:${name}:${grade}`
									)
									.setLabel('Deny')
									.setStyle('DANGER')
							),
						],
					});
				} else if (userConfirmation.customId === 'no') {
					return interaction.editReply({
						embeds: [
							new MessageEmbed()
								.setTitle('Oops!')
								.setDescription(
									'You denied your information, you may now try again.'
								)
								.setColor('RED'),
						],
						components: [],
					});
				}
			}
		} catch (e) {
			console.error(e);
			return interaction.editReply({
				embeds: [
					new MessageEmbed()
						.setTitle('Time ran out!')
						.setDescription(
							'Please respond within 10 seconds next time!'
						)
						.setColor('RED'),
				],
				components: [],
			});
		}
	},
} as Command;
