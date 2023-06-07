import { Domain } from '@bitloops/bl-boilerplate-core';
import { FinancialDocumentEntity } from '../financial-document.entity';
import { DomainErrors } from '../errors/index';
export class FinancialDocumentIsValidatedRule implements Domain.IRule {
  constructor(private document: FinancialDocumentEntity) {}

  public Error: DomainErrors.DocumentStatusNotValidatedError;

  public isBrokenIf(): boolean {
    this.Error = new DomainErrors.DocumentStatusNotValidatedError();
    return this.document.status.status !== 'VALIDATED';
  }
}
