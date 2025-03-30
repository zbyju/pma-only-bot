import { createErrorCodes } from "../generic.domain-error-codes";

const layerPrefix = "domain" as const;
const namespacePrefix = "sparta" as const;
const keys = ["invalid-create-value"] as const;

export const SpartaDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type SpartaDomainErrorCodeKey = keyof typeof SpartaDomainErrorCode;
export type SpartaDomainErrorCode =
  (typeof SpartaDomainErrorCode)[keyof typeof SpartaDomainErrorCode];
