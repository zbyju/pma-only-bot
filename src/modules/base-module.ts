import Discord from "discord.js"

export abstract class AbstractBaseModule {
  client: Discord.Client<boolean>

  moduleName = "AbstractBaseModule"
  enabled: boolean
  isWorking: boolean

  constructor(client: Discord.Client<boolean>) {
    this.client = client
  }
}

export default class BaseModule extends AbstractBaseModule {
  moduleName = "BaseModule"

  constructor(client: Discord.Client<boolean>) {
    super(client)
  }

  static create(client: Discord.Client<boolean>) {
    return new this(client)
  }
}
