import type { DomainErrorCode } from "./codes/domain-error-codes";

export interface IErrorContext {
  [key: string]: any;
}

export class GenericDomainError extends Error {
  constructor(
    code: DomainErrorCode,
    context: IErrorContext = {},
    type = "generic",
  ) {
    super(code);
  }
}
