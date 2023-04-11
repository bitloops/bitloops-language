import { Application, Either, Domain, fail, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { ApplicationErrors } from '../errors/index';
import { DomainErrors } from '../../domain/errors/index';
import { WithdrawMoneyCommand } from '../../commands/withdraw-money.command';
import { Inject } from '@nestjs/common';
import { AccountWriteRepoPortToken } from '../../constants';
import { AccountWriteRepoPort } from '../../ports/account-write.repo-port';
export type WithdrawMoneyCommandHandlerResponse = Either<
  void,
  | ApplicationErrors.AccountNotFoundError
  | DomainErrors.PINIsNotPositiveNumberError
  | DomainErrors.InvalidCustomerPINError
>;
export class WithdrawMoneyCommandHandler
  implements Application.ICommandHandler<WithdrawMoneyCommand, void>
{
  constructor(
    @Inject(AccountWriteRepoPortToken)
    private readonly accountRepo: AccountWriteRepoPort,
  ) {}
  get command() {
    return WithdrawMoneyCommand;
  }
  get boundedContext(): string {
    return 'Hello world';
  }
  @Traceable({
    operation: 'WithdrawMoneyCommandHandler',
    metrics: {
      name: 'WithdrawMoneyCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(command: WithdrawMoneyCommand): Promise<WithdrawMoneyCommandHandlerResponse> {
    const accountId = new Domain.UUIDv4(command.accountId);
    const accountEntity = await this.accountRepo.getById(accountId);
    if (!accountEntity.value) {
      return fail(new ApplicationErrors.AccountNotFoundError(command.accountId));
    }
    accountEntity.value.withdrawAmount(command.amount);
    await this.accountRepo.update(accountEntity.value);
    return ok();
  }
}
