// const { SlashCommandBuilder, Interaction } = require("discord.js");
// const search = require("../../services/tmdb/tmdb_service");

// const commandData = new SlashCommandBuilder()
//   .setName("search")
//   .setDescription("Search For Movie or TV Shows")
//   .addStringOption((option) =>
//     option
//       .setName("type")
//       .setDescription("Choose what to search")
//       .setRequired(true)
//       .addChoices(
//         { name: "Movie", value: "movie" },
//         { name: "TV show", value: "tv" }
//       )
//   )
//   .addStringOption((option) =>
//     option
//       .setName("query")
//       .setDescription("Name of the movie or tv show")
//       .setRequired(true)
//   );

// /**
//  *
//  * @param {Interaction} interaction
//  */
// const execute = async (interaction) => {
//   const type = interaction.options.getString("type");
//   const query = interaction.options.getString("query");

//   const data = await search(type, query);
//   console.log(data);
// };

// module.exports = {
//   data: commandData,
//   execute,
// };
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const search = require("../../services/tmdb/tmdb_service");

const commandData = new SlashCommandBuilder()
  .setName("search")
  .setDescription("Search for a movie or TV show")
  .addStringOption((option) =>
    option
      .setName("type")
      .setDescription("Movie or TV")
      .setRequired(true)
      .addChoices(
        { name: "Movie", value: "movie" },
        { name: "TV Show", value: "tv" }
      )
  )
  .addStringOption((option) =>
    option.setName("query").setDescription("Search query").setRequired(true)
  );

/**
 * @param {import("discord.js").ChatInputCommandInteraction} interaction
 */
const execute = async (interaction) => {
  const type = interaction.options.getString("type");
  const query = interaction.options.getString("query");

  await interaction.deferReply();

  const data = await search(type, query);
  const results = data.results ?? [];

  if (results.length === 0) {
    return interaction.editReply("❌ No results found.");
  }

  // 🟢 CASE 1: ONLY ONE RESULT → SHOW DETAILS
  if (results.length === 1) {
    const item = results[0];

    return interaction.editReply({
      embeds: [
        {
          title: item.title || item.name,
          description: item.overview || "No description available.",
          color: 0x57f287,
          fields: [
            {
              name: "Release Date",
              value: item.release_date || item.first_air_date || "Unknown",
              inline: true,
            },
            {
              name: "Rating",
              value: item.vote_average?.toString() || "N/A",
              inline: true,
            },
            {
              name: "TMDB ID",
              value: item.id.toString(),
              inline: true,
            },
          ],
        },
      ],
    });
  }

  // 🟡 CASE 2: MULTIPLE RESULTS → PAGINATED LIST
  let page = 0;
  const pageSize = 8;

  const getPage = () => {
    const start = page * pageSize;
    const slice = results.slice(start, start + pageSize);

    const description = slice
      .map((item, i) => {
        const title = item.title || item.name;
        const year =
          (item.release_date || item.first_air_date || "").split("-")[0] ||
          "Unknown";

        return (
          `**${start + i + 1}. ${title} (${year})\n**` +
          "`" +
          `ID: ${item.id}` +
          "`"
        );
      })
      .join("\n");

    return {
      embeds: [
        {
          title: `Search results for "${query}"`,
          description,
          color: 0x5865f2,
          footer: {
            text: `Page ${page + 1} of ${Math.ceil(
              results.length / pageSize
            )} • Use /movie <id> for details`,
          },
        },
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("prev")
            .setLabel("⬅ Prev")
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(page === 0),
          new ButtonBuilder()
            .setCustomId("next")
            .setLabel("Next ➡")
            .setStyle(ButtonStyle.Secondary)
            .setDisabled((page + 1) * pageSize >= results.length)
        ),
      ],
    };
  };

  const message = await interaction.editReply(getPage());

  const collector = message.createMessageComponentCollector({ time: 60_000 });

  collector.on("collect", async (btn) => {
    if (btn.user.id !== interaction.user.id) {
      return btn.reply({
        content: "This menu isn't for you.",
        ephemeral: true,
      });
    }

    if (btn.customId === "next") page++;
    if (btn.customId === "prev") page--;

    await btn.update(getPage());
  });

  collector.on("end", async () => {
    await interaction.editReply({ components: [] });
  });
};

module.exports = {
  data: commandData,
  execute,
};
