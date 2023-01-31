import { DomainErrors } from '../../domain/errors/index.js';
import { IAccountWriteRepo } from '../../repos/interfaces/IAccountWriteRepo.js';
import { ApplicationErrors } from '../errors/index.js';
import { WithdrawMoneyCommand } from './WithdrawMoneyCommand';

import {
  Application,
  failWithPublish as failResp,
  okWithpublish as okResp,
  Either,
  Domain,
} from '@bitloops/bl-boilerplate-core';

type InsertPINCommandHandlerResponse = Either<
  void,
  | ApplicationErrors.AccountNotFound
  | DomainErrors.PINIsNotPositiveNumber
  | DomainErrors.InvalidCustomerPIN
  | DomainErrors.InvalidCustomerPIN
>;

export class WithdrawMoneyCommandHandler
  implements Application.IUseCase<WithdrawMoneyCommand, Promise<InsertPINCommandHandlerResponse>>
{
  private accountRepo: IAccountWriteRepo;

  constructor(accountRepo: IAccountWriteRepo) {
    this.accountRepo = accountRepo;
  }

  async execute(command: WithdrawMoneyCommand): Promise<InsertPINCommandHandlerResponse> {
    const fail = failResp(command.metadata);
    const ok = okResp(command.metadata);
    const accountId = new Domain.UUIDv4(command.accountId);

    const accountEntity = await this.accountRepo.getById(accountId);

    if (!accountEntity) {
      return fail(new ApplicationErrors.AccountNotFound(command.accountId));
    }
    const withdrawOrError = accountEntity.withdrawAmount(command.amount);
    if (withdrawOrError.isFail()) {
      return fail(withdrawOrError.value);
    }
    return ok();
  }
}
