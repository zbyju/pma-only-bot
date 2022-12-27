import Discord from "discord.js"
import MessageModule from "../message-module"

export default class GMSender extends MessageModule {
  moduleName = "GMSenderModule"
  constructor(client: Discord.Client<boolean>) {
    super(client)
  }

  onMessage(message: Discord.Message<boolean>) {
    if (message.content.trim().toLowerCase() === "gm") {
      message.reply("gm")
    }
  }
}
