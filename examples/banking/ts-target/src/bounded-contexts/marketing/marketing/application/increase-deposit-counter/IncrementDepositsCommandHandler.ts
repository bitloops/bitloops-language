import { AccountEntity } from '../../domain/AccountEntity';
import { IAccountWriteRepo } from '../../repos/interfaces/IAccountWriteRepo';
import { IncrementDepositsCommand } from './IncrementDepositsCommand';

import { Application, ok, Either, RespondWithPublish, Domain } from '@bitloops/bl-boilerplate-core';
import { DepositsCounterVO } from '../../domain/DepositsCounterVO';
import { DomainErrors } from '../../domain/errors';

type IncrementDepositsCommandHandlerResponse = Either<
  void,
  DomainErrors.InvalidNumberOfTransactions
>;

export class IncrementDepositsCommandHandler
  implements
    Application.IUseCase<
      IncrementDepositsCommand,
      Promise<IncrementDepositsCommandHandlerResponse>
    >
{
  constructor(private accountsRepo: IAccountWriteRepo) {}

  @RespondWithPublish()
  async execute(
    command: IncrementDepositsCommand,
  ): Promise<IncrementDepositsCommandHandlerResponse> {
    const requestId = new Domain.UUIDv4(command.accountId);
    const account = await this.accountsRepo.getById(requestId);

    if (!account) {
      // Create account with 0 deposits
      const depositVO = DepositsCounterVO.create({ counter: 1 });
      if (depositVO.isFail()) {
        return fail(depositVO.value);
      }
      const newAccount = AccountEntity.create({ deposits: depositVO.value, id: requestId });
      await this.accountsRepo.save(newAccount.value);
      return ok();
    }
    account.incrementDeposits();
    await this.accountsRepo.update(account);
    return ok();
  }
}
