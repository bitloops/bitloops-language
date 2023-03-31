import {
  Application,
  Either,
  RespondWithPublish,
  Domain,
  fail,
  ok,
} from '@bitloops/bl-boilerplate-core';
import { ApplicationErrors } from '../errors/index';
import { DomainErrors } from '../../domain/errors/index';
import { WithdrawMoneyCommand } from '../commands/WithdrawMoneyCommand';
import { Inject } from '@nestjs/common';
import { AccountWriteRepoPortToken } from '../../constants';
import { AccountWriteRepoPort } from '../../ports/AccountWriteRepoPort';
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
