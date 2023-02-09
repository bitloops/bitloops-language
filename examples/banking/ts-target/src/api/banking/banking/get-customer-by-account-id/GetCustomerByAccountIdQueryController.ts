import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { Infra } from '@bitloops/bl-boilerplate-core';
import { ApplicationErrors } from '../../../../bounded-contexts/banking/banking/application/errors';
import { GetCustomerByAccountIdQuery } from '../../../../bounded-contexts/banking/banking/application/get-customer-details-by-account-id/GetCustomerByAccountIdQuery';
import { GetCustomerByAccountIdResponse } from '../../../../bounded-contexts/banking/banking/application/get-customer-details-by-account-id/GetCustomerByAccountIdQueryHandler.js';

export class GetCustomerByAccountIdQueryController extends Fastify.BaseController {
  constructor(private queryBus: Infra.QueryBus.IQueryBus) {
    super();
    this.queryBus = queryBus;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const { accountId } = request.params;
    const query = new GetCustomerByAccountIdQuery({ accountId });
    const result = await this.queryBus.query<GetCustomerByAccountIdResponse>(query);
    if (result.isFail()) {
      switch (result.value.constructor) {
        case ApplicationErrors.CustomerByAccountIdNotFound:
          return this.notFound(response, result.value);
        default:
          return this.fail(response, result.value.message);
      }
    }

    this.ok(response, result.value);
  }
}
