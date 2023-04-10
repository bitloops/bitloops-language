import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { Infra } from '@bitloops/bl-boilerplate-core';
import {
  GetAccountQuery,
  GetAccountDetailsResponse,
  ApplicationErrors,
} from '../../../../bounded-contexts/banking/banking/contracts';

export class GetAccountByIdQueryController extends Fastify.BaseController {
  constructor(private queryBus: Infra.QueryBus.IQueryBus) {
    super();
    this.queryBus = queryBus;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const { accountId } = request.params;
    const query = new GetAccountQuery({ accountId });
    const result = await this.queryBus.query<GetAccountDetailsResponse>(query);

    if (result.isFail()) {
      switch (result.value.constructor) {
        case ApplicationErrors.AccountNotFound: {
          this.notFound(response, result.value);
          break;
        }
        default:
          this.fail(response, result.value.message);
      }
    } else {
      this.ok(response, result.value);
    }
  }
}
