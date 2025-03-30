import type { ChannelDomainErrorCode } from "./entities/channel.domain-error-codes";
import type { MessageDomainErrorCode } from "./aggregates/message.domain-error-codes";
import type { ServerDomainErrorCode } from "./aggregates/server.domain-error-codes";
import type { UserDomainErrorCode } from "./aggregates/user.domain-error-codes";
import type { GenericDomainErrorCode } from "./generic.domain-error-codes";
import type { UniqueIdDomainErrorCode } from "./value-objects/unique-id.domain-error-codes";
import type { SpartaDomainErrorCode } from "./services/sparta.domain-error.codes";
import type { StringLiteralDomainErrorCode } from "./value-objects/string-literal.domain-error-codes";
import type { EmoteDomainErrorCode } from "./value-objects/message/emote.domain-error-codes";
import type { GifDomainErrorCode } from "./value-objects/message/gif.domain-error-codes";
import type { StickerDomainErrorCode } from "./value-objects/message/sticker.domain-error-codes";
import type { AttachmentDomainErrorCode } from "./value-objects/message/attachment.domain-error-codes";

export type DomainErrorCode =
  | GenericDomainErrorCode
  | UniqueIdDomainErrorCode
  | MessageDomainErrorCode
  | UserDomainErrorCode
  | ServerDomainErrorCode
  | SpartaDomainErrorCode
  | StringLiteralDomainErrorCode
  | EmoteDomainErrorCode
  | GifDomainErrorCode
  | StickerDomainErrorCode
  | AttachmentDomainErrorCode
  | ChannelDomainErrorCode;
