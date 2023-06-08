import {
  Application,
  Either,
  Domain,
  fail,
  ok,
} from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { ApplicationErrors } from '../errors/index';
import { DomainErrors } from '../../domain/errors/index';
import { CompleteTodoCommand } from '../../commands/complete-todo.command';
import { Inject } from '@nestjs/common';
import { TodoWriteRepoPortToken } from '../../constants';
import { TodoWriteRepoPort } from '../../ports/todo-write.repo-port';
export type CompleteTodoCommandHandlerResponse = Either<
  void,
  | Application.Repo.Errors.Unexpected
  | ApplicationErrors.TodoNotFoundError
  | DomainErrors.TodoAlreadyCompletedError
>;
export class CompleteTodoCommandHandler
  implements Application.ICommandHandler<CompleteTodoCommand, void>
{
  constructor(
    @Inject(TodoWriteRepoPortToken)
    private readonly todoRepo: TodoWriteRepoPort
  ) {}
  get command() {
    return CompleteTodoCommand;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'CompleteTodoCommandHandler',
    metrics: {
      name: 'CompleteTodoCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(
    command: CompleteTodoCommand
  ): Promise<CompleteTodoCommandHandlerResponse> {
    const todoId = new Domain.UUIDv4(command.todoId);
    const todoEntity = await this.todoRepo.getById(todoId);
    if (todoEntity.isFail()) {
      return fail(todoEntity.value);
    }
    if (!todoEntity.value) {
      return fail(new ApplicationErrors.TodoNotFoundError(command.todoId));
    }
    const result_529983 = todoEntity.value.complete();
    if (result_529983.isFail()) {
      return fail(result_529983.value);
    }
    const updateResult = await this.todoRepo.update(todoEntity.value);
    if (updateResult.isFail()) {
      return fail(updateResult.value);
    }
    return ok();
  }
}
