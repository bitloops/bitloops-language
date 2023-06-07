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
import { UncompleteTodoCommand } from '../../commands/uncomplete-todo.command';
import { Inject } from '@nestjs/common';
import { TodoWriteRepoPortToken } from '../../constants';
import { TodoWriteRepoPort } from '../../ports/todo-write.repo-port';
export type UncompleteTodoCommandHandlerResponse = Either<
  void,
  | Application.Repo.Errors.Unexpected
  | ApplicationErrors.TodoNotFoundError
  | DomainErrors.TodoAlreadyUncompletedError
>;
export class UncompleteTodoCommandHandler
  implements Application.ICommandHandler<UncompleteTodoCommand, void>
{
  constructor(
    @Inject(TodoWriteRepoPortToken)
    private readonly todoRepo: TodoWriteRepoPort
  ) {}
  get command() {
    return UncompleteTodoCommand;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'UncompleteTodoCommandHandler',
    metrics: {
      name: 'UncompleteTodoCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(
    command: UncompleteTodoCommand
  ): Promise<UncompleteTodoCommandHandlerResponse> {
    const todoId = new Domain.UUIDv4(command.id);
    const todoEntity = await this.todoRepo.getById(todoId);
    if (todoEntity.isFail()) {
      return fail(todoEntity.value);
    }
    if (!todoEntity.value) {
      return fail(new ApplicationErrors.TodoNotFoundError(command.id));
    }
    const result_682966 = todoEntity.value.uncomplete();
    if (result_682966.isFail()) {
      return fail(result_682966.value);
    }
    const updateResult = await this.todoRepo.update(todoEntity.value);
    if (updateResult.isFail()) {
      return fail(updateResult.value);
    }
    return ok();
  }
}
