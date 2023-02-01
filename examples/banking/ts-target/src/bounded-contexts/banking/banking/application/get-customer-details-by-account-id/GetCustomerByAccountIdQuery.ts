import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { GET_CUSTOMER_BY_EMAIL_QUERY_NAME } from '../../contracts';

export class GetCustomerByAccountIdQuery extends Application.Query {
  public static readonly queryName = GET_CUSTOMER_BY_EMAIL_QUERY_NAME;

  constructor(public accountId: string) {
    super(GetCustomerByAccountIdQuery.queryName, contextId);
  }

  static getQueryTopic(): string {
    return super.getQueryTopic(GetCustomerByAccountIdQuery.queryName, contextId);
  }
}
