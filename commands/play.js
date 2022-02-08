const { Message } = require("discord.js");
module.exports = {
  data: {
    name: "play",
  },
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
    const query = args.join(" ");
    const queue = Player.createQueue(interaction.guild, {
      metadata: { channel: interaction.channel },
    });
    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      queue.destroy();
      return await interaction.reply({
        content: "i waSss unable to join the voice channel.",
      });
    }
    const track = await Player.search(query, {
      requestedBy: interaction.user,
    }).then((x) => x.tracks[0]);
    if (!track)
      return await interaction.reply({
        content: "I waSSssn't able to find that.",
      });
    queue.play(track);
    return await interaction.reply({
      content: `SssssSSsssSsss ***${track.title}***`,
    });
  },
};
