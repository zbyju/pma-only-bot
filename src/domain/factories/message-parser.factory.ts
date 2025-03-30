import type { Message as DiscordMessage } from "discord.js";
import type { CreateEmoteProps } from "../value-objects/message/emote.value-object";
import {
  type CreateMessageContentProps,
  MessageContent,
} from "../value-objects/message/message-content.value-object";
import type { CreateStringLiteralProps } from "../value-objects/string-literal.value-object";
import type { CreateGifProps } from "../value-objects/message/gif.value-object";
import { Attachment } from "../value-objects/message/attachment.value-object";
import { Sticker } from "../value-objects/message/sticker.value-object";
import { Message } from "../aggregates/message.aggregate";
import { ok, Result } from "neverthrow";
import { MessageId } from "../value-objects/id/message-id.value-object";

export function parseMessageContent(content: string) {
  const tokens = [];
  // Regex to capture:
  // 1. Emotes in the format <:name:id>
  // 2. GIF URLs from tenor.com with the pattern ending in "-gif-{id}"
  // The regex uses alternation so that only one part of the match is filled.
  const regex =
    /<:([^:>]+):([0-9]+)>|(https:\/\/tenor\.com\/view\/([\w-]+)-gif-([0-9]+))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  while ((match = regex.exec(content)) !== null) {
    // If there is text before this match, add it as a plain string token.
    if (match.index > lastIndex) {
      const str = {
        value: content.slice(lastIndex, match.index),
        type: "string" as const,
      };
      tokens.push(str);
    }

    // Check if it's an emote (first capturing group will be defined)
    if (match[1] !== undefined && match[2] !== undefined) {
      const emote = {
        value: {
          name: match[1],
          id: match[2],
        },
        type: "emote" as const,
      };
      tokens.push(emote);
    }
    // Else if it's a gif match (third capturing group defined)
    else if (match[3] !== undefined && match[5] !== undefined) {
      const gif = {
        value: {
          url: match[3],
          id: match[5],
        },
        type: "gif" as const,
      };
      tokens.push(gif);
    }

    lastIndex = regex.lastIndex;
  }

  // If there is any remaining text after the last match, add it.
  if (lastIndex < content.length) {
    const str = {
      value: content.slice(lastIndex),
      type: "string" as const,
    };
    tokens.push(str);
  }

  return MessageContent.create(tokens);
}

export function parseAttachments(attachments: DiscordMessage["attachments"]) {
  const as = attachments.map((attachment) => {
    return Attachment.create({ id: attachment.id });
  });

  return Result.combine(as);
}

export function parseStickers(stickers: DiscordMessage["stickers"]) {
  const ss = stickers.map((sticker) => {
    return Attachment.create({ id: sticker.id });
  });

  return Result.combine(ss);
}

export function parseMessage(message: DiscordMessage) {
  const content = parseMessageContent(message.content);
  if (content.isErr()) return content;

  const attachments = parseAttachments(message.attachments);
  if (attachments.isErr()) return attachments;

  // Parse stickers
  const stickers = parseStickers(message.stickers);
  if (stickers.isErr()) return stickers;

  // Parse Id
  const id = MessageId.create(message.id);
  if (id.isErr()) return id;

  const msg = new Message({
    id: id.value,
    content: content.value,
    attachments: attachments.value,
    stickers: stickers.value,
  });

  return ok(msg);
}
