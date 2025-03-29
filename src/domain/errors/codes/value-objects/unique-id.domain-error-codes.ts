import { createErrorCodes } from "../generic.domain-error-codes";

const layerPrefix = "domain" as const;
const namespacePrefix = "unique-id" as const;
const keys = ["invalid-create-value"] as const;

export const UniqueIdDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type UniqueIdDomainErrorCodeKey = keyof typeof UniqueIdDomainErrorCode;
export type UniqueIdDomainErrorCode =
  (typeof UniqueIdDomainErrorCode)[keyof typeof UniqueIdDomainErrorCode];
