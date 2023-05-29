import { Domain } from '@bitloops/bl-boilerplate-core';
import { AccountStatusVO } from 'undefined';
export class AccountIsBlockedError extends Domain.Error {
  static readonly errorId: string = 'DRIVER_ACCOUNT_IS_BLOCKED';
  constructor(accountId: string, accountStatus: AccountStatusVO) {
    super(
      `Account ${accountId} is ${accountStatus.status}. Please contact support.`,
      AccountIsBlockedError.errorId
    );
  }
}
