import { createErrorCodes } from "../generic.domain-error-codes";

const layerPrefix = "domain" as const;
const namespacePrefix = "server" as const;
const keys = ["invalid-create-value"] as const;

export const ServerDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type ServerDomainErrorCodeKey = keyof typeof ServerDomainErrorCode;
export type ServerDomainErrorCode =
  (typeof ServerDomainErrorCode)[keyof typeof ServerDomainErrorCode];
