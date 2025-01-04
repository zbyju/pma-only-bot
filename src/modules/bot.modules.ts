import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot.gateway';
import { SpartaReactor } from './readers/sparta-reactor';
import { MorningReactor } from './readers/morning-reactor';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway, SpartaReactor, MorningReactor],
})
export class BotModule {}
