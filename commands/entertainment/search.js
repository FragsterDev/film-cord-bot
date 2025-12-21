const { SlashCommandBuilder, Interaction } = require("discord.js");

const commandData = new SlashCommandBuilder()
  .setName("search")
  .setDescription("Search For Movie or TV Shows");

/**
 *
 * @param {Interaction} interaction
 */
const execute = async (interaction) => {
  await interaction.reply("Command executed");
};

module.exports = {
  data: commandData,
  execute,
};
