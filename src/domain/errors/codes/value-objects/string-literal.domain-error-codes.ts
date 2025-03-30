import { createErrorCodes } from "../generic.domain-error-codes";

const layerPrefix = "domain" as const;
const namespacePrefix = "string-literal" as const;
const keys = ["invalid-create-value"] as const;

export const StringLiteralDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type StringLiteralDomainErrorCodeKey =
  keyof typeof StringLiteralDomainErrorCode;
export type StringLiteralDomainErrorCode =
  (typeof StringLiteralDomainErrorCode)[keyof typeof StringLiteralDomainErrorCode];
