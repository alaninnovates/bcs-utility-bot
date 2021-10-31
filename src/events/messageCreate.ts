import { Client, Message } from 'discord.js';

export default class MessageListner {
	client: Client;
	name: string;
	// private _cooldowns: Collection<string, Collection<string, number>> =
	// new Collection();
	constructor(client: Client) {
		this.client = client;
		this.name = 'messageCreate';
	}
	async exec(message: Message) {
		// todo: do something
		// console.log(message.content);
	}
}
