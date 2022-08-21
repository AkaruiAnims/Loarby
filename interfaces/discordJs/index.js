// Require the necessary discord.js classes
import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let additional_args = process.argv.slice(2);
let token = additional_args[0];


// When the client is ready, run this code (only once)
  client.once('ready', () => {
    console.log('Ready!');
  });

try {
  client.login(token); 
} catch (error) {
  console.log(error);
}
