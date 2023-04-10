import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { Infra } from '@bitloops/bl-boilerplate-core';
import {
  ApplicationErrors,
  GetCustomerByIdQuery,
  GetCustomerResponse,
} from '../../../../bounded-contexts/banking/banking/contracts';

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
