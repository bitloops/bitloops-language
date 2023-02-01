import { AccountEntity } from '../../domain/AccountEntity';
import { IAccountWriteRepo } from '../../repos/interfaces/IAccountWriteRepo';
import { IncrementDepositsCommand } from './IncrementDepositsCommand';

import { Application, ok, Either, RespondWithPublish, Domain } from '@bitloops/bl-boilerplate-core';

type IncrementDepositsCommandHandlerResponse = Either<void, never>;

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
    let account = await this.accountsRepo.getById(requestId);

    if (!account) {
      // Create account with 0 deposits
      const newAccount = AccountEntity.create({ deposits: 1, id: requestId });
      account = newAccount.value;
      await this.accountsRepo.save(account);
      return ok();
    }
    account.incrementDeposits();
    await this.accountsRepo.update(account);
    return ok();
  }
}
