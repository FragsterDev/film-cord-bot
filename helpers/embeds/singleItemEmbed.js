const { EmbedBuilder } = require("discord.js");

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

/**
 * Build a simple embed for a single movie
 *
 * @param {Object} params
 * @param {string} params.title
 * @param {string} params.id
 * @param {string} params.overview
 * @param {string|null} params.posterPath
 * @param {string} params.releaseDate
 * @param {string} params.type
 * @param {string} params.genres
 * @param {string} params.rating
 * @param {string} params.searchURI
 * @param {string} params.user
 * @returns {EmbedBuilder}
 */
function singleItemEmbed({
  title,
  id,
  overview,
  posterPath,
  releaseDate,
  type,
  genres,
  rating,
  searchURI,
  user,
}) {
  const year = releaseDate ? releaseDate.split("-")[0] : "Unknown";

  const itemRating = rating > 0 ? rating + "/10" : "No rating available";

  const embed = new EmbedBuilder()
    .setTitle(`${title} (${year})`)
    .setURL(searchURI)
    .setDescription(
      overview && overview.length > 0 ? overview : "No description available."
    )
    .setColor(0x5865f2)
    .addFields({
      name: "ID",
      value: id,
      inline: false,
    })
    .addFields({
      name: "Release Date",
      value: releaseDate,
      inline: false,
    })
    .addFields({
      name: "Type",
      value: type,
      inline: false,
    })
    .addFields({
      name: "Genres",
      value: genres && genres.length > 0 ? genres : "Unknown",
      inline: false,
    })
    .addFields({
      name: "Rating",
      value: itemRating,
      inline: false,
    })
    .setFooter({ text: `Requested By ${user}` })
    .setTimestamp();

  if (posterPath) {
    embed.setThumbnail(`${TMDB_IMAGE_BASE}${posterPath}`);
  }

  return embed;
}

module.exports = singleItemEmbed;
