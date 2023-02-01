import { Domain } from '@bitloops/bl-boilerplate-core';

export class PINIsNotPositiveNumberError extends Domain.Error {
  static readonly errorId = 'e09ec42c-4d31--b68a-ac84abe9464f';

  constructor(pin: string) {
    super(`PIN ${pin} is not a positive number`, PINIsNotPositiveNumberError.errorId);
  }
}
