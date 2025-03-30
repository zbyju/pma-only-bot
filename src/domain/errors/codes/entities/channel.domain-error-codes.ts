import { createErrorCodes } from "../generic.domain-error-codes";

const layerPrefix = "domain" as const;
const namespacePrefix = "channel" as const;
const keys = ["invalid-create-value"] as const;

export const ChannelDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type ChannelDomainErrorCodeKey = keyof typeof ChannelDomainErrorCode;
export type ChannelDomainErrorCode =
  (typeof ChannelDomainErrorCode)[keyof typeof ChannelDomainErrorCode];
