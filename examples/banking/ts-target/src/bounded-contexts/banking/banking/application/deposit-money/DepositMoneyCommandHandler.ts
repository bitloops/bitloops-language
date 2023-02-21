import { DomainErrors } from '../../domain/errors/index';
import { IAccountWriteRepo } from '../../repos/interfaces/IAccountWriteRepo';
import { ApplicationErrors } from '../errors/index';
import { DepositMoneyCommand } from './DepositMoneyCommand';

import {
  Application,
  Either,
  Domain,
  RespondWithPublish,
  ok,
  fail,
} from '@bitloops/bl-boilerplate-core';

export type InsertPINCommandHandlerResponse = Either<
  void,
  | ApplicationErrors.AccountNotFound
  | DomainErrors.PINIsNotPositiveNumber
  | DomainErrors.InvalidCustomerPIN
  | DomainErrors.InsufficientBalance
  | Domain.StandardVO.Currency.ErrorTypes
>;

export class DepositMoneyCommandHandler
  implements Application.IUseCase<DepositMoneyCommand, Promise<InsertPINCommandHandlerResponse>>
{
  private accountRepo: IAccountWriteRepo;

  constructor(accountRepo: IAccountWriteRepo) {
    this.accountRepo = accountRepo;
  }

  @RespondWithPublish()
  async execute(command: DepositMoneyCommand): Promise<InsertPINCommandHandlerResponse> {
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
