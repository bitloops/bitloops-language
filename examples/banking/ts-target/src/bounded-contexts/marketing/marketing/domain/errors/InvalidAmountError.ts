import { Domain } from '@bitloops/bl-boilerplate-core';

export class InvalidAmountError extends Domain.Error {
  static readonly errorId = 'e09ec42c-4d31-4f7c-b68a-b68a78-b68a655';

  constructor(amount: number | string) {
    super(`Amount ${amount} is invalid`, InvalidAmountError.errorId);
  }
}
