import {
  Application,
  Either,
  okWithpublish as okResp,
  failWithPublish as failResp,
} from '@bitloops/bl-boilerplate-core';
import { CustomerReadModel } from '../../domain/CustomerReadModel';
import { ICustomerReadRepo } from '../../repos/interfaces/ICustomerReadRepo';
import { ApplicationErrors } from '../errors/index';
import { GetCustomerQuery } from './GetCustomerQuery';

type GetCustomerResponse = Either<CustomerReadModel, ApplicationErrors.CustomerNotFound>;

export class GetCustomerQueryHandler
  implements Application.IUseCase<GetCustomerQuery, Promise<GetCustomerResponse>>
{
  constructor(private customerRepo: ICustomerReadRepo) {}

  async execute(query: GetCustomerQuery): Promise<GetCustomerResponse> {
    const fail = failResp(query.metadata);
    const ok = okResp(query.metadata);

    const requestId = query.customerId;
    const customer = await this.customerRepo.getById(requestId);
    if (!customer) {
      return fail(new ApplicationErrors.CustomerNotFound(requestId));
    }

    return await okResp(query.metadata)(customer);
  }
}
