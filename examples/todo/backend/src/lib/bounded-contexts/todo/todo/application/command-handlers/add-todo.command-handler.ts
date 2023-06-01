import {
  Application,
  Either,
  fail,
  Domain,
  ok,
} from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { DomainErrors } from '../../domain/errors/index';
import { AddTodoCommand } from '../../commands/add-todo.command';
import { Inject } from '@nestjs/common';
import { TodoWriteRepoPortToken } from '../../constants';
import { TodoWriteRepoPort } from '../../ports/todo-write.repo-port';
import { TitleVO } from '../../domain/title.value-object';
import { UserIdVO } from '../../domain/user-id.value-object';
import { TodoEntity } from '../../domain/todo.entity';
export type AddTodoCommandHandlerResponse = Either<
  string,
  Application.Repo.Errors.Unexpected | DomainErrors.TitleOutOfBoundsError
>;
export class AddTodoCommandHandler
  implements Application.ICommandHandler<AddTodoCommand, string>
{
  constructor(
    @Inject(TodoWriteRepoPortToken)
    private readonly todoRepo: TodoWriteRepoPort
  ) {}
  get command() {
    return AddTodoCommand;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'AddTodoCommandHandler',
    metrics: {
      name: 'AddTodoCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(
    command: AddTodoCommand
  ): Promise<AddTodoCommandHandlerResponse> {
    const title = TitleVO.create({ title: command.title });
    if (title.isFail()) {
      return fail(title.value);
    }
    const requestUserId = new Domain.UUIDv4(command.metadata.context.userId);
    const userId = UserIdVO.create({ id: requestUserId });
    if (userId.isFail()) {
      return fail(userId.value);
    }
    const todo = TodoEntity.create({
      title: title.value,
      completed: false,
      userId: userId.value,
    });
    if (todo.isFail()) {
      return fail(todo.value);
    }
    const saveResult = await this.todoRepo.save(todo.value);
    if (saveResult.isFail()) {
      return fail(saveResult.value);
    }
    return ok(todo.value.id.toString());
  }
}
