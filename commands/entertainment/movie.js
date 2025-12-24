const { SlashCommandBuilder, Interaction } = require("discord.js");
const {
  searchByQuery,
  searchByID,
} = require("../../services/tmdb/tmdb_service");
const movieGenre = require("../../tmdb_data/tmdb_genres/movie_genre.json");
const singleItemEmbed = require("../../helpers/embeds/singleItemEmbed");

const TMDB_SEARCH_BASE = "https://www.themoviedb.org/movie";

const movieCommand = new SlashCommandBuilder()
  .setName("movie")
  .setDescription("Search for a movie")
  .addStringOption((option) =>
    option.setName("query").setDescription("Movie name").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("id").setDescription("Search a movie by its ID")
  );

/**
 * @param {Interaction} interaction
 */
async function execute(interaction) {
  const query = interaction.options.getString("query");
  const id = interaction.options.getString("id");

  let item = {};

  if (!id) {
    const data = await searchByQuery("movie", query);

    if (!data.results || data.results.length === 0) {
      return interaction.reply({
        content: "No TV shows found.",
        ephemeral: true,
      });
    }

    item = data.results[0];
  } else {
    item = await searchByID("movie", id);
  }

  const genreIds = item.genre_ids ?? item.genres?.map((g) => g.id) ?? [];

  const genres = genreIds
    .map(String)
    .map((id) => movieGenre[id])
    .filter(Boolean)
    .join(", ");

  const embedData = {
    title: item.title,
    id: `${item.id}`,
    overview: item.overview,
    posterPath: item.poster_path,
    releaseDate: item.release_date,
    type: "Movie",
    genres,
    rating: item.vote_average,
    searchURI: `${TMDB_SEARCH_BASE}/${item.id}`,
    user: interaction.user.tag,
  };

  const embed = singleItemEmbed(embedData);

  await interaction.reply({ embeds: [embed] });
}

module.exports = {
  data: movieCommand,
  execute,
};
