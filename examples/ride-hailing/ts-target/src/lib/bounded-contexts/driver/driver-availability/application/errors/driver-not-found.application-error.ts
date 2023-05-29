import { Application } from '@bitloops/bl-boilerplate-core';
export class DriverNotFoundError extends Application.Error {
  static readonly errorId: string = 'DRIVER_NOT_FOUND';
  constructor(id: string) {
    super(`Driver with id ${id} not found`, DriverNotFoundError.errorId);
  }
}
