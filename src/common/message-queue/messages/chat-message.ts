import { Message } from 'discord.js';
import { PMAMessage } from '../message';

export interface PMAChatMessage extends PMAMessage {
  message: Message;
}
