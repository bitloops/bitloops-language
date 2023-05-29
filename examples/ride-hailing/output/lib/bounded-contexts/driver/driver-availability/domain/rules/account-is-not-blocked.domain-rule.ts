import { Domain } from '@bitloops/bl-boilerplate-core';
import { AccountStatusVO } from '../account-status.value-object';
import { DomainErrors } from '../errors/index';
export class AccountIsNotBlockedRule implements Domain.IRule {
  constructor(private id: string, private accountStatus: AccountStatusVO) {}
  public Error = new DomainErrors.AccountIsBlockedError(
    this.id,
    this.accountStatus
  );
  public isBrokenIf(): boolean {
    return this.accountStatus.status !== 'Unblocked';
  }
}
