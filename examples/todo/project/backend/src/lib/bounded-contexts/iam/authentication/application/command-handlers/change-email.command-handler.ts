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
import { ChangeEmailCommand } from '../../commands/change-email.command';
import { Inject } from '@nestjs/common';
import { UserWriteRepoPortToken } from '../../constants';
import { UserWriteRepoPort } from '../../ports/user-write.repo-port';
import { EmailVO } from '../../domain/email.value-object';
export type ChangeEmailCommandHandlerResponse = Either<
  void,
  | Application.Repo.Errors.Unexpected
  | ApplicationErrors.UserNotFoundError
  | DomainErrors.InvalidEmailError
>;
export class ChangeEmailCommandHandler
  implements Application.ICommandHandler<ChangeEmailCommand, void>
{
  constructor(
    @Inject(UserWriteRepoPortToken)
    private readonly userRepo: UserWriteRepoPort
  ) {}
  get command() {
    return ChangeEmailCommand;
  }
  get boundedContext(): string {
    return 'iam';
  }
  @Traceable({
    operation: 'ChangeEmailCommandHandler',
    metrics: {
      name: 'ChangeEmailCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(
    command: ChangeEmailCommand
  ): Promise<ChangeEmailCommandHandlerResponse> {
    const userId = new Domain.UUIDv4(command.userId);
    const email = EmailVO.create({ email: command.email });
    if (email.isFail()) {
      return fail(email.value);
    }
    const userFound = await this.userRepo.getById(userId);
    if (userFound.isFail()) {
      return fail(userFound.value);
    }
    if (!userFound.value) {
      return fail(new ApplicationErrors.UserNotFoundError(command.userId));
    }
    userFound.value.changeEmail(email.value);
    const updateResult = await this.userRepo.update(userFound.value);
    if (updateResult.isFail()) {
      return fail(updateResult.value);
    }
    return ok();
  }
}
