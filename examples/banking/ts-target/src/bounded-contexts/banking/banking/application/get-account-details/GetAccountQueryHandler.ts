import {
  Application,
  Either,
  okWithpublish as okResp,
  failWithPublish as failResp,
} from '@bitloops/bl-boilerplate-core';
import { AccountReadModel } from '../../domain/AccountReadModel';
import { IAccountReadRepo } from '../../repos/interfaces/IAccountReadRepo';
import { ApplicationErrors } from '../errors';
import { GetAccountQuery } from './GetAccountQuery';

type GetAccountDetailsResponse = Either<AccountReadModel, ApplicationErrors.AccountNotFound>;

export class GetAccountQueryHandler
  implements Application.IUseCase<GetAccountQuery, Promise<GetAccountDetailsResponse>>
{
  constructor(private accountRepo: IAccountReadRepo) {}

  async execute(query: GetAccountQuery): Promise<GetAccountDetailsResponse> {
    const fail = failResp(query.metadata);
    const ok = okResp(query.metadata);

    const requestId = query.accountId;
    const account = await this.accountRepo.getById(requestId);

    if (!account) {
      return fail(new ApplicationErrors.AccountNotFound(requestId));
    }

    return await ok(account);
  }
}
