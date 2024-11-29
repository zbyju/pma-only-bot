import { Module } from '@nestjs/common';
import { DiscordConfigService } from './discord-config.service';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { BotSlashCommandsModule } from './bot-slash-commands.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      useClass: DiscordConfigService,
    }),
    BotSlashCommandsModule,
  ],
})
export class AppModule {}
