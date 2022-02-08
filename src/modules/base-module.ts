import Discord from "discord.js"

export default class BaseModule {
    client: Discord.Client<boolean>

    constructor(client: Discord.Client<boolean>) {
        this.client = client
    }
}
