import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot.gateway';
import { MessageReader } from './readers/message-reader';
import { PMAMessageQueue } from 'src/common/message-queue/queue';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway, MessageReader, PMAMessageQueue],
})
export class BotModule {}
