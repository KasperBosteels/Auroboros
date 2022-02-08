const { Message } = require("discord.js");

module.exports = {
  data: {
    name: "ping",
  },
  async execute(client, interaction, args) {
    await interaction.reply({
      content: `API Latency is: ${Math.round(client.ws.ping)}ms.`,
    });
    return;
  },
};
