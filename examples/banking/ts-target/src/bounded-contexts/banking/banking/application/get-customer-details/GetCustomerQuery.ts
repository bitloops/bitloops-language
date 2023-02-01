import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { GET_CUSTOMER_QUERY_NAME } from '../../contracts';

export class GetCustomerQuery extends Application.Query {
  public static readonly queryName = GET_CUSTOMER_QUERY_NAME;

  constructor(public customerId: string) {
    super(GetCustomerQuery.queryName, contextId);
  }

  static getQueryTopic(): string {
    return super.getQueryTopic(GetCustomerQuery.queryName, contextId);
  }
}
