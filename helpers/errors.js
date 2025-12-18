const discord = require("discord.js");
const config = require("../config.json");

/**
 * 
 * @param {Error} error
 * @param {discord.Client} client
 */
async function handleError(error, client) {

    console.log(`An error occured:\n ${error}`);

    if(client) {
        try {

            const channel = await client.channels.fetch(config["logging-channel"]);
    
            if(!channel) {return;}
    
            const embed = new discord.EmbedBuilder();
    
            embed.setColor(0xed4245);
            embed.setTitle('❌ An Error Occurred');
            embed.setDescription(
                "**Context:**\n" +
                "```js\n" +
                error.stack +
                "\n```"
            );
            embed.setTimestamp();
    
            await channel.send({embeds: [embed]});
        } catch(err) {
            console.log(`An error occurred: \n ${err}`);
        }

    }


}

module.exports = handleError;