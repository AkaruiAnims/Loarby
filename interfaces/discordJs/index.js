// Require the necessary discord.js classes
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const additional_args = process.argv.slice(2);
const token = additional_args[0];

client.once('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', message => {
  if (message.content === "/avatar") {
    const embed = new RichEmbed()
    .setTitle('Avatar!')
    .setAuthor("Your Avatar", message.author.avatarURL)
    .setImage(message.author.avatarURL)
    .setColor('RANDOM')
    .setDescription('Avatar URL')
   message.reply(embed)
  }
});


  client.login(token); 
