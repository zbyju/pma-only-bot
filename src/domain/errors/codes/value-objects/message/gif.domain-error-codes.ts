import { createErrorCodes } from "../../generic.domain-error-codes";

const layerPrefix = "domain" as const;
const namespacePrefix = "gif" as const;
const keys = ["invalid-create-value"] as const;

export const GifDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type GifDomainErrorCodeKey = keyof typeof GifDomainErrorCode;
export type GifDomainErrorCode =
  (typeof GifDomainErrorCode)[keyof typeof GifDomainErrorCode];
