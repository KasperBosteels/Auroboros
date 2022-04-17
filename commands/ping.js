const { Message } = require("discord.js");

module.exports = {
  name: "ping",
  help: "gives you the ping of the bot's api.",
  arguments: " ",
  async execute(client, interaction, args) {
    await interaction.reply({
      content: `API Latency is: ${Math.round(client.ws.ping)}ms.`,
    });
    return;
  },
};
