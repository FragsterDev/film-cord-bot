const { SlashCommandBuilder, Interaction } = require("discord.js");
const { searchByQuery } = require("../../services/tmdb/tmdb_service");
const movieGenre = require("../../tmdb_data/tmdb_genres/movie_genre.json");
const tvGenre = require("../../tmdb_data/tmdb_genres/tv_genre.json");
const singleItemEmbed = require("../../helpers/embeds/singleItemEmbed");

const TMDB_SEARCH_BASE = "https://www.themoviedb.org/";

const searchCommand = new SlashCommandBuilder()
  .setName("search")
  .setDescription("Search a Movie or TV show")
  .addStringOption((option) =>
    option
      .setName("type")
      .setDescription("What to search")
      .addChoices(
        { name: "Movie", value: "movie" },
        { name: "TV Show", value: "tv" }
      )
      .setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("query").setDescription("Search Query").setRequired(true)
  );

/**
 *
 * @param {Interaction} interaction
 */
async function execute(interaction) {
  const type = interaction.options.getString("type");
  const query = interaction.options.getString("query");

  const data = await searchByQuery(type, query);

  // console.log(">>>>>>>API Data", data);

  const item = data.results[0];

  let genres = "";

  if (type === "movie") {
    genres =
      "Movie, " +
      item.genre_ids
        .map(String)
        .map((id) => movieGenre[id])
        .filter(Boolean)
        .join(", ");
  } else {
    genres =
      "TV Show, " +
      item.genre_ids
        .map(String)
        .map((id) => tvGenre[id])
        .filter(Boolean)
        .join(", ");
  }

  const searchURI = `${TMDB_SEARCH_BASE}${type}/${item.id}`;

  const embedData = {
    title: type === "movie" ? item.title : item.original_name,
    overview: item.overview,
    posterPath: item.poster_path,
    releaseDate: type === "movie" ? item.release_date : item.first_air_date,
    genres,
    rating: item.vote_average,
    searchURI,
    user: interaction.user.tag,
  };

  const embed = singleItemEmbed(embedData);

  await interaction.reply({ embeds: [embed] });
}

module.exports = {
  data: searchCommand,
  execute,
};
