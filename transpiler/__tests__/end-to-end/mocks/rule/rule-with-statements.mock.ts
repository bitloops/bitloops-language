import { Domain } from '@bitloops/bl-boilerplate-core';
import { FinancialDocumentEntity } from '../financial-document.entity';
import { DomainErrors } from '../errors/index';
export class FinancialDocumentIsValidatedRule implements Domain.IRule {
  constructor(private document: FinancialDocumentEntity) {}

  public Error: DomainErrors.DocumentStatusNotValidatedError;

  public isBrokenIf(): boolean {
    let value: FinancialDocumentEntity = this.document;
    const newValue = this.document;
    if (this.document.status.status !== 'VALIDATED') {
      const x = this.document.status.status;
    } else {
      const x = this.document.status.status;
    }
    switch (!this.document) {
      case this.document.status.status !== 'VALIDATED': {
        const x = this.document.status.status;
        break;
      }
      case this.document.status.status === 'VALIDATED': {
        const x = this.document.status.status;
        break;
      }
      default: {
        const x = this.document.status.status;
        break;
      }
    }

    this.Error = new DomainErrors.DocumentStatusNotValidatedError(
      this.document.id.toString(),
      this.document.status.status,
    );
    return this.document.status.status !== 'VALIDATED';
  }
}
