import { Domain } from '@bitloops/bl-boilerplate-core';

export class InsufficientBalanceError extends Domain.Error {
  static readonly errorId = 'e09ec42c-4d31-4f7c-b68a-b68a78-b68a655';

  constructor(balance: number) {
    super(`Insufficient balance: ${balance} in account`, InsufficientBalanceError.errorId);
  }
}
