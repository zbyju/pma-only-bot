import { PMAMessage } from '../message';

export interface PMACommandMessage extends PMAMessage {
  command: string;
  args: string[];
}
