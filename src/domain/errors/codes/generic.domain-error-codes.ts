// Construct enum object with key-value pairs like this: 'error-code' -> 'domain->namespace->error-code'
export function createErrorCodes<
  Layer extends string,
  Namespace extends string,
  ErrorCodes extends readonly string[],
>(
  layer: Layer,
  namespace: Namespace,
  codes: ErrorCodes,
): { [K in ErrorCodes[number]]: `${Layer}->${Namespace}->${K}` } {
  return codes.reduce((acc, code) => {
    acc[code as ErrorCodes[number]] = `${layer}->${namespace}->${code}`;
    return acc;
  }, {} as any);
}

const layerPrefix = "domain" as const;
const namespacePrefix = "generic" as const;
const keys = ["not-found", "not-implemented"] as const;

export const GenericDomainErrorCode = createErrorCodes(
  layerPrefix,
  namespacePrefix,
  keys,
);
export type GenericDomainErrorCodeKey = keyof typeof GenericDomainErrorCode;
export type GenericDomainErrorCode =
  (typeof GenericDomainErrorCode)[keyof typeof GenericDomainErrorCode];
