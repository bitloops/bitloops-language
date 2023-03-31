import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { CustomerReadModel } from '../../domain/CustomerReadModel';
import { ApplicationErrors } from '../errors/index';
import { GetCustomerByIdQuery } from '../queries/GetCustomerByIdQuery';
import { Inject } from '@nestjs/common';
import { CustomerReadRepoPortToken } from '../../constants';
import { CustomerReadRepoPort } from '../../ports/CustomerReadRepoPort';
export type GetCustomerByIdQueryHandlerResponse = Either<
  CustomerReadModel,
  ApplicationErrors.CustomerNotFoundError
>;
export class GetCustomerByIdQueryHandler
  implements Application.IQueryHandler<GetCustomerByIdQuery, CustomerReadModel>
{
  constructor(
    @Inject(CustomerReadRepoPortToken)
    private readonly customerRepo: CustomerReadRepoPort,
  ) {}
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
    return ok(customer.value);
  }
}
