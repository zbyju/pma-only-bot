import { createErrorCodes } from "../generic.domain-error-codes";

const layerPrefix = "domain" as const;
const namespacePrefix = "message" as const;
const keys = ["invalid-create-value"] as const;

export const MessageDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type MessageDomainErrorCodeKey = keyof typeof MessageDomainErrorCode;
export type MessageDomainErrorCode =
  (typeof MessageDomainErrorCode)[keyof typeof MessageDomainErrorCode];
