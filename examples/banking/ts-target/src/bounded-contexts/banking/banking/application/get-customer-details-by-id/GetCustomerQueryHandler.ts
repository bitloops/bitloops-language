import { Application, Either, RespondWithPublish, ok, fail } from '@bitloops/bl-boilerplate-core';
import { CustomerReadModel } from '../../domain/CustomerReadModel';
import { ICustomerReadRepo } from '../../repos/interfaces/ICustomerReadRepo';
import { ApplicationErrors } from '../errors/index';
import { GetCustomerByIdQuery } from './GetCustomerByIdQuery';

export type GetCustomerResponse = Either<CustomerReadModel, ApplicationErrors.CustomerNotFound>;

export class GetCustomerQueryHandler
  implements Application.IUseCase<GetCustomerByIdQuery, Promise<GetCustomerResponse>>
{
  constructor(private customerRepo: ICustomerReadRepo) {}

  @RespondWithPublish()
  async execute(query: GetCustomerByIdQuery): Promise<GetCustomerResponse> {
    const requestId = query.id;
    const customer = await this.customerRepo.getById(requestId);
    if (!customer) {
      return fail(new ApplicationErrors.CustomerNotFound(requestId));
    }

    return ok(customer);
  }
}
