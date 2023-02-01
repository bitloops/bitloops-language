import {
  Application,
  Either,
  okWithpublish as okResp,
  failWithPublish as failResp,
} from '@bitloops/bl-boilerplate-core';
import { CustomerReadModel } from '../../domain/CustomerReadModel';
import { ICustomerReadRepo } from '../../repos/interfaces/ICustomerReadRepo';
import { ApplicationErrors } from '../errors/index';
import { GetCustomerByAccountIdQuery } from './GetCustomerByAccountIdQuery';

type GetCustomerResponse = Either<CustomerReadModel, ApplicationErrors.CustomerByAccountIdNotFound>;

export class GetCustomerByAccountIdQueryHandler
  implements Application.IUseCase<GetCustomerByAccountIdQuery, Promise<GetCustomerResponse>>
{
  constructor(private customerRepo: ICustomerReadRepo) {}

  async execute(query: GetCustomerByAccountIdQuery): Promise<GetCustomerResponse> {
    const fail = failResp(query.metadata);
    const ok = okResp(query.metadata);

    const requestAccountId = query.accountId;
    const customer = await this.customerRepo.getByAccountId(requestAccountId);
    if (!customer) {
      return fail(new ApplicationErrors.CustomerByAccountIdNotFound(requestAccountId));
    }

    return await ok(customer);
  }
}
