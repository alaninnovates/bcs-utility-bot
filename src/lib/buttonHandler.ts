import { ButtonInteraction } from 'discord.js';
import { MetaStorage } from './MetaStorage';

export const handleButton = (interaction: ButtonInteraction) => {
	MetaStorage.instance.buttons.forEach((button) => {
		button.execute(interaction);
	});
};
