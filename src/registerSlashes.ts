import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { config } from 'dotenv';
import { ApplicationCommandData } from 'discord.js';

config();

const GUILD_ID = '891115669276471356';
const CLIENT_ID = '891119865631477771';

const commands: ApplicationCommandData[] = [
	{
		name: 'verify',
		description: 'Prove you are a student, prevents bots',
		options: [
			{
				name: 'name',
				description: 'Your real name',
				type: 3,
				required: true,
			},
			{
				name: 'grade',
				description: 'Your grade level',
				type: 4,
				required: true,
			},
		],
	},
];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
			body: commands,
		});

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
