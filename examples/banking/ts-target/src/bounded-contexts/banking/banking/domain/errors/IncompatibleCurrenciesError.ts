import { Domain } from '@bitloops/bl-boilerplate-core';

export class IncompatibleCurrenciesError extends Domain.Error {
  static readonly errorId = 'a12ec42c-4d31-4f7c-b68a-b68a78-b68a655';

  constructor(firstCurrency: string, secondCurrency: string) {
    super(
      `Currency ${firstCurrency} is not the same as ${secondCurrency}`,
      IncompatibleCurrenciesError.errorId,
    );
  }
}
