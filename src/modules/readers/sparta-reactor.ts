import {
  Filter,
  InjectCollector,
  MessageEventCollector,
  On,
  Once,
} from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Message, ReactionCollector } from 'discord.js';
import { get as levenshtein } from 'fast-levenshtein';

@Injectable()
export class SpartaReactor {
  private readonly logger = new Logger(SpartaReactor.name);

  @On('messageCreate')
  async onMessageCreate(message: Message) {
    if (message.author.bot) return;

    const sparta = 'sparta';

    const lowerMessage = message.content.toLowerCase();
    const words = lowerMessage.split(' ');
    const similarities = words
      .filter((word) => Math.abs(word.length - sparta.length) <= 1)
      .map((word) => levenshtein(word, sparta, { useCollator: true }));
    const maxSimilarity = Math.max(...similarities);

    if (similarities.length === 0 || maxSimilarity >= 3) {
      return;
    }

    this.logger.log(`SPARTA`);
    await message.reply('SPARTA');

    try {
      const member = await message.guild?.members.fetch(message.author);
      if (!member) return;

      await member.timeout(2000, 'SPARTA');
    } catch (error) {
      this.logger.error(error);
    }
  }

  // Optionally, log when the bot is ready
  @Once('ready')
  onReady(): void {
    this.logger.log('Bot is ready and listening for messages.');
  }
}
