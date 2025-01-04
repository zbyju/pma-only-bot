export enum PMAMessageIntent {
  INCOMING_CHAT_MESSAGE,
  OUTGOING_CHAT_MESSAGE,

  INCOMING_COMMAND,
}

export enum Tribool {
  FALSE = 0,
  TRUE = 1,
  UNKNOWN = 2,
}

export interface PMAMessage {
  intents: PMAMessageIntent[];

  isFromBot: Tribool;
  isFromAdmin: Tribool;
}
