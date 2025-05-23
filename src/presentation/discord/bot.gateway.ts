import { Injectable, Logger } from "@nestjs/common";
import { Once, InjectDiscordClient } from "@discord-nestjs/core";
import type { Client } from "discord.js";

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once("ready")
  onReady() {
    this.logger.log(`Bot ${this.client.user?.tag} was started!`);
  }
}
