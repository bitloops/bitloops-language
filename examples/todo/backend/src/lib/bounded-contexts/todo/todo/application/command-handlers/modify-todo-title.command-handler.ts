import {
  Application,
  Either,
  Domain,
  fail,
  ok,
} from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { ApplicationErrors } from '../errors/index';
import { ModifyTodoTitleCommand } from '../../commands/modify-todo-title.command';
import { Inject } from '@nestjs/common';
import { TodoWriteRepoPortToken } from '../../constants';
import { TodoWriteRepoPort } from '../../ports/todo-write.repo-port';
import { TitleVO } from '../../domain/title.value-object';
export type ModifyTodoTitleCommandHandlerResponse = Either<
  void,
  Application.Repo.Errors.Unexpected | ApplicationErrors.TodoNotFoundError
>;
export class ModifyTodoTitleCommandHandler
  implements Application.ICommandHandler<ModifyTodoTitleCommand, void>
{
  constructor(
    @Inject(TodoWriteRepoPortToken)
    private readonly todoRepo: TodoWriteRepoPort
  ) {}
  get command() {
    return ModifyTodoTitleCommand;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'ModifyTodoTitleCommandHandler',
    metrics: {
      name: 'ModifyTodoTitleCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(
    command: ModifyTodoTitleCommand
  ): Promise<ModifyTodoTitleCommandHandlerResponse> {
    const requestId = new Domain.UUIDv4(command.id);
    const todoFound = await this.todoRepo.getById(requestId);
    if (todoFound.isFail()) {
      return fail(todoFound.value);
    }
    if (!todoFound.value) {
      const requestIdString = requestId.toString();
      return fail(new ApplicationErrors.TodoNotFoundError(requestIdString));
    }
    const title = TitleVO.create({ title: command.title });
    if (title.isFail()) {
      return fail(title.value);
    }
    const result_599480 = todoFound.value.modifyTitle(title.value);
    if (result_599480.isFail()) {
      return fail(result_599480.value);
    }
    const updateResult = await this.todoRepo.update(todoFound.value);
    if (updateResult.isFail()) {
      return fail(updateResult.value);
    }
    return ok();
  }
}
