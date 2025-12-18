const { Client } = require("discord.js");
const logToDiscord = require("./logging.js");

/**
 * @param {Client} client
 * @param {string} reason
 * @param {number} [code=0]
 */
async function shutdown(client, reason, code=0) {

    console.log("⚠️ Bot Shutting Down: ", reason);

    //reason description for shutdown
    const desc = "**Reason**:\n"+"```"+`${reason}`+"```\n"+"**Code**:\n"+"```"+`${code}`+"```";

    try {

        if(client && client.isReady()) {
            await logToDiscord(client,
                {
                    title: "Logged Out",
                    description: desc,
                    color: 0xED4245 // red
    
                }
            );
        }

    } catch(err) {
        console.log('Failed to send shutdown log: ',err);
    } finally {
        process.exit(code);
    }

}

module.exports = shutdown;