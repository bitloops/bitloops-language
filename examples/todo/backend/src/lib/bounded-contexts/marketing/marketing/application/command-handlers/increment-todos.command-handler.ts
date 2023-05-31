import {
  Application,
  Either,
  Domain,
  fail,
  ok,
} from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { DomainErrors } from '../../domain/errors/index';
import { IncrementTodosCommand } from '../../commands/increment-todos.command';
import { Inject } from '@nestjs/common';
import { UserWriteRepoPortToken } from '../../constants';
import { UserWriteRepoPort } from '../../ports/user-write.repo-port';
import { ApplicationErrors } from '../errors/index';
export type IncrementTodosCommandHandlerResponse = Either<
  void,
  Application.Repo.Errors.Unexpected | DomainErrors.InvalidTodosCounterError
>;
export class IncrementTodosCommandHandler
  implements Application.ICommandHandler<IncrementTodosCommand, void>
{
  constructor(
    @Inject(UserWriteRepoPortToken)
    private readonly userRepo: UserWriteRepoPort
  ) {}
  get command() {
    return IncrementTodosCommand;
  }
  get boundedContext(): string {
    return 'marketing';
  }
  @Traceable({
    operation: 'IncrementTodosCommandHandler',
    metrics: {
      name: 'IncrementTodosCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(
    command: IncrementTodosCommand
  ): Promise<IncrementTodosCommandHandlerResponse> {
    const userId = new Domain.UUIDv4(command.id);
    const userFound = await this.userRepo.getById(userId);
    if (userFound.isFail()) {
      return fail(userFound.value);
    }
    if (!userFound.value) {
      return fail(new ApplicationErrors.UserNotFoundError(command.id));
    }
    const incrementedCompleted = userFound.value.incrementCompletedTodos();
    if (incrementedCompleted.isFail()) {
      return fail(incrementedCompleted.value);
    }
    const updateResult = await this.userRepo.update(userFound.value);
    if (updateResult.isFail()) {
      return fail(updateResult.value);
    }
    return ok();
  }
}
