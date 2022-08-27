// Require the necessary discord.js classes
import { Client, GatewayIntentBits } from 'discord.js';
import { loarbUtils } from '../../main.js';

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    ], 
  });

const additional_args = process.argv.slice(2);
const TOKEN = additional_args[0];

client.login(TOKEN);


client.once('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
});



client.on('messageCreate', (message) => {
  loarbUtils.commandLog(message, `${process.cwd()}/commandLog.txt`); 
});
