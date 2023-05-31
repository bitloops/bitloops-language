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
import { ChangeUserEmailCommand } from '../../commands/change-user-email.command';
import { Inject } from '@nestjs/common';
import { UserWriteRepoPortToken } from '../../constants';
import { UserWriteRepoPort } from '../../ports/user-write.repo-port';
export type ChangeUserEmailCommandHandlerResponse = Either<
  void,
  | Application.Repo.Errors.Unexpected
  | ApplicationErrors.UserNotFoundError
  | DomainErrors.InvalidEmailDomainError
>;
export class ChangeUserEmailCommandHandler
  implements Application.ICommandHandler<ChangeUserEmailCommand, void>
{
  constructor(
    @Inject(UserWriteRepoPortToken)
    private readonly userRepo: UserWriteRepoPort
  ) {}
  get command() {
    return ChangeUserEmailCommand;
  }
  get boundedContext(): string {
    return 'marketing';
  }
  @Traceable({
    operation: 'ChangeUserEmailCommandHandler',
    metrics: {
      name: 'ChangeUserEmailCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(
    command: ChangeUserEmailCommand
  ): Promise<ChangeUserEmailCommandHandlerResponse> {
    const requestUserId = new Domain.UUIDv4(command.userId);
    const userFound = await this.userRepo.getById(requestUserId);
    if (userFound.isFail()) {
      return fail(userFound.value);
    }
    if (!userFound.value) {
      return fail(new ApplicationErrors.UserNotFoundError(command.userId));
    }
    const changeEmailResult = userFound.value.changeEmail(command.email);
    if (changeEmailResult.isFail()) {
      return fail(changeEmailResult.value);
    }
    const updateResult = await this.userRepo.update(userFound.value);
    if (updateResult.isFail()) {
      return fail(updateResult.value);
    }
    return ok();
  }
}
