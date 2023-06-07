import {
  Application,
  Either,
  Domain,
  fail,
  ok,
} from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { ApplicationErrors } from '../errors/index';
import { DeleteTodoCommand } from '../../commands/delete-todo.command';
import { Inject } from '@nestjs/common';
import { TodoWriteRepoPortToken } from '../../constants';
import { TodoWriteRepoPort } from '../../ports/todo-write.repo-port';
export type DeleteTodoCommandHandlerResponse = Either<
  void,
  Application.Repo.Errors.Unexpected | ApplicationErrors.TodoNotFoundError
>;
export class DeleteTodoCommandHandler
  implements Application.ICommandHandler<DeleteTodoCommand, void>
{
  constructor(
    @Inject(TodoWriteRepoPortToken)
    private readonly todoRepo: TodoWriteRepoPort
  ) {}
  get command() {
    return DeleteTodoCommand;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'DeleteTodoCommandHandler',
    metrics: {
      name: 'DeleteTodoCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(
    command: DeleteTodoCommand
  ): Promise<DeleteTodoCommandHandlerResponse> {
    const todoId = new Domain.UUIDv4(command.id);
    const todoEntity = await this.todoRepo.getById(todoId);
    if (todoEntity.isFail()) {
      return fail(todoEntity.value);
    }
    if (!todoEntity.value) {
      return fail(new ApplicationErrors.TodoNotFoundError(command.id));
    }
    const result_255472 = todoEntity.value.delete();
    if (result_255472.isFail()) {
      return fail(result_255472.value);
    }
    const deleteResult = await this.todoRepo.delete(todoEntity.value);
    if (deleteResult.isFail()) {
      return fail(deleteResult.value);
    }
    return ok();
  }
}
