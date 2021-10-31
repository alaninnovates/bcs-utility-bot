import { Collection } from 'discord.js';
import { Command } from '../types/Command';
import { Button } from '../types/Button';

export class MetaStorage {
	private static _instance: MetaStorage;
	private _commands: Collection<string, Command> = new Collection();
	private _buttons: Button[] = [];

	static get instance() {
		if (!this._instance) {
			this._instance = new MetaStorage();
		}
		return this._instance;
	}

	static clear() {
		this._instance = new MetaStorage();
	}

	get commands() {
		return this._commands;
	}

	get buttons() {
		return this._buttons;
	}

	addCommand(command: Command) {
		// console.log(command);
		this._commands.set(command.data.name, command);
	}

	findCommand(query: string) {
		return this._commands.get(query);
	}

	addButton(button: Button) {
		this._buttons.push(button);
	}
}
