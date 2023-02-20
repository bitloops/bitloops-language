import {
  Application,
  Either,
  RespondWithPublish,
  Domain,
  fail,
  ok,
} from '@bitloops/bl-boilerplate-core';
import { ApplicationErrors } from './errors/index';
import { DomainErrors } from '../domain/errors/index';
import { AccountWriteRepoPort } from '../ports/AccountWriteRepoPort';
import { WithdrawMoneyCommand } from './commands/WithdrawMoneyCommand';
export type WithdrawMoneyCommandHandlerResponse = Either<
  void,
  | ApplicationErrors.AccountNotFoundError
  | DomainErrors.PINIsNotPositiveNumberError
  | DomainErrors.InvalidCustomerPINError
>;
export class WithdrawMoneyCommandHandler
  implements
    Application.IUseCase<WithdrawMoneyCommand, Promise<WithdrawMoneyCommandHandlerResponse>>
{
  constructor(private accountRepo: AccountWriteRepoPort) {}
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
