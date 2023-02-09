import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { Infra } from '@bitloops/bl-boilerplate-core';
import { CustomerReadModel } from '../../../../bounded-contexts/banking/banking/domain/CustomerReadModel';
import { ApplicationErrors } from '../../../../bounded-contexts/banking/banking/application/errors';
import { GetCustomerByIdQuery } from '../../../../bounded-contexts/banking/banking/application/get-customer-details-by-id/GetCustomerByIdQuery';
import { GetCustomerResponse } from '../../../../bounded-contexts/banking/banking/application/get-customer-details-by-id/GetCustomerQueryHandler.js';

export class GetCustomerByIdQueryController extends Fastify.BaseController {
  constructor(private queryBus: Infra.QueryBus.IQueryBus) {
    super();
    this.queryBus = queryBus;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const { customerId } = request.params;
    const query = new GetCustomerByIdQuery({ id: customerId });
    const result = await this.queryBus.query<GetCustomerResponse>(query);
    if (result.isFail()) {
      switch (result.value.constructor) {
        case ApplicationErrors.CustomerNotFound:
          return this.notFound(response, result.value);
        default:
          return this.fail(response, result.value.message);
      }
    }

    this.ok(response, result.value);
  }
}
