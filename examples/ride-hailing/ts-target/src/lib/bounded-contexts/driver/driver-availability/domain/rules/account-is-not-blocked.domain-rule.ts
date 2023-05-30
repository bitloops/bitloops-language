import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors/index';
export class AccountIsNotBlockedRule implements Domain.IRule {
  constructor(private id: string, private accountStatus: string) {}
  public Error = new DomainErrors.AccountIsBlockedError(
    this.id,
    this.accountStatus
  );
  public isBrokenIf(): boolean {
    return this.accountStatus !== 'Unblocked';
  }
}
