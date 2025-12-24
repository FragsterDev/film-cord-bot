const { SlashCommandBuilder, Interaction } = require("discord.js");
const {
  searchByQuery,
  searchByID,
} = require("../../services/tmdb/tmdb_service");
const tvGenre = require("../../tmdb_data/tmdb_genres/tv_genre.json");
const singleItemEmbed = require("../../helpers/embeds/singleItemEmbed");

const TMDB_SEARCH_BASE = "https://www.themoviedb.org/tv";

const tvCommand = new SlashCommandBuilder()
  .setName("tv")
  .setDescription("Search for a TV show")
  .addStringOption((option) =>
    option.setName("query").setDescription("TV show name").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("id").setDescription("Search a TV Show by its ID")
  );

/**
 * @param {Interaction} interaction
 */
async function execute(interaction) {
  await interaction.deferReply();

  const query = interaction.options.getString("query");
  const id = interaction.options.getString("id");

  let item = {};

  if (!id) {
    const data = await searchByQuery("tv", query);

    if (!data.results || data.results.length === 0) {
      return await interaction.editReply({
        content: "No TV shows found.",
      });
    }

    item = data.results[0];
  } else {
    item = await searchByID("tv", id);

    if (!item) {
      return await interaction.editReply("No TV Shows found.");
    }
  }

  const genreIds = item.genre_ids ?? item.genres?.map((g) => g.id) ?? [];

  const genres = genreIds
    .map(String)
    .map((id) => tvGenre[id])
    .filter(Boolean)
    .join(", ");

  const embedData = {
    title: item.name || item.original_name,
    id: `${item.id}`,
    overview: item.overview,
    posterPath: item.poster_path,
    releaseDate: item.first_air_date,
    type: "TV Show",
    genres,
    rating: item.vote_average,
    searchURI: `${TMDB_SEARCH_BASE}/${item.id}`,
    user: interaction.user.tag,
  };

  const embed = singleItemEmbed(embedData);

  await interaction.editReply({ embeds: [embed] });
}

module.exports = {
  data: tvCommand,
  execute,
};
