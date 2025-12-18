const { Client, Events, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
const logToDiscord = require("./helpers/logging");
const shutdown = require("./helpers/shutdown.js");

dotenv.config();

const token = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds ]});

// Ctrl+C
process.on("SIGINT", () => shutdown(client, "SIGINT (Ctrl+C)"));

// Server stop / Docker stop
process.on("SIGTERM", () => shutdown(client, "SIGTERM"));

// Optional: uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(err);
  shutdown(client, "Uncaught Exception", 1);
});

// Optional: unhandled promises
process.on("unhandledRejection", (reason) => {
  console.error(reason);
  shutdown(client, "Unhandled Rejection", 1);
});

client.once(Events.ClientReady, () => {

    console.log(`Logged In As ${client.user.username}`);

    const desc = "**Username**:\n```"+`${client.user.tag}`+"```"+
    "**User ID**:\n"+"```"+`${client.user.id}`+"```";

    logToDiscord(client, {
        title: "✅ Logged In",
        description: desc,
    });
});


client.login(token);
