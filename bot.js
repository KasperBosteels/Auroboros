const { Client, Collection, Intents } = require("discord.js");
const fs = require("fs");
require("dotenv").config();
const PREFIX = process.env.PREFIX;
const { Player } = require("discord-player");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const player = new Player(client);
client.commands = new Collection();

//get command files
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

//load commands into collection
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  console.log(`${command.data.name} file loaded.`);
}

//once bot ready to receive commands send log
client.once("ready", () => {
  console.log("𓆙 SSsssslithering into your SSssserver 𓆙");
});

client.on("messageCreate", async (Interaction) => {
  if (Interaction.author.bot || !Interaction.content.startsWith("ss")) return;

  let args = Interaction.content.slice(PREFIX.length).toLowerCase().split(" ");
  let commandRequest = args.shift();
  const command = client.commands.get(commandRequest);
  //on interaction attempt to execute command
  try {
    if (commandRequest == "play" || commandRequest == "stop") {
      await command.execute(client, Interaction, args, player);
    } else {
      await command.execute(client, Interaction, args);
    }
  } catch (error) {
    console.error(error);
    await Interaction.reply({
      content: "i'm SSSssssorry i failed doing that.  𓆙",
    });
  }
});
//once player starts playing trigger
player.on("trackStart", (queue, track) => {
  queue.metadata.channel.send({
    content: `:musical_note: ***${track.title}***`,
  });
});

//login
client.login(process.env.DISCORD_TOKEN);
