import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors/index';
export class AccountIsNotBlockedRule implements Domain.IRule {
  constructor(private id: string, private accountStatus: string) {}

  public Error: DomainErrors.AccountIsBlockedError;

  public isBrokenIf(): boolean {
    this.Error = new DomainErrors.AccountIsBlockedError(
      this.id,
      this.accountStatus
    );
    return this.accountStatus !== 'Unblocked';
  }
}
