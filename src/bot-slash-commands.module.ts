import { PlaylistCommand } from './playlist.command';
import { Module } from '@nestjs/common';

@Module({
  providers: [PlaylistCommand],
})
export class BotSlashCommandsModule {}
