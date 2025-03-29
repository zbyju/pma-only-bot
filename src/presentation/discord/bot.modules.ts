import { Module } from "@nestjs/common";
import { DiscordModule } from "@discord-nestjs/core";
import { BotGateway } from "./bot.gateway";
import { MessageReader } from "./listeners/message.listener";

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway, MessageReader],
})
export class BotModule {}
