import { Application } from '@bitloops/bl-boilerplate-core';

export class CustomerNotFoundError extends Application.Error {
  static errorId = 'bedb1f53-6e89-099d-bc63-8f3adfc4b401';

  constructor(id: string) {
    super(`Customer with id ${id} was not found`, CustomerNotFoundError.errorId);
  }
}
