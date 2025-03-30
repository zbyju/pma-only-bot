import { createErrorCodes } from "../generic.domain-error-codes";

const layerPrefix = "domain" as const;
const namespacePrefix = "message" as const;
const keys = ["invalid-create-value"] as const;

export const UserDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type UserDomainErrorCodeKey = keyof typeof UserDomainErrorCode;
export type UserDomainErrorCode =
  (typeof UserDomainErrorCode)[keyof typeof UserDomainErrorCode];
