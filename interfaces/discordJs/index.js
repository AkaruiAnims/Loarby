// Require the necessary discord.js classes
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const additional_args = process.argv.slice(2);
const token = additional_args[0];



client.once('ready', () => {
  console.log('Ready!');
});





try {
  client.login(token); 
} catch (error) {
  console.log(error);
}
