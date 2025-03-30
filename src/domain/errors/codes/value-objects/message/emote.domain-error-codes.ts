import { createErrorCodes } from "../../generic.domain-error-codes";

const layerPrefix = "domain" as const;
const namespacePrefix = "emote" as const;
const keys = ["invalid-create-value"] as const;

export const EmoteDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type EmoteDomainErrorCodeKey = keyof typeof EmoteDomainErrorCode;
export type EmoteDomainErrorCode =
  (typeof EmoteDomainErrorCode)[keyof typeof EmoteDomainErrorCode];
