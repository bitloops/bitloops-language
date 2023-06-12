import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors/index';
export class TodoAlreadyUncompletedRule implements Domain.IRule {
  constructor(private completed: boolean, private todoId: string) {}

  public Error: DomainErrors.TodoAlreadyUncompletedError;

  public isBrokenIf(): boolean {
    this.Error = new DomainErrors.TodoAlreadyUncompletedError(this.todoId);
    return !this.completed;
  }
}
