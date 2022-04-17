const discord = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const prefix = process.env.PREFIX;
module.exports = {
  name: "help",
  help: "Quick help guide for thiSSss bot.",
  arguments: " ",
  async execute(client, interaction, args) {
    let commandlist = [];
    client.commands.forEach((command) => {
      var contstructor = {
        name: command.name,
        help: command.help,
        arguments: command.arguments,
      };
      commandlist.push(contstructor);
    });

    return await interaction.reply({ embeds: [createEmbed(commandlist)] });
  },
};
function createEmbed(commands) {
  let embed = new discord.MessageEmbed();
  embed.setColor("RANDOM");
  embed.setTitle("AuroboroSSss Help.");
  for (const comm of commands) {
    embed.addField(
      comm.name,
      `${comm.help}\nusage: "${prefix}${comm.name} ${comm.arguments}"`
    );
  }
  return embed;
}
