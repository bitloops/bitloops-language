import { Domain } from '@bitloops/bl-boilerplate-core';
export class TodoAlreadyUncompletedError extends Domain.Error {
  static readonly errorId: string = '24225fc3-9137-4f2f-a35d-b86f6d4ad68e';
  constructor(id: string) {
    super(
      `Todo ${id} is already uncompleted`,
      TodoAlreadyUncompletedError.errorId
    );
  }
}
