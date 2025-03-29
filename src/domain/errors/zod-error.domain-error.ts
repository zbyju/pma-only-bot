import type { z } from "zod";
import { fromError } from "zod-validation-error";
import { GenericDomainErrorCode } from "./codes/generic.domain-error-codes";
import { GenericDomainError } from "./generic-error.domain-error";
import type { DomainErrorCode } from "./codes/domain-error-codes";

export function formatMessage(context: z.ZodError): string {
  const validationError = fromError(context);
  return validationError.toString();
}

export class ZodDomainError extends GenericDomainError {
  constructor(code: DomainErrorCode, zodError: z.ZodError) {
    const context = {
      zodErrors: zodError.errors,
      formattedError: formatMessage(zodError),
    };
    super(code, context, "zod");
  }
}
