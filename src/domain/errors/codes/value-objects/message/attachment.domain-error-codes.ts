import { createErrorCodes } from "../../generic.domain-error-codes";

const layerPrefix = "domain" as const;
const namespacePrefix = "attachment" as const;
const keys = ["invalid-create-value"] as const;

export const AttachmentDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type AttachmentDomainErrorCodeKey =
  keyof typeof AttachmentDomainErrorCode;
export type AttachmentDomainErrorCode =
  (typeof AttachmentDomainErrorCode)[keyof typeof AttachmentDomainErrorCode];
