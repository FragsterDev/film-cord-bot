const { Client } = require("discord.js");
const config = require("../config.json");
const handleError = require("./errors.js");
const createEmbed = require("./embedbuilder.js");

/**
 * @param {Client} client
 * @param {{ title: string, description: string, color?: number }} options
 * @param {Object} [other={}]
 */
async function logToDiscord(client, {title, description, color=0x57F287}) {

    try {

        const channel = await client.channels.fetch(config["logging-channel"]);

        if(!channel){
            throw new Error("Logging channel not found");
        }

        const embed = createEmbed({
            title,
            description,
            color
        });

        await channel.send({embeds: [embed]});


    } catch (error) {

        handleError(error, client);
    }
}

module.exports = logToDiscord;