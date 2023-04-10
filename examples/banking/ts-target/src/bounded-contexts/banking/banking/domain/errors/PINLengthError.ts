import { Domain } from '@bitloops/bl-boilerplate-core';

export class PINLengthError extends Domain.Error {
  static readonly errorId = 'ce26bf5a-0219-4a3e-a674-6f35c60073c7';

  constructor(pin: string) {
    super(`PIN ${pin} length is invalid`, PINLengthError.errorId);
  }
}
