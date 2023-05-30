import { Domain } from '@bitloops/bl-boilerplate-core';
export class AccountIsBlockedError extends Domain.Error {
  static readonly errorId: string = 'DRIVER_ACCOUNT_IS_BLOCKED';
  constructor(accountId: string, accountStatus: string) {
    super(
      `Account ${accountId} is ${accountStatus}. Please contact support.`,
      AccountIsBlockedError.errorId
    );
  }
}
