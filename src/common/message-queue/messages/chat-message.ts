import { PMAMessage } from '../message';

export interface PMAChatMessage extends PMAMessage {
  message: string;
}
