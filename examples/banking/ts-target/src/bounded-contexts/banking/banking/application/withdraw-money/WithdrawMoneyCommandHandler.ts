import { DomainErrors } from '../../domain/errors/index';
import { IAccountWriteRepo } from '../../repos/interfaces/IAccountWriteRepo';
import { ApplicationErrors } from '../errors/index';
import { WithdrawMoneyCommand } from './WithdrawMoneyCommand';

import {
  Application,
  RespondWithPublish,
  ok,
  fail,
  Either,
  Domain,
} from '@bitloops/bl-boilerplate-core';

export type WithdrawMoneyCommandHandlerResponse = Either<
  void,
  | ApplicationErrors.AccountNotFound
  | DomainErrors.PINIsNotPositiveNumber
  | DomainErrors.InvalidCustomerPIN
>;

export class WithdrawMoneyCommandHandler
  implements
    Application.IUseCase<WithdrawMoneyCommand, Promise<WithdrawMoneyCommandHandlerResponse>>
{
  private accountRepo: IAccountWriteRepo;

  constructor(accountRepo: IAccountWriteRepo) {
    this.accountRepo = accountRepo;
  }

  @RespondWithPublish()
  async execute(command: WithdrawMoneyCommand): Promise<WithdrawMoneyCommandHandlerResponse> {
    const accountId = new Domain.UUIDv4(command.accountId);

    const accountEntity = await this.accountRepo.getById(accountId);

    if (!accountEntity) {
      return fail(new ApplicationErrors.AccountNotFound(command.accountId));
    }
    const withdrawOrError = accountEntity.withdrawAmount(command.amount);
    if (withdrawOrError.isFail()) {
      return fail(withdrawOrError.value);
    }
    await this.accountRepo.update(accountEntity);
    return ok();
  }
}
