import {
  Application,
  Either,
  RespondWithPublish,
  Domain,
  fail,
  ok,
} from '@bitloops/bl-boilerplate-core';
import { Inject } from '@nestjs/common';
import { ApplicationErrors } from '../errors/index';
import { DomainErrors } from '../../domain/errors/index';
import { AccountWriteRepoPort } from '../../ports/AccountWriteRepoPort';
import { WithdrawMoneyCommand } from '../commands/WithdrawMoneyCommand';
import { AccountWriteRepoPortToken } from '../../constants';
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
  @RespondWithPublish()
  async execute(command: WithdrawMoneyCommand): Promise<WithdrawMoneyCommandHandlerResponse> {
    const accountId = new Domain.UUIDv4(command.accountId);
    const accountEntity = await this.accountRepo.getById(accountId);
    if (!accountEntity) {
      return fail(new ApplicationErrors.AccountNotFoundError(command.accountId));
    }
    accountEntity.withdrawAmount(command.amount);
    await this.accountRepo.update(accountEntity);
    return ok();
  }
}
