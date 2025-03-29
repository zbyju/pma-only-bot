import type { GenericDomainErrorCode } from "./generic.domain-error-codes";
import type { UniqueIdDomainErrorCode } from "./value-objects/unique-id.domain-error-codes";

export type DomainErrorCode = GenericDomainErrorCode | UniqueIdDomainErrorCode;
