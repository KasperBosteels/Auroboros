module.exports = {
  name: "skip",
  help: "SSskipsss the current song",
  arguments: " ",
  async execute(client, interaction, args, Player) {
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: "You need to be in a voice channel.",
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content: "We are not in the Ssssame voice channel.",
        ephemeral: true,
      });
  },
};
