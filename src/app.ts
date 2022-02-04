require('dotenv').config()
import Discord from "discord.js"
const fetchAll = require('discord-fetch-all');

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.DIRECT_MESSAGES]
})

client.once("ready", async () => {
  console.log("POB is ready!")

  const guildId = process.env.TEST_GUILD_ID || ""
  const guild = client.guilds.cache.get(guildId)
  const commands = guild ? guild.commands : client.application?.commands

  commands?.create({
    name: "ping",
    description: "Replies with pong."
  })

  const channel = client.channels.cache.get(process.env.TEST_CHANNEL_ID || "")
  const allMessages = await fetchAll.messages(channel, {
    reverseArray: true, // Reverse the returned array
    userOnly: true, // Only return messages by users
    botOnly: false, // Only return messages by bots
    pinnedOnly: false, // Only returned pinned messages
  });
  console.log(allMessages.map((m: any) => {
    return m.author.username + " - " + m.content + "\n"
  }))
})

client.on("interactionCreate", async interaction => {
  if(!interaction.isCommand()) return;

  if(interaction.commandName === "ping") {
    await interaction.reply("Pong!")
  }
})

client.login(process.env.TOKEN || "")