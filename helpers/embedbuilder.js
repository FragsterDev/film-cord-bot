const { EmbedBuilder } = require("discord.js");

/**
 * Creates a standardised embed
 * @param {Object} options
 * @param {string} options.title
 * @param {string} options.description
 * @param {number} [options.color=0x2f3136]
 * @param {string} [options.footer]
 * @returns {EmbedBuilder}
 */
function createEmbed({title, description, color = 0x2f3136, footer}) {

    const embed = new EmbedBuilder();

    embed.setTitle(title);
    embed.setDescription(description);
    embed.setColor(color);
    embed.setTimestamp();

    if(footer) {
        embed.setFooter(footer);
    }

    return embed;
}

module.exports = createEmbed;