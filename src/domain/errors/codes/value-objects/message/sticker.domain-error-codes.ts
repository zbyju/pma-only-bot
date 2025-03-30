import { createErrorCodes } from "../../generic.domain-error-codes";

const layerPrefix = "domain" as const;
const namespacePrefix = "sticker" as const;
const keys = ["invalid-create-value"] as const;

export const StickerDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type StickerDomainErrorCodeKey = keyof typeof StickerDomainErrorCode;
export type StickerDomainErrorCode =
  (typeof StickerDomainErrorCode)[keyof typeof StickerDomainErrorCode];
