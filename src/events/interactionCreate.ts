import { Client, Interaction } from 'discord.js';
import { handleSlash } from '../lib/slashHandler';
import { handleButton } from '../lib/buttonHandler';

export default class InteractionListner {
	client: Client;
	name: string;
	constructor(client: Client) {
		this.client = client;
		this.name = 'interactionCreate';
	}
	async exec(interaction: Interaction) {
		const inGuild = interaction.inGuild();
		if (!inGuild || !interaction.member) {
			return interaction.user.send(
				!inGuild
					? 'This command is only availble in guilds'
					: 'Member not found. Try again in a moment.'
			);
		}
		if (interaction.isCommand()) {
			handleSlash(interaction);
		} else if (interaction.isButton()) {
			handleButton(interaction);
		}
	}
}
