import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors/index';
export class TodoAlreadyCompletedRule implements Domain.IRule {
  constructor(private completed: boolean, private todoId: string) {}

  public Error: DomainErrors.TodoAlreadyCompletedError;

  public isBrokenIf(): boolean {
    this.Error = new DomainErrors.TodoAlreadyCompletedError(this.todoId);
    return this.completed;
  }
}
