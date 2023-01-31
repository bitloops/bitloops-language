import { DomainErrors } from '../../domain/errors/index';
import { IAccountWriteRepo } from '../../repos/interfaces/IAccountWriteRepo';
import { ApplicationErrors } from '../errors/index';
import { DepositMoneyCommand } from './DepositMoneyCommand';

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

export class DepositMoneyCommandHandler
  implements Application.IUseCase<DepositMoneyCommand, Promise<InsertPINCommandHandlerResponse>>
{
  private accountRepo: IAccountWriteRepo;

  constructor(accountRepo: IAccountWriteRepo) {
    this.accountRepo = accountRepo;
  }

  async execute(command: DepositMoneyCommand): Promise<InsertPINCommandHandlerResponse> {
    const fail = failResp(command.metadata);
    const ok = okResp(command.metadata);
    const accountId = new Domain.UUIDv4(command.accountId);

    const accountEntity = await this.accountRepo.getById(accountId);

    if (!accountEntity) {
      return fail(new ApplicationErrors.AccountNotFound(command.accountId));
    }

    const depositOrError = accountEntity.depositAmount(command.amount);
    if (depositOrError.isFail()) {
      return fail(depositOrError.value);
    }
    return ok();
  }
}
