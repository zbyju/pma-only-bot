import { Module } from '@nestjs/common';
import { DiscordConfigService } from './discord-config.service';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './modules/bot.modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      useClass: DiscordConfigService,
    }),
    BotModule,
  ],
})
export class AppModule {}
