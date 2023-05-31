import {
  Application,
  Either,
  Domain,
  fail,
  ok,
} from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { CreateUserCommand } from '../../commands/create-user.command';
import { Inject } from '@nestjs/common';
import { UserWriteRepoPortToken } from '../../constants';
import { UserWriteRepoPort } from '../../ports/user-write.repo-port';
import { CompletedTodosVO } from '../../domain/completed-todos.value-object';
import { EmailVO } from '../../domain/email.value-object';
import { UserEntity } from '../../domain/user.entity';
export type CreateUserCommandHandlerResponse = Either<
  void,
  Application.Repo.Errors.Unexpected
>;
export class CreateUserCommandHandler
  implements Application.ICommandHandler<CreateUserCommand, void>
{
  constructor(
    @Inject(UserWriteRepoPortToken)
    private readonly userRepo: UserWriteRepoPort
  ) {}
  get command() {
    return CreateUserCommand;
  }
  get boundedContext(): string {
    return 'marketing';
  }
  @Traceable({
    operation: 'CreateUserCommandHandler',
    metrics: {
      name: 'CreateUserCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(
    command: CreateUserCommand
  ): Promise<CreateUserCommandHandlerResponse> {
    const userId = new Domain.UUIDv4(command.userId);
    const completedTodos = CompletedTodosVO.create({ counter: 0 });
    if (completedTodos.isFail()) {
      return fail(completedTodos.value);
    }
    const email = EmailVO.create({ email: command.email });
    if (email.isFail()) {
      return fail(email.value);
    }
    const user = UserEntity.create({
      completedTodos: completedTodos.value,
      email: email.value,
      id: userId,
    });
    if (user.isFail()) {
      return fail(user.value);
    }
    const saveResult = await this.userRepo.save(user.value);
    if (saveResult.isFail()) {
      return fail(saveResult.value);
    }
    return ok();
  }
}
