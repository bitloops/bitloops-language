import { DomainErrors } from '../../domain/errors/index';
import { IAccountWriteRepo } from '../../repos/interfaces/IAccountWriteRepo';
import { ApplicationErrors } from '../errors/index';
import { DepositMoneyCommand } from './DepositMoneyCommand';

import { Application, Either, Domain, ok, fail } from '@bitloops/bl-boilerplate-core';

export type DepositMoneyCommandHandlerResponse = Either<
  void,
  | ApplicationErrors.AccountNotFound
  | DomainErrors.InvalidMonetaryValue
  | DomainErrors.InsufficientBalance
  | Domain.StandardVO.Currency.ErrorTypes
>;

export class DepositMoneyCommandHandler
  implements Application.IUseCase<DepositMoneyCommand, Promise<DepositMoneyCommandHandlerResponse>>
{
  private accountRepo: IAccountWriteRepo;

  constructor(accountRepo: IAccountWriteRepo) {
    this.accountRepo = accountRepo;
  }

  async execute(command: DepositMoneyCommand): Promise<DepositMoneyCommandHandlerResponse> {
    const accountId = new Domain.UUIDv4(command.accountId);

    const accountEntity = await this.accountRepo.getById(accountId);

    if (!accountEntity) {
      return fail(new ApplicationErrors.AccountNotFound(command.accountId));
    }

    const depositOrError = accountEntity.depositAmount(command.amount);
    if (depositOrError.isFail()) {
      return fail(depositOrError.value);
    }
    await this.accountRepo.update(accountEntity);
    return ok();
  }
}
