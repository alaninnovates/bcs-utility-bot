import { CommandInteraction } from 'discord.js';
import { MetaStorage } from './MetaStorage';

export const handleSlash = (interaction: CommandInteraction) => {
	const command = MetaStorage.instance.commands.get(interaction.commandName);
	if (!command) return;
	command.execute(interaction);
};
