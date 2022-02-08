import Discord from "discord.js"

export default abstract class BaseModule {
    client: Discord.Client<boolean>
    
    enabled: boolean
    isWorking: boolean

    constructor(client: Discord.Client<boolean>) {
        this.client = client
    }
}