import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { CustomerReadModel } from '../../domain/CustomerReadModel';
import { ApplicationErrors } from '../errors/index';
import { CustomerReadRepoPort } from '../../ports/CustomerReadRepoPort';
import { GetCustomerByIdQuery } from '../queries/GetCustomerByIdQuery';
export type GetCustomerByIdQueryHandlerResponse = Either<
  CustomerReadModel,
  ApplicationErrors.CustomerNotFoundError
>;
export class GetCustomerByIdQueryHandler
  implements Application.IQueryHandler<GetCustomerByIdQuery, CustomerReadModel>
{
  constructor(private customerRepo: CustomerReadRepoPort) {}
  get query() {
    return GetCustomerByIdQuery;
  }
  get boundedContext(): string {
    return GetCustomerByIdQuery.boundedContext;
  }
  @Traceable({
    operation: 'GetCustomerByIdQueryHandler',
    metrics: {
      name: 'GetCustomerByIdQueryHandler',
      category: 'queryHandler',
    },
  })
  async execute(query: GetCustomerByIdQuery): Promise<GetCustomerByIdQueryHandlerResponse> {
    const requestId = query.id;
    const customer = await this.customerRepo.getById(requestId);
    return ok(customer);
  }
}
