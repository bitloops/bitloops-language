import { Application, Either, RespondWithPublish, ok, fail } from '@bitloops/bl-boilerplate-core';
import { AccountReadModel } from '../../domain/AccountReadModel';
import { IAccountReadRepo } from '../../repos/interfaces/IAccountReadRepo';
import { ApplicationErrors } from '../errors';
import { GetAccountQuery } from './GetAccountQuery';

export type GetAccountDetailsResponse = Either<AccountReadModel, ApplicationErrors.AccountNotFound>;

export class GetAccountQueryHandler
  implements Application.IUseCase<GetAccountQuery, Promise<GetAccountDetailsResponse>>
{
  constructor(private accountRepo: IAccountReadRepo) {}

  @RespondWithPublish()
  async execute(query: GetAccountQuery): Promise<GetAccountDetailsResponse> {
    const requestId = query.accountId;
    const account = await this.accountRepo.getById(requestId);

    if (!account) {
      return fail(new ApplicationErrors.AccountNotFound(requestId));
    }

    return ok(account);
  }
}
