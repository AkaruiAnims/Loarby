import { Client, GatewayIntentBits, Partials } from "discord.js";

class loarbyCord {

  constructor(token) {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
      partials: [Partials.Channel]
    });

    this.client.once("ready", () => {
      console.log(`[ LoarbyDiscord ] Logged in as ${this.client.user.tag}`);
    });

    this.client.on("messageCreate", (message) => this.onMessage(message));

    // console.log(token);
    this.client.login(token);
  }

  async onMessage(message) {
    if (message.author.bot) return; // ignore bots

    // MVP commands
    if (message.content === "!ping") {
      message.reply("pong 🏓");
    } else if (message.content === "!update") {
      // example: trigger loarby update from Discord
      if (this.loarbyCore) {
        await this.loarbyCore.Update(); // rename to something else
        message.reply("Loarby core updated ✅");
      }
    } else if ( message.content == "!shutdown" ) {
      await message.reply("Bye <3");
      this.client.destroy();
    }
  }

  attachCore(coreInstance) {
    // attach your loarbyInitializer instance
    this.loarbyCore = coreInstance;
  }
}

export { loarbyCord };
