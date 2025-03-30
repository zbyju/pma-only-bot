import { createErrorCodes } from "../../generic.domain-error-codes";

const layerPrefix = "domain" as const;
const namespacePrefix = "string-literal" as const;
const keys = ["invalid-create-value"] as const;

export const MessageContentDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type MessageContentDomainErrorCodeKey =
  keyof typeof MessageContentDomainErrorCode;
export type MessageContentDomainErrorCode =
  (typeof MessageContentDomainErrorCode)[keyof typeof MessageContentDomainErrorCode];
