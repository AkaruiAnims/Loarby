// Require the necessary discord.js classes
import { Client, GatewayIntentBits } from 'discord.js';

// Create a new client instance
export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login("OTc2OTg2NzQ1NDQ5MTExNTc0.GAGSuc.3h17xWfDNC6zaWy_JG66SeV6Hjm1TQqqYysl8g");
