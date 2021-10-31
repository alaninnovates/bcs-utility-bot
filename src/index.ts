import fs from 'fs';
import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';
import { MetaStorage } from './lib/MetaStorage';

config();

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

(async () => {
	const eventFiles = fs
		.readdirSync('./dist/events')
		.filter((file) => file.endsWith('.js'));
	// console.log(JSON.parse(process.env.GRADE_ROLES!));
	// console.log(eventFiles);
	for (const file of eventFiles) {
		//console.log(file);
		//console.log((await import(`./events/${file}`)).default);
		const event = new (await import(`./events/${file}`)).default(client);
		//console.log(event);
		if (event.once) {
			client.once(event.name, (...args) => event.exec(...args));
		} else {
			client.on(event.name, (...args) => event.exec(...args));
		}
	}

	const commandFiles = fs
		.readdirSync('./dist/commands')
		.filter((file) => file.endsWith('.js'));
	// console.log(commandFiles);
	for (const file of commandFiles) {
		const command = (await import(`./commands/${file}`)).default;
		MetaStorage.instance.addCommand(command);
	}

	const buttonFiles = fs
		.readdirSync('./dist/buttons')
		.filter((file) => file.endsWith('.js'));

	for (const file of buttonFiles) {
		const button = (await import(`./buttons/${file}`)).default;
		MetaStorage.instance.addButton(button);
	}
})();

client.login(process.env.DISCORD_TOKEN);
