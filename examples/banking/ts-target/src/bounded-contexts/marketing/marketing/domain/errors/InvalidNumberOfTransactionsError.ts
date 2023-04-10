import { Domain } from '@bitloops/bl-boilerplate-core';

export class InvalidNumberOfTransactionsError extends Domain.Error {
  static readonly errorId = 'o91gc42c-4d31-4f7c-b68a-b68a78-b68a655';

  constructor(counter: number) {
    super(`invalid number of transactions ${counter}`, InvalidNumberOfTransactionsError.errorId);
  }
}
