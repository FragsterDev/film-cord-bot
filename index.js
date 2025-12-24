const {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  MessageFlags,
  ActivityType,
} = require("discord.js");
const dotenv = require("dotenv");
const fs = require("node:fs");
const path = require("node:path");
const logToDiscord = require("./helpers/logging");
const shutdown = require("./helpers/shutdown.js");
const keepAlive = require("./replit_helper/keepalive.js");

dotenv.config();

const token = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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
  client.user.setPresence({
    activities: [
      {
        name: "Movies & TV Shows",
        type: ActivityType.Streaming,
        url: "https://www.youtube.com/watch?v=yjLcN0RFYTI",
      },
    ],
  });

  console.log(`Logged In As ${client.user.username}`);

  const desc =
    "**Username**:\n```" +
    `${client.user.tag}` +
    "```" +
    "**User ID**:\n" +
    "```" +
    `${client.user.id}` +
    "```";

  logToDiscord(client, {
    title: "✅ Logged In",
    description: desc,
  });
});

client.commands = new Collection();

//retrieving commands from the command files
const foldersPath = path.join(__dirname, "commands"); //commands directory
const commandFolders = fs.readdirSync(foldersPath); //fetching all command folders
for (const folder of commandFolders) {
  const commandFolder = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandFolder)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandFolder, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.log(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error executing this command",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error executing this command",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

keepAlive();

client.login(token);
