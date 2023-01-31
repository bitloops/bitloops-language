import { Domain } from '@bitloops/bl-boilerplate-core';

export class InvalidCustomerPINError extends Domain.Error {
  static readonly errorId = 'ade5fa8d-4432-4924-a43d-74cc84246354';

  constructor(pin: string) {
    super(`PIN ${pin} is invalid`, InvalidCustomerPINError.errorId);
  }
}
