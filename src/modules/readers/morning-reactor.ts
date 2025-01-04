import {
  Filter,
  InjectCollector,
  MessageEventCollector,
  On,
  Once,
} from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';

@Injectable()
export class MorningReactor {
  private readonly logger = new Logger(MorningReactor.name);

  @On('messageCreate')
  async onMessageCreate(message: Message) {
    if (message.author.bot) return;

    const morningWords = ['gm', 'morning', 'ranecko'];
    const morningPhrases = [
      'good morning',
      'dobré ráno',
      'dobre rano',
      'dobre ranko',
    ];

    const lowerMessage = message.content.toLowerCase();

    for (const phrase of morningPhrases) {
      if (lowerMessage.length >= 2 && lowerMessage.includes(phrase)) {
        await message.reply('gm');
        return;
      }
    }

    const words = lowerMessage.split(' ');

    for (const word of words) {
      if (morningWords.includes(word)) {
        await message.reply('gm');
        return;
      }
    }
  }

  // Optionally, log when the bot is ready
  @Once('ready')
  onReady(): void {
    this.logger.log('Bot is ready and listening for messages.');
  }
}
